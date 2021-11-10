import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public code: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log(this.code);
      this.sendPostRequest();
    });
  }

  sendPostRequest() {
    let headers = { 
      'client-id': '424887959161689',
      'client_secret': '9a74a81abf60f654a31d66461c0d94da',
      'grant_type': 'authorization_code',
      'redirect_uri': 'https://huys-arthur.github.io/AngularTesting/auth/', 
      'code': `${this.code}`};
    console.log(headers);
    const body = { title: 'Angular POST Request' };
    this.http.post<any>('https://api.instagram.com/oauth/access_token', body, { headers }).subscribe(data => {
      console.log(data);
  });;
} 
}
