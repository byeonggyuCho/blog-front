import qs from 'qs';
import client from './client';


interface editPostInterface {
 (props: {id:string, title:string, body:string, tags: string}): Promise<any>
}

interface getPostInterface {
  (id : string ) : Promise<any>
}

interface writePostInterface {
  (props : {title: string, body:string, tags: string }) : Promise<any>
}

interface readPostInterface {
  (id: string) : Promise<any>
}

interface listpostsInterface {
  (props : {page: number, username: string, tag: string}) : Promise<any>
}

interface updatePostInterface {
  (props:{ id:string , title:string , body:string , tags:string  }) : Promise<any>
}

interface removePostInterface {
  (  id : string ) : Promise<any>
}


export const editPost:editPostInterface = ({id, title, body, tags}) => client.patch(`/api/posts/${id}`,{title, body, tags});

export const getPost:getPostInterface = (id) => client.get(`/api/posts/${id}`);

export const writePost:writePostInterface = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost:readPostInterface = id => client.get(`/api/posts/${id}`);


// export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const listposts:listpostsInterface  = ( { page, username, tag } )  => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get(`/api/posts?${queryString}`);
};


export const updatePost:updatePostInterface = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
});



export const removePost : removePostInterface = id => client.delete(`/api/posts/${id}`);