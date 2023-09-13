import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuarios';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  listUsuarios:Usuario[]=[]
 constructor(private _UsuariosService:UsuarioService){}
 ngOnInit(): void {
  this.getUsuarios();
 }
 getUsuarios(){
  this._UsuariosService.getUsuarios().subscribe(data=>{
   const hola = this.listUsuarios=data;
    console.log(hola)
  })
 }
}
