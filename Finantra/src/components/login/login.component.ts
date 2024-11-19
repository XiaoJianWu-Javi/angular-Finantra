import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/loginService/login-service.service';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected form: FormGroup;
  constructor(private login: LoginService, private builder: FormBuilder, private util:UtilsService){
    this.form=this.builder.group({
       email:['', [Validators.required, Validators.email]],
       password:['', Validators.required]
    });
  }
  
  logIn():void{
    if(this.form.valid){
      this.login.checkUser(this.form.value).subscribe(
        (data)=>{
          console.log(data);
          this.util.auth.login();
          this.util.redirect.navigate(["/home"]);
        }, 
        (error)=>{
          const err = document.getElementById("error");
          if (err) {
            err.style.visibility = "visible";
          }
          console.log(error);
        }
      );
    }
  }
}
