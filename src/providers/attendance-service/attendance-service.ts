import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

export interface AttendanceResponse {
  success: boolean;
  message: string;
  attendance: any;
}

export interface AttendanceListResponse {
  success: boolean;
  message: string;
  attendancesList: any;
}

@Injectable()
export class AttendanceServiceProvider {
  constructor(private http: HttpClient) {}

  public save({ student, description, userId}) {
    if (student === null || description === null || userId === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      const body = {
        student,
        description,
        userId
      };
      
      return this.http.post<AttendanceResponse>(`${API_URL}/attendance`, body).map(res => res);
    }
  }

  public getAttendanceList() {
    return this.http.get<AttendanceListResponse>(`${API_URL}/attendances`, {}).map(res => res);
  }
}
