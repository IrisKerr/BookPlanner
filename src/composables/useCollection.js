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
      await addDoc(colRef, doc)
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  return { error, addDocument, isPending }
}

export default useCollection
