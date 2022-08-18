import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const apiKey = "adazxgkkh3hb";
const authToken = cookies.get("token");
const userId = cookies.get("userId");
const userName = cookies.get("username");

const client = StreamChat.getInstance(apiKey);

const Chatting = ({ setMsgNumber }) => {
  const [channel, setChannel] = useState("");
  const { user } = useSelector((state) => state);
  const friendNumber = user.currentUser?.userNumber;

  useEffect(() => {
    (async () => {
      const channel = await client.channel("messaging", {
        name: "Chatting Room",
        members: [userId, friendNumber],
      });
      await channel.create();
      const res = await channel.watch();
      console.log(res);
      res.read[0].user.id === userId
        ? setMsgNumber(res.read[0].unread_messages)
        : setMsgNumber(res.read[1].unread_messages);

      setChannel(channel);
      // }
    })();

    return () => {
      // client.disconnectUser();
    };
  }, []);

  if (!channel) return null;
  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default Chatting;
