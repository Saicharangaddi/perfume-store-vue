import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);
    const auth = useAuthStore();

    const cartCount = computed(() => items.value.length);

    const addToCart = (product) => {
      items.value.push(product);
      syncCartToBackend();
    };

    const removeItem = (index) => {
      if (index >= 0 && index < items.value.length) {
        items.value.splice(index, 1);
        syncCartToBackend();
      }
    };

    const clearCart = () => {
      items.value = [];
      syncCartToBackend();
    };

    async function syncCartToBackend() {
      if (!auth.token) return;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/cart`,
          {
            items: items.value,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
      } catch (error) {
        console.error("Cart sync failed:", error);
      }
    }

    async function fetchCartFromBackend() {
      if (!auth.token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        items.value = response.data?.items || [];
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }

    // Optional: auto-fetch cart when user logs in
    watch(
      () => auth.token,
      (newToken) => {
        if (newToken) fetchCartFromBackend();
      }
    );

    return {
      items,
      cartCount,
      addToCart,
      removeItem,
      clearCart,
      syncCartToBackend,
      fetchCartFromBackend,
    };
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
