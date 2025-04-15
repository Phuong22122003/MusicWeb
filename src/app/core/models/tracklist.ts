import { Track } from "./track";
import { TrackAndWave } from "./track_wave";

export interface TrackList{
    listname:string;
    listId:string;
    username:string;
    userid:string;
    tracks:TrackAndWave[];
    likeCount: number;
}