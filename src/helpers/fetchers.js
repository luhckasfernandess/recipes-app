import { API_COCKTAILS_URL, MAX_LIST_LENGTH } from './constants';

async function getFoodsFromAPI(source, type, query) {
  try {
    // console.log(source);
    const request = await fetch(`${source}${type}${query}`);
    const requestJson = await request.json();
    let list;
    if (source === API_COCKTAILS_URL) {
      list = requestJson.drinks;
    } else list = requestJson.meals;
    const slicedList = list.slice(0, MAX_LIST_LENGTH);
    return slicedList;
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    // console.log(error);
  }
}
export default getFoodsFromAPI;
