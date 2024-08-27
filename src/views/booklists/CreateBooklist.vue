<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Booklist</h4>
    <input type="text" required placeholder="Booklist Title" v-model="title" />
    <textarea
      required
      placeholder="Booklist Description..."
      v-model="description"
    ></textarea>
    <!-- Upload booklist image -->
    <label>Upload Booklist cover image</label>
    <input type="file" @change="handleChange" />
    <button>Create</button>
    <div class="error"></div>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)

    // allow file types
    const types = ['image/png', 'image/jpeg']

    const handleSubmit = () => {
      console.log(title.value, description.value)
    }

    const handleChange = (e) => {
      const selectedFile = e.target.files[0]
      selectedFile && types.includes(selectedFile.type)
        ? (file.value = selectedFile)
        : (file.value = null)
    }
    return {
      title,
      description,
      handleSubmit,
      handleChange,
    }
  },
}
</script>

<style>
form {
  background: white;
}
input[type='file'] {
  padding: 5px;
}
label {
  font-size: 18px;
  display: block;
  margin-top: 30px;
  padding-left: 5px;
}
button {
  margin-top: 20px;
}
</style>
