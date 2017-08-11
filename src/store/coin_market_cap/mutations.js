import { set } from 'vue'
import * as types from './mutation-types'

export default {
  [types.RECEIVE_STATIONS] (state, {stations}) {
    state.stations = stations
  },
  [types.ADD_STATION] (state, {station}) {
    state.stations.push(station)
  },
  [types.SET_STATION_FILTER] (state, {filter}) {
    state.stationFilters = filter
  },
}
