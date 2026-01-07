export type Comprovante = {
  receipt: {
    originalFilename: string;
    path: string;
    extname: string;
    filename: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type ComprovanteDownload = {
  url: string;
};
