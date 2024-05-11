import React from "react";
import { IoChevronForward } from "react-icons/io5";

export default function DrawerItem(props) {
  const { Icon } = props;
  return (
    <button
      onClick={props.onClick}
      className="w-full flex items-center justify-between px-3 py-5 border-b-2 border-b-black border-opacity-10"
    >
      <div className="flex items-center gap-x-5">
        <Icon size={24} className="text-theme-gray-7 text-opacity-60" />
        <span className="font-medium text-base text-black text-opacity-60">{props.text}</span>
      </div>
      <IoChevronForward size={20} className="text-black text-opacity-60" />
    </button>
  );
}
