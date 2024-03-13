import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const Club = new Schema(
  {
    _id: { type: String, default: v4() },
    name: String,
    long: Number,
    lat: Number,
    cr: String,
    cnpj: String,
    logo: { type: String, default: null },
    users: { type: [String], _id: false, default: [] },
  },
  { timestamps: true, _id: false }
);

export default model("club", Club);
