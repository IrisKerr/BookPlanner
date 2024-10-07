<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">{{ doc.title }}</div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import { watch } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const { error, documents } = getCollection('booklists')
    watch(documents, (newDocs) => {
      console.log('Fetched documents:', newDocs)
    })
    return { error, documents }
  },
}
</script>
