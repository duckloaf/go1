import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ FooterComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should display the footer content', () => {
        let footerElement = fixture.debugElement.query(By.css('.newsletter_container'));
        expect(footerElement).toBeTruthy();
    });
    
    it('should display the correct title', () => {
        let titleElement = fixture.debugElement.query(By.css('.newsletter_title'));
        expect(titleElement.properties.innerText).toEqual('sign up for news and offers');
    });

    it('should contain the "subscribe" button', () => {
        let subscribeElement = fixture.debugElement.query(By.css('.newsletter_button'));
        expect(subscribeElement).toBeTruthy();
    });
});
