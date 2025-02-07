import { TestBed } from "@angular/core/testing"
import { HomeComponent } from "./home.component"

describe('HomeComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent],
		}).compileComponents();
	});

	it('should create the component', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('mouse move set coordinates', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const app = fixture.componentInstance;
		const event =  {clientX: 20, clientY: 30};
		app.onMouseMove(event)
		expect(app.xPos).toEqual('20px');
		expect(app.yPos).toEqual('30px');
	});

	it('click toggles radius', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const app = fixture.componentInstance;
		expect(app.radius).toEqual('0px')
		app.onClick();
		expect(app.radius).toEqual('250px')
		app.onClick();
		expect(app.radius).toEqual('0px')
	});
});
