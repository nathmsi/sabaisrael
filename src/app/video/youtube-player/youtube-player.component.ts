import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {

  @Input() idVideo: string;
  @Input() isMobile: boolean;
  @Input() widthScreen: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
