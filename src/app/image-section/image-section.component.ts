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
  public scaleWidthRatio: any;
  public scaleHeightRatio: any;

  constructor() {

  }

  @Output() xy: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {

    if (document.getElementById('image')) {
      // GET the natural dimensions of the image
      this.natualImgWidth = document.querySelector('img').naturalWidth;
      this.naturalImgHeight = document.querySelector('img').naturalHeight;
      // get the rendered image dimensions
      this.width = document.getElementById('image').clientWidth;
      this.height = document.getElementById('image').clientHeight;
      // calculate the scaling ratio for image
      this.width_ratio = this.width / 500;
      this.height_ratio = this.height / 500;
      // width and height for the scaled image
      this.scale_width = 500 / this.natualImgWidth;
      this.scale_height = 500 / this.naturalImgHeight;

      this.scaleWidthRatio = this.natualImgWidth / 500;
      this.scaleHeightRatio = this.naturalImgHeight / 500;

      this.scale = Math.min(this.scale_width, this.scale_height);
      // Finally resized image dimensions
      this.imgReWidth = this.natualImgWidth * this.scale;
      this.imgReHeight = this.naturalImgHeight * this.scale;

    }

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (document.getElementById('image') && e.clientX < document.getElementById('image').clientWidth && e.clientY < document.getElementById('image').clientHeight) {
      var x = (e.clientX / this.width_ratio);
      var y = (e.clientY / this.height_ratio);
      console.warn("Original X", Math.round(e.clientX) , "Original Y", Math.round(e.clientY) , "Scaled-X", Math.round(x * this.scaleWidthRatio), "Scaled-Y", Math.round(y * this.scaleHeightRatio));
      this.xy.emit("Original X" + Math.round(e.clientX) + "," + "Original Y" + Math.round(e.clientY) + "****Scaled*****" + Math.round(x * this.scaleWidthRatio) + "&&&&" + Math.round(y * this.scaleHeightRatio));
    }
  }
}
