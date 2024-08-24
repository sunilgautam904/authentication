import mongoose, { Schema, Document } from "mongoose";

export interface IUserToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const UserTokenSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

export default mongoose.model<IUserToken>("UserToken", UserTokenSchema);
