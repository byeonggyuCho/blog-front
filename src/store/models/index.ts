export interface Post {
    _id: string,
    title: string,
    tags: string[],
    markdown?: string,
    body?: string,
    publishedDate?: string
}



export interface Responce<T> {
    data: T,
    headers: object,
    [propName: string]: any
}