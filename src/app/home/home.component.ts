import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Go1Service } from '../app.service';
import { TimeService } from '../time.service';
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
    filter_text = new BehaviorSubject<string>('');
    filter_date = new BehaviorSubject<string>('');

    constructor(
        public api: Go1Service,
        public time_format: TimeService,
        public router: Router,
    ) {
        this.filter_text.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(result => this.doSearch(result, 'search'));
            
        this.filter_date.pipe(
            debounceTime(500),
            distinctUntilChanged()
            ).subscribe(result => this.doSearch(result, 'date'));
    }

    ngOnInit(): void {
        this.getCourses('', '');
    }

    getCourses(search: string, type: string): void {
        this.api.getCourses(search, type).subscribe(
            data => { 
                this.courses = data;
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

    showDetails(course: Course): void {
        this.api.selected_course = course;
        this.router.navigateByUrl('/details');
    }

    countSeats(course: Course): number {
        if(!course.AvailableSeats) {
            return 0;
        } else {
            return course.AvailableSeats.length;
        }
    }

    doSearch(searchString: string, searchType: string): void {
        this.getCourses(searchString, searchType);
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
