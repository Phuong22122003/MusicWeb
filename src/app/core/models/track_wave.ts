export interface TrackAndWave {
    id: string;
    name: string;
    file_path: string;
    cover_image_path: string;
    duration: string;
    create_at: string;
    user_id: string;
    username: string;
    liked:number;
    played:number;
    comment:number;
    tags:Tag[];
}

export interface Tag{
    url?:string;
    name:string;
}
  