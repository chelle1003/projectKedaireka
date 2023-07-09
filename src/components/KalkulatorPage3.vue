<template>
  <div class="container">
    <div class="kiri">
        <v-timeline  >
          <v-timeline-item size="mini" elevation="10">
            <template v-slot:icon >
              <v-avatar><v-img src="../assets/1.png"></v-img></v-avatar>
            </template>
            <template v-slot:opposite> </template>
            <v-card elevation="10" >
              <v-card-title class="text-h6 font-light text-black">
                Pilih gambar yang Anda inginkan
              </v-card-title>
              <v-card-text class="txt">
                Tekan "Unggah Citra" atau tombol kamera yang tersedia. Gambar harus memiliki ekstensi .PNG/.JPG
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
            <v-card elevation="10" >
              <v-card-title class="text-h6 font-light text-black ">
                Tekan tombol "Unggah"
              </v-card-title>
              <v-card-text class="txt">
                Dengan menekan tombol "Unggah", gambar akan dikirim untuk diproses oleh machine learning yang akan menghitung prediksi karbon di gambar tersebut.
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
            <v-card elevation="10" >
              <v-card-title class="text-h6 font-light text-black ">
                Tunggu nilai karbon
              </v-card-title>
              <v-card-text class="txt">
                Hasil prediksi nilai karbon membutuhkan beberapa waktu untuk bisa ditampilkan. Jadi, jangan panik, hasilnya pasti akan keluar!
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
          <v-divider width="2000px"></v-divider>
    </div>
    <div class="kanan">
      <v-card
    class="mx-auto transparent-card"
    max-width="344"
    max-height="400px"
  ><v-card-text>
      <br>
      <v-btn class="buttonedit" to="/KalkulatorKarbon">
        Edit
      </v-btn>
      <v-btn class="buttonsubmit" to="/KalkulatorPage4">
        Submit
      </v-btn>
    </v-card-text>
  
  </v-card>
    </div>
  </div>
  

      
          

      

</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

var uuid = uuidv4();
export default {
  data: function () {
    return {
      items: {
        id: '',
        kalku: ''
      },
      text: sessionStorage.getItem('carbon_tanah')
    }


  },
  methods: {
    getImage: function (event) {
      this.kalku = event.target.files[0]
    },

    submitForm: async function () {


      this.id = String(uuid)
      let kalkuImage = await this.readBinary(this.kalku)
      const url = 'https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/kalkulator-isai/' + this.id + '.png';
      const urlCalcu = 'https://sk695s0owe.execute-api.us-east-1.amazonaws.com/dev/kalkuisai/' + this.id + '.png';

      let bytes = new Uint8Array(kalkuImage.length);

      for (let x = 0; x < kalkuImage.length; x++) {
        bytes[x] = kalkuImage.charCodeAt(x);
      }
      const contentType = 'image/png';
      let file = new Blob([bytes], { type: contentType });
      await axios.post(url, file, { headers: { 'Content-Type': 'image/png' } })

      setTimeout(function () {
        axios.get(urlCalcu)
          .then((resp) => {
            // console.log(resp.data)
            sessionStorage.setItem('carbon_tanah', resp.data.body.carbon_tanah);
            location.reload();

          });
      }, 500)
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
    },
    deleteResult() {
      sessionStorage.clear();
      location.reload();
    }
  }
}
</script>
  
<style>
.buttonedit {
  background-color: #5AC979;
  color: white;
  width: 100px;
  margin-left: 15%;
  max-width: 100px;

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
.kanan{
  margin-top: 100px;
  align-content: center;
  width: 100%;
}
.container{
  background-color:#134280;
}
.buttonsubmit {
  background-color: #2196F3;
  color: white;
  float: right;
  margin-right: 15%;
  width: 100px;
  max-width: 100px;
}

</style>