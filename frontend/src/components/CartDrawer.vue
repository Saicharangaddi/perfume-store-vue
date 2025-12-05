<template>
  <aside
    v-if="isOpen"
    class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="cart-title"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 id="cart-title" class="text-xl font-bold text-pink-700">Your Cart</h2>
      <button
        @click="$emit('close')"
        aria-label="Close cart"
        class="p-1 rounded focus:outline-none focus:ring focus:ring-pink-500"
      >
        <Icon icon="mdi:close" class="w-5 h-5 text-gray-600 hover:text-pink-600" />
      </button>
    </div>

    <ul v-if="cart.items.length > 0" class="space-y-4">
      <li
        v-for="(item, index) in cart.items"
        :key="index"
        class="flex items-center space-x-4"
      >
        <img
          :src="item.image"
          alt="Image of {{ item.title }}"
          class="w-16 h-16 object-cover rounded"
        />
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-800">{{ item.title }}</h3>
          <p class="text-sm text-pink-600 font-bold">${{ item.price.toFixed(2) }}</p>
        </div>
        <button
          @click="removeItem(index)"
          class="text-xs text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-300"
          aria-label="Remove {{ item.title }} from cart"
        >
          Remove
        </button>
      </li>
    </ul>

    <p v-else class="text-gray-500" aria-live="polite">Your cart is empty.</p>

    <!-- Total Price & Buy Now -->
    <div v-if="cart.items.length > 0" class="mt-6 border-t pt-4">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-semibold text-gray-800">Total:</span>
        <span
          class="text-lg font-bold text-pink-700"
          aria-live="polite"
        >
          ${{ totalPrice.toFixed(2) }}
        </span>
      </div>
      <button
        @click="handleBuyNow"
        class="w-full px-4 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition focus:outline-none focus:ring focus:ring-pink-500"
        aria-label="Proceed to checkout"
      >
        Buy Now
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed, nextTick, watch } from 'vue'
import { useCartStore } from '../stores/useCartStores'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['isOpen'])

const cart = useCartStore()

// Total price calculation
const totalPrice = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price, 0)
)

// Buy Now handler
function handleBuyNow() {
  router.push('/checkout')
}

// Remove item handler
function removeItem(index) {
  cart.removeItem(index)
}

// Focus management when drawer opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      document.querySelector('[aria-label="Close cart"]')?.focus()
    })
  }
})
</script>