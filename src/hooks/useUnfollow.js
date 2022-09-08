import client from "../client";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userId = cookies.get("userId");

const useUnfollow = async (userNumber, i) => {
  const timelineUser = client.feed("user", userId);
  await timelineUser.unfollow("user", userNumber);
  window.location.reload();
};

export default useUnfollow;
