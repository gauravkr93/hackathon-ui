import { Component, OnInit, Input, HostListener, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.css']
})
export class ImageSectionComponent implements OnInit {
  @Input('imgURL') imgURL: string;
  @Input('imgWidth') imgWidth: string;
  @Input('imgHeight') imgHeight: string;
  width:any;
  height:any;
  constructor() { }
  @Output() xy: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    var image = document.getElementById('image');
    this.width = image.scrollWidth;
    this.height = image.scrollHeight;
  }

  
  onMouseMove(e) {
    var x = (e.clientX/(document.getElementById('mydiv').scrollWidth))*document.getElementById('image').scrollWidth;
    var y = (e.clientY/(document.getElementById('mydiv').scrollHeight))*document.getElementById('image').scrollHeight;
    this.xy.emit(x+","+y+"**********"+document.getElementById('image').scrollWidth+"&&&&"+document.getElementById('image').scrollHeight)
  }
}
