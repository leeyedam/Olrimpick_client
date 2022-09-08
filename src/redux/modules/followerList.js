import client from "../../client";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userId = cookies.get("userId");

// 깃헙 API 호출을 시작하는 것을 의미
export const GET_FOLLOWER_START = "olrimpick/follower-list/GET_FOLLOWER_START";

// 깃헙 API 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_FOLLOWER__SUCCESS =
  "olrimpick/follower-list/GET_FOLLOWER__SUCCESS";

// 깃헙 API 호출에 대한 응답이 실패한 경우
export const GET_FOLLOWER__FAIL = "olrimpick/follower-list/GET_FOLLOWER__FAIL";

export function getFollowerStart() {
  return {
    type: GET_FOLLOWER_START,
  };
}

export function getFollowerSuccess(data) {
  return {
    type: GET_FOLLOWER__SUCCESS,
    data,
  };
}

export function getFollowerFail(error) {
  return {
    type: GET_FOLLOWER__FAIL,
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
  if (action.type === GET_FOLLOWER_START) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_FOLLOWER__SUCCESS) {
    const followerList = [];
    action.data.results.map(async (arr) => {
      const res = await client.user(arr.feed_id.substring(5)).get();
      followerList.push([arr.feed_id.substring(5), res.data.feed_id]);
    });

    return {
      ...state,
      loading: false,
      data: followerList,
    };
  }

  if (action.type === GET_FOLLOWER__FAIL) {
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
export function getFollowerThunk() {
  const timelineUser = client.feed("user", userId);
  return async (dispatch) => {
    try {
      dispatch(getFollowerStart());
      // sleep
      // await sleep(2000);
      const res = await timelineUser.followers();
      dispatch(getFollowerSuccess(res));
    } catch (error) {
      dispatch(getFollowerFail(error));
    }
  };
}
