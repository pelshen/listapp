import { Component, OnInit, Input } from '@angular/core';
import * as octicons from 'octicons';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() iconName: string;

  icon: string;

  constructor() { }

  ngOnInit() {
    this.icon = octicons[this.iconName].toSVG();
  }

}
