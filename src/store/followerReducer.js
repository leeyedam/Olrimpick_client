const SET_FOLLOWER = "SET_FOLLOWER";
const CLEAR_FOLLOWER = "CLEAR_FOLLOWER";

export const setFollower = (follower) => ({
  type: SET_FOLLOWER,
  currentUser: follower,
});
export const clearFollower = () => ({ type: CLEAR_FOLLOWER });

const initialState = {
  currentUser: null,
  isLoading: true,
};

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWER:
      return {
        currentUser: action.currentUser,
        isLoading: false,
      };
    case CLEAR_FOLLOWER:
      return {
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default followerReducer;
