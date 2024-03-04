import { Schema, model } from "mongoose";
import { uuid } from "uuidv4";

const User = new Schema(
  {
    uid: { type: String, default: uuid() },
    name: String,
    email: String,
    cpf: Number,
    photo: { type: String, default: null },
    imageSignature: { type: String, default: null },
    fingerPrintSignature: { type: String, default: null },
    password: String,
    admin: { type: Boolean, default: false },
    supervisor: { type: Boolean, default: false },
    founder: { type: Boolean, default: false },
  },
  { _id: false }
);

export default model("user", User);
