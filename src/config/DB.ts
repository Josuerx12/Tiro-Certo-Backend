import { connect } from "mongoose";

async function DBConnect() {
  try {
    await connect(process.env.DB_URI);
    console.log("Servidor conectado com o banco de dados!!");
  } catch (error) {
    console.log(error);
  }
}

export { DBConnect };
