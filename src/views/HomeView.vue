<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :booklists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../components/ListView.vue'
import { watch } from 'vue'

export default {
  name: 'HomeView',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('booklists')
    watch(documents, (newDocs) => {
      console.log('Fetched documents:', newDocs)
    })
    return { error, documents }
  },
}
</script>
