import { createStore } from 'vuex';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default createStore({
    state: {
        userRole: '',
    },
    mutations: {
        setUser(state, user) {
            state.userRole = user ? 'admin' : '';
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