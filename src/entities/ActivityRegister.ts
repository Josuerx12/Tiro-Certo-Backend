import { model, Schema } from "mongoose";
import { v4 } from "uuid";

const ActivityRegister = new Schema(
  {
    _id: { type: String, default: v4() },
    ownerID: String,
    name: String,
    cpf: String,
    cr: String,
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
    },
    activity: { type: String, enum: ["treinamento", "prova"] },
  },
  { timestamps: true, _id: false }
);

export default model("activityRegister");
