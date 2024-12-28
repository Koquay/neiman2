import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { AuthenticationModel } from './authentication.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authSignal = signal<AuthenticationModel>(new AuthenticationModel())
  private httpClient = inject(HttpClient);
  private appService = inject(AppService);

  private toastr = inject(ToastrService);
  private url = "/api/auth"

  signin = (authData: AuthenticationModel) => {
    //console.log('authDataService.authData.signin', authData)
    return this.httpClient.put<AuthenticationModel>(this.url, { authData }).pipe(
      tap(user => {
        //console.log('userService.user tap', user)
        this.authSignal.set({ ...user })
        saveStateToLocalStorage({ user: this.authSignal() })
        console.log('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        //console.log('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })
    )
  }

  public signup = (authData: AuthenticationModel) => {
    //console.log('authDataService.authData', authData)

    return this.httpClient.post<AuthenticationModel>(this.url, { authData }).pipe(
      tap(user => {
        //console.log('userService.user tap', user)
        this.authSignal.set({ ...user })
        saveStateToLocalStorage({ user: this.authSignal() })
        //console.log('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        //console.log('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })
    )
  }
}
