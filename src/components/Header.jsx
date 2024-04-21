import { useState } from 'react'
import '../assets/css/header.css'
import { Switch } from 'antd'
const Header = ({ getLocationKey, getWeatherData, locationList, getCurrentWeather }) => {

    // State for Temperature Format
    const [isCelcius, setIsCelcius] = useState(true)
    // Day Night Mode
    const [isNightMode, setIsNightMode] = useState(false)

    const [suggestions, setSuggestions] = useState(false)
    let delaySearch;

    // Handling Day/ Night Mode
    const handleNightMode = () => {
        setIsNightMode(!isNightMode)
    }

    // Handling celcius and Fahrenheit 
    const handleCelciusFahre = (format) => {
        if (format === "Celcius") {
            setIsCelcius(true)
        } else {
            setIsCelcius(false)
        }
    }


    const handleLocationSearch = (e) => {
        const searchValue = e.target.value;
        clearInterval(delaySearch);

        delaySearch = setTimeout(() => {
            if (searchValue !== "") {
                setSuggestions(true);
            } else {
                setSuggestions(false)
            }
            console.log(searchValue);
            getLocationKey(searchValue)
        }, 1000)
    }

    return (
        <div className="header-container">
            <h2>Weather App</h2>
            <div className="search-results-container">
                <div className="input-container">
                    <button>S</button>
                    <input type="text" placeholder="Search" onChange={handleLocationSearch} />
                </div>
                {/* search results */}
                {suggestions && (
                    <ul className="search-results">
                        {locationList.length > 0 ? (
                            locationList.map((location, index) => (
                                <li key={index} className='search-results-items' onClick={() => {
                                    setSuggestions(false)
                                    getWeatherData(location.Key, location.LocalizedName);
                                    getCurrentWeather(location.Key)
                                }}>{location.LocalizedName}, {location.AdministrativeArea.LocalizedName}, {location.Country.EnglishName}</li>
                            ))
                        ) : (
                            <li className="search-results-items">
                                Loading...
                            </li>
                        )}
                    </ul>
                )}

            </div>

            <div className='right-side-header'>
                <div className="cel-fah-btns">
                    <div className={`fah-btn ${isCelcius ? 'active-format' : ''}`} onClick={() => { handleCelciusFahre("Celcius") }}>
                        C&#176;
                    </div>
                    <div className={`cel-btn ${isCelcius ? '' : 'active-format'}`}
                        onClick={() => { handleCelciusFahre("Fahrenheit") }}>
                        F&#176;
                    </div>

                </div>

                {/* Toggler */}
                <Switch checkedChildren="Day" unCheckedChildren="Night" onChange={handleNightMode} />
            </div>
        </div>
    )
}

export default Header;