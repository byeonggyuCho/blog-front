import client from './client';
import {LoginInfo} from '../../models'



// type의 기본값을 적용할 수 있나..?
interface requestInterface<reqData, resData> {
  (req?:reqData): Promise<resData>
}


// 로그인
export const login:requestInterface<LoginInfo,any> = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 회원가입
export const register:requestInterface<LoginInfo,any> = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check:requestInterface<any,any> = () => client.get('/api/auth/check');

// 로그아웃
export const logout:requestInterface<any,any> = () => client.post('/api/auth/logout');
