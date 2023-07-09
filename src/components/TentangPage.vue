<template>
    <v-card style="background-color: rgb(19, 66, 128);" height="65%">
        <v-row>
            <v-col cols="5">
                <v-img style="margin-top: 88px; margin-left: 80px;" max-height="500" max-width="500" src="droneISAI.png"
                    density="compact"></v-img>
            </v-col>

            <v-col cols="6">
                <p
                    style="color: white; margin-top: 100px; font-size: 20px; text-align: justify; font-family: 'BellotaText';">
                    Drone ISAI merupakan sebuah aplikasi berbasis web untuk memprediksi nilai karbon dan memantau dinamika
                    karbon
                    secara kuantitatif pada suatu lahan. Drone ISAI memanfaatkan teknologi pesawat tanpa awak atau sering
                    disebut
                    sebagai drone untuk pengambilan citra suatu lahan. Selain itu, sistem juga dirancang untuk melakukan
                    pengambilan
                    data karbon secara otomatis melalui drone.Sistem diharapkan mampu mempermudahkan petani, pelaku bisnis
                    dan
                    pembuat kebijakan pada sektor pertanian untuk melakukan monitoring dan memahami dinamika karbon serta
                    perubahan
                    kualitas lingkungan yang terjadi pada suatu lahan secara aktual dan presisi.
                </p>
                <br />
                <v-btn class="font-weight-black ml-n4" style="color: white; font-family: 'BellotaText'; box-shadow: none; background-color: rgb(19,66, 128);" href="https://www.example.com" text>
                    Unduh aplikasi di playstore
                </v-btn>
            </v-col>

        </v-row>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TentangPage',
    components: {
    },
});
</script>

<style></style>
