import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomeView.vue'
import store from '@/store'
const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  let token = store.getters.getToken
  if(token && to.name != 'Login' && to.path != '/'){
    return '/login'
  }
  if (to.name === 'Login' && token) {
    return {name: 'Home'}
  } else
  if (token && (to.name === 'Home') && (to.path !== '/')) {
    return '/'
  }
  if (!token && (to.name === 'Home') && (to.path === '/')) {
    return '/login'
  }
})

export default router
