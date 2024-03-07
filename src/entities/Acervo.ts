import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const Acervo = new Schema(
  {
    _id: { type: String, default: v4() },
    userID: String,
    weapons: {
      type: [
        {
          name: String,
          tipo: String,
          modelo: String,
          registro: String,
          validade: String,
        },
      ],
      default: [],
    },
  },
  { _id: false, timestamps: true }
);

export default model("acervo", Acervo);
