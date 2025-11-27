import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaLink } from "react-icons/fa";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (formData) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/urls/shorten", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      await navigator.clipboard.writeText(shortenUrl);
      toast.success("Short URL copied to clipboard", {
        position: "bottom-center",
        className: "mb-5",
        duration: 3000,
      });

      if (typeof refetch === "function") {
        await refetch();
      }

      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Create Short URL failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[460px] w-[360px] relative rounded-2xl bg-white shadow-xl border border-slate-100 px-5 sm:px-7 pt-7 pb-5 overflow-hidden"
      >
        {/* top gradient bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-custom-gradient" />

        {/* close button */}
        {!loading && (
          <Tooltip title="Close">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full hover:bg-slate-100 p-[2px]"
            >
              <RxCross2 className="text-slate-700 text-2xl" />
            </button>
          </Tooltip>
        )}

        {/* heading */}
        <div className="flex items-center gap-2 mb-3 mt-1">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <FaLink className="text-indigo-500" />
          </div>
          <div>
            <h1 className="font-montserrat font-bold sm:text-xl text-[18px] text-slate-900">
              Create a new short link
            </h1>
            <p className="text-[11px] text-slate-500">
              Paste a long URL and we&apos;ll generate a clean, shareable link.
            </p>
          </div>
        </div>

        <hr className="my-3 border-slate-100" />

        {/* URL field */}
        <div className="mb-3">
          <TextField
            label="Destination URL"
            required
            id="originalUrl"
            placeholder="https://example.com/very/long/link"
            type="url"
            message="URL is required"
            register={register}
            errors={errors}
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Tip: include <span className="font-mono">https://</span> for best
            results.
          </p>
        </div>

        {/* actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              reset();
              setOpen(false);
            }}
            className="text-xs sm:text-sm px-3 py-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            className="bg-custom-gradient font-semibold text-white text-xs sm:text-sm px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:translate-y-[1px] transition-all disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create short URL"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewShorten;
