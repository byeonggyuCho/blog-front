import client from './client';

interface loginInterface {
    ({email, password} : {email:string, password:string} ): Promise<any>
}
interface registerInterface {
    ({email, username,password} : {email:string, username: string, password:string} ): Promise<any>
}

interface logoutInterface {
    () : Promise<any>
}

interface checkLoginInterface {
    () : Promise<any>
}

export const login:loginInterface = ({email, password}) => client.post('/api/auth/login', { email, password });
export const logout:PromiseCreatorFunction<any, any> = () => client.post('/api/auth/logout');
export const checkLogin:checkLoginInterface = () => client.get('/api/auth/check');



export const checkEmailExists = (email) => client.get('/api/auth/exists/email/' + email);
export const checkUsernameExists = (username) => client.get('/api/auth/exists/username/' + username);

export const register:registerInterface = ({email, username, password}) => client.post('/api/auth/register', { email, username, password });

export const checkStatus = () => client.get('/api/auth/check');