"use client";
import usersData from "../data/users.json";
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import Chip from "./Chip";

export default function HomePage() {
  const [users, setUsers] = useState(usersData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const [isLastChipFocused, setLastChipFocused] = useState(false);
  const lastChipRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setUsers(
      usersData.filter((user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setShowUsers(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    setSearchTerm("");
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
    const removedUser = selectedUsers.find((user) => user.id === userId);
    if (removedUser) {
      setUsers((prevUsers) => [removedUser, ...prevUsers]);
    }
  };

  const handleBackspace = (event) => {
    if (event.key === "Backspace" && searchTerm === "") {
      if (!isLastChipFocused) {
        setLastChipFocused(true);
        lastChipRef.current?.focus();
      } else {
        const lastUser = selectedUsers[selectedUsers.length - 1];
        if (lastUser) {
          handleRemoveUser(lastUser.id);
        }
        setLastChipFocused(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleBackspace);

    return () => {
      document.removeEventListener("keydown", handleBackspace);
    };
  });

  return (
    <>
      <h1 className="text-3xl font-bold  text-blue-500 ">Pick a User</h1>
      <div className="flex flex-wrap w-auto items-center border-b-[3px] border-blue-400 focus:border-blue-600  mt-4 px-4 py-2">
        <div className="flex flex-wrap  mt-2">
          {selectedUsers.map((user, index) => (
            <Chip
              key={user.id}
              user={user}
              handleRemoveUser={handleRemoveUser}
              index={index}
              selectedUsers={selectedUsers}
              setLastChipFocused={setLastChipFocused}
              lastChipRef={lastChipRef}
              isLastChipFocused={isLastChipFocused}
            />
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Add a user"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowUsers(true)}
            className=" mt-4 focus:outline-none px-4 py-2"
          />
          {showUsers && (
            <DropDown users={users} handleSelectUser={handleSelectUser} />
          )}
        </div>
      </div>
    </>
  );
}
