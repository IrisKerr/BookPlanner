<template>
  <form action="">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button>Log in</button>
  </form>
</template>

<script>
export default {
  name: 'LoginView',
}
</script>

<style></style>
