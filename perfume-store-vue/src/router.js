import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/products',
    name: 'Products',
    component: () => import('../src/components/Products.vue')
  },
  {
    path: '/offers',
    name: 'Offers',
    component: () => import('../src/components/Offers.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
