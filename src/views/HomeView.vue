<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents && documents.length">
      <ListView :booklists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../components/ListView.vue'
import { watchEffect } from 'vue'

export default {
  name: 'HomeView',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('booklists')
    watchEffect(() => {
      console.log('Updated documents:', documents.value)
    })
    return { error, documents }
  },
}
</script>
