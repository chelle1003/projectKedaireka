<template>
  <div>
    <HeaderPage />
    <v-app style="background-color: #134280">
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
                <v-avatar><v-img src="3.png"></v-img></v-avatar>
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
                  <v-btn @click="reset" color="red" style="padding: 0 30px"
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
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import router from "../router/index";

var uuid = uuidv4();
const s3 =
  "https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/kalkulator-isai/" +
  uuid +
  ".png";
const url =
  "https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/kalkulator/" +
  uuid;

export default {
  data() {
    return {
      karbonTanah: sessionStorage.getItem("karbonTanah"),
      karbonTanaman: sessionStorage.getItem("karbonTanaman"),
    };
  },
  methods: {
    addPNG(event) {
      this.uploadPNG = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.uploadPNG);
      formData.append("uuid", uuid);

      try {
        await axios.post(s3, formData, {
          headers: { "Content-Type": "image/png" },
        });

        this.uploadSuccess = true;

        setTimeout(async () => {
          const response = await axios.get(url);

          this.karbonTanah = response.data.body.karbon_tanah;
          this.karbonTanaman = response.data.body.karbon_tanaman;
        }, 500);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    },
    reset: function () {
      sessionStorage.removeItem("droppedImage");
      router.push("/KalkulatorPage");
    },
  },
};
</script>

<style>
.vcard-hasil {
  background-color: transparent;
  box-shadow: none;
}
.bg-white {
  background: white;
}
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.submit-button {
  display: flex;
  justify-content: center;
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
  align-content: center;
  width: 100%;
  margin-top: 100px;
}

.container {
  background-color: #134280;
}

.alert {
  margin-top: 20px;
}

.welcome-message {
  position: relative;
  top: -70px;
  text-align: center;
}

.carbon-prediction {
  position: relative;
  top: -60px;
  text-align: center;
}

.tanah {
  margin-left: auto;
  margin-right: 240px;
  width: 330px;
  top: -40px;
}

.tanaman {
  margin-left: auto;
  margin-right: 240px;
  width: 330px;
  top: -10px;
}

.plant-prediction {
  position: relative;
  top: -50px;
  text-align: center;
}

.tanya-jawab {
  position: relative;
  text-align: center;
  top: -50px;
}
</style>
