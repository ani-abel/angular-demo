import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SubSink } from 'subsink';
import { HttpConnectionService } from '../http-connection.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  addUserForm: FormGroup;
  subSink: SubSink = new SubSink();

  constructor(private readonly httpSrv: HttpConnectionService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addUserForm = new FormGroup({
      Id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      Name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      Age: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      Tags: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit(): void {
    if(this.addUserForm.invalid) {
      return;
    }

    const { Id, Name, Age, Tags } = this.addUserForm.value;
    const tagArray: string[] = (Tags as string).split(",").map(data => data.trim());

    /**
     * Always make sure to unsubbsribe from Observable streams to avoid memory leaks
     */
    this.subSink.sink =
    this.httpSrv.add({
      Id,
      Age,
      Name,
      Tags: [...tagArray]
    })
    .subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
