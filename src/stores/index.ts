import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createConfigSlice, ConfigStore } from "./slices/configSlice";

// type StoreState = ChatStore & ConfigStore;
type StoreState = ConfigStore;

const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createConfigSlice(...a),
    }),
    {
      name: "store",
      partialize: (state) => ({
        region: state.region,
      }),
    },
  ),
);

export const useConfigStore = () =>
  useStore((state) => ({
    region: state.region,
    setRegion: state.setRegion,
    domain: state.domain,
    setDomain: state.setDomain,
    token: state.token,
    setToken: state.setToken,
    user: state.user,
    setUser: state.setUser,
    code: state.code,
    setCode: state.setCode,
  }));
