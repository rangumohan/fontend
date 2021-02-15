import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '@/_services';
import { DataService } from '@/_services/dataService';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    role: any = ["user", "auditor"]

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        // private userService: UserService,
        private alertService: AlertService,
        private userService: DataService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            role: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // const formdata=this.registerForm.setValue({
        //     userName: this.registerForm.value.userName,
        //     password: this.registerForm.value.password,
        //     firstName: this.registerForm.value.firstName,
        //     lastName: this.registerForm.value.lastName,
        //     role: this.registerForm.value.role
        // })
        const data = {
            userName: this.registerForm.value.userName,
            password: this.registerForm.value.password,
            firstName: this.registerForm.value.firstName,
            lastName: this.registerForm.value.lastName,
            role: this.registerForm.value.role
        }
        console.log("data  ", data);
        debugger
        this.userService.userRegister(data).subscribe(res => {
            debugger
            console.log(res);
            if (res.status = "success") {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            }
        }, error => {

            this.alertService.error(error);
        })

    }
}
