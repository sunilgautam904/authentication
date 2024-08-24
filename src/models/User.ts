import { Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: "string", required: true },
  password: {type: "string", required: true},
  email: { type: "string", required: true, unique: true },
});

const User = model<IUser>('User', userSchema);

export default User;