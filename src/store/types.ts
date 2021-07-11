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

export interface NoteStore {
  notes: Record<string, INote[]>;
  activeTab: string;
  setActiveTab: (url: string) => void;
  getNotes: () => Promise<void>;
  edit: (note: INote) => Promise<NotificationMessage>;
  delete: (note: INote) => Promise<NotificationMessage>;
  //   deleteAll: (website: string) => Promise<void>;
  pin: (note: INote) => Promise<NotificationMessage>;
}
