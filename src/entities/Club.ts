import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const Club = new Schema(
  {
    _id: { type: String, default: v4() },
    name: String,
    long: String,
    lat: String,
    cr: String,
    cnpj: String,
  },
  { timestamps: true, _id: false }
);

export default model("club", Club);
