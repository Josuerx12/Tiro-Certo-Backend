import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const User = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    name: String,
    email: String,
    cpf: String,
    cr: { type: Number, default: null },
    photoURL: { type: String, default: null },
    photoPath: { type: String, default: null },
    fingerPrintSignature: { type: String, default: null },
    password: String,
    clubs: { type: [String], _id: false, default: [] },
    admin: { type: Boolean, default: false },
    founder: { type: Boolean, default: false },
  },
  { _id: false, timestamps: true }
);

export default model("user", User);
