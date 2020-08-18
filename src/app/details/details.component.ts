import { Component, OnInit } from '@angular/core';
import { Go1Service } from '../app.service';
import { Course } from '../course';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    details: Course;

    constructor(
        public api: Go1Service
    ) { }

    ngOnInit(): void {
        this.getCourseById();
    }

    getCourseById(): void {
        this.api.getCourseById(null).subscribe(
            data => { 
                this.details = data;
                console.log("Course", data);
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    formatTime(time_string: string): string {
        let d = new Date(time_string);
        const offest = (d.getTimezoneOffset() / 60) * (-1);
        d.setHours(d.getHours() + offest);
        return d.getUTCHours() + ":" + ("0" + d.getUTCMinutes()).slice(-2);
    }

}
