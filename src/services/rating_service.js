import Api from './api'

// relacionado a ratings_controller da API
const RatingService = {
  create: (store, rating) => Api.post('/ratings', { store: store, rating: rating} ),
}

export default RatingService