export interface Post {
    _id? : string
    title: string 
    body: string
    tags: string[] 
    user?:UserInfo
    publishedDate?:Date
}

export interface UserInfo {
    _id: string
    profile: {
        username:string,
        thumbnail:string
    }
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