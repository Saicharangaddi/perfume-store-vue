<template>
  <footer class="bg-gray-900 text-gray-300 py-8 mt-10">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Company Info -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">About Us</h3>
        <p class="text-sm">
          We provide high-quality products with a focus on customer
          satisfaction. Shop with confidence and enjoy a seamless experience.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <router-link to="/" class="hover:text-white">Home</router-link>
          </li>
          <li>
            <router-link to="/products" class="hover:text-white"
              >Products</router-link
            >
          </li>
          <li>
            <router-link to="/categories" class="hover:text-white"
              >Categories</router-link
            >
          </li>
          <li>
            <router-link to="/about" class="hover:text-white"
              >About Us</router-link
            >
          </li>
          <li>
            <router-link to="/contact" class="hover:text-white"
              >Contact</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Contact Us</h3>
        <ul class="space-y-2 text-sm">
          <li>
            Email:
            <a href="mailto:support@example.com" class="hover:text-white"
              >support@perfume.com</a
            >
          </li>
          <li>
            Phone:
            <a href="tel:+441234567890" class="hover:text-white"
              >+44 (234) 567-8900</a
            >
          </li>
          <li>Address: Hounslow, London, UK</li>
        </ul>
        <div class="flex space-x-4 mt-4">
          <a href="#" class="hover:text-white"
            ><i class="fab fa-facebook"></i
          ></a>
          <a href="#" class="hover:text-white"
            ><i class="fab fa-twitter"></i
          ></a>
          <a href="#" class="hover:text-white"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      class="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400"
    >
      © {{ new Date().getFullYear() }} Perfume Store. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
// No script needed unless you want dynamic links
</script>
