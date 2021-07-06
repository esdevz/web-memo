export interface INote {
  id?: number;
  title: string;
  website: string;
  favicon: string;
  content: string;
  createdAt: number;
  isPinned: boolean;
}

export interface NoteStore {
  notes: Record<string, INote[]>;
  activeTab: string;
  setActiveTab: (url: string) => void;
  getNotes: () => Promise<void>;
  edit: (note: INote) => Promise<string>;
  delete: (note: INote) => Promise<void>;
  //   deleteAll: (website: string) => Promise<void>;
  pin: (note: INote) => Promise<void>;
}
