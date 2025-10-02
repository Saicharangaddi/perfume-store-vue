<template>
  <div>
    <Header />
    <Hero />
    <router-view />
    <Products />
    <Categories />
    <Offers />
    <About />
    <Contact />
    
  </div>
  </template>

  <script setup>
  import Header from './components/Header.vue';
  import Hero from './components/Hero.vue';
  import Products from './components/Products.vue';
  import Categories from './components/Categories.vue';
  import Offers from './components/Offers.vue';
  import About from './components/About.vue';
  import Contact from './components/Contact.vue';
  </script>

