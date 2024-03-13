import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const Acervo = new Schema(
  {
    _id: String,
    userID: String,
    weaponsId: {
      type: [String],
      default: [],
    },
  },
  { _id: false, timestamps: true }
);

export default model("acervo", Acervo);
