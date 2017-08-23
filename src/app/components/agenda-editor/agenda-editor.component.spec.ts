import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEditorComponent } from './agenda-editor.component';

describe('AgendaEditorComponent', () => {
  let component: AgendaEditorComponent;
  let fixture: ComponentFixture<AgendaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
