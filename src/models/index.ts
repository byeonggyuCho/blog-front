// 인터페이스 등록

export interface Post {
    _id: string,
    title: string,
    tags: string[],
    markdown?: string,
    body?: string,
    publishedDate?: string
    user? : any
}

export interface RequestPayload {
    tag:string, 
    username?:string, 
    page?: number
}

export interface Meta {
    [propName: string]: any
}