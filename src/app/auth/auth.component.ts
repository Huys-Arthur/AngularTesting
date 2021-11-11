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
  public access_token:string = "";
  public user_id:string = "";
  public account_type:string = "";
  public id:string = "";
  public username:string = "";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code']
    });
    if (this.code != ""){
      let data = this.RequestAccessToken(this.code);
      console.log(data);
      if(data != null){
        this.access_token = data["access_token"];
        this.user_id = data["user_id"];
      }
      else{
        console.log("data with token is null");
      }
    }
    if (this.access_token != "" && this.user_id != ""){
      let data:any = this.http.get("https://graph.instagram.com/v12.0/" + this.user_id + "?fields=account_type,id,username,&access_token=" + this.access_token);
      if(data != null){
        console.log(data);
        this.account_type = data["account_type"];
        this.id = data["id"];
        this.username = data["username"];
      }
      else {
        console.log("data with profile_data is null")
      }
    }
  }

   RequestAccessToken(code:string):any{
    let data:any = null;
    let form:FormData = new FormData();
    form.append("client_id", "424887959161689");
    form.append("client_secret", "9a74a81abf60f654a31d66461c0d94da");
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", "https://huys-arthur.github.io/AngularTesting/auth/");
    form.append("code", code);
    
    this.http.post('https://api.instagram.com/oauth/access_token', form).subscribe(data => {
      return data;
    });;
  }
}
