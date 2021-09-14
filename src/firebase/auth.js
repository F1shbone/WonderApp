import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default class Fireauth {
  constructor() {
    this.auth = getAuth();
  }

  async signIn(email, password) {
    const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
    this.user = {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
    };

    return userCredentials;
  }

  signOut() {
    return signOut(this.auth);
  }
}
