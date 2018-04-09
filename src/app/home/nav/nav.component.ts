import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class HomeNavComponent {

  userLoggedIn = true;

  constructor(private router:Router){}
  ngOnInit() {
        let currentUrl = this.router.url;
        console.log(currentUrl, "currentUrl");
    }
}
