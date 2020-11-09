import axios from 'axios'

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=49.2827&lon=-123.1207&appid=8cf9a52720c54c29d52f302a387eeda8'

export const fetchData = async () => {
  try {
    const {data: {hourly, daily}} = await axios.get(url);
    return {hourly, daily};
  } catch (error) {
    return error;
  }
}
