import { getFirestore, doc, collection, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { useFireAuth } from '.';

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

  return setDoc(docRef, value);
}

export default function create() {
  const { user } = useFireAuth();
  const $db = getFirestore();

  return function useFireStore() {
    return {
      async getUser() {
        return getDocument($db, 'users', user.value.uid);
      },

      async getExpansions() {
        return getDocuments($db, `users/${user.value.uid}/expansions`);
      },
      async setExpansionOwned(expansionId, owned) {
        return setDocument($db, `users/${user.value.uid}/expansions`, expansionId, owned);
      },

      async getPlayers() {
        return getDocuments($db, `users/${user.value.uid}/players`);
      },
      async addPlayer(player) {
        console.log(player, typeof player.added);
        return setDocument($db, `users/${user.value.uid}/players`, `${player.id}`, player);
      },
    };
  };
}