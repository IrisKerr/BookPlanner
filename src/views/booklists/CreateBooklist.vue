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
    <div class="error">{{ fileError }}</div>
    <button type="submit" v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { serverTimestamp } from 'firebase/firestore'

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDocument } = useCollection('booklists')
    const { user } = getUser()

    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    // allow file types
    const types = ['image/png', 'image/jpeg']

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
        console.log(
          'Image uploaded ! URL:',
          url.value,
          'FilePath:',
          filePath.value
        )
        const bookListData = {
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          books: [],
          createdAt: serverTimestamp(),
        }
        console.log(bookListData)
        if (filePath.value) {
          bookListData.filePath = filePath.value
        } else {
          console.log('filePath is undefined after image upload!')
          return
        }
        await addDocument(bookListData)
        isPending.value = false
        if (!error.value) {
          console.log('booklist added')
        } else {
          console.log('Firebase error:', error.value)
        }
      }
    }

    const handleChange = (e) => {
      const selectedFile = e.target.files[0]
      selectedFile && types.includes(selectedFile.type)
        ? ((file.value = selectedFile), (fileError.value = null))
        : ((file.value = null),
          (fileError.value = 'Please select an image file'))
    }
    return {
      title,
      description,
      file,
      url,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
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
