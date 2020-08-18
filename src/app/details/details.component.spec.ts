import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DetailsComponent } from './details.component';
import { Go1Service } from '../app.service';
import { TimeService } from '../time.service';
import { HttpClientModule } from '@angular/common/http';

describe('DetailsComponent', () => {
    let component: DetailsComponent;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ DetailsComponent ],
        providers: [Go1Service, TimeService],
        imports: [ HttpClientModule ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });
});
