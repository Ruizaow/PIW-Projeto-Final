import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { Movie } from '@/types';

export const useMovieStore = defineStore('movie', () => {
    const movie = ref<Movie>({
        id:                     Number(localStorage.getItem('id')),
        title:                  localStorage.getItem('title') || "",
        releaseDate:            Number(localStorage.getItem('releaseDate')),
        synopsis:               localStorage.getItem('synopsis') || "",
        poster: {
            id:                 Number(localStorage.getItem('posterId')),
            imageUrl:           localStorage.getItem('poster') || ""
        },
        reviews: [{
            id:                 Number(localStorage.getItem('reviewId')),
            rating:             Number(localStorage.getItem('reviewRating')),
            review:             localStorage.getItem('review') || ""
        }]
    });

    const poster = computed(() => movie.value.poster.imageUrl)

    return { movie, poster }
});