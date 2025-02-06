import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('mouse move set coordinates', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		const event =  {clientX: 20, clientY: 30};
		app.onMouseMove(event)
		expect(app.xPos).toEqual('20px');
		expect(app.yPos).toEqual('30px');
	});

	it('click toggles radius', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.radius).toEqual('0px')
		app.onClick();
		expect(app.radius).toEqual('250px')
		app.onClick();
		expect(app.radius).toEqual('0px')
	});
});
