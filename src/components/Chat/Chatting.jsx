import React, { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import chatClient from "../../chatClient";

const Chatting = ({ userNumber }) => {
  const [channel, setChannel] = useState("");
  const friendNumber = userNumber;

  useEffect(() => {
    (async () => {
      const channel = await chatClient.channel("messaging", {
        name: "Chatting Room",
        members: [chatClient._user.id, friendNumber],
      });
      await channel.create();

      setChannel(channel);
    })();

    return () => {
      // client.disconnectUser();
    };
  }, [friendNumber]);

  if (!channel) return null;
  return (
    <Chat client={chatClient} theme="messaging light">
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
