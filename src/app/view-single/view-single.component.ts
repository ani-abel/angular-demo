import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { HttpConnectionService, UserResponse } from '../http-connection.service';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit, OnDestroy {
  selectedUser$: Observable<UserResponse>;
  subSink: SubSink = new SubSink();

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly httpSrv: HttpConnectionService
  ) { }

  ngOnInit(): void {
    let userId: number;
    this.subSink.sink =
      this.activatedRouter.params.subscribe((data) => {
        userId = data.id;
      });

    if (userId) {
      this.selectedUser$ = this.httpSrv.getSingle(userId);
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
