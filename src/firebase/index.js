import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.json';

import createFireAuth from './auth';
import createFireStore from './store';

const $firebase = initializeApp(firebaseConfig);

export default $firebase;
export const useFireAuth = createFireAuth();
export const useFireStore = createFireStore();
