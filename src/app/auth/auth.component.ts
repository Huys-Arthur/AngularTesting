import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public code: string = "";
  
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.code = params['code'];
          console.log(this.code);
      });
  }

  ngOnInit(): void {
  }
}
