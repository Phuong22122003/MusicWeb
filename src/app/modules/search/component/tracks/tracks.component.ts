import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../core/models/track';
import { TrackAndWave } from '../../../../core/models/track_wave';
import { SearchService } from '../../../../core/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../../../core/services/track.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-tracks',
  standalone: false,
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit{
  tracks:TrackAndWave[] = [];
  ids!:string[];
  visibleIds!:string[];
  currentId:number = 0;
  itemsPerLoad:number=10;
  baseUrl = environment.apiBaseUrl;
  constructor(
    private searchService:SearchService,
    private trackService:TrackService,
    private route:ActivatedRoute
  ) {}
  search(query:string){
    this.searchService.searchTrackIds(query)
                      .subscribe((ids)=>{
                        this.ids = ids;
                        console.log(ids);
                        this.visibleIds=[];
                        this.loadMore();
                      })
  }
  loadMore(){
    const nextItems = this.ids.slice(this.currentId, this.currentId + this.itemsPerLoad);
    this.visibleIds.push(...nextItems); // nối thêm phần tử
    this.currentId += this.itemsPerLoad;
    if(nextItems.length>0){
      this.trackService.getTracksByIds(nextItems).subscribe((tracks)=>{
        for(let track of tracks){
          const trackAndWave:TrackAndWave = {
            id: track.id,
            name: track.title!=null?track.title:"",
            file_path: `${this.baseUrl}/file-service/audios/${track.fileName}` ,
            cover_image_path: `${this.baseUrl}/file-service/images/covers/${track.coverImageName}`,
            user_id: track.userId,
            duration: track.duration,
            create_at: track.createdAt,
            username: 'john_doe',//-> thiếu
            played:100,
            liked:100,
            comment:100,
            tags:[
              {
                url:'/tag',
                name:'Pop'
              },
              {
                url:'/tag',
                name:'Childrens'
              },
              {
                url:'/tag',
                name:'Rap'
              },
            ]
          }
          this.tracks.push(trackAndWave);
        }
      })
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      console.log('Search từ component trước:', query);
      this.search(query);
    });
  }
}