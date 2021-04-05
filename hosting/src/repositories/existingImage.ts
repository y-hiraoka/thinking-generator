import { firestore, firebase } from "../common/firebaseClient";

export type ExistingImage = {
  uid: string;
  nameHashValue: string;
  photoURLHashValue: string;
  fileName: string;
};

function isExistingImage(value: any): value is ExistingImage {
  return (
    !!value &&
    typeof value.uid === "string" &&
    typeof value.nameHashValue === "string" &&
    typeof value.photoURLHashValue === "string" &&
    typeof value.fileName === "string"
  );
}

const converter: firebase.firestore.FirestoreDataConverter<ExistingImage> = {
  fromFirestore: snapshot => {
    const data = snapshot.data();

    if (isExistingImage(data)) {
      return data;
    } else {
      throw new Error("data is invalid.");
    }
  },
  toFirestore: (data: ExistingImage) => {
    return data;
  },
};

export async function getExistingImage(
  uid: string,
  nameHashValue: string,
  photoURLHashValue: string,
) {
  const snapshot = await firestore
    .collection("existingImage")
    .where("uid", "==", uid)
    .where("nameHashValue", "==", nameHashValue)
    .where("photoURLHashValue", "==", photoURLHashValue)
    .withConverter(converter)
    .get();

  if (snapshot.empty) return undefined;

  return snapshot.docs[0].data();
}

export async function createExistingImage(
  uid: string,
  nameHashValue: string,
  photoURLHashValue: string,
  fileName: string,
) {
  await firestore.collection("existingImage").withConverter(converter).add({
    uid,
    nameHashValue,
    photoURLHashValue,
    fileName,
  });
}
