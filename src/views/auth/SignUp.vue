<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button v-if="!isPending">Sign up</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'

export default {
  setup() {
    const { error, signup, isPending } = useSignup()
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    return { email, password, displayName }
  },
}
</script>

<style></style>
