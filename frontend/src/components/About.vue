<template>
  <div
    id="about"
    class="min-h-screen scroll-mt-20 bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-12 mb-20">
        <!-- Image Section -->
        <div class="lg:w-1/2">
          <div class="relative rounded-2xl overflow-hidden h-96 shadow-xl">
            <img
              :src="product6"
              alt="Luxury Perfumes"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"
            ></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h3 class="text-2xl font-bold">{{ aboutData?.hero.year }}</h3>
              <p class="mt-2">{{ aboutData?.hero.tagline }}</p>
            </div>
          </div>
        </div>
        <!-- Text Content -->
        <div class="lg:w-1/2 flex flex-col justify-center">
          <h2 class="text-4xl font-bold text-amber-900 mb-6">
            {{ aboutData?.content.title }}
          </h2>
          <p class="text-lg text-gray-600 mb-4">
            {{ aboutData?.content.description }}
          </p>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div
              v-for="(stat, index) in aboutData?.stats"
              :key="index"
              class="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <h4 class="font-semibold text-pink-600">{{ stat.value }}</h4>
              <p class="text-gray-600">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import product6 from "../assets/product 6.png";

const aboutData = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/aboutData`
    );
    aboutData.value = response.data[0];
  } catch (error) {
    console.error("Failed to load about data:", error);
  }
});
</script>
