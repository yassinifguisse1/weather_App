import './Current_Weather.css'
import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const CurrentWeather = ({data})=> {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ rotate: 360, scale: 1 }} transition={{type: "spring",stiffness: 260,damping: 20}} className='weather'>
        <div className='top'>
            <div >
                <p className='city'>{data.city}</p>
                <p className='weather-description'>{data.weather[0].description}</p>
            </div>    
            
            <img src= {`public/icons/${data.weather[0].icon}.png`} alt="weather" className='weather-icon'/>    
        
        </div>
        <div className='bottom'>
            <p className='temperature'>{(data.main.temp - 273.15).toFixed(0)}°C</p>
            <div className='details'>
                <div className='parameter-row'>
                    <span className='parameter-label detail_text'>Details</span>
                </div>

                <div className='parameter-row'>
                    <span className='parameter-label'>Feels_Like</span>
                    <span className='parameter-value'>{(data.main.feels_like - 273.15).toFixed(0)}°C</span>
                </div>

                <div className='parameter-row'>
                    <span className='parameter-label'>Wind </span>
                    <span className='parameter-value'>{data.wind.speed}m/s</span>
                </div>

                <div className='parameter-row'>
                    <span className='parameter-label'>Humidity </span>
                    <span className='parameter-value'>{data.main.humidity}%</span>
                </div>

                <div className='parameter-row'>
                    <span className='parameter-label'>Pressure </span>
                    <span className='parameter-value'>{data.main.pressure} hPa</span>
                </div>

            </div>

        </div>

    </motion.div>
  )
}
CurrentWeather.propTypes = {
    data: PropTypes.object.isRequired,
};
export default CurrentWeather;