import Api from './api'

// relacionado a google_stores_controller da API
const EstablishmentService = {
  index: (latitude, longitude) => Api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`),
  show: (place_id) => Api.get(`/google_stores/${place_id}`)
}

export default EstablishmentService