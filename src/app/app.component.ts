import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { StoreService } from './service/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'connectly-front';

  constructor(
    public store: StoreService
  ) {}

  ngOnInit(): void {
    initFlowbite();
  }
}
