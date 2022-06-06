export interface INote {
  id?: number;
  title: string;
  website: string;
  fullUrl: string;
  favicon?: string; //to be removed
  content: string;
  createdAt: number;
  isPinned: boolean;
  colorScheme?: string;
}
export interface NotificationMessage {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

export type CustomIcon =
  | "default"
  | "screenshot"
  | "movie"
  | "menu"
  | "code"
  | "todo"
  | "note"
  | "shop"
  | "QR"
  | "paper"
  | "clipboard";

export type Layout = "default" | "minimized";

export interface Collection {
  displayName: string;
  customIconType: CustomIcon;
  favicon?: string;
  notes: INote[];
}

export interface CollectionOptions {
  displayName: string;
  customIconType: CustomIcon;
  favicon?: string;
  order?: number;
}
export interface Configs {
  id: number;
  fonts?: CustomFonts;
  tabLayout: Layout;
  collections: Record<string, CollectionOptions>;
}

export type CustomFonts = {
  title: string;
  body: string;
  code: string;
  h1: string;
  h2: string;
  h3: string;
};

export interface NoteStore {
  tabLayout: Layout;
  customFonts?: CustomFonts;
  collections: Record<string, Collection>;
  activeTab: string;
  draggedNote: null | INote;
  tabs: string[];
  setTabs: (next: string[]) => void;
  setActiveTab: (url: string) => void;
  addNewNote: (collectionProps: CollectionOptions) => Promise<void>;
  getNotes: () => Promise<void>;
  updateCustomFonts: (fonts: CustomFonts) => Promise<NotificationMessage>;
  edit: (note: INote) => Promise<NotificationMessage>;
  setNoteColor: (
    id: number,
    clr: string,
    website: string
  ) => Promise<NotificationMessage>;
  delete: (note: INote) => Promise<NotificationMessage>;
  //   deleteAll: (website: string) => Promise<void>;
  pin: (note: INote) => Promise<NotificationMessage>;
  updateLayout: (layout: Layout) => Promise<void>;
  updateCollection: (
    website: string,
    newCollection: CollectionOptions
  ) => Promise<NotificationMessage>;
  updateTargetCollection: (url: string) => Promise<void>;
  setDraggedNote: (note: INote) => void;
}

export type OptionValues = {
  name: string;
  value: string;
  font?: string;
};

export type MenuOptions = {
  type: "text" | "color";
  values: OptionValues[];
};
