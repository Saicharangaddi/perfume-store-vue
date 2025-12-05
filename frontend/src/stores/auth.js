import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useCartStore } from "./useCartStores";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const token = ref(null);
    const cart = useCartStore();

    const isAuthenticated = computed(() => !!token.value);

    async function login(email, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            email,
            password,
          }
        );

        token.value = response.data.token;
        user.value = response.data.user;

        // Set token for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.value}`;

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error };
      }
    }

    async function register(name, email, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            name,
            email,
            password,
          }
        );

        token.value = response.data.token;
        user.value = response.data.user;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.value}`;

        return { success: true };
      } catch (error) {
        console.error("Registration failed:", error);
        return { success: false, error };
      }
    }

    function logout() {
      token.value = null;
      user.value = null;
      delete axios.defaults.headers.common["Authorization"];
      cart.clearCart();
    }

    function restoreSession() {
      const savedToken = localStorage.getItem("auth.token");
      const savedUser = localStorage.getItem("auth.user");

      if (savedToken && savedUser) {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      }
    }

    return {
      user,
      token,
      isAuthenticated,
      login,
      register,
      logout,
      restoreSession,
    };
  },
  {
    persist: {
      strategies: [
        {
          key: "auth",
          storage: localStorage,
        },
      ],
    },
  }
);
