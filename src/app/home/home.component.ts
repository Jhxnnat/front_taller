import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // variable to track the active link
  public activeLink: string = 'home';
  public title: string = ""

  // constructor to set the title based on route data
  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.route.data.subscribe(element => {
      this.title = element['title'] || '';
      this.titleService.setTitle(this.title);
    });
  }

  // method to set the active link
  public linkStatus(link: string) {
    this.activeLink = link;
  }
}
