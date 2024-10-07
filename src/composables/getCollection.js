import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'

const getCollection = (collectionName) => {
  const documents = ref([])
  const error = ref(null)

  // register the firestore collection reference
  const colRef = collection(projectFirestore, collectionName)
  const q = query(colRef, orderBy('createdAt'))

  const unsub = onSnapshot(
    q,
    (snap) => {
      let results = []
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })

      // update values
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = []
      error.value = 'could not fetch the data'
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection
