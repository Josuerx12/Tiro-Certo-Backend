import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const WeaponCategory = new Schema(
  {
    _id: { type: String, default: v4() },
    name: String,
    logo: String,
  },
  { timestamps: true, _id: false }
);

export default model("weaponCategory", WeaponCategory);
