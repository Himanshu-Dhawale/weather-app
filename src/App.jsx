import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import {AiOutlineArrowLeft} from "react-icons/ai";
import { WiThermometerExterior, WiHumidity } from 'react-icons/wi';


function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
 const getWeather = async () => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e2511b56fe20cd50bdc8be64460c656`);
    console.log(response);
    setWeatherData(response.data) 
  }

  const weatherDataExists = !!weatherData;
const resetHandler = () => {
  setWeatherData(null);
  setCity("");
}
  return (
    <div className="App">
      <div className="container">
        <div className="title-wrapper">
        {weatherData!== null && <AiOutlineArrowLeft className='arrow-icon' onClick={resetHandler} color="#1976d2"/> }
        <h2 className='title'> weather app</h2>

        </div>
        {weatherDataExists ? (
          <div className='weather-table'>
            <img src={`https:openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='icon'/>
            <h1>{ Math.round(weatherData.main.temp - 273.15)} &#8451;</h1>
              <p>{weatherData.weather[0].main}</p>
              <p>{weatherData.name}</p>
           <div className='weather-content'>
              <p><small>
               Feels Like:</small>{weatherData.main.feels_like}</p>
              <p><small>
               Humidity:</small>{weatherData.main.humidity}</p>
           </div>
            
          </div>
        ) : (
          <div className='weather-table'>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <button onClick={getWeather}>Get Weather</button>
          </div>
        )}
      </div>      
    </div>
  )
}

export default App
