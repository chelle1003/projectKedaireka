<template>
    <div style="margin-top: 90px;">
        <v-app style="background-color: #134280;">
            <v-row style="padding-top: 1%;" align="stretch">
                <!-- Dropdown Filter -->
                <v-col></v-col>
                <v-col>
                    <v-select v-model="tahun_pilih" :items="list_thn" label="Pilih Tahun" variant="solo"
                        style="font-family: 'BellotaText'"></v-select>
                </v-col>
                <v-col>
                    <v-select v-model="komoditas_pilih" :items="list_kmdt" label="Pilih Komoditas" variant="solo"
                        style="font-family: 'BellotaText'"></v-select>
                </v-col>
                <v-col>
                    <v-select v-model="lokasi_pilih" :items="list_lks" label="Pilih Lokasi" variant="solo"
                        style="font-family: 'BellotaText'"></v-select>
                </v-col>
                <v-col cols="auto">
                    <v-btn :loading="loading" color="blue" style="font-family: 'BellotaText'; text-transform: none; "
                        @click="kirimData">
                        <strong>Terapkan</strong>
                    </v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn color="blue" @click="generatePDF">
                        <v-icon icon="mdi-download"></v-icon>
                        <v-tooltip activator="parent" location="bottom">Download PDF</v-tooltip>
                    </v-btn>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row dense>
                <v-col></v-col>
                <div>
                    <p v-if="keterangan === ''"></p>
                    <v-alert closable icon="mdi-alert-circle" text="Data tidak ditemukan" type="warning"
                        v-else-if="keterangan === 'Data tidak ditemukan'" class="custom-alert"></v-alert>
                    <v-alert closable icon="mdi-alert-circle" text="Data tren emisi karbon tidak ditemukan" type="warning"
                        v-else-if="keterangan === 'Data tren emisi karbon tidak ditemukan'" class="custom-alert"></v-alert>
                    <v-alert closable icon="mdi-alert-circle" text="Data tren karbon terserap tidak ditemukan"
                        type="warning" v-else-if="keterangan === 'Data tren karbon terserap tidak ditemukan'"
                        class="custom-alert"></v-alert>
                </div>
                <v-col></v-col>
            </v-row>
            <!-- Grafik -->
            <v-row style="padding-left: 2%; padding-right: 2%;" align="stretch">
                <v-col>
                    <v-card-text >
                        <div id="bar_terserap" style="background-color: white;"></div>
                    </v-card-text>
                </v-col>
                <v-col>
                    <v-card-text>
                        <div id="bar_emisi" style="background-color: white;"></div>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-row style="padding-top: 20px; padding-bottom: 30px;">
                <v-col></v-col>
                <v-col cols="7">
                    <v-card-text>
                        <div id="bar_agregat" style="background-color: white;"></div>
                    </v-card-text>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-app>
    </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { trenBar_terserap } from "../data/trenBar_terserap.js";
import { trenBar_emisi } from "../data/trenBar_emisi.js";
import { trenBar_agregat } from "../data/trenBar_agregat.js";
import axios from "axios";
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import 'jspdf-autotable';

export default {
    name: "TrenPage",
    data() {
        return {
            tahun_pilih: "",
            komoditas_pilih: "",
            lokasi_pilih: "",
            list_thn: [],
            list_kmdt: [],
            list_lks: [],
            data_table: [],
            loading: false,
            keterangan: '',
        };

    },
    methods: {
        kirimData() {
            sessionStorage.setItem("tahun_pilih", this.tahun_pilih);
            sessionStorage.setItem("komoditas_pilih", this.komoditas_pilih);
            sessionStorage.setItem("lokasi_pilih", this.lokasi_pilih);
            location.reload();
        },
        hitungRataRata(list) {
            if (list.length === 0) {
                return 0;
            }
            const total = list.reduce((sum, value) => sum + value, 0);
            const rataRata = total / list.length;
            return rataRata;
        },
        renderBarChart1() {
            const ctx = document.getElementById("bar_terserap");
            new ApexCharts(ctx, {
                chart: {
                    type: "bar",
                    fontFamily: "BellotaText",
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Tren Nilai Karbon Terserap',
                    align: 'center',
                    floating: true,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                colors: ['#426799', '#89A0BF'],
                series: trenBar_terserap.data.datasets.map((dataset) => ({
                    name: dataset.label,
                    data: dataset.data,
                })),
                xaxis: {
                    categories: trenBar_terserap.data.labels,
                    title: {
                        text: "Bulan",
                    },
                },
                yaxis: {
                    title: {
                        text: "Jumlah Karbon (kg)",
                    },
                    decimalsInFloat: 1,
                },
            }).render();
        },
        renderBarChart2() {
            const ctx = document.getElementById("bar_emisi");
            new ApexCharts(ctx, {
                chart: {
                    type: "bar",
                    fontFamily: "BellotaText",
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Tren Nilai Emisi Karbon',
                    align: 'center',
                    floating: true,
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ["transparent"],
                },
                colors: ['#426799', '#89A0BF', '#B8C6D8'],
                series: trenBar_emisi.data.datasets.map((dataset) => ({
                    name: dataset.label,
                    data: dataset.data,
                })),
                xaxis: {
                    categories: trenBar_emisi.data.labels,
                    title: {
                        text: "Bulan",
                    },
                },
                yaxis: {
                    title: {
                        text: "Jumlah Karbon (kg)",
                    },
                    decimalsInFloat: 1,
                },
            }).render();
        },
        renderBarChart3() {
            const ctx = document.getElementById("bar_agregat");
            const dataCount = trenBar_agregat.data.labels.length;
            const colors_list = [];
            for (let j = 0; j < dataCount; j++) {
                const dataValue = trenBar_agregat.data.datasets[0].data[j];
                let color;
                if (dataValue < 0) {
                    color = "#ef403c"; // Warna merah untuk nilai negatif
                } else if (dataValue > 0) {
                    color = "#00b746"; // Warna hijau untuk nilai positif
                } else {
                    color = "#ffffff"; // Warna putih untuk nilai 0
                }
                colors_list.push(color);
            }
            new ApexCharts(ctx, {
                chart: {
                    type: 'bar',
                    height: 380,
                    fontFamily: "BellotaText",
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: false,
                        dataLabels: {
                            enabled: false,
                        },
                    },
                },
                title: {
                    text: 'Tren Nilai Agregat Karbon',
                    align: 'center',
                    floating: true,
                },
                series: trenBar_agregat.data.datasets.map((dataset) => ({
                    data: dataset.data,
                })),
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                colors: colors_list,
                xaxis: {
                    labels: {
                        show: true,
                    },
                    categories: trenBar_agregat.data.labels,
                    title: {
                        text: "Bulan",
                    },
                },
                yaxis: {
                    title: {
                        text: "Jumlah Karbon (kg)",
                    },
                    decimalsInFloat: 1,
                },
                tooltip: {
                    x: {
                        show: true,
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return 'Agregrat Karbon:';
                            },
                        },
                    },
                },
            }).render();
        },
        generatePDF() {
            const doc = new jsPDF();

            const title = "Daftar Data Karbon Tahun " + this.tahun_pilih;
            doc.setFontSize(20);
            doc.text(title, 10, 20);

            const subtitle = "Komoditas: " + this.komoditas_pilih + "\nLokasi: " + this.lokasi_pilih;
            doc.setFontSize(11);
            doc.text(subtitle, 10, 26);

            const chartBar1 = document.getElementById('bar_terserap');
            const chartBar2 = document.getElementById('bar_emisi');
            const chartBar3 = document.getElementById('bar_agregat');
            const promises = [
                domtoimage.toPng(chartBar1),
                domtoimage.toPng(chartBar2),
                domtoimage.toPng(chartBar3),
            ];

            Promise.all(promises).then((dataUrl) => {
                doc.addImage(dataUrl[0], 'PNG', 30, 40, 150, 93);
                doc.addImage(dataUrl[1], 'PNG', 30, 150, 150, 93);
                doc.addPage(); 
                doc.addImage(dataUrl[2], 'PNG', 30, 20, 150, 90);

                // Generate table data
                const tableData = [];
                const tableHeaders = ['Bulan', 'Karbon Terserap Tanaman', 'Karbon Terserap Tanah', 'Emisi Karbon Tanaman', 'Emisi Karbon Tanah', 'Emisi Karbon Lingkungan', 'Agregat Karbon'];
                this.data_table.forEach((item) => {
                    const rowData = [
                        item.bulan,
                        item.serap_tnmn,
                        item.serap_tnh,
                        item.emisi_tnmn,
                        item.emisi_tnh,
                        item.emisi_lngkngn,
                        item.agrgt,
                    ];
                    tableData.push(rowData);
                });

                const tableStyle = {
                    textColor: '#000000',
                    fontSize: 10,
                };

                const headerStyle = {
                    fillColor: '#d7d9da',
                    textColor: '#000000',
                    fontSize: 10,
                };

                doc.autoTable({
                    head: [tableHeaders],
                    body: tableData,
                    startY: 150, 
                    styles: tableStyle,
                    headStyles: headerStyle,
                    columnStyles: {
                        0: { cellWidth: 40 },
                    },
                });

                doc.save('DaftarDataKarbon.pdf');
            });
        }
    },
    mounted() {
        this.loading = true
        setTimeout(() => (this.loading = false), 3000)
        this.tahun_pilih = sessionStorage.getItem("tahun_pilih");
        this.komoditas_pilih = sessionStorage.getItem("komoditas_pilih");
        this.lokasi_pilih = sessionStorage.getItem("lokasi_pilih");

        axios.get("https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/maps/")
            .then((response) => {
                const data_all = {};
                const data = response.data.body.features;
                for (let i = 0; i < data.length; i++) {
                    var tahun = data[i].properties.date.slice(0, 4);
                    var bulan = parseInt(data[i].properties.date.slice(5, 7));
                    var komoditas = data[i].properties.comodity.slice(0, 1).toUpperCase() + data[i].properties.comodity.substr(1).toLowerCase();
                    var karbonTanaman = parseFloat(data[i].properties.carbon_tanaman);
                    var karbonTanah = parseFloat(data[i].properties.carbon_tanah);
                    var lokasi = data[i].properties.loc.slice(0, 1).toUpperCase() + data[i].properties.loc.substr(1).toLowerCase();
                    var emisiTanaman = parseFloat(data[i].properties.emisi_tanaman);
                    var emisiTanah = parseFloat(data[i].properties.emisi_tanah);
                    var emisiLingkungan = parseFloat(data[i].properties.emisi_lingkungan);
                    // Mengisi list untuk dropdown (filter)
                    if (!this.list_thn.includes(tahun)) {
                        this.list_thn.push(tahun);
                    }
                    if (!this.list_kmdt.includes(komoditas)) {
                        this.list_kmdt.push(komoditas);
                    }
                    if (!this.list_lks.includes(lokasi)) {
                        this.list_lks.push(lokasi);
                    }
                    // Mengambil setiap data dari API sesauai dengan opsi filter yang dipilih
                    if (tahun == this.tahun_pilih && komoditas == this.komoditas_pilih && lokasi == this.lokasi_pilih) {
                        if (!data_all[bulan]) {
                            data_all[bulan] = {
                                list_terserapTanah: [],
                                list_terserapTanaman: [],
                                list_emisiTanah: [],
                                list_emisiTanaman: [],
                                list_emisiLingkungan: [],
                            };
                        }
                        data_all[bulan].list_terserapTanah.push(karbonTanah);
                        data_all[bulan].list_terserapTanaman.push(karbonTanaman);
                        data_all[bulan].list_emisiTanah.push(emisiTanah);
                        data_all[bulan].list_emisiTanaman.push(emisiTanaman);
                        data_all[bulan].list_emisiLingkungan.push(emisiLingkungan);
                    }
                }
                // Array kosong untuk menyimpan nilai rata-rata
                var list_karbonTanah = Array.from({ length: 12 }, () => 0);
                var list_karbonTanaman = Array.from({ length: 12 }, () => 0);
                var list_TanahEmisi = Array.from({ length: 12 }, () => 0);
                var list_TanamanEmisi = Array.from({ length: 12 }, () => 0);
                var list_LingkunganEmisi = Array.from({ length: 12 }, () => 0);
                var list_agregat = Array.from({ length: 12 }, () => 0);
                var set_table = new Set();
                var tamp = [];
                var table_labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

                for (let i = 0; i < 12; i++) {
                    set_table = {
                        id: i,
                        bulan: table_labels[i],
                        serap_tnh: '-',
                        serap_tnmn: '-',
                        emisi_tnh: '-',
                        emisi_tnmn: '-',
                        emisi_lngkngn: '-',
                        agrgt: '-',
                    };
                    this.data_table.push(set_table);
                }

                // Hitung rata-rata 
                for (const bulan in data_all) {
                    const rataTerserapTanah = this.hitungRataRata(data_all[bulan].list_terserapTanah);
                    const rataTerserapTanaman = this.hitungRataRata(data_all[bulan].list_terserapTanaman);
                    const rataEmisiTanaman = this.hitungRataRata(data_all[bulan].list_emisiTanaman);
                    const rataEmisiTanah = this.hitungRataRata(data_all[bulan].list_emisiTanah);
                    const rataEmisiLingkungan = this.hitungRataRata(data_all[bulan].list_emisiLingkungan);
                    const bulanIndex = parseInt(bulan) - 1; // Karena array dimulai dari indeks 0, kurangi 1 dari bulan
                    var jumlah = (rataTerserapTanah + rataTerserapTanaman) + ((rataEmisiLingkungan + rataEmisiTanah + rataEmisiTanaman) * -1);
                    list_karbonTanah[bulanIndex] = rataTerserapTanah;
                    list_karbonTanaman[bulanIndex] = rataTerserapTanaman;
                    list_TanamanEmisi[bulanIndex] = rataEmisiTanaman;
                    list_TanahEmisi[bulanIndex] = rataEmisiTanah;
                    list_LingkunganEmisi[bulanIndex] = rataEmisiLingkungan;
                    list_agregat[bulanIndex] = jumlah;
                    tamp.push(bulanIndex);
                    set_table = {
                        id: bulanIndex,
                        bulan: table_labels[bulanIndex],
                        serap_tnh: rataTerserapTanah.toFixed(2),
                        serap_tnmn: rataTerserapTanaman.toFixed(2),
                        emisi_tnh: rataEmisiTanaman.toFixed(2),
                        emisi_tnmn: rataEmisiTanah.toFixed(2),
                        emisi_lngkngn: rataEmisiLingkungan.toFixed(2),
                        agrgt: jumlah.toFixed(2),
                    };
                    const existingData = this.data_table.find((data) => data.id === bulanIndex);
                    if (existingData) {
                        Object.assign(existingData, set_table);
                    }
                    tamp.push(bulanIndex);
                    // this.data_table.push(set_table);
                }

                var total_list_karbonTanah = list_karbonTanah.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                var total_list_karbonTanaman = list_karbonTanaman.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                var total_list_TanamanEmisi = list_TanamanEmisi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                var total_list_TanahEmisi = list_TanahEmisi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                var total_list_LingkunganEmisi = list_LingkunganEmisi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                if (this.tahun_pilih == null || this.komoditas_pilih == null || this.tahun_pilih == null) {
                    this.keterangan = ''
                } else if (total_list_karbonTanah == 0 && total_list_karbonTanaman == 0 && total_list_TanamanEmisi == 0 && total_list_TanahEmisi == 0 && total_list_LingkunganEmisi == 0) {
                    this.keterangan = 'Data tidak ditemukan'
                } else if (total_list_TanamanEmisi == 0 && total_list_TanahEmisi == 0 && total_list_LingkunganEmisi == 0) {
                    this.keterangan = 'Data tren emisi karbon tidak ditemukan'
                } else if (total_list_karbonTanah == 0 && total_list_karbonTanaman == 0) {
                    this.keterangan = 'Data tren karbon terserap tidak ditemukan'
                }
                // Menampilkan data ke grafik
                trenBar_terserap.data.datasets[1].data = list_karbonTanah;
                trenBar_terserap.data.datasets[0].data = list_karbonTanaman;
                trenBar_emisi.data.datasets[2].data = list_LingkunganEmisi;
                trenBar_emisi.data.datasets[1].data = list_TanahEmisi;
                trenBar_emisi.data.datasets[0].data = list_TanamanEmisi;
                trenBar_agregat.data.datasets[0].data = list_agregat;
                this.renderBarChart1();
                this.renderBarChart2();
                this.renderBarChart3();
            })
    },
};
</script>
<style>
.custom-alert {
    font-size: 15px;
    font-family: "BellotaText";
    color: white;
    padding: 8px;
}
</style>