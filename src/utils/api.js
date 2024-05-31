const base_url_country = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";

export const fetchCountryDataFromApi = async(url) => {
    let res = await fetch(`${base_url_country + url}`);
    if (!res.ok) throw new Error('something went wrong');
    const data = await res.json();
    return data;
};

export const getForecast = async (lat, lon) => {
    console.log('run')
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!res.ok) throw new Error('something went wrong')

    const data = await res.json();
    console.log(data);
    return data;
  }