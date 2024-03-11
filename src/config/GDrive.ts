import { Auth, google } from "googleapis";
import { multerFile } from "./Upload";
import { createReadStream } from "fs";
import { Readable } from "stream";

export type DriveUploadResponse = {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
};

const SCOPE = ["https://www.googleapis.com/auth/drive"];

async function auth() {
  const jwtClient = new google.auth.JWT({
    email: process.env.G_SERVICEMAIL,
    keyFile: null,
    key: process.env.G_PRIVATE_KEY,
    scopes: SCOPE,
  });

  await jwtClient.authorize();

  return jwtClient;
}

async function uploadDrive(
  authClient: Auth.JWT,
  file?: multerFile
): Promise<DriveUploadResponse> {
  const drive = google.drive({
    version: "v3",
    auth: authClient,
  });

  const stream = Readable.from([file.buffer]);
  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      mimeType: file.mimetype,
      parents: [process.env.FOLDER_KEY],
    },
    media: {
      body: stream,
      mimeType: file.mimetype,
    },
  });
  return res.data as DriveUploadResponse;
}

function deleteToDrive(authClient: Auth.JWT, fileID: string) {
  const drive = google.drive({
    version: "v3",
    auth: authClient,
  });

  drive.files.delete({
    fileId: fileID,
  });
}

async function getFile(authClient: Auth.JWT, fileID: string) {
  const drive = google.drive({
    version: "v3",
    auth: authClient,
  });

  const res = await drive.files.get({
    fileId: fileID,
  });

  return res.data;
}

export { uploadDrive, deleteToDrive, auth, getFile };
