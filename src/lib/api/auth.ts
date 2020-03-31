import client from './client';


export const login = (password: string) => client.post('/api/auth/login', { password });
export const logout = () => client.post('/api/auth/logout');
export const checkLogin = () => client.get('/api/auth/check');