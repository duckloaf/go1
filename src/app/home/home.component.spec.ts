import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Go1Service } from '../app.service';
import { TimeService } from '../time.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ HomeComponent ],
        providers: [Go1Service, TimeService],
        imports: [HttpClientModule, RouterTestingModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Mock the list of courses
        component.courses = [
            {
                Title: "Place 1",
                Description: "Lorem ipsum dolor sit amet, consectetur adipi elitsed do eiusmod tempor",
                Time: "2018-07-22T02:30:00.000Z",
                Image: "co-1.jpg",
                Location: {
                    City: "Brisbane",
                    State: "Queensland",
                    Country: "Australia"
                },
                AvailableSeats: []
            },
                {
                Title: "Place 2",
                Description: "Mauris a diam maecenas sed enim ut sem viverra aliquet.",
                Time: "2018-07-24T02:30:00.000Z",
                Image: "co-2.jpg",
                Location: {
                    City: "Cairns",
                    State: "Queensland",
                    Country: "Australia"
                },
                AvailableSeats: [
                    {
                    id: "W25"
                    },
                    {
                    id: "B29"
                    },
                    {
                    id: "B52"
                    }
                ]
            },
                {
                Title: "Place 3",
                Description: "Lorem ipsum dolor sit amet, consectetur adipi elitsed do eiusmod tempor",
                Time: "2018-07-24T02:30:00.000Z",
                Image: "co-3.jpg",
                Location: {
                    City: "Gold Coast",
                    State: "Queensland",
                    Country: "Australia"
                },
                AvailableSeats: [
                    {
                    id: "W25"
                    }
                ]
            }
        ];
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly calculate the number of available seats for a course', () => {
        expect(component.countSeats(component.courses[0])).toEqual(0);
        expect(component.countSeats(component.courses[1])).toEqual(3);
        expect(component.countSeats(component.courses[2])).toEqual(1);
    });

    it('should correctly format the time for a course', () => {
        expect(component.time_format.formatTime(component.courses[0])).toEqual('12:30 PM');
    });
    
    it('should pad numbers less than 10 with a leading zero', () => {
        expect(component.time_format.zeroPad(1)).toEqual('01');
        expect(component.time_format.zeroPad(10)).toEqual('10');
        expect(component.time_format.zeroPad(1234)).toEqual('34');
    });

    it('should populate the location select box with the correct number of cities', () => {
        expect(component.populateCities(component.courses)).toEqual(['Brisbane', 'Cairns', 'Gold Coast']);
    });

    it('should populate the location select box with the correct number of states', () => {
        expect(component.populateStates(component.courses)).toEqual(['Queensland']);
    });

    it('should populate the location select box with the correct number of countries', () => {
        expect(component.populateCountries(component.courses)).toEqual(['Australia']);
    });

});
