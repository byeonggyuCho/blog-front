import qs from 'qs';
import client from './client';
import {Post} from '../../models'

export const writePost = ({ title, body, tags }:Post) =>{
  console.log('writePost',title, body, tags );

  return  client.post('/api/posts', { title, body, tags });;
}


//  client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ _id, title, body, tags }:Post) =>
  client.patch(`/api/posts/${_id}`, {
    title,
    body,
    tags,
  });

export const removePost = id => client.delete(`/api/posts/${id}`);
