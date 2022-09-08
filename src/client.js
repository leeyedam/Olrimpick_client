import Cookies from "universal-cookie";
import { connect } from "getstream";

const cookies = new Cookies();
const authToken = cookies.get("token");
const api_key = process.env.REACT_APP_STREAM_API_KEY;
const app_id = process.env.REACT_APP_STREAM_APP_ID;

const client = connect(api_key, authToken, app_id);

export default client;
