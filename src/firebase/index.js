import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.json';

import Auth from './auth';
import Store from './store';

const $firebase = initializeApp(firebaseConfig);
const auth = new Auth($firebase);
const store = new Store(auth, $firebase);
const firebase = {
  auth,
  store,
};

export const useFirebase = () => {
  return firebase;
};
