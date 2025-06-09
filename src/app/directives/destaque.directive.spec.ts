import { TestBed } from '@angular/core/testing';
import { DestaqueDirective } from './destaque.directive';
import { ElementRef } from '@angular/core';


class MockElementRef extends ElementRef {
  constructor() { super(document.createElement('div')); } 
}

describe('DestaqueDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      declarations: [DestaqueDirective],
      
      providers: [{ provide: ElementRef, useClass: MockElementRef }]
    }).compileComponents();
  });

  it('should create an instance', () => {
    
    const directive = new DestaqueDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});