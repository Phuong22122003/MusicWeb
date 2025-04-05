export interface Track {
  id: string;
  name: string;
  title?: string | null;
  description?: string | null;
  file_path: string;
  cover_image_path: string;
  user_id: string;
  duration: string;
  create_at: string;
  username: string;
  liked?:number;
  played?:number;
  comment?:number;
}
