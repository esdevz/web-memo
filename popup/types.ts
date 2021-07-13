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
