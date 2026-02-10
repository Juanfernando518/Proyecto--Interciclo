import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos el token en el almacenamiento local
  const token = localStorage.getItem('token');

  // 2. Si el token existe, clonamos la petición y le ponemos la cabecera
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // 3. Si no hay token, la petición sigue su curso normal (como en el Login)
  return next(req);
};