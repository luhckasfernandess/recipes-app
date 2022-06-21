import { API_FOODS_URL } from './constants';

async function getFoodsFromAPI(type, query) {
  try {
    // console.log(`${API_FOODS_URL}${type}${query}`);
    const request = await fetch(`${API_FOODS_URL}${type}${query}`);
    const requestJson = await request.json();
    return requestJson.meals;
  } catch (error) {
    console.log(error);
  }
}
export default getFoodsFromAPI;
