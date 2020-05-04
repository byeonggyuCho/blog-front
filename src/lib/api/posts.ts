import qs from 'qs';
import client from './client';
import {Post} from '../../models'


interface AsyncAPI<reqData, resData> {
  (req?:reqData): Promise<resData>
}



export const writePost:AsyncAPI<Post,any> = ({ title, body, tags }) =>{

  return  client.post('/api/posts', { title, body, tags });;
}


//  client.post('/api/posts', { title, body, tags });

export const readPost:AsyncAPI<string,any> = id => client.get(`/api/posts/${id}`);


interface listPostsRequestData {
  page: string
  username:string
  tag:string
}


export const listPosts:AsyncAPI<listPostsRequestData,any> = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get(`/api/posts?${queryString}`);
};

export const updatePost:AsyncAPI<Post,any> = ({ _id, title, body, tags }) =>
  client.patch(`/api/posts/${_id}`, {
    title,
    body,
    tags,
  });

export const removePost:AsyncAPI<string,any> = id => client.delete(`/api/posts/${id}`);
