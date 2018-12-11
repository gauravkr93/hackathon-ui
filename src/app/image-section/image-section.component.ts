import { Component, OnInit, Input, HostListener, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.css']
})
export class ImageSectionComponent implements OnInit, OnChanges {
  @Input('imgURL') imgURL: string;
  @Input('imgWidth') imgWidth: string;
  @Input('imgHeight') imgHeight: string;

  public width: any;
  public height: any;
  public width_ratio: any;
  public height_ratio: any;
  public scale_width: any;
  public scale_height: any;
  public scale: any;
  public imgReWidth: any;
  public imgReHeight: any;
  public natualImgWidth: any;
  public naturalImgHeight: any;

  constructor() {

  }
  @Output() xy: EventEmitter<any> = new EventEmitter();
  @Output() resizeWidth: EventEmitter<any> = new EventEmitter();
  @Output() resizeHeight: EventEmitter<any> = new EventEmitter();
  ngOnInit() {

  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {

    if (document.getElementById('image')) {
      this.natualImgWidth = document.querySelector('img').naturalWidth;
      this.naturalImgHeight = document.querySelector('img').naturalHeight;

      this.width = document.getElementById('image').clientWidth;
      this.height = document.getElementById('image').clientHeight;

      this.width_ratio = this.natualImgWidth / 500;
      this.height_ratio = this.naturalImgHeight / 500;

      console.warn("natural dimenstions ",this.natualImgWidth, this.naturalImgHeight);
      console.warn("Width", this.width, "Ratio ",this.width_ratio);

      this.scale_width = 500 / this.width;
      this.scale_height = 500 / this.height;

      this.scale = Math.min(this.scale_width, this.scale_height);

      this.imgReWidth = this.width * this.scale; 
      this.imgReHeight = this.height * this.scale;  

      console.warn("Image ratio ", this.imgReWidth, this.imgReHeight);
    }

    //this.resizeWidth.emit(this.width / this.viewWidth);
    //this.resizeHeight.emit(this.height / this.viewHeight);

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (e.clientX < document.getElementById('image').clientWidth && e.clientY < document.getElementById('image').clientHeight) {
      var x = (e.clientX / this.width_ratio);
      var y = (e.clientY / this.height_ratio);
      console.warn("X",x,"Y",y,"Original-X",Math.round(e.clientX),"Original-Y",Math.round(e.clientY),"Scaled-X",Math.round(e.clientX * this.width_ratio), "Scaled-Y",Math.round(e.clientY * this.height_ratio));
      this.xy.emit(x + "," + y + "**********" + document.getElementById('image').clientWidth + "&&&&" + document.getElementById('image').clientHeight)
    }
  }
}
