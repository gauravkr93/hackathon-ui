import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){}
  title = 'hackathon-ui';
  public imagePath;
  imgURL: any;
  public message: string;
  x:any;
  y:any;
  imgWidth:any;
  imgHeight:any;
  filename : any;
  rendereddata : any;
  startx:any;
  starty:any;
  endx:any;
  endy:any;
  count:number=0;
  valueCount: number=0;
  buttonhide:boolean=false;

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
      const uploadData = new FormData();
      uploadData.append('file', files[0]);
      this.filename="newFile"+Math.floor((Math.random() * 100000) + 1);
      this.http.post("http://35.229.106.36:5000/upload/"+this.filename+".jpg",uploadData).subscribe(
        (data:any) => {
          console.log(data);
        });
    }
  }

  getResizeWidth(event: any){
    console.warn("Resize width ",event*100);
    //document.getElementById("myDiv").style.width = event*100+"%";
  }
  
  getResizeHeight(event: any){
    console.warn("Resize height ",event*100);
  }

  valuestart(xyval: any) {
    this.startx=xyval.split(",",2)[0];
    this.starty=xyval.split(",",2)[1];
  }

  valueend(xyval: any) {
    this.endx=xyval.split(",",2)[0];
    this.endy=xyval.split(",",2)[1];
    this.buttonhide=true;
  }

  delete(event:any) {
    console.log(event);
  }

  getData(){
    this.http.get("http://35.229.106.36:5000/get_text/"+this.filename+".jpg/"+this.startx+"/"+this.starty+"/"+this.endx+"/"+this.endy)
    .subscribe(
      (res:any) => {
        this.valueCount++;
        if(this.count%2==0){
        this.rendereddata = res.data;
        var el = document.createElement("input");
        el.type = "text";
        el.id = "form-text-"+this.valueCount;
        el.value= res.data;
        var cont = document.getElementById("dynamic-form");
        cont.appendChild(el);
        this.count++;
        } else {
        this.rendereddata = res.data;
        this.rendereddata = res.data;
        var el = document.createElement("input");
        el.type = "text";
        el.id = "form-value-"+this.valueCount;
        el.value= res.data;
        var cont = document.getElementById("dynamic-form");
        cont.appendChild(el);
        el = document.createElement("input");
        el.type = "submit";
        el.id = "delete-value-"+this.valueCount;
        el.value = "delete";
        el.click = function(){
          console.log("123");
        };
        cont.appendChild(el);
        cont.appendChild(document.createElement("br"));
        this.count++;
        }

      }
    )
  }

}
