import * as api from './api'
import * as types from './mutation-types'

export const watchStations =  ({ commit }) => {
  api.watch("stations", snap => {
    let stations = snap.val()
    console.log(stations)
    if(stations){
      stations = Object.keys(stations).reduce((_stations, _id)=>{
        return _stations.concat([Object.assign({_id},stations[_id])])
      },[])
      commit(types.RECEIVE_STATIONS, {stations})
    }
  })
}


export const saveStation =  ({commit, state}) => {
  // Save product state in case API Request Fails
  // const saved_station = state.product
  // commit("APPLY_PRODUCT_UPDATES", state.productCopy)
  // let product = state.product
  // if(!product.id){
  //   return api.addItem('products', product).then(results => {
  //     // commit(types.ADD_PRODUCT, results)
  //   })
  // } else {
  //   return api.updateItem(product.id, 'products', product).then(results =>{
  //     commit("PRODUCT_UPDATE_SUCCESS")
  //   }, error => {
  //     commit("PRODUCT_UPDATE_FAIL", saved_product)
  //   })
  // }
}

export const updateStationFilter = ({ commit }, filter) => {
  commit(types.SET_STATION_FILTER, {filter})
}


export const uploadFile = ({ commit }, {file}) => {
  return api.uploadFile(file).then(results =>{
    return results
  }, error => {
    return error
  })
}
