import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
  const document = ref(null)
  const error = ref(null)

  const documentRef = doc(projectFirestore, collectionName, id)

  const unsub = onSnapshot(
    documentRef,
    (snapshot) => {
      if (snapshot.exists()) {
        document.value = { ...snapshot.data(), id: snapshot.id }
        error.value = null
      } else {
        error.value = 'Document does not exist'
      }
    },
    (err) => {
      console.error(err.message)
      error.value = 'Could not fetch the document'
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { error, document }
}

export default getDocument
