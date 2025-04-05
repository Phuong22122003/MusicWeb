import { Track } from "../track";

export interface Playlist{
    id:string;
    cover_image_path:string;
    tracks:Track[];
    like:number;
}