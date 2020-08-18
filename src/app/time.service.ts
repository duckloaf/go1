import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable()

export class TimeService {

    constructor() { }

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

    formatISOString(date_object: Date) {
        let d = new Date(date_object);
        return d.toISOString();
    }
    
    // Used for formatting date strings by adding a leading '0' to a number less than 10
    // Example: "1" -> "01"
    zeroPad(input: number): string {
        var padded = "0"+input;
        return padded.slice(-2);
    }
}