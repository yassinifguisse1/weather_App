import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './forecast.css'
import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({data})=>{
    const dateInAWeek = new Date().getDay();
    const rotatedDays = WEEK_DAYS.slice(dateInAWeek).concat(WEEK_DAYS.slice(0, dateInAWeek))

    return (
        <motion.div initial={{ scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{type: "spring",stiffness: 260,damping: 20}}>
            <Accordion allowZeroExpanded >
            <h2>Daily</h2>
            {data.list.splice(0, 7).map((forecastData , index)=>{  
                return(
                    <>
                        <AccordionItem key={index}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="forecast_1">
                                        <div className='icon_day'>
                                            <img src={`public/icons/${forecastData.weather[0].icon}.png`} alt="Weather-icon" className='weatherIcon'/>
                                            <span className='days'>{rotatedDays[index]}</span>
                                        </div>
                                        <div className='weather-forecast'>
                                            <span className='weather_desc'>{forecastData.weather[0].description}</span>
                                            <span className='temp-max-min'>{(forecastData.main.temp_max - 273.15).toFixed(0)}°C / {(forecastData.main.temp_min - 273.15).toFixed(0)}°C</span>
                                        </div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                             <div className='forecast_details'>
                                <div className='details_part_1'>
                                    <div className='temper'>
                                        <label>Pressure:</label>
                                        <span>{forecastData.main.pressure} hPa</span>
                                    </div>

                                    <div className='Clouds'>
                                        <label >Clouds:</label>
                                        <span>{forecastData.clouds.all}%</span>
                                    </div>

                                    <div className='sea_level'>
                                        <label>Sea level:</label>
                                        <span>{forecastData.main.sea_level} m</span>
                                    </div>

                                </div>

                                <div className='details_part_1'>
                                       <div className='humidi'>
                                            <label>Humidity:</label>
                                            <span>{forecastData.main.humidity}%</span>
                                        </div>
    
                                        <div className='wind'>
                                            <label >Wind speed:</label>
                                            <span>{forecastData.wind.speed} m/s</span>
                                        </div>
    
                                        <div className='visibility'>
                                            <label>Feels Like:</label>
                                            <span>{(forecastData.main.feels_like - 273.15).toFixed(0)}°C</span>
                                        </div>
    
                                    </div>
                             </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </>
                    

                )
            })}
            
            </Accordion>
        </motion.div>
        
    );
}
Forecast.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Forecast; 