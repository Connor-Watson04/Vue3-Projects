import { createRouter, createWebHistory } from 'vue-router'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import SignInView from '@/views/SignInView.vue'
import HomeView from '../views/HomeView.vue'
import ProductListingView from '@/views/ProductListingView.vue'
import AccountView from '@/views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductListingView
    },
    {
      path: '/Sign-in',
      name: 'Sign-In',
      component: SignInView
    },
    {
      path: '/Account',
      name: 'Account',
      component: AccountView
    },
    {
      path: '/product/:URL', // Dynamic segment for product link
      name: 'Product details',
      component: ProductDetailsView,
      props: true // Pass the route params as props
    }
  ]
})

export default router
