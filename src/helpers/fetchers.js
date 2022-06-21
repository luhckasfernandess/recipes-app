async function getFoodsFromAPI(source, type, query) {
  try {
    console.log(`${source}${type}${query}`);
    const request = await fetch(`${source}${type}${query}`);
    const requestJson = await request.json();
    return requestJson.meals;
  } catch (error) {
    console.log(error);
  }
}
export default getFoodsFromAPI;
