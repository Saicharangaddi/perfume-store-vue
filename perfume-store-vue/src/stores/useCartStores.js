import { defineStore } from 'pinia'
import { ref, computed} from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const addToCart = (product) => {
    items.value.push(product)
  }

  const cartCount = computed(() => items.value.length)

  return { items, addToCart, cartCount }
})
