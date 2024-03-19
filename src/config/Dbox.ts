import { config } from "dotenv";
import { Dropbox } from "dropbox";

config();

const dbx = new Dropbox({
  accessToken: process.env.DBX_TOKEN,
});

export { dbx };
