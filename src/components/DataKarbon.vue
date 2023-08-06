<template>
    <v-app style="background-color: #143280; margin-top: 80px;  font-family: 'BellotaText'; height: 1100px;">
        <v-container style="max-width: 1354px;">
            <h1 style="margin-top: 15px; margin-bottom: 15px; color: white;">Data Karbon</h1>
            <router-link to="/TambahData"><v-btn to="/TambahData" class="mb-5"
                    style="background-color: #5AC979; font-weight: bold; color: white;">Tambah Data</v-btn></router-link>
            <v-btn class="mb-2" density="compact" prepend-icon="mdi-filter" @click="getFilter()"
                style="margin-left: 10px; background-color: #white; color: black;">filter</v-btn>
            <v-btn @click="showDownloadOptions" density="compact" style="float: right;" class="mt-7">Unduh Data</v-btn>

            <v-table density="compact" style="width: 100%; background-color: transparent;" fixed-header height="700px">
                <thead style="background-color: #143280; text-align: center;">
                    <tr>
                        <th style="font-weight: bold; background-color: #BFC1CC; width: 50px; text-align: center;">No</th>
                        <th style="font-weight: bold;  background-color: #BFC1CC;width: 75px; text-align: center;">Kode
                            Sampel</th>
                        <th style="width: 105px;font-weight: bold;  background-color: #BFC1CC;text-align: center;">Lokasi
                        </th>
                        <th style="width: 110px; background-color: #BFC1CC; font-weight: bold;text-align: center;">Komoditas
                        </th>
                        <th style="width: 80px; background-color: #BFC1CC; text-align: center;font-weight: bold;">HST</th>
                        <th style="width: 120px; background-color: #BFC1CC;text-align: center;font-weight: bold;">Tanggal
                        </th>
                        <th style="width: 125px; background-color: #BFC1CC;font-weight: bold;">Karbon Tanah (gr)</th>
                        <th style="width: 125px; background-color: #BFC1CC; font-weight: bold; font-size: 14px">Karbon
                            Tanaman (gr)</th>
                        <th style="width: 125px; background-color: #BFC1CC;font-weight: bold; text-align: center;">Emisi
                            Tanah (gr)</th>
                        <th style="width: 125px; background-color: #BFC1CC;font-weight: bold; text-align: center;">Emisi
                            Tanaman (gr)</th>
                        <th style="width: 125px; background-color: #BFC1CC;font-weight: bold; text-align: center;">Emisi
                            Lingkungan (gr)</th>
                        <th
                            style="width: 130px; background-color: #BFC1CC;font-weight: bold; font-size: 14px; text-align: center;">
                            Action</th>
                    </tr>
                </thead>
                <tbody style="background-color: white;">
                    <tr v-for="(item, index) in filteredContent" :key="item.properties.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.properties.id_sample }}</td>
                        <td>{{ item.properties.loc }}</td>
                        <td>{{ item.properties.comodity }}</td>
                        <td>{{ item.properties.hst }}</td>
                        <td>{{ formatDate(item.properties.date) }}</td>
                        <td>{{ item.properties.carbon_tanah }}</td>
                        <td>{{ item.properties.carbon_tanaman }}</td>
                        <td>{{ item.properties.emisi_tanah }}</td>
                        <td>{{ item.properties.emisi_tanaman }}</td>
                        <td>{{ item.properties.emisi_lingkungan }}</td>
                        <td>
                            <v-btn flat icon="mdi-delete" style=" color: red;" @click="getData(item)"></v-btn>
                            <v-btn flat icon="mdi-pencil" style=" color: #143280;" @click="getEdit(item)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-app>

    <!-- pop out untuk hapus data -->
    <v-layout row justify-center style="font-family: 'BellotaText';">
        <v-dialog v-model="konfirmasi" persistent max-width="450">
            <v-card>
                <v-card-title style="font-weight: bold; color: black; text-align: center;">KONFIRMASI</v-card-title>
                <v-card-text style="text-align: center;">Apakah anda yakin ingin menghapus data?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn style="color: white; background-color: #18a0fb; margin-right: 50px;"
                        @click="konfirmasi = false">Cancel</v-btn>
                    <v-btn style="background-color: #ff0000; color: white; margin-right: 115px;"
                        @click="deleteData(delete_id, delete_date)">Hapus</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>

    <!-- pop out untuk edit data -->
    <template>
        <v-dialog v-model="dialogEdit" max-width="550" style="font-family: 'BellotaText';">
            <v-card>
                <v-card-title>
                    <span>Update Data Karbon</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="11">
                                <v-text-field label="Kode Sampel" v-model="ubah_kode"></v-text-field>
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
                                <v-select label="komoditas" v-model="ubah_komoditas"
                                    :items="['Padi', 'Kentang', 'Cabai']"></v-select>
                            </v-col>
                            <v-col cols="11">
                                <v-select label="HST" v-model="ubah_hst" :items="['HST 0', 'HST 1', 'HST 2']"></v-select>
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

    <!-- Pop Out Filter -->
    <template>
        <v-dialog v-model="dialogFilter" width="350" style="font-family: 'BellotaText';">
            <v-card>
                <v-btn density="compact" flat icon="mdi-close" @click="closeFilter"
                    style="margin-left: 88%; margin-top: 10px;"></v-btn>
                <v-card-title>
                    <span style="margin-left: 25px;">Filter Data</span>
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
                                <v-select v-model="pilihKomoditas" :items="filterKomoditas" label="Komoditas" clearable
                                    outlined></v-select>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="11">
                                <v-select v-model="pilihHST" :items="filterHST" label="HST" clearable outlined></v-select>
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
    <v-dialog v-model="downloadDialog" max-width="400" style="font-family: 'BellotaText';">
        <v-card>
            <v-card-title class="headline">Unduh Data Karbon</v-card-title>
            <v-card-text>
                <v-radio-group v-model="downloadOption">
                    <v-radio label="PDF" value="pdf"></v-radio>
                    <v-radio label="CSV" value="csv"></v-radio>
                </v-radio-group>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="downloadDialog = false"
                    style="background-color:#eb5144; color:white; font-weight: bold; margin-right: 10px;">Batal</v-btn>
                <v-btn @click="downloadData"
                    style=" background-color:#74c212 ; color: white; font-weight: bold;">Unduh</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default {
    name: 'DataKarbon',
    data() {
        return {
            selectedLocation: '',
            downloadDialog: false,
            downloadOption: 'pdf',
            selectedKomoditas: '',
            selectedHST: '',
            pilihLokasi: '',
            pilihKomoditas: '',
            pilihHST: '',
            filterHST: [],
            filteredContent: [],
            filterLokasi: [],
            filterKomoditas: [],
            ubah_hst: '',
            ubah_kode: '',
            ubah_komoditas: '',
            ubah_lat: '',
            ubah_loc: '',
            ubah_long: '',
            dialogFilter: false,
            dialogEdit: false,
            content: undefined,
            data_karbon: '',
            konfirmasi: false,
            delete_id: '',
            delete_date: ''
        }
    },
    mounted() {
        axios.get('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/maps/')
            .then((response) => {
                this.content = response.data.body.features;
                this.filterLokasi = [...new Set(this.content.map(item => item.properties.loc))];
                this.filterKomoditas = [...new Set(this.content.map(item => item.properties.comodity))];
                this.filterHST = [...new Set(this.content.map(item => item.properties.hst))];
                this.filteredContent = this.content;
            })
    },
    methods: {
        showDownloadOptions() {
            this.downloadDialog = true;
        },

        downloadData() {
            this.downloadDialog = false;
            if (this.downloadOption === 'pdf') {
                this.exportToPdf();
            } else if (this.downloadOption === 'csv') {
                this.exportToCsv();
            }
        },
        exportToPdf() {
            if (this.content) {
                const documentDefinition = {
                    content: [
                        { text: 'Data Karbon', style: 'header' },
                        '\n',
                        {
                            table: {
                                headerRows: 1,
                                widths: ['auto', 'auto', 'auto', 'auto', 50, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [
                                    [
                                        'No',
                                        'Kode Sampel',
                                        'Lokasi',
                                        'Komoditas',
                                        'HST',
                                        'Karbon Tanah',
                                        'Karbon Tanaman',
                                        'Emisi Tanah',
                                        'Emisi Tanaman',
                                        'Emisi Lingkungan',
                                        'tanggal'
                                    ],
                                    ...this.content.map((item, index) => [
                                        index + 1,
                                        item.properties.id_sample,
                                        item.properties.loc,
                                        item.properties.comodity,
                                        item.properties.hst,
                                        item.properties.carbon_tanah,
                                        item.properties.carbon_tanaman,
                                        item.properties.emisi_tanah,
                                        item.properties.emisi_tanaman,
                                        item.properties.emisi_lingkungan,
                                        item.properties.date
                                    ]),
                                ],
                            },
                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 0, 0, 10],
                        },
                    },
                    pageOrientation: 'landscape'
                };

                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(documentDefinition).download('data_karbon.pdf');
            }
        },
        exportToCsv() {
            if (this.content) {
                const csvContent = [
                    ['No', 'Kode Sampel', 'Lokasi', 'Komoditas', 'HST', 'Karbon Tanah', 'Karbon Tanaman', 'Emisi Tanah', 'Emisi Tanaman', 'Emisi Lingkungan', 'tanggal'],
                    ...this.content.map((item, index) => [
                        index + 1,
                        item.properties.id_sample,
                        item.properties.loc,
                        item.properties.comodity,
                        item.properties.hst,
                        item.properties.carbon_tanah,
                        item.properties.carbon_tanaman,
                        item.properties.emisi_tanah,
                        item.properties.emisi_tanaman,
                        item.properties.emisi_lingkungan,
                        item.properties.date
                    ]),
                ].map(row => row.join(','));

                const csvString = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent.join('\n'));
                const downloadLink = document.createElement('a');
                downloadLink.setAttribute('href', csvString);
                downloadLink.setAttribute('download', 'data_karbon.csv');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        },
        closeFilter() {
            this.pilihLokasi = this.selectedLocation,
                this.pilihKomoditas = this.selectedKomoditas,
                this.pilihHST = this.selectedHST,
                this.dialogFilter = false
        },
        clearFilter() {
            this.pilihLokasi = '',
                this.pilihKomoditas = '',
                this.pilihHST = ''
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
            let filteredData = this.content;
            if (this.selectedLocation) {
                filteredData = filteredData.filter((item) => item.properties.loc === this.selectedLocation)
            }
            if (this.selectedKomoditas) {
                filteredData = filteredData.filter((item) => item.properties.comodity === this.selectedKomoditas)
            }
            if (this.selectedHST) {
                filteredData = filteredData.filter((item) => item.properties.hst === this.selectedHST)
            }
            this.filteredContent = filteredData
        },

        getEdit: function (item) {
            this.dialogEdit = true;
            this.id = item.properties.id;
            this.ubah_kode = item.properties.id_sample;
            this.date = item.properties.date;
            this.ubah_long = item.geometry.coordinates[0];
            this.ubah_lat = item.geometry.coordinates[1];
            this.ubah_loc = item.properties.loc;
            this.ubah_komoditas = item.properties.comodity;
            this.ubah_hst = item.properties.hst;
        },
        getFilter: function () {
            this.dialogFilter = true;
        },
        getData: function (item) {
            this.konfirmasi = true,
                this.delete_id = item.properties.id,
                this.delete_date = item.properties.date
        },
        updateBarang: function () {
            this.loading = true,
                setTimeout(() => (this.loading = false), 3000)
            axios
                .post('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/editdata', {
                    id: this.id,
                    date: this.date,
                    id_sample: this.ubah_kode,
                    long: this.ubah_lat,
                    lat: this.ubah_long,
                    loc: this.ubah_loc,
                    comodity: this.ubah_komoditas,
                    hst: this.ubah_hst
                }).then(response => {
                    console.log(response);
                    this.dialogEdit = false;
                    location.reload();
                }).catch(error => {
                    console.error(error);
                })
        },
        deleteData: async function (id, date) {

            this.delete_id = id;
            this.delete_date = date;
            axios
                .post('https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/deleteitem/', {
                    id: this.delete_id,
                    date: this.delete_date

                }).catch((err) => {
                    this.error = err.message;
                    console.log(this.error)
                }).then((resp) => {
                    this.content = this.content.filter(item => item.properties.id !== id)
                    console.log(resp);
                    this.filterData();
                    this.konfirmasi = false;
                })
        },
        filteredData: function () {
            this.selectedLocation = this.pilihLokasi;
            this.selectedKomoditas = this.pilihKomoditas;
            this.selectedHST = this.pilihHST;
            this.filterData();
            this.dialogFilter = false;
        },

    }
}

</script>

<style>
.v-table {
    font-size: 14px;
    text-align: center;
}
</style>
