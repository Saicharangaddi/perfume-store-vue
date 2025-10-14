import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
  path: '/home',
  name: 'Home',
  component: () => import('../src/Home.vue')
 },
  {
  path: '/',
  name: 'Welcome',
  component: () => import('../src/components/Welcome.vue')
 },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../src/components/Products.vue')
  },
  {
    path: '/offers',
    name: 'Offers',
    component: () => import('../src/components/Offers.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../src/components/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
