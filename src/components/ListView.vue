<template>
  <div v-for="booklist in booklists" :key="booklist.id">
    <router-link :to="{ name: 'BooklistDetails', params: { id: booklist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="booklist.coverUrl" />
        </div>
        <div class="info">
          <h3>{{ booklist.title }}</h3>
          <p>created by {{ booklist.userName }}</p>
        </div>
        <div class="booklist-number">
          <p>
            {{
              booklist.books && Array.isArray(booklist.books)
                ? booklist.books.length
                : 0
            }}
            books
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['booklists'],
}
</script>

<style>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.booklist-number {
  margin-left: auto;
}
</style>
