import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string; //este es para llamar a la api
  private myApiUrl: string;// este comando es porque vamos a tener varios url de crear o login


  constructor(private http:HttpClient) {
    this.myAppUrl = environment.EndPoint
    this.myApiUrl = 'api/users/'
  }

  //servicio para poder crear el usuario
  singIn(user:User):Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);

  }
  Login(user:User):Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, user);
}
}
