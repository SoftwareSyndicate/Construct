import Firebase from 'firebase'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDSdshXu8tQGDlcUD3IGwKO7pH8mYn7KYI",
  authDomain: "juke-13562.firebaseapp.com",
  databaseURL: 'https://juke-13562.firebaseio.com/',
  storageBucket: "gs://juke-13562.appspot.com/"
}
// const version = '/v0'

Firebase.initializeApp(config)

const ref = Firebase.database().ref()
const storage = Firebase.storage().ref()

console.log('ref', ref)

export function addItem(type, data){
  return new Promise((resolve, reject) => {
    let key = ref.child(type).push().key

    let now = new Date()
    data.created_at = now
    data.updated_at = now
    data.id = key

    var updates = {}
    updates[`${type}/${key}`] = data
    ref.update(updates).then(results => {
      resolve(data)
    }, error => {
      reject(error)
    })
  })
}

export function updateItem(key, type, data){
  // console.log("data: ", data)
  // console.log("args: ", arguments)
  data.updated_at = new Date()

  var updates = {}
  updates[`${type}/${key}`] = data
  return ref.update(updates)
}

export function updatePath(path, data){
  var updates = {}
  updates[`${path}`] = data
  return update(updates)
}

export function update(updates){
  return ref.update(updates)
}

export function watch(type, handler) {
  let first = true
  let child = ref.child(type)
  let cb = child.on('value', handler)
  return () => {
    child.off('value', cb)
  }
}

export function uploadFile(file){
  return storage.child('images/' + file.name).put(file).then(results => {
    return results
  }, error => {
    return error
  })
}
