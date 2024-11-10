import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAsKCz55KN3j73EKUD0Kgny766VlQLCrmA',
  authDomain: 'fir-payment-project.firebaseapp.com',
  projectId: 'fir-payment-project',
  storageBucket: 'fir-payment-project.firebasestorage.app',
  messagingSenderId: '98201232298',
  appId: '1:98201232298:web:e4e28054fb4c0d6ffc41d3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
