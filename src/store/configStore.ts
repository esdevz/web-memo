import { db } from "./db";
import create from "zustand";
import { CollectionOptions, Configs, ConfigStore } from "./types";

const useConfigStore = create<ConfigStore>((set, get) => ({
  tabLayout: "default",
  collections: {},
  async getConfigs() {
    const cfg = await db.getConfigs();
    if (cfg) {
      set(cfg);
    }
  },
  async update(id: number, cfg: Partial<Configs>) {
    set((state) => ({
      ...state,
      ...cfg,
    }));
    await db.updateConfigs(id, cfg);
  },
  addNewCollection(website: string, opts: CollectionOptions) {
    set((state) => ({
      ...state,
      collections: {
        ...state.collections,
        [website]: opts,
      },
    }));
  },
  async updateCollection(website: string, opts: CollectionOptions) {
    await db.updateCollection(website, opts);
    get().addNewCollection(website, opts);
  },
}));

export default useConfigStore;
