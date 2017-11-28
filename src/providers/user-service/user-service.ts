import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

export interface UserResponse {
  success: boolean;
  message: string;
  user: any;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  usersList: any;
}

@Injectable()
export class UserServiceProvider {
  constructor(private http: HttpClient) {}

  public save({ name, email, password, level, area }) {
    if (name === null || email === null || password === null || level === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      const body = {
        name,
        email,
        password,
        level,
        area: level === 'bolsista' ? area : null
      };
      
      return this.http.post<UserResponse>(`${API_URL}/user`, body).map(res => res);
    }
  }

  public getUserList() {
    return this.http.get<UserListResponse>(`${API_URL}/users`, {}).map(res => res);
  }
}
