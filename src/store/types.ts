export interface INote {
  id?: number;
  title: string;
  website: string;
  fullUrl: string;
  favicon: string;
  content: string;
  createdAt: number;
  isPinned: boolean;
}
interface NotificationMessage {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

export type CustomIcon =
  | "default"
  | "book"
  | "movie"
  | "menu"
  | "code"
  | "todo"
  | "note"
  | "notebook"
  | "clipboard";

export type Layout = "default" | "minimized";

export interface CollectionOptions {
  displayName: string;
  customIconType: CustomIcon;
}
export interface Configs {
  tabLayout: Layout;
  collections: Record<string, CollectionOptions>;
}
export interface NoteStore {
  notes: Record<string, INote[]>;
  activeTab: string;
  setActiveTab: (url: string) => void;
  addNewNote: () => Promise<void>;
  getNotes: () => Promise<void>;
  edit: (note: INote) => Promise<NotificationMessage>;
  delete: (note: INote) => Promise<NotificationMessage>;
  //   deleteAll: (website: string) => Promise<void>;
  pin: (note: INote) => Promise<NotificationMessage>;
}
export interface ConfigStore extends Configs {
  getConfigs: () => Promise<void>;
  update: (id: number, cfg: Partial<Configs>) => Promise<void>;
  updateCollection: (website: string, opts: CollectionOptions) => Promise<void>;
  addNewCollection: (website: string, opts: CollectionOptions) => void;
}
