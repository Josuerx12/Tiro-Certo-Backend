import { Schema, model } from "mongoose";

const Weapons = new Schema(
  {
    _id: String,
    name: String,
    ownerId: String,
    categoryId: String,
    modelo: String,
    registro: String,
    validade: String,
  },
  { timestamps: true, _id: false }
);

export default model("weapon", Weapons);
