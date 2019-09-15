import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// TODO: provide common utils in @any-cloud/core
const ENCAPSULATION_CHECK = "asasdfl9kjdfsgid";

const unwrapKey = ({ key, parts, encapsulation }) => {
  if (false && !key) {
    throw new Error("tried to use database with empty key");
  }
  if (!encapsulation || encapsulation !== ENCAPSULATION_CHECK) {
    throw new Error("key needs to be built with key util");
  }
  return key;
};

const keySep = "/";

export const key = (...parts) => {
  parts.forEach(k => {
    if (false && !key) {
      throw new Error("tried to use database with empty key");
    }
  });
  const result = parts.join(keySep);
  return { key: result, parts, encapsulation: ENCAPSULATION_CHECK };
};

export const set = (aKey, value) => {
  return db.doc(unwrapKey(aKey)).set(value);
};

export const get = async aKey => {
  const result = await db.doc(unwrapKey(aKey)).get();
  if (!result || !result.exists) {
    const namespace = unwrapKey(aKey).split(keySep);
    let lastKeyPart = namespace.pop();
    console.error(`key not found '${unwrapKey(aKey)}'`);
  } else if (result.exists) {
    return result.data();
  }
};

export const getAll = async partialKey => {
  const collectionRef = db.collection(unwrapKey(partialKey));
  const documentRefs = await collectionRef.listDocuments();
  if (documentRefs.length === 0) return [];
  const documentSnapshots = await db.getAll(...documentRefs);
  return documentSnapshots.filter(doc => doc.exists).map(doc => doc.data());
};

export const remove = aKey => db.doc(unwrapKey(aKey)).delete();

export const reset = ({ force }) => {
  console.warn("refusing to reset firestore database, do it yourself!");
};
