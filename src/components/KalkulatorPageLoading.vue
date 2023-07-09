<template>
  <div>
    <HeaderPage />
    <v-app style="background-color: #134280;">
      <v-container>
        <v-row class="sebelah-kiri">
            <v-timeline>
        <v-timeline-item size="mini" elevation="10">
          <template v-slot:icon>
            <v-avatar><v-img src="1.png"></v-img></v-avatar>
          </template>
          <template v-slot:opposite> </template>
          <v-card elevation="10">
            <v-card-title class="text-h6 font-light text-black">
              Pilih gambar yang Anda inginkan
            </v-card-title>
            <v-card-text class="txt">
              Silahkan memilih gambar yang ingin anda unggah dengan
              melakukan Drag and Drop ke dalam kotak yang sudah disediakan.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>

      <v-timeline>
        <v-timeline-item size="mini" elevation="10">
          <template v-slot:icon>
            <v-avatar><v-img src="2.png"></v-img></v-avatar>
          </template>
          <template v-slot:opposite> </template>
          <v-card elevation="10">
            <v-card-title class="text-h6 font-light text-black">
              Tekan tombol "Unggah"
            </v-card-title>
            <v-card-text class="txt">
              Dengan menekan tombol "Unggah", gambar akan dikirim untuk diproses
              oleh machine learning yang akan menghitung prediksi karbon di
              gambar tersebut.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>

      <v-timeline>
        <v-timeline-item size="mini" elevation="10">
          <template v-slot:icon>
            <v-avatar><v-img src="3.png"></v-img></v-avatar>
          </template>
          <template v-slot:opposite> </template>
          <v-card elevation="10">
            <v-card-title class="text-h6 font-light text-black">
              Tunggu nilai karbon
            </v-card-title>
            <v-card-text class="txt">
              Hasil prediksi nilai karbon membutuhkan beberapa waktu untuk bisa
              ditampilkan. Jadi, jangan panik, hasilnya pasti akan keluar!
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
        </v-row>
        <v-row class="sebelah-kanan">
          <v-col cols="20">
            <v-card
        class="mx-auto"
        style="
          width: 339.56px;
          height: 398.75px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div class="lds-dual-ring"></div>
      </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
    <FooterPage />
  </div>
</template>
<script>
export default {
  mounted() {
    // Delay in milliseconds before redirecting (e.g., 10000ms = 10 seconds)
    const delayInMilliseconds = 10000000;

    // Call the redirect method after the specified delay
    setTimeout(this.redirectToPage, delayInMilliseconds);
  },
  methods: {
    redirectToPage() {
      // Replace '/KalkulatorPage4' with the desired destination page URL
      this.$router.push("/KalkulatorPage4");
    },
  },
};
</script>

<style>

.selectfile {
  border: solid black;
  width: 100%;
}

.blu {
  background-color: #597aa6;
}

.txt {
  font-size: 15px;
  text-align: justify;
}

.kiri {
  float: left;
  margin-left: 20%;
  width: 415px;
}

.kanan {
  margin-top: 100px;
  align-content: center;
  width: 100%;
}

.container {
  background-color: #134280;
}

#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}

#drop-area.highlight {
  border-color: purple;
}

.my-form {
  margin-bottom: 10px;
}

#gallery {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}

#gallery img {
  flex-shrink: 0;
  flex-grow: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-bottom: 10px;
  margin-right: 10px;
  vertical-align: middle;
}


#fileElem {
  display: none;
}

a {
  color: #369;
}
.image-container {
  position: relative;
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}

.lds-dual-ring {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
