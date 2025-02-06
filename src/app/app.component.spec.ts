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

	it(`should have the 'lt-showcase' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('lt-showcase');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain('Hello, lt-showcase');
	});

	it('default empty message', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.message).toEqual('');
	});

	it('should have message after button press', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		app.onClick();
		expect(app.message).toEqual('Hello World');
	});

	it('should render message', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		app.onClick();
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h2')?.textContent).toContain('Hello World');
	});
});
