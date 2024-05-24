import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database'

var firebaseConfig = {
  //Your Firebase Account
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
