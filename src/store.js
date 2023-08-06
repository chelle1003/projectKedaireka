import { createStore } from 'vuex';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const USER_ROLE_KEY = 'userRole';
export default createStore({
    state: {
        userRole: localStorage.getItem(USER_ROLE_KEY) || '',
    },
    mutations: {
        setUser(state, user) {
            state.userRole = user;
            localStorage.setItem(USER_ROLE_KEY, user);
        },
    },
    actions: {
        initAuth({ commit }) {
            const auth = getAuth();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    if (user.email === 'admin@gmail.com') {
                        commit('setUser', 'admin');
                    } else {
                        commit('setUser', '');
                    }
                }
            });
        },
    },
});