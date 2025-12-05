import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../src/Home.vue"),
  },
  {
    path: "/",
    name: "Welcome",
    component: () => import("../src/components/Welcome.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../src/components/Products.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../src/components/Categories.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../src/components/About.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../src/components/Contact.vue"),
  },
  {
    path: "/offers",
    name: "Offers",
    component: () => import("../src/components/Offers.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../src/components/Checkout.vue"),
    meta: { requiresAuth: true }, // protect this route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global auth guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/"); // redirect to Welcome or Login
  } else {
    next();
  }
});

export default router;
