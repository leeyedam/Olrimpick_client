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
  const [preChannel, setPreChannel] = useState(false);
  const { user } = useSelector((state) => state);
  const friendNumber = user.currentUser?.userNumber;

  useEffect(() => {
    (async () => {
      try {
        const channelResponse = await client.queryChannels({
          type: "messaging",
          members: { $in: [userId] },
        });

        const chatRoom = channelResponse.filter((c) =>
          c.id.includes(friendNumber, userId)
        );
        if ((chatRoom.length = 1 && chatRoom[0].id === friendNumber + userId)) {
          setPreChannel(true);
        }
      } catch (error) {
        console.log(error);
      }
      if (preChannel === true) {
        const channel = await client.channel(
          "messaging",
          friendNumber + userId,
          {
            name: "Chatting Room",
            members: [userId, friendNumber],
          }
        );

        const res = await channel.watch();
        setMsgNumber(res.read[1].unread_messages);
        setChannel(channel);
      } else {
        const channel = await client.channel(
          "messaging",
          userId + friendNumber,
          {
            name: "Chatting Room",
            members: [userId, friendNumber],
          }
        );
        await channel.create();
        const res = await channel.watch();
        setMsgNumber(res.read[0].unread_messages);
        setChannel(channel);
      }
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
