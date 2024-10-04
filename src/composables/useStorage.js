import { ref as vueRef } from 'vue'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { projectStorage } from '@/firebase/config'
import getUser from './getUser'

const useStorage = () => {
  const error = vueRef(null)
  const url = vueRef(null)
  const filePath = vueRef(null)

  const { user } = getUser()

  const uploadImage = async (file) => {
    try {
      if (!user.value) {
        throw new Error('User is not connected')
      }
      filePath.value = `covers/${user.value.uid}/${file.name}`
      const storageReference = ref(projectStorage, filePath.value)
      await uploadBytes(storageReference, file)
      url.value = await getDownloadURL(storageReference)
      console.log('File uploaded, URL:', url.value)
    } catch (err) {
      error.value = err.message
      console.log('Error while uploading:', error.value)
    }
  }

  return { error, url, uploadImage }
}

export default useStorage
