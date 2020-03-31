import qs from 'qs';
import client from './client';


export const editPost = ({id, title, body, tags}) => client.patch(`/api/posts/${id}`,{title, body, tags});

export const getPost = (id) => client.get(`/api/posts/${id}`);

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);


// export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const listposts  = ( { page, username, tag } : {page: number, username: string, tag: string} )  => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = id => client.delete(`/api/posts/${id}`);