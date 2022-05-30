import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit {

  @Input() title = "";
  @Input() value = "";
  @Input() sumary = "";

  constructor() { }

  ngOnInit(): void {
  
  }

}
