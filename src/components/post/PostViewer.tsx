import React from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';


interface PostProp {
    title:string
    tags:string[]
    body: string
    publishedDate: string
}

const Post: React.FC<PostProp> = ( { title, tags, body, publishedDate })=> (
    <div>
        <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
        <PostBody body={body}/>
    </div>
)


export default Post
