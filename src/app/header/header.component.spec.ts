import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ HeaderComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should display the header content', () => {
        let headerElement = fixture.debugElement.query(By.css('.header_content'));
        expect(headerElement).toBeTruthy();
    });

    it('should display the correct logo text', () => {
        let textElement = fixture.debugElement.query(By.css('.logo_text'));
        expect(textElement.properties.innerText).toEqual('Go1 by Michael');
    });

    it('should have 2 menu items', () => {
        let navElement = fixture.debugElement.query(By.css('.main_nav'));
        expect(navElement.children.length).toEqual(2);
    });

    it('should set the "home" nav menu to active by default', () => {
        let navElement = fixture.debugElement.query(By.css('.main_nav'));
        console.log(navElement)
        expect(navElement.children[0].nativeNode.className).toEqual('active');
    });
});
