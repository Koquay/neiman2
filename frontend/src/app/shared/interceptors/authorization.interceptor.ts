import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getUserToken();
  if (token) {
    const authReq = req.clone({ setHeaders: { "Authorization": "Bearer " + token } });
    console.log('authReq', authReq)
    return next(authReq);
  }
  return next(req);
};

const getUserToken = () => {
  const neiman = localStorage.getItem('neiman');
  let token = null;

  if (neiman) {
    token = JSON.parse(neiman)?.user?.token;
    console.log('authorizationTokenInterceptor token', token)
  }

  return token;
}