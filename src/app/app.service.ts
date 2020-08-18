import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Course } from './course';

@Injectable()

export class Go1Service {
    // Create variables that will mock data from a database
    // In real life, this data would be handled by API calls
    courses: Course[];
    selected_course: Course;

    constructor(
        private http: HttpClient
    ) { }

    getCourses(search: string, type: string): Observable<any> {
        // If the data hasn't been assigned yet, pull the default list from the local file
        if(!this.courses) {
            return this.http.get('/assets/data/event.json', {responseType: 'json'}).pipe(
                tap( data => {
                    this.courses = data;
                }, 
                    error => console.error(error) 
                )
            );
        } else {
            // no filters - send whole list
            if(type === '') {
                return of(this.courses);
            }
            // Filter by search string
            // Search is case insensitive (everything is converted to lowercase)
            if(type === 'search') {
                return of(this.courses.filter((item) => {
                    return item.Title.toLowerCase().includes(search.toLowerCase()) || item.Description.toLowerCase().includes(search.toLowerCase());
                }));
            }
            // Filter by city
            if(type === 'city') {
                return of(this.courses.filter((item) => {
                    return item.Location.City.includes(search);
                }));
            }
            // Filter by state
            if(type === 'state') {
                return of(this.courses.filter((item) => {
                    return item.Location.State.includes(search);
                }));
            }
            // Filter by country
            if(type === 'country') {
                return of(this.courses.filter((item) => {
                    return item.Location.Country.includes(search);
                }));
            }
        }
        
    }

    // This will mock an API call to retrieve the details for a single course.
    // For this example, instead of hitting an endpoint, the selected course is stored
    // in a variable, so this will be returned.
    getCourseById(id: number): Observable<any> {
        return of(this.selected_course);
    }

    addNewCourse(course: Course): void {
        this.courses.push(course);
    }

    removeCourse(course: Course): void {
        this.courses = this.courses.filter((item) => {
            return item !== course
        });
    }
 
}