import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  public title: string = ""

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.route.data.subscribe(element => {
      this.title = element['title'] || '';
      this.titleService.setTitle(this.title);
    });
  }
}
