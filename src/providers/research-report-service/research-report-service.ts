import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

export interface ResearchReportResponse {
  success: boolean;
  message: string;
  researchReport: any;
}

export interface ResearchReportListResponse {
  success: boolean;
  message: string;
  researchReportList: any;
}

@Injectable()
export class ResearchReportServiceProvider {
  constructor(private http: HttpClient) {}

  public save({ student, description }, userId) {
    if (student === null || description === null || userId === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      const body = {
        student,
        description,
        userId
      };

      return this.http.post<ResearchReportResponse>(`${API_URL}/researchreport`, body).map(res => res);
    }
  }

  public getResearchReportList() {
    return this.http.get<ResearchReportListResponse>(`${API_URL}/researchreports`, {}).map(res => res);
  }
}
