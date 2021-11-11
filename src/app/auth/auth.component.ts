import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public code:string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code']
    });
    if (this.code != ""){
      this.RequestAccessToken(this.code);
    }
  }

  RequestAccessToken(code:string) {
    let form:FormData = new FormData();
    form.append("client_id", "424887959161689");
    form.append("client_secret", "9a74a81abf60f654a31d66461c0d94da");
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", "https://huys-arthur.github.io/AngularTesting/auth/");
    form.append("code", code);
    
    const body = { title: 'Angular POST Request' };
    this.http.post('https://api.instagram.com/oauth/access_token', form).subscribe(data => {
      console.log(data);
    });;
} 
}
