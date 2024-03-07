import { google } from "googleapis";

const drive = google.drive({
  version: "v2",
  auth: "AIzaSyDmrBDJPCOyq72jlKwSUqTD1Sf28Gh_reE",
});

export { drive };
