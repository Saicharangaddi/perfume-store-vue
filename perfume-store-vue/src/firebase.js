import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBU7EL8mehEelp-ovpMK07edjKLCRfRIjo",
  authDomain: "perfume-store-vue.firebaseapp.com",
  projectId: "perfume-store-vue",
  storageBucket: "perfume-store-vue.appspot.com",
  messagingSenderId: "680481017205",
  appId: "1:680481017205:web:8039c6e3b86c41c01ad73c"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
