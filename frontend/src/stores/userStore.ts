import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { User } from '@/types';
import { useMovieStore } from '@/stores/movieStore'

export const useUserStore = defineStore('user', () => {
    const movieStore = useMovieStore();

    const user = ref<User>({
        id:                         Number(localStorage.getItem('id')),
        name:                       localStorage.getItem('name') || "",
        username:                   localStorage.getItem('username') || "",
        email:                      localStorage.getItem('email') || "",
        password:                   localStorage.getItem('password') || "",
        role: {
            id:                     Number(localStorage.getItem('roleId')),
            name:                   localStorage.getItem('role') || ""
        },
        profile_picture_Url:        localStorage.getItem('profile_picture') || "",
        friends: [],
        movies: [movieStore.movie],
        reviews: [{
            id:                     Number(localStorage.getItem('reviewId')),
            rating:                 Number(localStorage.getItem('reviewRating')),
            review:                 localStorage.getItem('review') || ""
        }]
    });

    function addFriend(newFriend: User) {
        user.value.friends.push(newFriend);
        localStorage.setItem('friends', JSON.stringify(user.value.friends));
    }

    function loadFriendsFromStorage() {
        const storedFriends = localStorage.getItem('friends');
        if (storedFriends) {
            user.value.friends = JSON.parse(storedFriends);
        }
    }

    loadFriendsFromStorage();

    const jwt = ref('')

    const role = computed(() => user.value.role.name)
    const isAuthenticated = computed(() => jwt.value !== "")

    function authenticaded(authUser: User, token: string) {
        user.value = authUser;
        jwt.value = token;
        
        localStorage.setItem('id', authUser.id.toString());
        localStorage.setItem('username', authUser.username);
        localStorage.setItem('email', authUser.email);
        localStorage.setItem('role', authUser.role.name);
    }

    function logout() {
        jwt.value = ""
        user.value = {} as User
    
        localStorage.clear()
    }

    return { user, addFriend, jwt, role, isAuthenticated, authenticaded, logout };
});