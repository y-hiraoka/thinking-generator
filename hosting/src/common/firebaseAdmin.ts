import admin from "firebase-admin";

const credential = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

!admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(credential),
    storageBucket: "thinking-generator.appspot.com",
  });

export { admin as firebaseAdmin };

export const firebaseStorage = admin.storage();
