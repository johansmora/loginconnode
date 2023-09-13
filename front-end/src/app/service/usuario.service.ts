import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string; //este es para llamar a la api
  private myApiUrl: string;// este comando es porque vamos a tener varios url de crear o login


  constructor(private http:HttpClient) {
    this.myAppUrl = environment.EndPoint
    this.myApiUrl = 'api/usuarios'
  }
  //mostrar usuarios
  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
