import Image from "next/image";
import React from "react";

function Chip({
  user,
  handleRemoveUser,
  index,
  selectedUsers,
  setLastChipFocused,
  lastChipRef,
  isLastChipFocused,
}) {
  return (
    <div
      ref={index === selectedUsers.length - 1 ? lastChipRef : null}
      tabIndex={
        index === selectedUsers.length - 1 && isLastChipFocused ? 0 : -1
      }
      className="flex bg-slate-100 p-2 rounded-full ml-2 mt-2 items-center"
      onClick={() => setLastChipFocused(true)}
    >
      <Image
        src={user.avatar}
        width={30}
        height={30}
        alt={user.name}
        className="rounded-full pr-3"
      />
      <p className="text-sm text-gray-400">
        {user.name}{" "}
        <span
          className="text-gray-500 font-semibold  cursor-pointer  "
          onClick={() => handleRemoveUser(user.id)}
        >
          X
        </span>{" "}
      </p>
    </div>
  );
}

export default Chip;
