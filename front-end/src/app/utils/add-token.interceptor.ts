import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {


  constructor(private router: Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token =  localStorage.getItem("token")

    //verfificar si el token existe
    if (token){
      request=request.clone({setHeaders:{Authorization:`Bearer ${token}`}})
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          if (error.error.msg){
            this.toastr.error(error.error.msg,'error');
          }else{
            this.toastr.error("Se presento un error al comunicarse con la BD","error");
          }
          this.router.navigate(['/login'])
        }
        return throwError(() => error);
      })
    );
  }
}
