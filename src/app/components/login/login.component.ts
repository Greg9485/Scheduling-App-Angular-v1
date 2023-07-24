import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";
  allowLogin: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.userName != "" && this.password!= ""){
      this.allowLogin=true;
    }
  }

  invalidCredentials(){
    const err = window.alert("Invalid Username or Password!")
  }

}
