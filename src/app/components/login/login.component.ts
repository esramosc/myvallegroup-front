import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Boolean for show/hide Error Message
   *
   * @memberof LoginComponent
   */
  showErrorMessage = false;
  /**
   * Error message description
   *
   * @memberof LoginComponent
   */
  errorMessage = '';
  /**
   * Boolean for submitted form
   *
   * @memberof LoginComponent
   */
  formSubmitted = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Receive the submit event in the form and call api to login
   * 
   * @param f Form properties
   */
  public sendSubmit(f: NgForm) {
    if (f.valid) {
      this.showErrorMessage = false;
      this.formSubmitted = true;
      this.doLogin(
        f.value.email,
        f.value.password
      );
    } else {
      this.showErrorMessage = true;
      this.errorMessage = 'Credentials are mandatory';
      this.formSubmitted = false;
    }
  }

  /**
   * Do call to login endpoint
   * 
   * @param email User Email
   * @param password User Password
   */
  private doLogin(email: string, password: string) {
    this.apiService.post(
      'login',
      {
        email,
        password
      }
    ).then((response: any) => {
      sessionStorage.setItem('access_credentials', JSON.stringify(response));
      this.router.navigateByUrl('home');
    }, error => {
      this.showErrorMessage = true;
      this.errorMessage = error.error;
      this.formSubmitted = false;
    } );
  }

}
