<template>
    <v-card>
        <v-toolbar style="margin-top: 15px; margin-bottom: 15px; margin-left: 20px; background-color: white;">
            <v-img max-height="120" max-width="120" src="droneISAI-nobg.png"></v-img>
            <v-spacer></v-spacer>
            <v-tabs v-model="activeTab">
                <v-card style="box-shadow: none;">
                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/Beranda" class="px-7"
                        :exact="activeTab === 'Beranda'">
                        Beranda
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/MapPage" class="px-7"
                        :exact="activeTab === 'MapPage'">
                        Peta
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/KalkulatorPage" class="px-7"
                        :exact="activeTab === 'KalkulatorKarbon'">
                        Kalkulator Karbon
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/GrafikTren" class="px-7"
                        :exact="activeTab === 'GrafikPage'">
                        Grafik
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/DataKarbon" class="px-7"
                        :exact="activeTab === 'DataKarbon'">
                        Data Karbon
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/DataDevice" class="px-7"
                        :exact="activeTab === 'DataDevice'">
                        Data Device
                    </v-tab>
                </v-card>

                <v-card class="mx-8 mr-8" style="box-shadow: none;">
                    <v-menu transition="scale-transition" disable-keys close-on-content-click>
                        <template v-slot:activator="{ props }">
                            <v-tab class="mr-2 ml-2" color="" v-bind="props">
                                <v-icon style="color: rgb(19, 66, 128);" class="mt-n5 mr-n12 ml-n5"
                                    size="xxx-large">mdi-account-circle</v-icon>
                                <div style="font-family: 'BellotaText'; font-size: 17px; color: rgb(19, 66, 128); width:100%;" class="mb-n10 ml-n1 ">Admin</div>
                            </v-tab>
                        </template>

                        <v-list>
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <v-list-item-title>

                                    <v-icon style="color: rgb(19, 66, 128);">
                                        {{ item.icon }}
                                    </v-icon>

                                    <v-btn @click="item.event"
                                        style="box-shadow: none; color: rgb(19, 66, 128); font-family: 'BellotaText';"
                                        :to="item.to">
                                        <strong>{{ item.title }}</strong>
                                    </v-btn>

                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
            </v-tabs>
        </v-toolbar>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            activeTab: '',
            items: [
                { title: 'Logout', icon: 'mdi-logout', to: '/HalamanLogin', event: this.Logout }
            ],
        };
    },
    methods: {
        ...mapMutations(['setUser']),
        setCurrentTab() {
            this.activeTab = this.$route.name;
        },
        Logout() {
            this.setUser(''); 
            if (this.$route.name !== 'HalamanLogin') {
                this.$router.push('/HalamanLogin');
            }
        },


    },
    watch: {
        $route() {
            this.setCurrentTab();
        }
    },
    mounted() {
        this.setCurrentTab();
    }
}
</script>

<style></style>
