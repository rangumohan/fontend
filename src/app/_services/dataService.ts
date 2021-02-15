import { AppComponent } from "@/app.component";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private httpClient: HttpClient) { }
    url = "http://localhost:4000/users/";
    private subject = new BehaviorSubject<any>("");
    currentData = this.subject.asObservable()
   onclick() {
        this.subject.next("");
    }
    getClick(): Observable<any> {
        return this.subject.asObservable();
    }

    userRegister(data): Observable<any> {

        debugger
        return this.httpClient.post(`${this.url}register`, data).pipe(map(response => { return response }));
    }
    login(data): Observable<any> {
        return this.httpClient.post(`${this.url}authenticate`, data);
    }
    getUsers(id): Observable<any> {
        const params = new HttpParams().set("_id", id);
        // headers.append('_id', id);
        return this.httpClient.get(`${this.url}`, { params })
            .pipe(map(res => { return res }));
    }
    logout(): Observable<any> {
        const id = localStorage.getItem('role');
        const params = new HttpParams().set("_id", id);
        return this.httpClient.get(`${this.url}/logout`, { params })
            .pipe(map(res => { return res }));
    }
    // onclick():Observable<any> {

    //     return this.subject.asObservable();
    // }
}