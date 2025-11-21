import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

// NOTE: do NOT prefix with /api (baseURL is already /api in dev/proxy)

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    // include the actual token so caches are per-user
    queryKey: ["my-shortenurls", token],
    queryFn: async () => {
      const res = await api.get("/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return res;
    },
    select: (data) =>
      data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)),
    onError,
    staleTime: 5000,
    enabled: !!token,
  });
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    // include token so totals are per-user and refetch on login change
    queryKey: ["url-totalclick", token],
    queryFn: async () => {
      const res = await api.get("/urls/totalClicks", {
        params: { startDate: "2024-01-01", endDate: "2025-12-31" },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return res;
    },
    select: (data) =>
      Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      })),
    onError,
    staleTime: 5000,
    enabled: !!token,
  });
};
