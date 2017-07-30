
// Stations
export const currentStation = (state, getters, rootState) => {
  if(rootState.route.params && rootState.route.params.id != 'new'){
    let station = state.stations.find((station)=>{
      return station.id === rootState.route.params.id
    })

    if(station){
      return station
    } else {
      return {}
    }
  } else {
    return {}
  }
}

export const stations = state => state.stations
export const stationFilters = state => state.stationilters

export const filteredStations = state => {
  return state.stations.filter(function (station) {
    console.log(station)
    return station.name.toLowerCase().indexOf(state.stationFilters.name.toLowerCase()) !== -1
  })

  // TODO actually filter
  //return state.boxes;
}
