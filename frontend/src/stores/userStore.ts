import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { User } from '@/types';
import { useMovieStore } from '@/stores/movieStore'

export const useUserStore = defineStore('user', () => {
    const movieStore = useMovieStore();

    const user = ref<Omit<User, 'password'>>({
        id:                         Number(localStorage.getItem('id')),
        name:                       localStorage.getItem('name') || "",
        username:                   localStorage.getItem('username') || "",
        email:                      localStorage.getItem('email') || "",
        role: {
            id:                     Number(localStorage.getItem('roleId')),
            name:                   localStorage.getItem('role') || ""
        },
        profile_picture_Url:        localStorage.getItem('profile_picture') || "",
        friends: [],
        movies: [movieStore.movie],
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

    const jwt = ref('');

    const userData = computed(() => user.value);
    const role = computed(() => user.value.role.name);

    const isAuthenticated = computed(() => jwt.value !== "");

    function authenticaded(authUser: User, token: string) {
        user.value = authUser;
        jwt.value = token;
        
        localStorage.setItem('id', authUser.id.toString());
        localStorage.setItem('name', authUser.name);
        localStorage.setItem('username', authUser.username);
        localStorage.setItem('email', authUser.email);
        localStorage.setItem('role', authUser.role.name);
        localStorage.setItem('profile_picture', authUser.profile_picture_Url);
        localStorage.setItem('jwt', token);
    }

    function logout() {
        jwt.value = "";
        user.value = {} as User;

        localStorage.clear();
    }

    return { user, addFriend, jwt, userData, role, isAuthenticated, authenticaded, logout };
});