import { Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const userSchema = new Schema<IUser>({
  name: { type: "string", required: true },
  age: {type: "number", required: true},
  email: { type: "string", required: true, unique: true },
});

const User = model<IUser>('User', userSchema);

export default User;