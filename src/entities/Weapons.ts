import { Schema, model } from "mongoose";

const Weapons = new Schema(
  {
    _id: String,
    ownerId: String,
    brand: String,
    model: String,
    register: String,
    caliber: String,
    categoryId: String,
    GTValidation: String,
  },
  { timestamps: true, _id: false }
);

export default model("weapon", Weapons);
