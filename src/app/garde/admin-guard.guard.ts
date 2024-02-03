import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('token')==null || localStorage.getItem('token')==undefined) {
    router.navigate(['/auth']);
    return false;

  }else{

    return true;
  }
};
