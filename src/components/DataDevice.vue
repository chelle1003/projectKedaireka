<template>
    <v-app style="background-color: #143280; margin-top: 80px;font-family: 'BellotaText';"  >
        <v-container>
            <h1 style="margin-top: 15px; margin-bottom: 15px; color: white;">Data Device</h1>
            <router-link to="/TambahDevice">
                <v-btn class="mb-5" style="background-color: #5AC979; color: white; font-weight: bold;"> Tambah
                    Device</v-btn>
            </router-link>
            <v-btn class="mb-2" prepend-icon="mdi-filter" @click="getFilter()"
                density="compact" style=" margin-left: 10px; background-color: #white; color: black;">Filter</v-btn>
            <v-btn class="mt-7" style="float: right;" density="compact" @click="exportToPdf">Unduh PDF </v-btn>
            <v-table>
                <thead style="background-color: #BFC1cc;">
                    <tr>
                        <th style="width: 80px;text-align: center;">No</th>
                        <th style="width: 155px;text-align: center;">Nomor Seri</th>
                        <th style="width: 150px;text-align: center;">Tipe Device</th>
                        <th style="width: 125px;text-align: center;">Lattitude</th>
                        <th style="width: 135px;text-align: center;">Longtitude</th>
                        <th style="width: 120px;text-align: center;">Lokasi</th>
                        <th style="width: 230px; text-align: center;">Tanggal Pemasangan</th>
                        <th style="text-align: center;">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in filteredContent" :key="item.name">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.nomorseri }}</td>
                        <td>{{ item.tipedevice }}</td>
                        <td>{{ item.lattitude }}</td>
                        <td>{{ item.longitude }}</td>
                        <td>{{ item.lokasi }}</td>
                        <td>{{ formatDate(item.tanggal) }}</td>
                        <td>
                            <v-btn flat icon="mdi-delete" style=" color: red;" @click="getData(item)"></v-btn>
                            <v-btn flat icon="mdi-pencil" style=" color: #143280;" @click="getEdit(item)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-app>
    <v-layout row justify-center style="font-family: 'BellotaText';">
        <v-dialog v-model="konfirmasi" persistent max-width="450">
            <v-card>
                <v-card-title style="font-weight: bold; color: black; text-align: center;">KONFIRMASI</v-card-title>
                <v-card-text style="text-align: center;">Apakah anda yakin ingin menghapus data?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn style="color: white; background-color: #18a0fb; margin-right: 50px;"
                        @click="konfirmasi = false">Cancel</v-btn>
                    <v-btn @click="deleteData(delete_id)"
                        style="background-color: #ff0000; color: white; margin-right: 115px; ">Hapus</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
    <template>
        <v-dialog v-model="dialogEdit" max-width="550" style="font-family: 'BellotaText';">
            <v-card>
                <v-card-title>
                    <span>Update Data Device</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="11">
                                <v-select v-model="ubah_tipedevice" label="Tipe Device"
                                    :items="['CCTV', 'Gas Chamber']"></v-select>
                            </v-col>
                            <v-col cols="11">
                                <v-text-field label="latitude" v-model="ubah_lat"></v-text-field>
                            </v-col>
                            <v-col cols="11">
                                <v-text-field label="longitude" v-model="ubah_long"></v-text-field>
                            </v-col>
                            <v-col cols="11">
                                <v-text-field label="lokasi" v-model="ubah_loc"></v-text-field>
                            </v-col>
                            <v-col cols="11">
                                <v-text-field type="date" v-model="ubah_tanggal"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="margin-right: 65px;">
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogEdit = false"
                        style="background-color:#eb5144 ; color: white; font-weight: bold; margin-right: 10px;">Cancel</v-btn>
                    <v-btn :loading="loading" @click="updateBarang"
                        style=" background-color:#74c212 ; color: white; font-weight: bold;">Simpan</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <template>
        <v-dialog v-model="dialogFilter" width="350" style="font-family: 'BellotaText';">
            <v-card>
                <v-btn density="compact" flat icon="mdi-close" @click="closeFilter"
                    style="margin-left: 88%; margin-top: 10px;"></v-btn>
                <v-card-title>
                    <span style="margin-left: 25px;">Filter Data Device</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="11">
                                <v-select v-model="pilihLokasi" :items="filterLokasi" label="Lokasi" clearable
                                    outlined></v-select>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="11">
                                <v-select v-model="pilihDevice" :items="filterDevice" label="Tipe Device" clearable
                                    outlined></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="margin-left: 150px;">
                    <v-btn @click="clearFilter"
                        style="background-color:#eb5144; color:white; font-weight: bold;">Clear</v-btn>
                    <v-btn @click="filteredData"
                        style=" background-color:#74c212 ; color: white; font-weight: bold;">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
</template>

<script>
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default {
    name: 'DataDevice',
    data() {
        return {
            selectedLocation: '',
            selectedDevice: '',
            pilihDevice: '',
            pilihLokasi: '',
            filteredContent: [],
            filterLokasi: [],
            filterDevice: [],
            loading: false,
            data: undefined,
            konfirmasi: false,
            ubah_tanggal: '',
            ubah_loc: '',
            ubah_long: '',
            ubah_lat: '',
            ubah_tipedevice: '',
            dialogEdit: false,
            dialogFilter:false
        }
    },
    methods: {
        exportToPdf() {
            if (this.data) {
                const documentDefinition = {
                    content: [
                        { text: 'Data Device', style: 'header' },
                        '\n',
                        {
                            table: {
                                headerRows: 1,
                                widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [
                                    [
                                        'No',
                                        'Nomor Seri',
                                        'Tipe Device',
                                        'Lattitude',
                                        'Longitude',
                                        'Lokasi',
                                        'Tanggal Pemasangan',
                                    ],
                                    ...this.data.map((item, index) => [
                                        index + 1,
                                        item.nomorseri,
                                        item.tipedevice,
                                        item.lattitude,
                                        item.longitude,
                                        item.lokasi,
                                        item.tanggal,
                                    ]),
                                ],
                            },
                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 10],
                        },
                    },
                };

                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(documentDefinition).download('data_device.pdf');
            }
        },
        getEdit: function (item) {
            this.dialogEdit = true;
            this.nomorseri = item.nomorseri;
            this.ubah_tipedevice = item.tipedevice;
            this.ubah_loc = item.lokasi;
            this.ubah_long = item.longitude;
            this.ubah_lat = item.lattitude;
            this.ubah_tanggal = item.tanggal;
        },
        updateBarang: function () {
            this.loading = true;
            setTimeout(() => (this.loading = false), 3000)
            axios
                .post('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/updatedevice', {
                    nomorseri: this.nomorseri,
                    tipedevice: this.ubah_tipedevice,
                    lokasi: this.ubah_loc,
                    longitude: this.ubah_long,
                    lattitude: this.ubah_lat,
                    tanggal: this.ubah_tanggal,
                }).then(response => {
                    console.log(response);
                    this.dialogEdit = false;
                    location.reload()
                }).catch(error => {
                    console.error(error);
                })
        },
        getData: function (item) {
            this.konfirmasi = true,
                this.delete_id = item.nomorseri
        },
        deleteData: async function (nomorseri) {

            this.delete_id = nomorseri;

            axios
                .post(' https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/delete2', {
                    nomorseri: this.delete_id

                }).catch((err) => {
                    this.error = err.message;
                    console.log(this.error)
                }).then((resp) => {
                    this.data = this.data.filter(item => item.nomorseri !== nomorseri)
                    this.konfirmasi = false
                    this.filterData();
                    console.log(resp.data)
                })

        },
        closeFilter() {
            this.pilihLokasi = this.selectedLocation,
                this.pilihDevice = this.selectedDevice,
                this.dialogFilter = false
        },
        clearFilter() {
            this.pilihLokasi = '',
                this.pilihDevice = ''
        },
        formatDate(date) {
            const parts = date.split('-');
            if (parts.length === 3) {
                const [year, month, day] = parts;
                return `${day}-${month}-${year}`;
            }
            return date;
        },
        filterData() {
            let filteredData = this.data;
            if (this.selectedLocation) {
                filteredData = filteredData.filter((item) => item.lokasi === this.selectedLocation)
            }
            if (this.selectedDevice) {
                filteredData = filteredData.filter((item) => item.tipedevice === this.selectedDevice)
            }
            this.filteredContent = filteredData
        },
        getFilter: function () {
            this.dialogFilter = true;
        },
        filteredData: function () {
            this.selectedLocation = this.pilihLokasi;
            this.selectedDevice = this.pilihDevice;
            this.filterData();
            this.dialogFilter = false;
        },
    },


    mounted() {
        axios.get('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/test2')
            .then((response) => {
                this.data = response.data.body;
                this.filterLokasi = [...new Set(this.data.map(item => item.lokasi))];
                this.filterDevice = [...new Set(this.data.map(item => item.tipedevice))];
                this.filteredContent = this.data;
                console.log(response)
            })
    }
}
</script>

<style>
.v-table {
    text-align: center;
}
</style>