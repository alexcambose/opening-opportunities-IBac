<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <img src="https://images-ext-2.discordapp.net/external/m924_7fhxcQssOwPe0kNHO76HXhPVaCrWnQcmDTdCiE/https/i.imgur.com/mH23GwLr.png?width=1025&height=257" alt="Studeo" width="112" height="60">
                </router-link>

                <button @click="navbarActive = !navbarActive" :class="['button', 'navbar-burger', navbarActive ? 'is-active' : '']">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div :class="['navbar-menu', navbarActive ? 'is-active' : '']">
                <div class="navbar-start" v-if="logged">
                    <router-link :to="{name: 'courses'}" class="navbar-item is-hoverable is-tab is-hidden-mobile">Cursuri</router-link>

                    <div class="navbar-item is-hoverable has-dropdown">
                        <a class="navbar-link">
                            <b-icon icon="grid"></b-icon>
                        </a>

                        <div class="navbar-dropdown navbar-classes">
                            <cat-menu></cat-menu>
                        </div>
                    </div>
                    <search-bar style="padding-top: 12px"></search-bar>
                </div>
                <div class="navbar-end" v-if="!logged">
                    <router-link to="login" class="navbar-item is-tab">Autentificare</router-link>
                    <router-link to="register" class="navbar-item is-tab">Înregistrare</router-link>
                </div>
                <div class="navbar-end" v-else>
                    <router-link v-if="isMentor" :to="{name: 'dashboard'}" class="navbar-item is-tab">
                        Cursurile mele
                    </router-link>
                    <div class="navbar-item is-hoverable has-dropdown">
                        <a class="navbar-link">
                            <b-icon icon="bell"></b-icon>
                            <span v-if="unreadNotificationsCount" class="tag is-rounded is-primary">{{unreadNotificationsCount}}</span>
                        </a>

                        <div class="navbar-dropdown navbar-notifications">
                            <notif-menu></notif-menu>
                        </div>
                    </div>

                    <div class="navbar-item is-hoverable has-dropdown">
                        <a href="#" class="navbar-link">Salut, {{user.first_name}}</a>
                        <div class="navbar-dropdown">
                            <div class="navbar-item flex-center has-text-weight-bold">
                                <span>{{user.coins}} <b-icon pack="fa" icon="graduation-cap" size="is-small"></b-icon></span>
                            </div>
                            <div class="navbar-divider"></div>
                            <router-link :to="{name: 'profile', params: {username: user.username}}" class="navbar-item"><b-icon pack="fa" icon="user"></b-icon>&nbsp; Profil</router-link>
                            <router-link :to="{name: 'notifications'}" class="navbar-item"><b-icon pack="fa" icon="comment"></b-icon>&nbsp; Notificări</router-link>
                            <router-link :to="{name: 'playlists'}" class="navbar-item"><b-icon pack="fa" icon="book"></b-icon>&nbsp; Bibliotecă</router-link>
                            <router-link :to="{name: 'paths'}" class="navbar-item"><b-icon pack="fa" icon="road"></b-icon>&nbsp; Paths</router-link><!-- doar momentan aici -->
                            <router-link :to="{name: 'settings'}" class="navbar-item"><b-icon pack="fa" icon="cog"></b-icon>&nbsp; Setări</router-link>

                            <!--<router-link to="/admin" class="navbar-item"><b-icon pack="fa" icon="lock"></b-icon>&nbsp; Panou admin</router-link>-->

                            <div class="navbar-divider"></div>

                            <router-link :to="{name: 'help'}" class="navbar-item"><b-icon pack="fa" icon="question-circle"></b-icon>&nbsp; Ajutor</router-link>

                            <div class="navbar-divider"></div>

                            <a class="navbar-item" @click="logout">
                                <b-icon pack="fa" icon="sign-out"></b-icon>&nbsp; Deconectare
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import CatMenu from './navbar/CatMenu';
    import NotifMenu from './navbar/NotifMenu';
    import { mapState, mapGetters } from 'vuex';
    import SearchBar from './navbar/SearchBar';

    export default {
        data() {
            return {
                navbarActive: false,
            };
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                logged: state => state.user.logged,
                isMentor: state => state.user.logged && state.user.user.role === 2,
            }),
            unreadNotificationsCount() {
                return this.$store.state.notification.unreadNotificationsCount;
            },
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push({ name: 'welcome' }));
            },
        },
        components: {
            SearchBar,
            CatMenu,
            NotifMenu,
        },
    };
</script>
<style>

</style>