<template>
  <div
    class="min-h-screen flex items-center justify-center bg-white text-[text-size-adjust:100%]"
  >
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">
        Welcome to Perfume Paradise
      </h1>

      <form @submit.prevent aria-label="Authentication Form">
        <template v-if="!auth.isAuthenticated">
          <!--  Top Section: Inputs -->
          <div v-if="mode === 'register'" class="text-left mb-4">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              @input="touched.username = true"
              type="text"
              placeholder="Enter your username"
              class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              :class="{ 'border-red-500': errors.username }"
            />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">
              {{ errors.username }}
            </p>
          </div>

          <div class="text-left mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              @input="touched.email = true"
              type="email"
              placeholder="Enter your email"
              class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="text-left mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              @input="touched.password = true"
              type="password"
              placeholder="Enter your password"
              class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <!-- 🔄 Middle Section: Action Button -->
          <button
            type="button"
            @click="mode === 'login' ? handleLogin() : handleRegister()"
            class="bg-[#8B4513] text-white px-6 py-2 rounded hover:bg-[#A0522D] w-full mb-6"
          >
            {{ mode === "login" ? "Login" : "Register" }}
          </button>

          <!-- 🔻 Bottom Section: Mode Toggle -->
          <div class="flex justify-center">
            <button
              type="button"
              @click="mode = 'login'"
              :class="[
                'px-4 py-2 rounded-l w-1/2',
                mode === 'login'
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-gray-200 text-gray-700',
              ]"
            >
              Login
            </button>
            <button
              type="button"
              @click="mode = 'register'"
              :class="[
                'px-4 py-2 rounded-r w-1/2',
                mode === 'register'
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-gray-200 text-gray-700',
              ]"
            >
              Register
            </button>
          </div>

          <!-- 🔔 General Error -->
          <p v-if="errors.general" class="text-red-500 text-sm mt-4">
            {{ errors.general }}
          </p>
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
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/useCartStores";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthValidation } from "../composables/useAuthValidation";

const auth = useAuthStore();
const cart = useCartStore();
const router = useRouter();

// Form fields
const username = ref("");
const email = ref("");
const password = ref("");
const mode = ref("login");

// Validation composable
const {
  errors,
  touched,
  validateUsername,
  validateEmail,
  validatePassword,
  clearErrors,
} = useAuthValidation();

// Real-time validation
watch(username, (val) => {
  if (touched.username) errors.username = validateUsername(val);
});
watch(email, (val) => {
  if (touched.email) errors.email = validateEmail(val);
});
watch(password, (val) => {
  if (touched.password) errors.password = validatePassword(val);
});

// Submit: Login
async function handleLogin() {
  clearErrors();

  let valid = true;
  errors.email = validateEmail(email.value);
  errors.password = validatePassword(password.value);
  if (errors.email || errors.password) valid = false;
  if (!valid) return;

  const result = await auth.login(email.value, password.value);
  if (result.success) {
    toast.success("Login successful!");
    setTimeout(() => router.push("/home"), 1000);
    email.value = "";
    password.value = "";
  } else {
    const msg = result.error?.message || "Login failed. Please try again.";
    errors.general = msg;
    toast.error(msg);
  }
}

// Submit: Register
async function handleRegister() {
  clearErrors();

  let valid = true;
  errors.username = validateUsername(username.value);
  errors.email = validateEmail(email.value);
  errors.password = validatePassword(password.value);
  if (errors.username || errors.email || errors.password) valid = false;
  if (!valid) return;

  const result = await auth.register(
    username.value,
    email.value,
    password.value
  );
  if (result.success) {
    toast.success("Registration successful!");
    setTimeout(() => router.push("/home"), 3000);
    username.value = "";
    email.value = "";
    password.value = "";
  } else {
    if (result.error?.message === "User already exists") {
      errors.email = "This email is already registered. Please log in instead.";
      toast.error(errors.email);
    } else {
      const msg =
        result.error?.message || "Registration failed. Please try again.";
      errors.general = msg;
      toast.error(msg);
    }
  }
}

// Navigation
function goToApp() {
  router.push("/home");
}

// Logout
function handleLogout() {
  auth.logout();
  cart.clearCart();
}
</script>
