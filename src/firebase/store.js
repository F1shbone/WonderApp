import { getFirestore, doc, collection, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
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

function deleteDocument(db, document, path) {
  const docRef = doc(db, document, path);

  return deleteDoc(docRef);
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
        return setDocument($db, `users/${user.value.uid}/players`, `${player.id}`, player);
      },
      async deletePlayer(playerId) {
        return deleteDocument($db, `users/${user.value.uid}/players`, `${playerId}`);
      },

      async getResults() {
        return getDocuments($db, `users/${user.value.uid}/results`);
      },
      async addResult(id, result) {
        return setDocument($db, `users/${user.value.uid}/results`, id, result);
      },
    };
  };
}
