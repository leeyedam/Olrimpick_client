import { useStreamContext } from "react-activity-feed";

function useFeedClient() {
  const { client } = useStreamContext();
  return client;
}

export default useFeedClient;
