import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-image',
  templateUrl: './no-image.component.html',
  styleUrls: ['./no-image.component.css']
})
export class NoImageComponent {
  // @Input() size1!: number;
  // @Input() size2!: number;
  @Input() size!: number;
}
