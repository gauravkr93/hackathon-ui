import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackathon-ui';
  public imagePath;
  imgURL: any;
  public message: string;
  x:any;
  y:any;
  imgWidth:any;
  imgHeight:any;
  
  preview(files) {
    if (files.length === 0)
      return;
    
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  getResizeWidth(event: any){
    console.warn("Resize width ",event*100);
    //document.getElementById("myDiv").style.width = event*100+"%";
  }
  
  getResizeHeight(event: any){
    console.warn("Resize height ",event*100);
  }

  value(xyval: any) {
    this.x=xyval;

  }
}
