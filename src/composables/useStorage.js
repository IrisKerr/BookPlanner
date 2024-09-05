import { projectStorage } from '@/firebase/config'
import { ref } from 'firebase/storage'
import getUser from './getUser'

const user = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (error) {
      error.value = error.message
    }
  }

  return { error, filePath, url, uploadImage }
}

export default useStorage
