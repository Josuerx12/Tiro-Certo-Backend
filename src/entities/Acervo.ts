import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const Acervo = new Schema(
  {
    _id: { type: String, default: v4() },
    userID: String,
    weapons: {
      type: [
        {
          _id: { type: String, default: v4() },
          name: String,
          categoryId: String,
          modelo: String,
          registro: String,
          validade: String,
        },
        { _id: false },
      ],
      default: [],
    },
  },
  { _id: false, timestamps: true }
);

export default model("acervo", Acervo);
