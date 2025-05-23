import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvFwOo2yM9S60di3kRQv0-pYcDWhaIyN8",
  authDomain: "taskmate-dbafb.firebaseapp.com",
  projectId: "taskmate-dbafb",
  storageBucket: "taskmate-dbafb.firebasestorage.app",
  messagingSenderId: "123773196615",
  appId: "1:123773196615:web:9341262c71ce1330fe5462"
};

// Initialize Firebase only if no app exists
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };