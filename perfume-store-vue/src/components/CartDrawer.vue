<template>
  <div v-if="isOpen" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-pink-700">Your Cart</h2>
      <button @click="$emit('close')" aria-label="Close cart">
        <Icon icon="mdi:close" class="w-5 h-5 text-gray-600 hover:text-pink-600" />
      </button>
    </div>

    <ul v-if="cart.items.length > 0" class="space-y-4">
      <li v-for="(item, index) in cart.items" :key="index" 
      class="flex items-center space-x-4">
        <img :src="item.image" alt="Product image" 
        class="w-16 h-16 object-cover rounded"/>
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-800">{{ item.title }}</h3>
          <p class="text-sm text-pink-600 font-bold">${{ item.price.toFixed(2) }}</p>
        </div>
        <button 
        @click="removeItem(index)"
        class="text-xs text-red-500 hover:text-red-700">
        Remove
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500">Your cart is empty.</p>
    <!-- Total Price & Buy Now -->
    <div v-if="cart.items.length > 0" class="mt-6 border-t pt-4">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-semibold text-gray-800">Total:</span>
        <span class="text-lg font-bold text-pink-700">${{ totalPrice.toFixed(2) }}</span>
      </div>
      <button
        @click="handleBuyNow"
        class="w-full px-4 py-3 bg-pink-600 text-white font-semibold rounded-lg 
        shadow hover:bg-pink-700 transition"
      >
        Buy Now
      </button>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/useCartStores'
import { useRouter } from 'vue-router'


const router = useRouter()
defineProps(['isOpen'])

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
</script>

