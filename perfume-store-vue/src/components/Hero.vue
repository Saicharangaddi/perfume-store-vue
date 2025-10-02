<template>
    <section id="home" bg-amber-50 scroll-mt-20 py-16>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
            <!--Left Content-->
        <div class="text-center lg:text-left max-w-xl">
            <h1 class="text-4xl sm:text-5xl font-bold text-amber-950 leading-tight mb-4">
                Discover the Best Deals on Top Products
            </h1>
            <p class="text-gray-700 text-base sm:text-lg mb-6">
                Exclusive discounts and special offers on everything you love.Shop now and be the first to grab the
                latest trends
            </p>
           <router-link to="/products"
           class="px-6 py-3 bg-pink-900 text-white text-sm font-semibold rounded-lg shadow 
           hover:bg-pink-600 transition">Shop Now
           </router-link>
           <router-link to="/offers"
           class="px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-lg shadow 
           hover:bg-pink-200 transition">View Offers
           </router-link>
        </div>

        <!--Right Image-->
          <div class="w-full lg:w-1/2 flex justify-center">
            <img src="../assets/first.png" alt="Hero Product" class="h-90 w-3/4  mt-8  lg:w-full max-w-md 
            mx-auto rounded-xl shadow-lg">
          </div>
        </div>
    </section>
</template>