import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCreatorComponent } from './agenda-creator.component';

describe('AgendaCreatorComponent', () => {
  let component: AgendaCreatorComponent;
  let fixture: ComponentFixture<AgendaCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
