import wwebjs from 'whatsapp-web.js'
const { Client, LocalAuth } = wwebjs
import qrcode from 'qrcode-terminal'
import { RefundService } from '#services/refunds_service'
import Receipt from '#models/receipt'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

export class WhatsappService {
  private client: any
  private refundService: RefundService

  constructor() {
    this.refundService = new RefundService()
    
    // Inicializa o cliente do WhatsApp
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: app.tmpPath('whatsapp_auth'),
      }),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    })

    this.initialize()
  }

  private initialize() {
    this.client.on('qr', (qr) => {
      console.log('QR Code recebido, por favor escaneie:')
      qrcode.generate(qr, { small: true })
    })

    this.client.on('ready', () => {
      console.log('WhatsApp Client está pronto!')
    })

    this.client.on('message_create', async (msg) => {
      try {
        if (msg.body.startsWith('!refund')) {
          await this.handleRefund(msg)
        }
      } catch (error) {
        console.error('Erro ao processar mensagem do WhatsApp:', error)
        msg.reply('Ocorreu um erro ao processar seu pedido de reembolso.')
      }
    })

    this.client.initialize()
  }

  private async handleRefund(msg: any) {
    // Verifica se tem imagem anexada (o recibo)
    if (!msg.hasMedia) {
      return msg.reply('Por favor, envie uma imagem do recibo junto com o comando na legenda.\nEx: !refund 50.00 , Almoço , food')
    }

    // Parse do comando: !refund <valor> , <titulo> , <categoria>
    const content = msg.body.replace('!refund', '').trim()
    const parts = content.split(',').map((p: string) => p.trim())

    if (parts.length < 3) {
      return msg.reply('Formato inválido. Use: !refund <valor> , <titulo> , <categoria>')
    }

    const value = parseFloat(parts[0])
    const title = parts[1]
    const categoryInfo = parts[2]

    if (isNaN(value)) {
      return msg.reply('Valor inválido. Use ponto para decimais. Ex: 50.50')
    }

    msg.reply('Processando seu reembolso...')

    // Baixa a mídia (imagem)
    const media = await msg.downloadMedia()
    if (!media) {
      return msg.reply('Falha ao baixar a imagem do recibo.')
    }

    // Salva a imagem temporariamente para o RefundService processar
    const fileName = cuid()
    const ext = media.mimetype.split('/')[1] || 'jpg'
    // Garante que a pasta tmp/uploads existe
    const uploadDir = app.tmpPath('uploads')
    await mkdir(uploadDir, { recursive: true })
    
    const filePath = path.join(uploadDir, `${fileName}.${ext}`)
    
    // O media.data vem em base64
    await writeFile(filePath, media.data, 'base64')

    // Cria o registro do Recibo no banco
    // Ajuste os campos conforme seu model Receipt real
    const receipt = await Receipt.create({
      filename: fileName,
      extname: ext,
      original_filename: 'whatsapp_upload',
      path: filePath, 
    })

    // Chama o serviço de Refund existente
    // O RefundService espera um payload compatível com CreateRefundValidator
    await this.refundService.create({
      value: value,
      title: title,
      category: categoryInfo,
      receipt: receipt.id,
      // Adicione outros campos obrigatórios do seu validator aqui, se houver
    } as any)

    msg.reply(`✅ Reembolso "${title}" de R$ ${value} criado com sucesso!`)
  }
}
