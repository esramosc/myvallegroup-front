import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Object for user info
   *
   * @type {*}
   * @memberof HomeComponent
   */
  public user: any;
  /**
   * Boolean for logout button submitted
   *
   * @memberof HomeComponent
   */
  public submitted = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  /**
   * ngOnInit method
   * 
   * @memberof HomeComponent
   */
  ngOnInit() {
    this.apiService.get('auth/user').then(response => {
      this.user = response;
    }, error => {
      console.log('Error get user: ', error);
    });
  }

  public doLogout () {
    this.submitted = true;
    this.apiService.get('auth/logout').then(response => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('error logout: ', error);
      this.submitted = false;
    });
  }

}
