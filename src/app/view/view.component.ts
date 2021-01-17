import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConnectionService, UserResponse } from '../http-connection.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  allUsers$: Observable<UserResponse[]>;

  constructor(private readonly httpSrv: HttpConnectionService) { }

  ngOnInit(): void {
    this.allUsers$ = this.httpSrv.getAll();
  }

}
