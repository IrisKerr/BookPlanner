<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/books.svg" alt="logo" />
      <h1>
        <router-link :to="{ name: 'Home' }"> Book planner </router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreateBooklist' }"
            >Create Booklist</router-link
          >
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const { user } = getUser()
    const { logout } = useLogout()
    const router = useRouter()
    console.log('User state:', user)

    const handleClick = async () => {
      await logout()
      console.log('user logged out')
      router.push({ name: 'Login' })
    }

    return { handleClick, user }
  },
}
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>
