import IUser from "./user.model";

export default interface IPost {
  title: string;
  slug: string;
  image: File | null;
  imageUrl: string;
  ownerId: string;
  excerpt: string;
  content: string;
}

export type TPostPayload = Omit<IPost, "image">;

export interface IPostResponse extends TPostPayload {
  objectId: string;
  author: Omit<IUser, "user-token">[];
  created: string;
  updated: string;
}

export interface IPostListResponse {
  totalObjects: number;
  offset: number;
  data: IPostResponse[];
}
