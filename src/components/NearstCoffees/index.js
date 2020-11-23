import React, { useEffect, useState } from 'react'
import StoreService from '../../services/store_service'
import * as Css  from './style'
import ReactStars from "react-rating-stars-component"

const NearstCoffees = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearstStores()
  }, [props.latitude]) // eslint-disable-line react-hooks/exhaustive-deps

  async function loadNearstStores() {
    const response = await StoreService.index(props.latitude, props.longitude)
    setStores(response.data)
  }

  return (
    <Css.RightBar>
      <Css.Head>
        <h3>Find My Coffee</h3>
      </Css.Head>

      <Css.Body>
        <strong>Mais amados na região</strong>
        <hr />
        {
          stores.map(store => {
            return (
              <Css.EstablishmentItem key={store.name}>
                <Css.Title>{store.name}</Css.Title>

                <Css.Paragraph>
                  {store.address}
                </Css.Paragraph>

                { store.ratings_count || 0 } Opiniões
                <ReactStars edit={false} value={store.ratings_average || 0} />
                <hr/>
              </Css.EstablishmentItem>
            )
          })
        }
      </Css.Body>

      <Css.Footer>
        <h2>OneBitCode.com</h2>
        <Css.Paragraph>
          Projeto Open Source desenvolvido na Semana Super Full
          Stack da escola online de programação
        </Css.Paragraph>
      </Css.Footer>
    </Css.RightBar>
  )
}

export default NearstCoffees