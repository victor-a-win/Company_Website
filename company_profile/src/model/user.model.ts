export default interface IUser {
  objectId?: string;
  name?: string;
  email?: string;
  lastLogin?: Date;
  created?: Date;
  updated?: Date;
  "user-token"?: string;
}
