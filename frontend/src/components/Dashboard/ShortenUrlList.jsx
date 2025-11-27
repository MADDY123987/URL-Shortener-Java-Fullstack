import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data = [] }) => {
  return (
    <section className="my-6">
      {/* header row */}
      <div className="flex justify-between items-end mb-3 px-1">
        <div>
          <h2 className="text-slate-900 font-semibold text-lg">
            Your short links
          </h2>
          <p className="text-xs text-slate-500">
            Manage, copy and track the performance of your URLs.
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {data.length} {data.length === 1 ? "link" : "links"}
        </span>
      </div>

      {/* list */}
      <div className="space-y-4">
        {data.map((item) => {
          const key =
            item.id ??
            item.code ??
            item.slug ??
            item.shortUrl ??
            (globalThis.crypto?.randomUUID?.() ??
              Math.random().toString(36).slice(2));

          return <ShortenItem key={key} {...item} />;
        })}
      </div>
    </section>
  );
};

export default ShortenUrlList;
