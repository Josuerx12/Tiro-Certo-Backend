import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const User = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    name: String,
    email: String,
    cpf: Number,
    cr: { type: Number, default: null },
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
