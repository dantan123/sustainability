import axios from 'axios'

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=49.2827&lon=-123.1207&units=metric&appid=8cf9a52720c54c29d52f302a387eeda8'

export const fetchData = async () => {
  try {
    const {data: {hourly, daily, current}} = await axios.get(url);
    return {hourly, daily, current};
  } catch (error) {
    return error;
  }
}
