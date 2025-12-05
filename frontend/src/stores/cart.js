import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);

    const addToCart = (product) => {
      items.value.push(product);
    };

    const clearCart = () => {
      items.value = [];
    };

    const cartCount = computed(() => items.value.length);

    return { items, addToCart, clearCart, cartCount };
  },
  {
    persist: {
      key: () => {
        const auth = useAuthStore();
        return auth.user?.email ? `cart-${auth.user.email}` : "cart-guest";
      },
      paths: ["items"],
    },
  }
);
