import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('token')==null || localStorage.getItem('token')==undefined) {
    Swal.fire({
      icon:'error',
      text:'Connectez-vous si vous voulez acceder à cet espace',
      title:'Oops',
      confirmButtonColor: "#1E1E1E",
    }
      
    )
    router.navigate(['/auth']);
    return false;

  }else{

    return true;
  }
};
