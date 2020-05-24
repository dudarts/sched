/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventSharedComponent } from './event-shared.component';

describe('EventSharedComponent', () => {
  let component: EventSharedComponent;
  let fixture: ComponentFixture<EventSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
