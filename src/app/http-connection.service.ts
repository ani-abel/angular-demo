import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";
import { environment as env } from "../environments/environment";

export interface User {
  Id: number;
  Name: string;
  Age: number;
  Tags: string[]
}

export interface CustomResponse {
  message: string;
  isSuccessful: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

  constructor(private readonly httpClient: HttpClient) { }

  add(payload: User): Observable<User> {
    try {
      return this.httpClient
        .post<User>(`${env.apiRoot}/api/DemoSandbox`, payload)
        .pipe(
          retry(3)
        );
    }
    catch (ex) {
      throw ex;
    }
  }

  delete(id: number): Observable<CustomResponse> {
    try {
      return this.httpClient
        .delete<CustomResponse>(`${env.apiRoot}/api/DemoSandbox/${id}`)
        .pipe(
          retry(3)
        );
    }
    catch (ex) {
      throw ex;
    }
  }

  getAll(): Observable<User[]> {
    try {
      return this.httpClient
        .get<User[]>(`${env.apiRoot}/api/DemoSandbox`)
        .pipe(
          retry(3)
        );
    }
    catch (ex) {
      throw ex;
    }
  }

  getSingle(id: number): Observable<User> {
    try {
      return this.httpClient
        .get<User>(`${env.apiRoot}/api/DemoSandbox/${id}`)
        .pipe(
          retry(3)
        );
    }
    catch (ex) {
      throw ex;
    }
  }
}
