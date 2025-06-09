// filepath: /src/app/app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
  
  
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    
    this.isDarkMode = false;
    document.body.classList.remove('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}