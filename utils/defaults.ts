import { Configs } from "../src/store/types";

export const DB_NAME = "notes";

export const defaultNote = {
  title: "",
  content: "",
  fullUrl: "",
  createdAt: 0,
  favicon: "",
  isPinned: false,
  website: "notes",
};

export const defaultConfig: Configs = {
  id: 1,
  tabLayout: "default",
  collections: {
    notes: {
      displayName: "notes",
      customIconType: "default",
    },
  },
};
