import './App.css'
import Search from './components/Search'
import CurrentWeather from './components/Current_Weather'
import {WEATHER_API_URL , WEATHER_API_KEY} from './Api'
import { useState } from 'react'
import Forecast from './components/forecast'

function App() {
  
  const [currentWeather , setcurrentWeather] = useState(null)
  const [forecast , setForecast] = useState(null)

  const handleOnSearch = (searchData)=>{
    const [lat , lon]= searchData.value.split(' ');
    const currentWeatherFetch= fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
    const forecastFetch= fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
    
    Promise.all([currentWeatherFetch , forecastFetch])
    .then(async (Response)=>{
      const  weatherResponse = await Response[0].json();
      const  forecastResponse = await Response[1].json();

      setcurrentWeather({city : searchData.label , ...weatherResponse});
      setForecast({city : searchData.label , ...forecastResponse})

    })
    .catch((err) =>console.error(err))
  }
  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearch}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast  data={forecast} />}
    </div>
  )
}

export default App
