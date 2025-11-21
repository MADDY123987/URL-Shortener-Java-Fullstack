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
      const { data } = await api.get(
        `/urls/analytics/${selectedUrl}`,
        {
          params: {
            startDate: "2024-12-01T00:00:00",
            endDate: "2025-12-31T23:59:59",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
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

  const prettyCreated = createdDate ? dayjs(createdDate).format("MMM DD, YYYY") : "—";
  const clicks = Number.isFinite(clickCount) ? clickCount : 0;

  return (
    <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 sm:py-1 py-3 rounded-md transition-all duration-100">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">
        {/* Left block */}
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
          <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
            {fullShortUrl ? (
              <>
                {/* Use <a> for external navigation so the request actually hits backend */}
                <a
                  href={fullShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] font-montserrat font-[600] text-linkColor break-all"
                  title={fullShortUrl}
                >
                  {`${prettyHost}/s/${slug}`}
                </a>
                <FaExternalLinkAlt className="text-linkColor" />
              </>
            ) : (
              <span className="text-slate-500">No code yet</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <h3 className="text-slate-700 font-[400] text-[17px] break-all">
              {originalUrl || "—"}
            </h3>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex gap-1 items-center font-semibold text-green-800">
              <MdOutlineAdsClick className="text-[22px] me-1" />
              <span className="text-[16px]">{clicks}</span>
              <span className="text-[15px]">{clicks === 1 ? "Click" : "Clicks"}</span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
              <FaRegCalendarAlt />
              <span className="text-[17px]">{prettyCreated}</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-1 sm:justify-end items-center gap-4">
          <button
            disabled={!fullShortUrl}
            className="flex cursor-pointer gap-1 items-center bg-btnColor py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white disabled:opacity-60"
            onClick={() => copyText(fullShortUrl)}
          >
            <span>{isCopied ? "Copied" : "Copy"}</span>
            {isCopied ? <LiaCheckSolid /> : <IoCopy />}
          </button>

          <button
            disabled={!slug}
            onClick={() => analyticsHandler(slug)}
            className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white disabled:opacity-60"
          >
            <span>Analytics</span>
            <MdAnalytics />
          </button>
        </div>
      </div>

      {/* Analytics panel */}
      <div
        className={`${
          analyticToggle ? "flex" : "hidden"
        } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-full overflow-hidden`}
      >
        {loader ? (
          <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
            <div className="flex flex-col items-center gap-2">
              <span className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-slate-700">Please Wait...</p>
            </div>
          </div>
        ) : (
          <>
            {(!analyticsData || analyticsData.length === 0) && (
              <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600">
                  Share your short link to view where your engagements are
                  coming from
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
