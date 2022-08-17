import { combineReducers } from "redux";
import userReducer from "./userReducer";
import followerReducer from "./followerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  follower: followerReducer,
});

export default rootReducer;
