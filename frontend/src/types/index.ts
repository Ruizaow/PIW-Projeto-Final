export type User = {
    id: number
    name: string
    username: string
    email: string
    password: string
    role: Role
    profile_picture_Url: string
    friends: User[]
    movies: Movie[]
}
  
export type Role = {
    id: number
    name: string
}

export type Movie = {
    id: number
    title: string
    releaseDate: number
    synopsis: string
    poster: Poster
}

export type Poster = {
    id: number
    imageUrl: string
}
  
export interface ApplicationError {
    name: string,
    message: string,
}