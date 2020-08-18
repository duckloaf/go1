import { Component, OnInit } from '@angular/core';
import { Go1Service } from '../app.service';
import { TimeService } from '../time.service';
import { Course } from '../course';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    details: Course;

    constructor(
        public api: Go1Service,
        public time_format: TimeService,
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
}
