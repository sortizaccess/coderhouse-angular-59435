import { CanActivateFn, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';


export const dashboardGuard: CanActivateFn = () => {
  const dashboardService = inject(DashboardService);
  const router = inject(Router);

  return dashboardService.validarToken().pipe(map((esValido) => esValido || router.createUrlTree(['dashboard','notfound'])));
};