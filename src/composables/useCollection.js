import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const colRef = collection(projectFirestore, collectionName)
      console.log('firebase sent data ', doc)
      const res = await addDoc(colRef, doc)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, addDocument, isPending }
}

export default useCollection
