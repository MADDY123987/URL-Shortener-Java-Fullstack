import React, { useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    navigate("/error");
  }

  const {
    isLoading: urlsLoading,
    data: myShortenUrls = [],
    refetch, // <-- passed to popup
  } = useFetchMyShortUrls(token, onError);

  const {
    isLoading: clicksLoading,
    data: totalClicks = [],
  } = useFetchTotalClicks(token, onError);

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] bg-slate-50">
      {clicksLoading ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-14">
          {/* Graph card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 px-4 sm:px-6 py-5 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-slate-900 font-semibold text-lg">
                  Link engagement overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Visualize how your short links are performing over time.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                Live from your data
              </span>
            </div>

            <div className="h-80 sm:h-96 relative">
              {totalClicks.length === 0 && (
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                  <h1 className="text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                    No data for this time period
                  </h1>
                  <h3 className="sm:w-96 w-full text-sm sm:text-base text-slate-600">
                    Create and share a short link to start seeing clicks and
                    engagement trends here.
                  </h3>
                </div>
              )}
              <Graph graphData={totalClicks} />
            </div>
          </div>

          {/* CTA button */}
          <div className="py-3 sm:text-end text-center">
            <button
              className="inline-flex items-center justify-center gap-2 bg-custom-gradient px-4 py-2 rounded-md text-white text-sm font-semibold shadow-md hover:shadow-lg hover:translate-y-[1px] transition-all"
              onClick={() => setShortenPopUp(true)}
            >
              <FaLink className="text-sm" />
              <span>Create a new short URL</span>
            </button>
          </div>

          {/* List / empty state */}
          <div className="mt-4">
            {!urlsLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-10">
                <div className="flex gap-2 items-center justify-center py-5 sm:px-8 px-5 rounded-xl shadow-md bg-white border border-slate-100">
                  <FaLink className="text-blue-500 sm:text-xl text-base" />
                  <h1 className="text-slate-800 font-montserrat sm:text-[16px] text-[14px] font-semibold">
                    You haven&apos;t created any short link yet. Start by
                    creating your first one above.
                  </h1>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 mt-4">
                <ShortenUrlList data={myShortenUrls} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pass refetch so popup can refresh immediately after create */}
      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
