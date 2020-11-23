import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import RatingService from '../../../../services/rating_service'
import * as Css  from '../../style'

const Form = (props) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState(1)

  async function handleSubmit(e) {
    // o ato normal é da um reload, e com o prevent ele nao da um reload
    e.preventDefault()

    const store_params = {
      latitude: props.place.geometry.location.lat,
      longitude: props.place.geometry.location.lng,
      name: props.place.name,
      address: props.place.formatted_address,
      google_place_id: props.place.place_id
    }

    const rating_params = {
      value: (value == null) ? 1 : value,
      opinion: message,
      user_name: name
    }

    await RatingService.create(store_params, rating_params)
    
    props.loadStore()

    setName('')
    setMessage('')
  }


  return (
    <Css.NewRating>
      <h4>Deixe sua Opinião</h4>

      <form onSubmit={handleSubmit}>
        <Css.Input name="name"
          type="text"
          placeholder="Seu primeiro nome"
          onChange={(e) => setName(e.target.value)}
          value={name} />

        <Css.TextArea name="message"
          className="textarea"
          placeholder="Sua opinião"
          onChange={(e) => setMessage(e.target.value)}
          value={message}></Css.TextArea>

        <div>
          <ReactStars count={5} size={24} activeColor="#ffd700"
            value={value}
            onChange={(e) => setValue(e)} />

          <Css.Button type="submit" className="button is-danger">Enviar</Css.Button>
        </div>
      </form>
    </Css.NewRating>
  )
}

export default Form