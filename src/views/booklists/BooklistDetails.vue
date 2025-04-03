<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="document" class="booklist-details">
    <div class="booklist-info">
      <div class="book-cover">
        <img .src="document.coverUrl" alt="" />
      </div>
      <h2>{{ document.title }}</h2>
      <p class="username">Created by {{ booklist.userName }}</p>
      <p class="description">{{ document.description }}</p>
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument'

export default {
  props: ['id'],
  setup(props) {
    const { error, document } = getDocument('booklist', props.id)
    console.log(document)
    return { error, document }
  },
}
</script>

<style></style>
