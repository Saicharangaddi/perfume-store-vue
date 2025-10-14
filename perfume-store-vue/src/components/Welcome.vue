<template>
  <div class="min-h-screen flex items-center justify-center bg-white text-[text-size-adjust:100%]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Welcome to Perfume Paradise</h1>

      <form @submit.prevent aria-label="Authentication Form">
        <template v-if="!auth.isAuthenticated">
          <!-- 🔝 Top Section: Inputs -->
          <div v-if="mode === 'register'" class="text-left mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            />
          </div>

          <div class="text-left mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              required
            />
          </div>

          <div class="text-left mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              required
            />
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

          <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
        </template>

        <!-- ✅ Authenticated View -->
        <template v-else>
          <p class="text-lg text-gray-700 mb-4">Welcome back, {{ auth.user?.displayName || auth.user?.email }}!</p>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()
const mode = ref('login')

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }

  const success = await auth.login(email.value, password.value)
  if (success) {
    router.push('/home')
  } else {
    error.value = 'Invalid credentials'
  }
}

async function handleRegister() {
  if (!username.value || !email.value || !password.value) {
    error.value = 'Please fill all fields'
    return
  }

  const success = await auth.register(username.value, email.value, password.value)
  if (success) {
    router.push('/home')
  } else {
    error.value = 'Registration failed'
  }
}

function handleLogout() {
  auth.logout()
}

function goToApp() {
  router.push('/home')
}

onMounted(() => {
  auth.restoreSession()
})
</script>