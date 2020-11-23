// useState - serve para setar um estado local de forma facil
// useEffect - usar scripts para atualizar propriedades
import { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import Establishment from './components/Establishment'
import NearstCoffees from './components/NearstCoffees'

import EstablishmentService from './services/establishment_service'

function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState({});

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  const center = {
    lat: latitude,
    lng: longitude
  }
  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  
  useEffect(() => {
    setCurrentLocation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
 
  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      loadCoffeeShops();
    }, function(error) {
      alert("Habilite a localização para usar esse APP")
    })
  }

  async function loadCoffeeShops() {
    const response = await EstablishmentService.index(latitude, longitude)
    setLocations(response.data.results)
  }

  return (
    // Fragment é server para unificar os elementos, para nao ser renderizada no browser
    // LoadScript é um componente importando da google-maps/api
    <Fragment>
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {
            locations.map((item, index) => {
              return (
                <Marker
                  key={index}
                  icon="/images/coffee-pin.png"
                  title={item.name}
                  animation="4" 
                  position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Establishment place={selected} />
            )
          }
          <Marker
            icon='/images/my-location-pin.png'
            position={center}
          />
          {
            (latitude !== 0 && longitude !== 0) &&
              <NearstCoffees latitude={latitude} longitude={longitude} />
          }
        </GoogleMap>
      </LoadScript>
  </Fragment>
);
}

export default App;
