import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Weather(props) {
    const [weather, setWeather] = useState(null);
    const [degreeType, setDegreeType] = useState('F')

    useEffect(() => {
        axios.get('http://api.weatherapi.com/v1/forecast.json?key=3d83602b387a49c39ba33428222102&q=New York&days=7&aqi=no&alerts=no')
            .then((response) => setWeather(response.data))
    }, []);

    const changeDegree = (dType) => {
        if (dType !== degreeType) {
            setDegreeType(dType);
        }
    }

    console.log(weather)

    let day = { '1': 'MONDAY', '2': 'TUESDAY', '3': 'WEDNESDAY', '4': 'THURSDAY', '5': 'FRIDAY', '6': 'SATURDAY', '0': 'SUNDAY' };
    let d = new Date();
    let dayNum = d.getDay();

    let showTemperature = degreeType === 'F' ? (
        <p className={props.checkedStatus ? 'forecast-temperature-dark' : 'forecast-temperature'}>{weather.current.temp_f}°</p>
    ) : (
        <p className={props.checkedStatus ? 'forecast-temperature-dark' : 'forecast-temperature'}>{weather.current.temp_c}°</p>
    )

    if ((!weather)) return <div className={props.checkedStatus ? 'loadingSign-dark' : 'loadingSign'}>Loading...</div>;

    return (
        <div className={props.checkedStatus ? 'weather-dark' : 'weather'}>
            <p className={props.checkedStatus ? 'forecast-weekday-dark' : 'forecast-weekday'}>{day[dayNum]} • NEW YORK</p>
            <div className='temperature-row'>
                {showTemperature}
                {/* <p className={props.checkedStatus ? 'forecast-temperature-dark' : 'forecast-temperature'}>{weather.current.temp_f}°</p> */}
                <div className='degree-type'>
                    <p style={degreeType === 'F' ? {fontWeight: 'bold'} : null} onClick={() => changeDegree('F')} className='dType'>F</p>
                    <p style={degreeType === 'C' ? {fontWeight: 'bold'} : null} className='dType' onClick={() => changeDegree('C')}>C</p>
                </div>
            </div>
            <p className={props.checkedStatus ? 'forecast-condition-dark' : 'forecast-condition'}>{weather.current.condition.text.toUpperCase()}</p>
            <img className='forecast-image' src={weather.current.condition.icon} />
        </div>
    )
}

export default Weather;