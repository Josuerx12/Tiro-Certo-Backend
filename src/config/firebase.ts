import admin, { ServiceAccount } from "firebase-admin";
import { config } from "dotenv";

import serviceAccount from "./tirocerto.json";

config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: "tirocerto-e86bc.appspot.com",
});

export { admin };
