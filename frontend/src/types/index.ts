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
    reviews: Review[]
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
    reviews: Review[]
}

export type Poster = {
    id: number
    imageUrl: string
}

export type Review = {
    id: number
    rating: number
    review: string
}
  
export interface ApplicationError {
    name: string,
    message: string,
}