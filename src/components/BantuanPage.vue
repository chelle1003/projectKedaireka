<template>
    <v-app style="background-color: #134280; padding-top: 3%;">
        <v-container>
            <v-card-title style="text-align: center; color: white;">
                <h3 class="fontTitle">Bagaimana kami dapat membantu?</h3>
            </v-card-title>
            <v-card-text class="pa-5 d-flex justify-center flex-wrap" >
                <v-responsive max-width="550" class="fontTitle">
                    <v-autocomplete :items="items" auto-select-first class="flex-full-width" density="comfortable"
                        item-props menu-icon="" placeholder="Tulis pertanyaan anda" prepend-inner-icon="mdi-magnify" rounded
                        theme="light" variant="solo" v-model="tanya" item-text="title"
                        style="font-family: 'BellotaText';"></v-autocomplete>
                </v-responsive>
            </v-card-text>
            <v-card-text v-if="tanya != null">
                <v-row justify="center">
                    <v-col cols="5" style="background-color: white ; border-radius:5px;">
                        <v-card-text v-for="(item, index) in filteredItems" :key="index">
                            <h4 class="fontTitle">{{ item.title }}</h4>
                            <ul>
                                <li class="font" v-for="(description, descIndex) in item.description" :key="descIndex">
                                    {{ description }}
                                </li>
                            </ul>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-container class="text-subtitle-2 mb-2">
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card-text style="color: white; padding-top: 5%">
                            <h3 class="fontTitle" style="text-align: center;">Pertanyaan yang sering ditanyakan terkait karbon</h3>
                        </v-card-text>
                        <v-expansion-panels variant="outlined" style="float: left">
          <v-expansion-panel class="font">
            <v-expansion-panel-title >
              <strong >Apa yang dimaksud dengan karbon?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                Karbon berasal dari bahasa Latin yaitu carbo yang artinya arang, batu bara. Secara kimia, carbon adalah unsur kimia yang memiliki simbol C dengan urutan nomor atom 6 pada tabel periodik. Definisi lain menyebutkan, carbon adalah suatu unsur yang diserap dari atmosfer melalui proses fotosintesis dan disimpan di dalam bentuk biomassa suatu vegetasi. 
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="font">
            <v-expansion-panel-title >
              <strong >Apa yang dimaksud dengan emisi karbon?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                Emisi karbon merupakan proses pelepasan gas-gas yang mengandung karbon ke atmosfer yang terjadi secara alami maupun dipicu aktivitas manusia, seperti deforestasi, konsumsi listrik, hingga kegiatan industri manufaktur.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="font">
            <v-expansion-panel-title >
              <strong >Apa dampak positif karbon?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <ol>
                <li><strong>Dasar Kehidupan:</strong> Karbon membentuk molekul organik yang penting untuk kehidupan, seperti protein, karbohidrat, lemak, dan asam nukleat. Tanpa karbon, kehidupan seperti yang kita kenal tidak akan mungkin ada.</li>
                <li><strong>Sumber Energi:</strong> Bahan bakar fosil, yang terdiri dari karbon, telah menjadi sumber energi utama selama berabad-abad. Penggunaan bahan bakar fosil telah memberikan energi yang diperlukan untuk menggerakkan kendaraan, pembangkit listrik, dan industri.</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="font">
            <v-expansion-panel-title >
              <strong >Apa dampak negatif karbon?</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol>
                <li><strong>Pemanasan Global:</strong> Emisi karbon, terutama dalam bentuk karbon dioksida (CO2) dari pembakaran bahan bakar fosil dan deforestasi, menyebabkan peningkatan konsentrasi gas rumah kaca di atmosfer.</li>
                <li><strong>Pencemaran Udara:</strong> Pembakaran bahan bakar fosil menghasilkan emisi karbon monoksida (CO) dan partikel-partikel lain yang dapat mencemari udara. Polusi udara ini dapat menyebabkan masalah kesehatan manusia, seperti penyakit pernapasan dan masalah kardiovaskular.</li>
                <li><strong>Kerusakan Lingkungan:</strong> Ekstraksi dan penggunaan bahan bakar fosil, yang mengandung karbon, dapat menyebabkan kerusakan lingkungan. Ini termasuk kerusakan ekosistem, deforestasi, degradasi tanah, dan kerusakan habitat alami, yang memiliki dampak negatif pada keanekaragaman hayati dan keberlanjutan lingkungan.</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-app>

</template>
  
<script>

export default {
    name: 'BantuanPage',
    components: {

    },
    data() {
        return {
            tanya: null,
            items: [
                {
                    prependIcon: 'mdi-clock-outline',
                    title: 'Apa Itu Kalkulator Karbon?',
                    description: [
                        'Kalkulator Karbon merupakan kalkulator untuk menghitung jumlah karbon dari sebuah citra (gambar)',
                        'Kalkulator Karbon menggunakan algoritma tertentu untuk dapat menghitung serta menunjukkan perkiraan jumlah karbon'
                    ]
                },
                {
                    prependIcon: 'mdi-clock-outline',
                    title: 'Apa kebijakan untuk login?',
                    description: [
                        'Menu LogIn hanya diperuntukkan untuk admin',
                        'Sign in dengan akun google hanya diperuntukkan bagi akun google yang sudah terdaftar(admin)'
                    ]
                },
                {
                    prependIcon: 'mdi-clock-outline',
                    title: 'Mengapa webside tidak dapat diakses?',
                    description: [
                        'Tidak terhubung ke internet',
                        'Penulisan halaman URL salah',
                        'Restart Browser',
                        'Bersihkan cache pada browser',
                        'Muat ulang halaman'
                    ]
                },
            ],
        }
    },
    computed: {
        filteredItems() {
            if (this.tanya) {
                return this.items.filter(item => item.title === this.tanya); // Menggunakan filter untuk mencocokkan judul
            }
            return this.items;
        }
    }
}
</script>

<style>
.fontTitle {
    font-family: 'BellotaText';
}

.font {
    font-family: 'BellotaText';
    font-size: 14px;
}
</style>