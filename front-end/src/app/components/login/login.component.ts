import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 Usuario:string = "";
 Password:string="";
 loading:boolean=false;
  hide=true;
  constructor(private toastr: ToastrService,
    private _userService:UserService,
    private router:Router){} // las variables de servicio empiezan con _ y los obserbables con $
  ngOnInit(): void {
  }
  login(){
    //validamos que el usuario ingrese datos
    if(this.Usuario=="" || this.Password==""){
      this.toastr.error("Todos los campos son obligatorios")
      return;
  }
  //creamos el body
  const user: User = {
    Usuario: this.Usuario,
    Password: this.Password
  }
  //cargar y redireccionar al dashboard
  this.loading=true;
  this._userService.Login(user).subscribe({
    next:(token)=>{//obtener el token
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard'])
    },
    error:(e:HttpErrorResponse)=>{
      this.loading=false;
      if (e.error.msg){
        this.toastr.error(e.error.msg,'error');
        this.Usuario="";
        this.Password="";
      }else{
        this.toastr.error("Se presento un error al comunicarse con la BD","error");
      }
    }
  })

}
}
