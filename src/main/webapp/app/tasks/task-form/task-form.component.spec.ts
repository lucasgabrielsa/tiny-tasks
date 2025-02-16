import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { BASE_URL } from '../../app.tokens';

import { TaskService } from '../task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['create'])
      },
      {
        provide: BASE_URL, useValue: 'http://backend.tld'
      }]
    }).overrideTemplate(TaskFormComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate a task', () => {
    expect(component.taskForm.invalid).toBe(true);
    component.taskForm.setValue({ name: 'My task' });
    expect(component.taskForm.invalid).toBe(false);
  });

  it('should create a task', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));

    // when
    component.onSubmit();

    // then
    expect(taskService.create).toHaveBeenCalledWith('My task', undefined);
  });

  it('should emit the task after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));
    const createEmitter = spyOn(component.created, 'emit');

    // when
    component.onSubmit();

    // then
    expect(createEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
  });

  it('should reset the form after creation', () => {
    // given
    component.taskForm.setValue({ name: 'My task' });
    taskService.create.and.returnValue(of({ id: 'id', name: 'My task' }));
    const formReset = spyOn(component.taskForm, 'reset');

    // when
    component.onSubmit();

    // then
    expect(formReset).toHaveBeenCalled();
  });
});
