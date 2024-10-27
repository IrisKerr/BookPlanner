import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/SignUp.vue'
import CreateBooklist from '../views/booklists/CreateBooklist.vue'
import BooklistDetails from '@/views/booklists/BooklistDetails.vue'

// route guard
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/booklist/create',
    name: 'CreateBooklist',
    component: CreateBooklist,
    beforeEnter: requireAuth,
  },
  {
    path: '/booklists/:id',
    name: 'BooklistDetails',
    component: BooklistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
