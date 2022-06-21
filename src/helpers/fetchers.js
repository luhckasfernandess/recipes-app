import { API_FOODS_URL, API_COCKTAILS_URL, MAX_LIST_LENGTH } from './constants';

async function getFoodsFromAPI(source, type, query) {
  try {
    // console.log(source);
    const request = await fetch(`${source}${type}${query}`);
    const requestJson = await request.json();
    if (source === API_FOODS_URL) {
      const list = requestJson.meals;
      const slicedList = list.slice(0, MAX_LIST_LENGTH);
      return slicedList;
    }
    if (source === API_COCKTAILS_URL) {
      const list = requestJson.drinks;
      const slicedList = list.slice(0, MAX_LIST_LENGTH);
      return slicedList;
    }
  } catch (error) {
    console.log(error);
  }
}
export default getFoodsFromAPI;
