<template>
  <div class="min-h-screen flex items-center justify-center bg-white text-[text-size-adjust:100%]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Welcome to Perfume Paradise</h1>

      <form @submit.prevent aria-label="Authentication Form">
  <template v-if="!auth.isAuthenticated">
    <!--  Top Section: Inputs -->
    <div v-if="mode === 'register'" class="text-left mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
      <input
        id="username"
        v-model="username"
        @input="touched.username = true"
        type="text"
        placeholder="Enter your username"
        class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
        :class="{ 'border-red-500': errors.username }"
      />
      <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
    </div>

    <div class="text-left mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="email"
        @input="touched.email = true"
        type="email"
        placeholder="Enter your email"
        class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div class="text-left mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        v-model="password"
        @input="touched.password = true"
        type="password"
        placeholder="Enter your password"
        class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
        :class="{ 'border-red-500': errors.password }"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <!-- 🔄 Middle Section: Action Button -->
    <button
      type="button"
      @click="mode === 'login' ? handleLogin() : handleRegister()"
      class="bg-[#8B4513] text-white px-6 py-2 rounded hover:bg-[#A0522D] w-full mb-6"
    >
      {{ mode === 'login' ? 'Login' : 'Register' }}
    </button>

    <!-- 🔻 Bottom Section: Mode Toggle -->
    <div class="flex justify-center">
      <button
        type="button"
        @click="mode = 'login'"
        :class="[
          'px-4 py-2 rounded-l w-1/2',
          mode === 'login' ? 'bg-[#8B4513] text-white' : 'bg-gray-200 text-gray-700'
        ]"
      >
        Login
      </button>
      <button
        type="button"
        @click="mode = 'register'"
        :class="[
          'px-4 py-2 rounded-r w-1/2',
          mode === 'register' ? 'bg-[#8B4513] text-white' : 'bg-gray-200 text-gray-700'
        ]"
      >
        Register
      </button>
    </div>

    <!-- 🔔 General Error -->
    <p v-if="errors.general" class="text-red-500 text-sm mt-4">{{ errors.general }}</p>
  </template>

  <!-- ✅ Authenticated View -->
  <template v-else>
    <p class="text-lg text-gray-700 mb-4">
      Welcome back, {{ auth.user?.displayName || auth.user?.email }}!
    </p>
    <button
      type="button"
      @click="goToApp"
      class="bg-[#8B4513] text-white px-6 py-2 rounded hover:bg-[#A0522D] w-full"
    >
      Enter Store
    </button>
    <button
      type="button"
      @click="handleLogout"
      class="mt-3 text-sm text-red-500 hover:underline"
    >
      Logout
    </button>
  </template>
</form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/useCartStores'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const cart = useCartStore()
const router = useRouter()

// Form fields
const username = ref('')
const email = ref('')
const password = ref('')
const mode = ref('login')

// Error messages
const errors = reactive({
  username: '',
  email: '',
  password: '',
  general: ''
})

// Touched flags
const touched = reactive({
  username: false,
  email: false,
  password: false
})

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|net|org)$/i
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/

// Utility
function clearErrors() {
  for (const key in errors) errors[key] = ''
}

// Real-time validation
watch(username, val => {
  if (touched.username) {
    errors.username = val.trim() ? '' : 'Username is required'
  }
})

watch(email, val => {
  if (touched.email) {
    errors.email = emailRegex.test(val.trim()) ? '' : 'Enter a valid email address'
  }
})

watch(password, val => {
  if (touched.password) {
    errors.password = passwordRegex.test(val.trim())
      ? ''
      : 'Password must be at least 6 characters, include uppercase, lowercase, number, and special character'
  }
})

// Submit: Login
async function handleLogin() {
  clearErrors()

  let valid = true
  if (!email.value.trim()) {
    errors.email = 'Email is required'
    valid = false
  }
  if (!password.value.trim()) {
    errors.password = 'Password is required'
    valid = false
  }

  if (!valid) return

  const result = await auth.login(email.value, password.value)
  if (result.success) {
    if (!auth.user?.emailVerified) {
      errors.general = 'Please verify your email before logging in.'
      return
    }
    router.push('/home')
  } else {
    if (result.error?.code === 'auth/user-not-found') {
      errors.email = 'No account found with this email'
    } else if (result.error?.code === 'auth/wrong-password') {
      errors.password = 'Incorrect password'
    } else {
      errors.general = result.error?.message || 'Login failed. Please try again.'
    }
  }
}

// Submit: Register
async function handleRegister() {
  clearErrors()

  let valid = true
  if (!username.value.trim()) {
    errors.username = 'Username is required'
    valid = false
  }
  if (!emailRegex.test(email.value.trim())) {
    errors.email = 'Enter a valid email address'
    valid = false
  }
  if (!passwordRegex.test(password.value.trim())) {
    errors.password = 'Password must be at least 6 characters, include uppercase, lowercase, number, and special character'
    valid = false
  }

  if (!valid) return

  const result = await auth.register(username.value, email.value, password.value)
  if (result.success) {
    errors.general = 'Registration successful! Please check your email to verify your account.'
    // Optionally delay redirect or show verification reminder page
    setTimeout(() => router.push('/home'), 3000)
  } else {
    if (result.error?.code === 'auth/email-already-in-use') {
      errors.email = 'This email is already registered. Please log in instead.'
    } else {
      errors.general = result.error?.message || 'Registration failed. Please try again.'
    }
  }
}

// Navigation
function goToApp() {
  router.push('/home')
}

// Logout
function handleLogout() {
  auth.logout()
  cart.clearCart()
}
</script>