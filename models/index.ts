export interface Post {
    id : string
    title: string 
    body: string
    tags: string[] 
    user:User
    publishedDate:Date
}


export interface LoginInfo {
    username : string
    password : string
}

export interface User {
    _id?: string
    username: string
    password: string
}