import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data = [] }) => {
  return (
    <div className="my-6 space-y-4">
      {data.map((item) => {
        const key =
          item.id ??
          item.code ??
          item.slug ??
          item.shortUrl ??
          (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));
        return <ShortenItem key={key} {...item} />;
      })}
    </div>
  );
};

export default ShortenUrlList;
