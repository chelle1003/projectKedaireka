<template>
    <v-app style="background: #143280; font-family: 'BellotaText';">
        <v-container style="padding-top: 50px; width: 711px; height: 100%;">
            <p style="color: white; padding-bottom: 10px;">TAMBAH DATA KARBON</p>
            <v-card tile elevation="1" style="background-color: white; padding-top: 30px;">
                <v-form v-model="isvalid">
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="kode pl-8">Nomor Sampel <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="kode" placeholder="01" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 15px; padding-top: 15px;" class="tanggalinput pl-8">Tanggal Pengambilan Sampel <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="tanggal" type="date" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="latitude pl-8">Koordinat Latitude <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="latitude" placeholder="-7.61071" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="longtitude pl-8">Koordinat Longtitude <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="longtitude" placeholder="110.693156" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="lokasi pl-8">Lokasi <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="lokasi" placeholder="Klaten" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="komoditas pl-8">Jenis Komoditas <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="komoditas" placeholder="Padi" :items="['Padi', 'Kentang', 'Cabai']"
                            required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="hst pl-8">HST <span style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="hst" placeholder="HST 0" :items="['HST 0', 'HST 1', 'HST 2']" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="fotoNIR pl-8">Foto Citra NIR <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="7">
                        <v-file-input @change="addNIR($event)" label="Upload Gambar NIR" v-model="fotonir" accept="image/png" hint="image/png"
                            required prependIcon="mdi-camera" variant="filled"></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-list-subheader style="font-size: 16px; padding-top: 15px;" class="fotoRGB pl-8">Foto Citra RGB <span
                                style="color: red;">*</span></v-list-subheader>
                    </v-col>
                    <v-col cols="7">
                        <v-file-input @change="addPhoto($event)" label="Upload Gambar RGB" v-model="fotorgb" accept="image/png" hint="image/png"
                            required prependIcon="mdi-camera" variant="filled">
                        </v-file-input>
                        <!-- <span style="font-size: 9px; margin-left: 40px;">File types accepted png, jpg, jpeg*</span> -->
                    </v-col>
                </v-row>
                <v-card-actions class="mr-12 mt-3" style="float: right;">
                    <router-link to="/DataKarbon"><v-btn class="mr-5"
                            style="background-color:#eb5144 ; color: white; font-weight: bold;">Cancel</v-btn></router-link>

                    <!-- <router-link to="/DataKarbon"></router-link> Cancel</v-btn> -->
                    <v-btn :loading="loading" @click="submitForm" style=" background-color:#74c212 ; color: white; font-weight: bold;">Simpan</v-btn>
                </v-card-actions>
            </v-form>

            </v-card>
        </v-container>
    </v-app>
</template>

<script>
// import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

var uuid = uuidv4();

export default {
    name: "TambahData",
    data: function () {
        return {
            kode:'',
            loading:false,
            id: null,
            kodeSampel: '',
            tanggal: '',
            latitude: '',
            longtitude: '',
            lokasi: '',
            komoditas: '',
            hst: '',
            fotonir: '',
            fotorgb: '',
            isvalid:false
        }
    },

    methods: {

        addPhoto: function (event) {
            this.uploadRGB = event.target.files[0];
        },
        clear() {
            Object.assign(this.$data, this.$options.data());
        },
        addNIR: function (event) {
            // Get uploaded file
            this.uploadNIR = event.target.files[0];
        },

        submitForm: async function () {
            this.id = String(uuid);
            this.loading=true
            const lokasiHurufDepan = this.lokasi.substring(0, 2).toUpperCase();
            this.kodeSampel = `${lokasiHurufDepan}-${this.kode}`;
            setTimeout(() => (this.loading = false), 5000)
            // console.log(this.id);
            await axios
                .post('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/', {
                    id: this.id,
                    id_sample: this.kodeSampel,
                    date: this.tanggal,
                    hst: this.hst,
                    loc: this.lokasi,
                    comodity: this.komoditas,
                    lat: this.longtitude,
                    long: this.latitude,


                }).catch((err) => {
                    this.error = err.message;

                });

            let binaryRGB = await this.readBinary(this.uploadRGB)
            const urlRGB = 'https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/citra-rgb-kedaire/' + this.id + '.png';

            let bytesRGB = new Uint8Array(binaryRGB.length);

            for (let x = 0; x < binaryRGB.length; x++) {
                bytesRGB[x] = binaryRGB.charCodeAt(x);
            }
            const contentType = 'image/png';
            let fileRGB = new Blob([bytesRGB], { type: contentType });
            axios.post(urlRGB, fileRGB, { headers: { 'Content-Type': 'image/png' } })


            let binaryNIR = await this.readBinary(this.uploadNIR)


            const urlNIR = 'https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/citra-nir-kedaireka/' + this.id + '.png';

            let bytesNIR = new Uint8Array(binaryNIR.length);

            for (let i = 0; i < binaryNIR.length; i++) {
                bytesNIR[i] = binaryNIR.charCodeAt(i);
            }

            let fileNIR = new Blob([bytesNIR], { type: contentType });
            axios.post(urlNIR, fileNIR, { headers: { 'Content-Type': 'image/png' } });

            if (this.id == String(uuid)) {
                this.$router.push('/DataKarbon')
            }
            else {
                alert('Gagal')
            }

        },
        readBinary: function (file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = function () {
                    resolve(reader.result)
                }
                reader.onerror = reject
                reader.readAsBinaryString(file)
            })

        }

    },


}
</script>

<style lang="scss" scoped></style>