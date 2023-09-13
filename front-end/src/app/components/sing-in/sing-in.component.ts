
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
hide=true;
Usuario:string = '';
Password:string='';
ConfirmPassword:string='';
loading:boolean=false;
constructor(private toastr: ToastrService,
  private _userservice:UserService,
  private router:Router){}
ngOnInit(): void {
}
//cracion del usuario
addUser(){
//validacion que el usuario ingrese los campos
if(this.Usuario==""||this.Password==''||this.ConfirmPassword==''){
  this.toastr.error('Todos los campos son obligatorios', 'Error');
  return;//para que no siga el proyecto
}
    //validar que las contraseñas son iguales
    if(this.Password != this.ConfirmPassword){
      this.toastr.error('Las contraseñas no son iguales', 'Error');
      return;
    }

    //creamos el objeto
    const user:User={
      Usuario: this.Usuario,
      Password: this.Password
    }
    this.loading = true;
    this._userservice.singIn(user).subscribe({ // estructura sacada de la documentacion https://rxjs.dev/deprecations/subscribe-arguments
      next: (v) => {
        this.loading = false;
        this.toastr.success('Usuario registrado con exito', 'Usuario Registrado');
        this.router.navigate(['/login']);},
      error: (e:HttpErrorResponse) => {  //creamos el mensaje de error por si el usuario ya se encuentra registrado    el hhtperror sisve para entrar en el error y extraer el mensaje para luego verlo en el toastr
        this.loading = false;
        if (e.error.msg){
          this.toastr.error(e.error.msg,'error');
        }else{
          this.toastr.error("Se presento un error al comunicarse con la BD","error");
        }
      }
      });
}
}
