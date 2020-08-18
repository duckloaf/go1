import { Component, OnInit } from '@angular/core';
import { Go1Service } from '../app.service';
import { TimeService } from '../time.service';
import { Course, Seat } from '../course';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    selected_course: Course;

    constructor(
        public api: Go1Service,
        public time_format: TimeService
    ) { }

    ngOnInit(): void {
        
    }

    editCourse(course: Course): void {
        this.selected_course = course;
    }

    addCourseInit(): void {
        // Initialise the fields and re-use the edit form
        this.selected_course = new Course;
        this.selected_course.Title = '';
        this.selected_course.Description = '';
        this.selected_course.Time = '';
        this.selected_course.Location = {Country: '', State: '', City: ''};
        this.selected_course.AvailableSeats = [];
    }

    addCourse(): void {
        // Randomly assign an image to the new course
        let img_no = Math.floor(Math.random() * 7) + 9;
        this.selected_course.Image = `co-${img_no}.jpg`;
        // Call the API to insert the details of the new course
        this.api.courses.push(this.selected_course);
    }

    deleteCourse(course: Course): void {
        this.api.removeCourse(course);
    }

    removeSeat(seat: Seat): void {
        this.selected_course.AvailableSeats = this.selected_course.AvailableSeats.filter((item) => {
            return item !== seat
        });
    }

    addSeat(seat_id: string): void {
        // Add condition if the AvailableSeats array is not present
        if(!this.selected_course.AvailableSeats) {
            this.selected_course.AvailableSeats = [];
        }
        this.selected_course.AvailableSeats.push({id: seat_id});
    }

}
