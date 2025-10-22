import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from './useCartStores'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const cart = useCartStore()

  const isAuthenticated = computed(() => !!user.value)

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      user.value = result.user
      token.value = await result.user.getIdToken()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error }
    }
  }

  async function register(name, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      await sendEmailVerification(result.user)
      user.value = result.user
      token.value = await result.user.getIdToken()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error }
    }
  }

  async function logout() {
    await signOut(auth)
    user.value = null
    token.value = null
    cart.clearCart()
  }

  function restoreSession() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        token.value = await firebaseUser.getIdToken()
      } else {
        user.value = null
        token.value = null
      }
    })
  }

  return { user, token, isAuthenticated, login, register, logout, restoreSession }
})

