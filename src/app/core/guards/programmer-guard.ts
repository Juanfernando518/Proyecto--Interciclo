import { CanActivateFn } from '@angular/router';

export const programmerGuard: CanActivateFn = (route, state) => {
  return true;
};
