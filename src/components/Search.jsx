import { useState } from 'react'
import{AsyncPaginate} from 'react-select-async-paginate'
import {GEO_API_URL , geoApiOptions} from '../Api'
import PropTypes from 'prop-types';

const Search = ({onSearchChange})=>{
    const [search , setSearch] = useState(null)

const loadOptions = (inputValue)=>{
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map(city => ({
                    value: `${city.latitude} ${city.longitude}`, 
                    label: `${city.name}: ${city.countryCode}`,
                  }))
            }
        })
        .catch(error => {
            console.error('Error loading options:', error);
            return { options: [] }; // Return empty array in case of error
        });   
        
};
const handleChange = (searchData)=>{
    setSearch(searchData)
    onSearchChange(searchData)
}

    return (
        <AsyncPaginate
        placeholder='Search For city...'
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
        />
    )
}
Search.propTypes={
    onSearchChange: PropTypes.func.isRequired
}
export default Search