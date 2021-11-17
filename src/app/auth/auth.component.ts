import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  public access_token:string = "";
  public user_id:string = "";
  public account_type:string = "";
  public id:string = "";
  public username:string = "";
  public profile_picture_url:string = "";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.access_token == "" || this.user_id == ""){
      this.activatedRoute.queryParams.subscribe(params => {
        this.GenerateAccessTokenAndUserId(params['code']);
      });
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
        let access_token = data["access_token"];
        let user_id = data["user_id"];

        this.GenerateUserData(user_id, access_token);
      }
    });
    
  }

  GenerateUserData(user_id:string, access_token:string){
    this.http.get<any>('https://graph.instagram.com/' + user_id + '?fields=id,username,account_type&access_token=' + access_token).subscribe(data => {
      if(data != null){
        this.id = data["id"];
        this.username = data["username"];
        this.account_type = data["account_type"];
      }
    });
    this.http.get<any>('https://graph.instagram.com/' + user_id + '?fields=id,media_type,media_url,username,timestamp&access_token=' + access_token).subscribe(data => {
      if(data != null){
        console.log(data);
        this.profile_picture_url = data["media_url"];
      }
    });
  }
}
