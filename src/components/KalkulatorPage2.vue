<template>
  <div>
    <HeaderPage />
    <v-app style="background-color: #134280">
      <v-container>
        <v-row class="sebelah-kiri">
          <v-timeline>
            <v-timeline-item size="mini" elevation="10">
              <template v-slot:icon>
                <v-avatar><v-img src="../assets/1.png"></v-img></v-avatar>
              </template>
              <template v-slot:opposite> </template>
              <v-card elevation="10">
                <v-card-title class="text-h6 font-light text-black">
                  Pilih gambar yang Anda inginkan
                </v-card-title>
                <v-card-text class="txt">
                  Tekan "Unggah Citra" atau tombol kamera yang tersedia. Gambar
                  harus memiliki ekstensi .PNG/ .JPG
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>

          <v-timeline>
            <v-timeline-item size="mini" elevation="10">
              <template v-slot:icon>
                <v-avatar><v-img src="../assets/2.png"></v-img></v-avatar>
              </template>
              <template v-slot:opposite> </template>
              <v-card elevation="10">
                <v-card-title class="text-h6 font-light text-black">
                  Tekan tombol "Unggah"
                </v-card-title>
                <v-card-text class="txt">
                  Dengan menekan tombol "Unggah", gambar akan dikirim untuk
                  diproses oleh machine learning yang akan menghitung prediksi
                  karbon di gambar tersebut.
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>

          <v-timeline>
            <v-timeline-item size="mini" elevation="10">
              <template v-slot:icon>
                <v-avatar><v-img src="../assets/3.png"></v-img></v-avatar>
              </template>
              <template v-slot:opposite> </template>
              <v-card elevation="10">
                <v-card-title class="text-h6 font-light text-black">
                  Tunggu nilai karbon
                </v-card-title>
                <v-card-text class="txt">
                  Hasil prediksi nilai karbon membutuhkan beberapa waktu untuk
                  bisa ditampilkan. Jadi, jangan panik, hasilnya pasti akan
                  keluar!
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-row>
        <v-row class="sebelah-kanan">
          <v-col cols="28"></v-col>
          <v-card class="mx-auto alert vcard-hasil" max-width="344">
            <v-alert
              density="compact"
              type="success"
              title="Success !!"
              text="Gambar telah berhasil di unggah!"
            ></v-alert>
            <br /><br /><br />
            <v-col cols="13" class="column-right">
              <div
                class="d-flex justify-center align-center text-white welcome-message"
              >
                <h2>Hasil Estimasi Karbon</h2>
              </div>
              <div
                class="d-flex justify-center align-center text-white carbon-prediction"
              >
                <p style="color: white">Prediksi nilai karbon tanah:</p>
              </div>
              <div
                class="d-flex justify-center align-center text-white carbon-prediction"
              >
                <v-card-text>
                  <h2
                    style="
                      display: flex;
                      justify-content: center;
                      padding: 10px 0;
                    "
                  >
                    <v-card
                      class="mx-auto bg-white align-center"
                      width="200"
                      variant="outlined"
                      style="
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        padding: 10px 0;
                        margin: none;
                      "
                      >{{ karbonTanah }}
                    </v-card>
                  </h2>
                </v-card-text>
              </div>
              <div
                class="d-flex justify-center align-center text-white plant-prediction"
              >
                <p style="color: white">Prediksi nilai karbon tanaman:</p>
              </div>
              <div
                class="d-flex justify-center align-center text-white plant-prediction"
              >
                <v-card-text>
                  <h2
                    style="
                      display: flex;
                      justify-content: center;
                      padding: 10px 0;
                    "
                  >
                    <v-card
                      class="mx-auto bg-white"
                      width="200"
                      variant="outlined"
                      style="
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        padding: 10px 0;
                      "
                      >{{ karbonTanah }}
                    </v-card>
                  </h2>
                </v-card-text>
              </div>
              <div class="tanya-jawab">
                <div
                  class="flex-column align-center text-white question-container"
                >
                  <span>Upload gambar lainnya?</span>
                </div>
                <div class="submit-button">
                  <v-btn
                    @click="reset"
                    color="red"
                    style="padding: 0 30px"
                    to="/KalkulatorKarbon"
                    >Ya</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
    <FooterPage />
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  },
};
</script>

<style>
.vcard-hasil {
  background-color: transparent;
  box-shadow: none;
}
.column-right {
  justify-content: center;
  justify-items: center;
}
.sebelah-kanan {
  float: right;
  right: 10px;
  margin-top: 80px;
  justify-items: center;
}
.sebelah-kiri {
  float: left;
  width: 500px;
  margin-top: 30px;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.buttonunggah {
  background-color: #2196f3;
  color: white;
  left: 34%;
  margin-top: 10px;
}

.blu {
  background-color: #597aa6;
}

.txt {
  font-size: 15px;
  text-align: justify;
}

.container {
  background-color: #134280;
}

.cancel-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  padding: 2px 5px;
  font-size: 12px;
  cursor: pointer;
}

.image-container {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
