import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent implements OnInit {
  constructor(private http: HttpClient) {}
  validationErrors: any;
  ngOnInit() {}

  get404Error() {
    this.http.get('/api/products/42').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get500Error() {
    this.http.get('/api/buggy/servererror').subscribe(
      (response) => {
        console.log('res', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400Error() {
    this.http.get('/api/buggy/badrequest').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get400validationError() {
    this.http.get('/api/products/fortytwo').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    );
  }
}
