import { combineReducers } from "redux";
import followerList from "./followerList";
import followList from "./followList";

const rootReducer = combineReducers({
  followerList,
  followList,
});

export default rootReducer;
