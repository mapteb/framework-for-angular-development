import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UserRole } from '../state-transitions-config/user-role.enum';
import { User } from './user.model';

/**
 * This service typically calls external REST services to get the user account data
 * Here we use hard-coded data for demo purposes
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Returns hard-coded data for demo purposes
  public login(loginId: string): Observable<User> {
    //TODO: call a REST service to get the user info
    if (loginId === 'admin') {
      return of(new User('admin', '', 'Admin User', UserRole.ADMIN));
    }
    return of(new User('loginId', '', 'Gnerale User', UserRole.USER));
  }
}
