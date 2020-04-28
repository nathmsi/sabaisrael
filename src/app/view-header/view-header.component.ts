import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.css']
})
export class ViewHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() url: string;


  paddindtop: string = '';
  paddindbottom: string = '';

  constructor(
    private _sanitizer: DomSanitizer,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.url) {
      this.paddindtop = '120px';
      this.paddindbottom = '120px';
      //this.getImage(this.url);
    } else {
      this.paddindtop = '55px';
      this.paddindbottom = '55px';
    }
  }

   getBackground() {
    if (this.url) {
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)) , url(../../assets/${this.url})`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(``);
    }
  }

  getImage(url_: string) {
    this.httpClient.get('../../assets/' + url_,  {responseType: "blob"}).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

}
