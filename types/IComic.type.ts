export interface IComicResponse {
  code: number | string;
  message: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: IComic[];
  };
}

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    resourceURI: string;
    name: string;
  };
  stock: number;
  oldPrice: number;
  price: number;
  creators: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      }
    ];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      }
    ];
    returned: number;
  };
}
