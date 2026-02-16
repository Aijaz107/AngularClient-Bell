import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserCreateComponent } from './user-create.component';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the user form with expected controls', () => {
    expect(component.userForm).toBeTruthy();
    expect(component.userForm.get('first_name')).toBeTruthy();
    expect(component.userForm.get('last_name')).toBeTruthy();
    expect(component.userForm.get('email')).toBeTruthy();
    expect(component.userForm.get('password')).toBeTruthy();
  });

  it('should render Add New User heading and disabled submit initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Add New User');
    const submit = compiled.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    expect(submit).toBeTruthy();
    expect(submit?.disabled).toBeTrue();
  });
});
