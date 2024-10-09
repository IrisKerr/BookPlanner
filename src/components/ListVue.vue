<template>
  <div v-for="booklist in booklists" :key="booklist.id">
    <div class="single">
      <div class="thumbnail">
        <img :src="booklist.coverUrl" />
      </div>
      <div class="info">
        <h3>{{ booklist.title }}</h3>
        <p>created by {{ booklist.userName }}</p>
      </div>
      <div class="booklist-number">
        <p>{{ booklist.book.length }} books</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['booklists'],
}
</script>

<style></style>
