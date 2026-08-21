import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="test-class">
      <a href="test-link">Test Link</a>
    </nav>
  `,
})
class MockNavbar {}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    // ! #1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])],
    // }).compileComponents();

    // ! #2
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])],
    // })
    //   .overrideComponent(App, {
    //     add: {
    //       imports: [MockNavbar],
    //     },
    //     remove: {
    //       imports: [Navbar],
    //     },
    //   })
    //   .compileComponents();

    // ! #3
    TestBed.overrideComponent(App, {
      set: {
        imports: [MockNavbar],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;

    // console.log(fixture.nativeElement.innerHTML);

    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  // En caso de que se quiere comprobar que el HTML no se ha modificado. Cuando se ejecuta por primera vez, se genera un snapshot y se guarda en el proyecto. En las siguientes ejecuciones, se compara con el snapshot guardado.
  // Si queremos generar otro snapshot, se puede pulsar la tecla u en la terminal y se generará un nuevo snapshot, cuando se está ejecutando el test.
  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.innerHTML).toMatchSnapshot();
  });
});
