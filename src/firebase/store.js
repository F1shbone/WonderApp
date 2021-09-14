import { getFirestore, doc, collection, getDoc, getDocs, setDoc } from 'firebase/firestore';

function getDocument(db, document, path) {
  const docRef = doc(db, document, path);

  return getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`Couldn't get Data for document ${document}`);
    }
  });
}
function getDocuments(db, document) {
  return getDocs(collection(db, document)).then((querySnapshot) => {
    const results = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      results[doc.id] = doc.data();
    });
    return results;
  });
}

function setDocument(db, document, path, value) {
  const docRef = doc(db, document, path);

  return setDoc(docRef, value, { merge: true });
}

export default class store {
  constructor(auth) {
    this.auth = auth;
    this.firestore = getFirestore();
  }

  async getUser() {
    return getDocument(this.firestore, 'users', this.auth.user.uid);
  }

  async getExpansions() {
    return getDocuments(this.firestore, `users/${this.auth.user.uid}/expansions`);
  }
  async setExpansionOwned(expansionId, owned) {
    return setDocument(this.firestore, `users/${this.auth.user.uid}/expansions`, expansionId, owned);
  }

  async getPlayers() {
    return getDocuments(this.firestore, `users/${this.auth.user.uid}/players`);
  }
}
