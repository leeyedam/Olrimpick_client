import Cookies from "universal-cookie";
import client from "../client";

const cookies = new Cookies();
const authToken = cookies.get("token");
const userId = cookies.get("userId");

const useFollowing = async (userNumber) => {
  try {
    client.reactions.add(
      "follow",
      userId,
      {},
      { targetFeeds: [`notification:${userNumber}`] }
    );

    const myFeed = client.feed("user", userId, authToken);
    myFeed.follow("user", userNumber);

    await myFeed.following({ filter: [`user:${userNumber}`] });

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export default useFollowing;
