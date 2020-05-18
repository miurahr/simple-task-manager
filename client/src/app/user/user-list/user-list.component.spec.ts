import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../project/project.service';
import { CurrentUserService } from '../current-user.service';
import { Project } from '../../project/project.material';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../common/error.service';
import { MockRouter } from '../../common/mock-router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let projectService: ProjectService;
  let currentUserService: CurrentUserService;
  let errorService: ErrorService;
  let routerMock: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        ProjectService,
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    })
      .compileComponents();

    projectService = TestBed.inject(ProjectService);
    currentUserService = TestBed.inject(CurrentUserService);
    errorService = TestBed.inject(ErrorService);
    routerMock = TestBed.inject(Router);

    spyOn(currentUserService, 'getUserName').and.returnValue('test-user');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should detect removable users', () => {
    component.project = new Project('1', 'test project', 'lorem ipsum', ['2', '3'], ['test-user', 'user-a', 'user-b'], 'test-user');
    expect(component).toBeTruthy();

    expect(component.canRemove('test-user')).toBeFalse();
    expect(component.canRemove('user-a')).toBeTrue();
    expect(component.canRemove('user-b')).toBeTrue();
  });

  it('should remove user correctly', () => {
    const removeUserSpy = spyOn(projectService, 'removeUser').and.callThrough();
    component.project = new Project('1', 'test project', 'lorem ipsum', ['2', '3'], ['test-user', 'user-a', 'user-b'], 'test-user');
    expect(component).toBeTruthy();

    component.onRemoveUserClicked('user-a');

    expect(removeUserSpy).toHaveBeenCalledWith('1', 'user-a');
  });

  it('should show error on error', () => {
    spyOn(routerMock, 'navigate').and.callThrough();
    const removeUserSpy = spyOn(projectService, 'removeUser').and.returnValue(throwError('test error'));
    const errorServiceSpy = spyOn(errorService, 'addError').and.callThrough();

    component.project = new Project('1', 'test project', 'lorem ipsum', ['2', '3'], ['test-user', 'user-a', 'user-b'], 'test-user');
    expect(component).toBeTruthy();

    component.onRemoveUserClicked('user-a');

    expect(removeUserSpy).toHaveBeenCalledWith('1', 'user-a');
    expect(errorServiceSpy).toHaveBeenCalled();
  });
});
