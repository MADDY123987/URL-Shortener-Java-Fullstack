// src/components/Shorten/ShortenItem.jsx
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import Graph from "./Graph";

/** Helper: get a slug/code from various shapes */
function extractSlug({ shortUrl, code, slug, id }) {
  if (code) return String(code).trim();
  if (slug) return String(slug).trim();
  if (shortUrl) {
    try {
      // supports "http://..../s/abc123" or ".../abc123"
      const u = new URL(shortUrl, "http://dummy");
      const parts = u.pathname.split("/").filter(Boolean);
      return parts.pop() || "";
    } catch {
      const parts = String(shortUrl).split("/").filter(Boolean);
      return parts.pop() || "";
    }
  }
  // last fallback (not ideal, but prevents crashes)
  return id ? String(id) : "";
}

/** Build the real redirect base (backend), not the frontend host */
function getRedirectOrigin() {
  const fromEnv = import.meta.env.VITE_REDIRECT_BASE?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // Default sensible dev fallback
  return import.meta.env.DEV ? "http://localhost:8080" : window.location.origin;
}

const ShortenItem = (props) => {
  const { originalUrl, clickCount, createdDate } = props;
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(""); // holds slug/code
  const [analyticsData, setAnalyticsData] = useState([]);

  const REDIRECT_ORIGIN = getRedirectOrigin();
  const slug = extractSlug(props);
  const fullShortUrl = slug ? `${REDIRECT_ORIGIN}/s/${slug}` : "";

  // pretty label (no protocol)
  const prettyHost = REDIRECT_ORIGIN.replace(/^https?:\/\//, "");

  // Copy helper
  const copyText = async (text) => {
    try {
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const analyticsHandler = (slugCode) => {
    if (!analyticToggle && slugCode) setSelectedUrl(slugCode);
    setAnalyticToggle((v) => !v);
  };

  const fetchAnalytics = async () => {
    if (!selectedUrl) return;
    setLoader(true);
    try {
      const { data } = await api.get(`/urls/analytics/${selectedUrl}`, {
        params: {
          startDate: "2024-12-01T00:00:00",
          endDate: "2025-12-31T23:59:59",
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setAnalyticsData(Array.isArray(data) ? data : []);
      setSelectedUrl("");
    } catch (error) {
      console.error(error);
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUrl]);

  const prettyCreated = createdDate
    ? dayjs(createdDate).format("MMM DD, YYYY")
    : "—";
  const clicks = Number.isFinite(clickCount) ? clickCount : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-2">
        {/* Left block */}
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
          <div className="pb-1 sm:pb-0 flex items-center gap-2">
            {fullShortUrl ? (
              <>
                {/* Use <a> for external navigation so the request actually hits backend */}
                <a
                  href={fullShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] font-montserrat font-semibold text-indigo-600 hover:text-indigo-700 break-all"
                  title={fullShortUrl}
                >
                  {`${prettyHost}/s/${slug}`}
                </a>
                <FaExternalLinkAlt className="text-indigo-500 text-sm" />
              </>
            ) : (
              <span className="text-slate-500 text-sm">No code yet</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <h3 className="text-slate-700 font-normal text-[16px] break-all">
              {originalUrl || "—"}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-4">
            <div className="flex gap-1 items-center font-semibold text-indigo-600">
              <MdOutlineAdsClick className="text-[22px] me-1" />
              <span className="text-[16px]">{clicks}</span>
              <span className="text-[15px]">
                {clicks === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-sm text-slate-600">
              <FaRegCalendarAlt className="text-slate-500" />
              <span className="text-[15px]">{prettyCreated}</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-1 sm:justify-end items-center gap-3 sm:gap-4">
          <button
            disabled={!fullShortUrl}
            className="flex cursor-pointer gap-2 items-center bg-indigo-600 py-2 font-semibold px-5 rounded-md text-white text-sm shadow-sm hover:bg-indigo-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => copyText(fullShortUrl)}
          >
            <span>{isCopied ? "Copied" : "Copy"}</span>
            {isCopied ? (
              <LiaCheckSolid className="text-lg" />
            ) : (
              <IoCopy className="text-lg" />
            )}
          </button>

          <button
            disabled={!slug}
            onClick={() => analyticsHandler(slug)}
            className="flex cursor-pointer gap-2 items-center bg-emerald-600 py-2 font-semibold px-5 rounded-md text-white text-sm shadow-sm hover:bg-emerald-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>Analytics</span>
            <MdAnalytics className="text-lg" />
          </button>
        </div>
      </div>

      {/* Analytics panel */}
      <div
        className={`${
          analyticToggle ? "flex" : "hidden"
        } max-h-96 sm:mt-3 mt-4 min-h-96 relative border-t border-slate-200 bg-slate-50 rounded-xl px-3 sm:px-4 py-3 w-full overflow-hidden`}
      >
        {loader ? (
          <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
            <div className="flex flex-col items-center gap-3">
              <span className="inline-block w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-slate-700 text-sm">Please wait...</p>
            </div>
          </div>
        ) : (
          <>
            {(!analyticsData || analyticsData.length === 0) && (
              <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto px-4">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1 text-center">
                  No data for this time period
                </h1>
                <h3 className="sm:w-96 w-full text-center sm:text-lg text-[12px] text-slate-600">
                  Share your short link to start seeing where your clicks are
                  coming from.
                </h3>
              </div>
            )}
            <Graph graphData={analyticsData || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default ShortenItem;
