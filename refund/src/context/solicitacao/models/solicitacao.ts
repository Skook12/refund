import type { Comprovante } from "./comprovante";

export type Solicitacao = {
  refunds: {
    meta: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      firstPage: number;
      firstPageUrl: string;
      lastPageUrl: string;
      nextPageUrl: null;
      previousPageUrl: null;
    };
    data: [
      {
        id: string;
        title: string;
        category: string;
        value: number;
        deletedAt: null;
        createdAt: string;
        updatedAt: string;
        receipt: Comprovante;
      }
    ];
  };
};

export type SolicitacaoItem = {
  refund: {
    id: string;
    title: string;
    category: string;
    value: number;
    deletedAt: null;
    createdAt: string;
    updatedAt: string;
    receipt: {
      id: string;
      originalFilename: string;
      filename: string;
      path: string;
      extname: string;
      refundId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
