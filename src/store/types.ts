export interface INote {
  id?: number;
  title: string;
  website: string;
  fullUrl: string;
  favicon?: string; //to be removed
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
  | "screenshot"
  | "movie"
  | "menu"
  | "code"
  | "todo"
  | "note"
  | "shop"
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
}
export interface Configs {
  id: number;
  tabLayout: Layout;
  collections: Record<string, CollectionOptions>;
}
export interface NoteStore {
  tabLayout: Layout;
  collections: Record<string, Collection>;
  activeTab: string;
  draggedNote: null | INote;
  setActiveTab: (url: string) => void;
  addNewNote: (collectionProps: CollectionOptions) => Promise<void>;
  getNotes: () => Promise<void>;
  edit: (note: INote) => Promise<NotificationMessage>;
  delete: (note: INote) => Promise<NotificationMessage>;
  //   deleteAll: (website: string) => Promise<void>;
  pin: (note: INote) => Promise<NotificationMessage>;
  updateLayout: (layout: Layout) => Promise<void>;
  updateCollection: (website: string, newCollection: CollectionOptions) => Promise<void>;
  updateTagetCollection: (url: string) => Promise<void>;
  setDraggedNote: (note: INote) => void;
}
