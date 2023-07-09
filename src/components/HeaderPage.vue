<template>
    <v-card>
        <v-toolbar fixed style="margin-top: 15px; margin-bottom: 15px; margin-left: 20px; background-color: white;">
            <v-img max-height="120" max-width="120" src="droneISAI-nobg.png" ></v-img>
            <v-spacer></v-spacer>
            <v-tabs v-model="activeTab">
                <v-card style="box-shadow: none;">
                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/Beranda" class="px-7" :exact="activeTab === 'Beranda'">
                        Beranda
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/MapPage" class="px-7" :exact="activeTab === 'MapPage'">
                        Peta
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/GrafikTren" class="px-7" :exact="activeTab === 'GrafikPage'">
                        Grafik
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/TentangPage" class="px-7" :exact="activeTab === 'TentangPage'">
                        Tentang
                    </v-tab>

                    <v-tab style="font-family: 'BellotaText'; font-size: 17px;" to="/BantuanPage" class="px-7" :exact="activeTab === 'BantuanPage'">
                        Bantuan
                    </v-tab>
                </v-card>
                <v-card class="mx-8" style=" border-left: 1px solid black; border-radius: 0; box-shadow: none;">
                    <v-tab to="/HalamanLogin" class="px-7">
                        <span style="font-family: 'BellotaText'; font-size: 17px;"> Log In </span>
                    </v-tab>
                </v-card>
            </v-tabs>
        </v-toolbar>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            activeTab: '' // Inisialisasi dengan nilai halaman aktif saat ini
        };
    },
    methods: {
        setCurrentTab() {
            this.activeTab = this.$route.name; // Mengatur activeTab saat tab diganti
        }
    },
    watch: {
        $route() {
            this.setCurrentTab(); // Mengatur activeTab saat rute berubah
        }
    },
    mounted() {
        this.setCurrentTab(); // Mengatur activeTab saat komponen dipasang
    }
};
</script>

<style>

</style>
