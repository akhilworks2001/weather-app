import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getForecast } from '../utils/api';

export default function Weather() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const {lat, lon} = useParams();
    
    const weatherData = (lat, lon) => {
        getForecast(lat, lon).then((res) => {
            setData(res);
          })
    };

    useEffect(() => {
        weatherData(lat, lon);
    },[]);

  return (
   <div>weather</div>
  )
}
