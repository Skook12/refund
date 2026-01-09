import { WhatsappService } from '#services/whatsapp_service'

// Inicializa o serviço do WhatsApp quando a aplicação sobe
// Isso vai gerar o QR Code no terminal na primeira execução
new WhatsappService()