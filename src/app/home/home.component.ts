import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { DataService } from '@/_services/dataService';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    items = [];
    config: any;
    collection = { count: 0, data: [] };
    pageOfItems: Array<any>;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private dataService: DataService
    ) {

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.collection.count
        };
        this.currentUser = this.authenticationService.currentUserValue;
        this.dataService.onclick();
    }

    ngOnInit() {
        this.dataService.onclick();
        this.loadAllUsers();
        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.collection.count
        };

    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        debugger;
        this.pageOfItems = pageOfItems;
    }
    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
    loadAllUsers() {
        debugger;
        const id = localStorage.getItem('role');

        this.dataService.getUsers(id)
            .subscribe(users => {
                console.log(users);
                this.collection.data = users.data
                // this.collection.count = users.data.length();

            });
    }
    pageChanged(event) {
        this.config.currentPage = event;
    }
    // private loadAllUsers() {
    //     this.userService.getAll()
    //         .pipe(first())
    //         .subscribe(users => this.users = users);
    // }
}