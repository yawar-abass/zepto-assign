import Image from "next/image";
import React from "react";

function DropDown({ users, handleSelectUser }) {
  return (
    <ul
      className={`z-50  ${
        users.length <= 0 ? "h-24" : "h-52"
      } rounded-md shadow-xl border-1 absolute left-0  w-[296px] overflow-y-scroll scrollbar-rounded-sm scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 mt-2`}
    >
      {users.length <= 0 ? (
        <div className="p-2 text-center flex items-center h-full ">
          No Users Found
        </div>
      ) : (
        users.map((user) => (
          <li
            key={user.id}
            className="flex flex-row justify-between items-center p-3 cursor-pointer hover:bg-gray-100 hover:rounded-lg "
            onClick={() => handleSelectUser(user)}
          >
            <Image
              src={user.avatar}
              width={50}
              height={50}
              alt={user.name}
              className="rounded-full"
            />
            <div className="flex flex-col items-center ml-2">
              <h2 className="text-md font-medium text-gray-700">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default DropDown;
