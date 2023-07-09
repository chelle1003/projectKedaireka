<template>
    <v-app style="background: #143280; font-family: 'BellotaText';">
        <v-container style="padding-top: 50px; width: 711px; height: 100%;">
            <p style="color: white; padding-bottom: 10px;">TAMBAH DATA DEVICE</p>
            <v-card tile elevation="1" style="background-color: white; padding-top: 30px;">
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader class="nomorseri pl-8">Nomor Seri <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6" >
                        <v-text-field v-model="nomorseri" placeholder="GC112800291" required></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="5" >
                        <v-list-subheader class="tipedevice pl-8" >Tipe Device <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="tipedevice" placeholder="Padi" :items="['CCTV','Gas Chamber']" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader class="latitude pl-8">Koordinat Latitude <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="lattitude" placeholder="-7.61071" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader class="longtitude pl-8">Koordinat Longtitude <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="longitude" placeholder="110.693156" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader class="lokasi pl-8">Lokasi <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="lokasi" placeholder="Klaten" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader class="tanggal pl-8">Tanggal Pemasangan <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="tanggal" type="date" placeholder="18-09-2022" required></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions class="mr-12 mt-3" style="float: right;">
                    <router-link to="/DataDevice"><v-btn class="mr-5" style="background-color:#eb5144 ; color: white; font-weight: bold;">Cancel</v-btn></router-link>
                    <v-btn :loading="loading" @click="submitForm" style=" background-color:#74c212 ; color: white; font-weight: bold;">Simpan</v-btn>
                </v-card-actions>
                
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    name:"TambahDevice",
    data: function (){
        return{
            loading:false,
            nomorseri:'',
            tanggal:'',
            lattitude:'',
            longitude:'',
            lokasi:'',
            tipedevice:'',
        }
    },
    methods:{
        submitForm:async function(){
            this.loading=true;
            setTimeout(() => (this.loading = false), 3000)
            await axios.post('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/test2',{
                nomorseri:this.nomorseri,
                tipedevice:this.tipedevice,
                tanggal:this.tanggal,
                lattitude:this.lattitude,
                longitude:this.longitude,
                lokasi:this.lokasi,

            }).catch((err)=>{
                this.error =err.message;
            })
            if (this.nomorseri != null) {
                // router.push('/DataKarbon')
                this.$router.push('/DataDevice')
            }
            else {
                alert('Gagal')
            }
        },
    }
    
}
</script>

<style lang="scss" scoped>

</style>