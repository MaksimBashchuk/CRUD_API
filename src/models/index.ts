export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type ReqBodyUser = Omit<IUser, 'id'>;

export type OptionalReqBodyUser = Partial<ReqBodyUser>;
