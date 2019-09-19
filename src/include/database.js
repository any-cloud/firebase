import { database as common } from "@any-cloud/core";
import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

export const keySep = "/";

export const set = (aKey, value) => {
  return db.doc(common.unwrapKey(aKey)).set(value);
};

export const get = async aKey => {
  const result = await db.doc(common.unwrapKey(aKey)).get();
  if (!result || !result.exists) {
    console.error(`key not found '${common.unwrapKey(aKey)}'`);
  } else if (result.exists) {
    return result.data();
  }
};

export const getAllKeys = async partialKey => {
  const collectionRef = db.collection(common.unwrapKey(partialKey));
  const documentRefs = await collectionRef.listDocuments();
  if (documentRefs.length === 0) return [];
  return documentRefs.map(ref => common.key(...ref.path.split(keySep)));
};

export const getAll = async partialKey => {
  const collectionRef = db.collection(common.unwrapKey(partialKey));
  const documentRefs = await collectionRef.listDocuments();
  if (documentRefs.length === 0) return [];
  const documentSnapshots = await db.getAll(...documentRefs);
  return documentSnapshots.filter(doc => doc.exists).map(doc => doc.data());
};

export const remove = aKey => db.doc(common.unwrapKey(aKey)).delete();

export const reset = ({ force }) => {
  console.warn("refusing to reset firestore database, do it yourself!");
};
