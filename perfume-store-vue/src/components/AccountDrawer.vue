<template>
  <div v-if="isOpen" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-pink-700">Account</h2>
      <button @click="$emit('close')" aria-label="Close account drawer">
        <Icon icon="mdi:close" class="w-5 h-5 text-gray-600 hover:text-pink-600" />
      </button>
    </div>

    <!-- User Info -->
    <div class="mb-6">
      <p class="text-gray-700 text-sm mb-1">Logged in as:</p>
      <p class="text-pink-600 font-medium text-base">{{ auth.user?.email }}</p>
    </div>

    <!-- Logout Button -->
    <button
      @click="handleLogout"
      class="w-full px-4 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
defineProps(['isOpen'])

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
  // Close drawer after logout
  setTimeout(() => {
    // Slight delay to allow route change before drawer closes
    window.dispatchEvent(new Event('close-account-drawer'))
  }, 100)
}
</script>