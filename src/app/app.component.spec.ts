    import { TestBed, async, ComponentFixture } from '@angular/core/testing';
    import { RouterTestingModule } from '@angular/router/testing';
    import { AppComponent } from './app.component';
    import { Go1Service } from './app.service';
    import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        declarations: [
            AppComponent
        ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'go1'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('go1');
    });

    it('should include the header component', () => {
        let headerElement = fixture.debugElement.query(By.css('app-header'));
        expect(headerElement).toBeTruthy();
    });

    it('should include the footer component', () => {
        let headerElement = fixture.debugElement.query(By.css('app-footer'));
        expect(headerElement).toBeTruthy();
    });
});
