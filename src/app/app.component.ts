import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';
import { DataService } from './_services/dataService';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: User;
    token: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private dataService: DataService
    ) {

        this.dataService.getClick().subscribe(res => { this.token = localStorage.getItem('token'); })

    }
    ngOnInit() {

    }

    logout() {
        this.authenticationService.logout();
        this.dataService.logout().subscribe(res => {
            console.log(res);
            localStorage.removeItem('token');
            this.token = "";
            this.getToken();
            this.router.navigate(['/login']);
        }, err => {
            console.log(err);
        })


    }
    getToken(): Boolean {

        return this.token !== null ? true : false;
    }

}