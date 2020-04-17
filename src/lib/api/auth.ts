import client from './client';

interface loginInterface {
    (password: string ): Promise<any>
}

interface logoutInterface {
    () : Promise<any>
}

interface checkLoginInterface {
    () : Promise<any>
}

export const login:loginInterface = (password: string) => client.post('/api/auth/login', { password });
export const logout:logoutInterface = () => client.post('/api/auth/logout');
export const checkLogin:checkLoginInterface = () => client.get('/api/auth/check');