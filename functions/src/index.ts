import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();

// Implement
import shareImpl from "./share";
import getOgpImageImpl from "./getOgpImage";

export const share = functions.https.onRequest(shareImpl);

export const getOgpImage = functions.https.onRequest(getOgpImageImpl);