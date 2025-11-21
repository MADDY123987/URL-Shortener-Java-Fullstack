import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <span className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
    </div>
  );
}
