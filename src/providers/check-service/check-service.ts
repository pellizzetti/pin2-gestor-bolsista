import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

interface Response {
  checked: boolean;
  msg: string;
  checkInOut: string;
}

@Injectable()
export class CheckServiceProvider {
  constructor(private http: HttpClient) {}

  public checkUser({ inOut, userId }) {
    return Observable.create(observer => {
      const body = {
        inOut,
        userId
      };

      this.http
        .post<Response>(`${API_URL}/checkinout`, body)
        .subscribe(
          res => {
            observer.next(res);
            observer.complete();
          },
          err => {
            if (err.error) {
              observer.next(err.error);
              observer.complete();
            } else {
              console.log('Ocorreu um erro', err);
            }
          }
        );
    });
  }
}
