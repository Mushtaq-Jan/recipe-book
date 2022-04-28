import { TestBed } from '@angular/core/testing';

import { RecipeEditGuard } from './recipe-edit.guard';

describe('RecipeEditGuard', () => {
  let guard: RecipeEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
