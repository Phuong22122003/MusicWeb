export interface Track {
  id: string;
  name: string;
  title?: string | null;
  description?: string;
  fileName: string;
  coverImagePath: string;
  userId: string;
  duration: string;
  createdAt: string;
  username: string;
  liked?: number;
  played?: number;
  comment?: number;
  countPlay?: number;
}
