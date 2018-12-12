import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http'

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
  categories: Array<string> = [];
  x: any;
  y: any;
  imgWidth: any;
  imgHeight: any;
  filename: any;
  rendereddata: any;
  startx: any;
  starty: any;
  endx: any;
  endy: any;
  count: number = 0;
  valueCount: number = 0;
  buttonhide: boolean = false;
  showMl: boolean = false;
  showDynForm: boolean = false;
  merchant: any;
  category: any;
  date: any;
  total: any;
  mlButtonFlag: boolean = false;

  constructor(private http: HttpClient) {
    this.categories = ['Flight', 'Healthcare', 'Medicine', 'Hotel', 'Food', 'Stationery'];
  }

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
      this.filename = "newFile" + Math.floor((Math.random() * 100000) + 1);
      this.http.post("http://35.229.106.36:5000/upload/" + this.filename + ".jpg", uploadData).subscribe(
        (data: any) => {
          console.log(data);
          this.mlButtonFlag = true;
        });
    }
  }

  valuestart(xyval: any) {
    this.startx = xyval.split(",", 2)[0];
    this.starty = xyval.split(",", 2)[1];
  }

  valueend(xyval: any) {
    this.endx = xyval.split(",", 2)[0];
    this.endy = xyval.split(",", 2)[1];
    this.buttonhide = true;
  }

  delete(event: any) {
    console.warn(event);
  }

  machineL() {
    this.http.get("http://35.229.106.36:5000/ml/" + this.filename + ".jpg")
      .subscribe((res: any) => {
        console.log(res);
        this.showMl = true;
        // document.getElementById("category").setAttribute("value",res.category);
        // document.getElementById("merchant").setAttribute("value",res.org);
        // document.getElementById("date").setAttribute("value",res.date);
        // document.getElementById("total").setAttribute("value",res.total);
        this.category = res.category;
        this.merchant = res.org;
        this.date = res.date;
        this.total = res.total;

        console.warn("here ", this.category);
        document.getElementById(this.category).setAttribute('selected','selected');

      });
  }

  getData() {
    this.showDynForm = true;
    this.http.get("http://35.229.106.36:5000/get_text/" + this.filename + ".jpg/" + this.startx + "/" + this.starty + "/" + this.endx + "/" + this.endy)
      .subscribe(
        (res: any) => {
          this.valueCount++;
          if (this.count % 2 == 0) {
            this.rendereddata = res.data;
            var div = document.createElement("div");
            div.className = "row custom-row";
            var cont = document.getElementById("dynamic-form");
            div.id = "form-div-" + this.valueCount;
            cont.appendChild(div);
            div.style.marginBottom = '10px';
            var div2 = document.createElement("div");
            div2.className = "col-lg-1 col-md-1"
            div.appendChild(div2);
            var el = document.createElement("input");
            el.type = "text";
            el.id = "form-text-" + this.valueCount;
            el.className = "col-lg-3 col-md-3";
            el.value = res.data;
            div.appendChild(el);
            var div1 = document.createElement("div");
            div1.className = "col-lg-1 col-md-1"
            div.appendChild(div1);
            this.count++;
          } else {
            this.rendereddata = res.data;
            this.rendereddata = res.data;
            var el = document.createElement("input");
            el.type = "text";
            el.id = "form-value-" + this.valueCount;
            el.value = res.data;
            el.className = "col-lg-3 col-md-3";
            var cont = document.getElementById("form-div-" + (this.valueCount - 1));
            cont.appendChild(el);
            var div1 = document.createElement("div");
            div1.className = "col-lg-1 col-md-1"
            cont.appendChild(div1);
            el = document.createElement("input");
            el.className = "btn btn-danger";
            el.style.textAlign = 'center';
            el.type = "button";
            el.id = "delete-value-" + this.valueCount;
            el.value = "-";
            el.addEventListener('click', (event: any) => {
              document.getElementById('form-div-' + (Number(event.srcElement.id.split("-", 3)[2]) - 1).toString()).remove();
            });
            el.className = "col-lg-1 col-md-1";
            cont.appendChild(el);
            //cont.appendChild(document.createElement("br"));
            this.count++;
          }
        }
      )
  }

}
