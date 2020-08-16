export class Seat {
    id: string;
}

export class Course {
    Title: string;
    Description: string;
    Time: string;
    Image: string;
    Location: {
        City: string;
        State: string;
        Country: string;
    };
    AvailableSeats: Seat[];
}