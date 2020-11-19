import axios from 'axios'

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=49.2827&lon=-123.1207&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`

export const fetchData = async () => {
  try {
    const {data: {hourly, daily, current}} = await axios.get(url);
    return {hourly, daily, current};
  } catch (error) {
    return error;
  }
}
