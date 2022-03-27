import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const defaultName = "Johnny Blaze";

    if (!members.length || members.length === 1) {
      return (
        <div className="channel-preview__item single">
          <Avatar
            image={members[0]?.user.image || undefined}
            name={members[0]?.user.name || members[0]?.user.id}
            size={24}
          />
          <p>{members[0]?.user.name || members[0]?.user.id || defaultName}</p>
        </div>
      );
    }
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper_selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        if (setIsEditing) setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
