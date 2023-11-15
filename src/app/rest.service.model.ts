export interface BackendData {
  author: string;
  birthday: string;
  birthPlace: string;
  books: Books[];
}
export interface Books {
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}
