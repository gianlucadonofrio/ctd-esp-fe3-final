export interface ICharacterResponse {
  code: number;
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
    results: ICharacter[];
  };
}

export interface ICharacter {
  id: number;
  name: string;
  description: string | null;
  modified: string;
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
