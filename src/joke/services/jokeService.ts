import axios from "axios";

const URL = process.env.JOKE_API_URL;
const getJoke = async () => {
  try {
    const res = await axios.get(`${URL}/jokes/random`);
    return res.data;
  } catch (e) {
    throw new Error("Error occurred while fetching the app\n Error: " + e);
  }
};

export default { getJoke };
