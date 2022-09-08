import { StreamChat } from "stream-chat";

const api_key = process.env.REACT_APP_STREAM_API_KEY;

const chatClient = StreamChat.getInstance(api_key);

export default chatClient;
