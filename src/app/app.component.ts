import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Dating App';
  //userLoggedIn = true;
  constructor(private router: Router) {}
  ngOnInit(){

  }
  signup(){
    console.log("hello");
    this.router.navigate(['/signup']);
  }
}
