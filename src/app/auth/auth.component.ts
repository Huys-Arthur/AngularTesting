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
  private access_token:string = "";
  private user_id:string = "";
  public account_type:string = "";
  public id:string = "";
  public username:string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code']
    });
    if (this.code != ""){
      let data = this.RequestAccessToken(this.code);
      this.access_token = data["access_token"];
      this.user_id = data["user_id"];
    }
    if (this.access_token != "" && this.user_id != ""){
      let data:any = this.http.get("https://graph.instagram.com/v12.0/" + this.user_id + "?fields=account_type,id,username,&access_token=" + this.access_token);
      console.log(data);
      this.account_type = data["account_type"];
      this.id = data["id"];
      this.username = data["username"];
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
    
    const body = { title: 'Angular POST Request' };
    this.http.post('https://api.instagram.com/oauth/access_token', form).subscribe(data => {
      return data;
    });;
  }
}
