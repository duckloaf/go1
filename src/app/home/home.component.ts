import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Go1Service } from '../app.service';
import { Course } from '../course';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    courses: Course[];
    cities: string[];
    states: string[];
    countries: string[];
    filter = new BehaviorSubject<string>('');

    constructor(
        public api: Go1Service
    ) {
        this.filter.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(result => this.doSearch(result));
    }

    ngOnInit(): void {
        this.getCourses('', '');
    }

    getCourses(search: string, type: string): void {
        console.log(search + ' ' + type);
        this.api.getCourses(search, type).subscribe(
            data => { 
                this.courses = data;
                console.log("Courses", this.courses);
                // If there are no filters applied, populate the location filters
                if(type === '') {
                    // Populate the cities for the location filter
                    this.cities = this.populateCities(this.courses);
                    // Populate the states for the location filter
                    this.states = this.populateStates(this.courses);
                    // Populate the countries for the location filter
                    this.countries = this.populateCountries(this.courses);
                }
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    countSeats(course: Course): number {
        if(!course.AvailableSeats) {
            return 0;
        } else {
            return course.AvailableSeats.length;
        }
    }

    formatTime(course: Course): string {
        // Convert course UTC to local time and return a formatted time string
        // Format like "1:23 AM" or 4:06 PM"
        let d = new Date(course.Time);
        const offest = (d.getTimezoneOffset() / 60) * (-1);
        d.setHours(d.getHours() + offest);

        let ampm = "AM";
        let hours = 0;
        if(d.getUTCHours() > 12) {
            ampm = "PM";
            hours = d.getUTCHours() - 12;
        } else {
            if(d.getUTCHours() === 12) {
                ampm = "PM";
            }
            hours = d.getUTCHours();
        }
        return this.zeroPad(hours) + ":" + this.zeroPad(d.getUTCMinutes()) + " " + ampm;
    }
    // Used for formatting date strings by adding a leading '0' to a number less than 10
    zeroPad(input: number): string {
        var padded = "0"+input;
        return padded.slice(-2);
    }

    doSearch(searchString: string): void {
        this.getCourses(searchString, 'search');
    }

    onLocationSelected(location: string): void {
        if(location.includes('city_')) {
            this.getCourses(location.replace('city_', ''), 'city');
        } else if(location.includes('state_')) {
            this.getCourses(location.replace('state_', ''), 'state');
        } else if(location.includes('country_')) {
            this.getCourses(location.replace('country_', ''), 'country');
        } else {
            this.getCourses('', '');
        }
    }

    /**
     * The 'populate' functions will product a list of cities, states, and ccountries for the 'select location' filter
     * @param courses 
     */
    populateCities(courses: Course[]): string[] {
        let list = [];
        courses.forEach((course) => {
            if(!list.includes(course.Location.City)) {
                list.push(course.Location.City);
            }
        });
        return list;
    }
    populateStates(courses: Course[]): string[] {
        let list = [];
        courses.forEach((course) => {
            if(!list.includes(course.Location.State)) {
                list.push(course.Location.State);
            }
        });
        return list;
    }
    populateCountries(courses: Course[]): string[] {
        let list = [];
        courses.forEach((course) => {
            if(!list.includes(course.Location.Country)) {
                list.push(course.Location.Country);
            }
        });
        return list;
    }

}
