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
  public access_token:string = "IGQVJVSzlwSkFxMlJrVE0tM1puVVVHUFNmY1R0R0dxOEJ0N3A0d3hENlVvQ0djOVlCYmZA2enM4anozV3JaMUlPcGozeTlNLW5xck9KWnZAqYU1WcFRwUjhJOHpJWlZATNW9Bd0poTmtoNXJkS0VPZAW4zeExSVVByMXJRN2pV";
  public user_id:string = "17841405756412840";
  public account_type:string = "";
  public id:string = "";
  public username:string = "";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code']
    });
    if (this.access_token != "" && this.user_id != ""){
      this.GenerateUserData(this.user_id, this.access_token);
    }
    else {
      this.GenerateAccessTokenAndUserId(this.code);
    }
  }

  GenerateAccessTokenAndUserId(code:string){
    let form:FormData = new FormData();
    form.append("client_id", "424887959161689");
    form.append("client_secret", "9a74a81abf60f654a31d66461c0d94da");
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", "https://huys-arthur.github.io/AngularTesting/auth/");
    form.append("code", code);
    
    this.http.post<any>('https://api.instagram.com/oauth/access_token', form).subscribe(data=> {
      if(data != null){
        this.access_token = data["access_token"];
        this.user_id = data["user_id"];
      }
    });
  }

  GenerateUserData(user_id:string, access_token:string){
    let data:any = this.http.get<any>('https://graph.instagram.com/me?fields=id,username&access_token=' + this.access_token).subscribe(data => {
      console.log(data);
      if(data != null){
        this.id = data["id"];
        this.username = data["username"];
      }
    });
  }
}
