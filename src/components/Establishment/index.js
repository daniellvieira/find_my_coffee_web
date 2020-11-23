import React, { useState, useEffect } from 'react'
import EstablishmentService from '../../services/establishment_service'
import * as Css  from './style'
import Ratings from './Ratings'

const Establishment = (props) => {
  const [establishment, setEstablishment] = useState([])
  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  const baseUrlPhotoPlaces = "https://maps.googleapis.com/maps/api/place/photo"
  const paramsUrlPhotoPlaces = `key=${REACT_APP_GOOGLE_API_KEY}&maxwidth=400`

  useEffect(() => {
    getEstablishmentInformations()
  }, [props.place]) // eslint-disable-line react-hooks/exhaustive-deps

  async function getEstablishmentInformations() {
    try {
      const response = await EstablishmentService.show(props.place.place_id)
      setEstablishment(response.data.result)

    } catch (error) {
      setEstablishment([])
    }
  }

  return(
    <Css.LeftBar>
      {
        (establishment.photos) ? 
          <Css.Image
            src={`${baseUrlPhotoPlaces}?photoreference=${establishment.photos[0].photo_reference}&${paramsUrlPhotoPlaces}`}
            alt="Coffee Photo"
        />
        : <Css.Image src="/images/no_photo.jpg" alt="Coffee no Photo"/>
      }
      <Css.Title>{establishment.name}</Css.Title>
      {
        (establishment.opening_hours) ? 
          <div>
            { 
              (establishment.opening_hours.open_now === true) ? 'Aberto' : 'Fechado'
            }
            <hr />
            {
              establishment.opening_hours.weekday_text.map((schedule, index) => {
                return (<Css.Paragraph key={index}>{schedule}</Css.Paragraph>)
              })
            }
          </div>
        : <Css.Paragraph>"Não há cadastro de dias e horários abertos"</Css.Paragraph>
      }
      <hr/>
      <Css.Paragraph>{establishment.formatted_address}</Css.Paragraph>
      <Ratings place={props.place} />
    </Css.LeftBar>
  )
}

export default Establishment