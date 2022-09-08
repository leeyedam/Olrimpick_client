import client from "../../client";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userId = cookies.get("userId");

// 깃헙 API 호출을 시작하는 것을 의미
export const GET_FOLLOW_START = "olrimpick/follow-list/GET_FOLLOW_START";

// 깃헙 API 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_FOLLOW__SUCCESS = "olrimpick/follow-list/GET_FOLLOW__SUCCESS";

// 깃헙 API 호출에 대한 응답이 실패한 경우
export const GET_FOLLOW__FAIL = "olrimpick/follow-list/GET_FOLLOW__FAIL";

export function getFollowStart() {
  return {
    type: GET_FOLLOW_START,
  };
}

export function getFollowSuccess(data) {
  return {
    type: GET_FOLLOW__SUCCESS,
    data,
  };
}

export function getFollowFail(error) {
  return {
    type: GET_FOLLOW__FAIL,
    error,
  };
}

const initialState = {
  loading: false,
  data: [],
  error: null,
};

// 리듀서
export default function reducer(state = initialState, action) {
  if (action.type === GET_FOLLOW_START) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_FOLLOW__SUCCESS) {
    const followList = [];
    action.data.results.map(async (arr) => {
      const res = await client.user(arr.target_id.substring(5)).get();
      followList.push([arr.target_id.substring(5), res.data.feed_id]);
    });

    return {
      ...state,
      loading: false,
      data: followList,
    };
  }

  if (action.type === GET_FOLLOW__FAIL) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// redux-thunk
export function getFollowThunk() {
  const timelineUser = client.feed("user", userId);

  return async (dispatch) => {
    try {
      dispatch(getFollowStart());
      // sleep
      // await sleep(2000);
      const res = await timelineUser.following();
      dispatch(getFollowSuccess(res));
    } catch (error) {
      dispatch(getFollowFail(error));
    }
  };
}
