<template>
  <div>
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
            <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <p class="text-h4 text--primary">Tambahkan Gambar</p>
          <br />
          <div id="drop-area" class="text-center">
            <div id="gallery">
              <div
                v-for="(image, index) in uploadedImages"
                :key="index"
                class="image-container"
              >
                <img :src="image.src" alt="Uploaded Image" />
                <button class="cancel-button" @click="removeImage(index)">
                  x
                </button>
              </div>
            </div>
          </div>

          <!-- <input type="file" @change="addPNG($event)" /> -->
          <v-btn
            class="buttonunggah"
            @click="submitForm"
            to="/KalkulatorPageLoading"
          >
            Unggah
          </v-btn>
        </v-card-text>
      </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import router from "../router/index";

var uuid = uuidv4();
export default {
  data: function () {
    return {
      uuid: null,
      imageData: null,
      uploadPNG: "",
      uploadedImages: [], // Array to store uploaded images
      loading: false,
    };
  },
  name: "KalkulatorPage",
  methods: {
    checkImageData() {
      console.log("Image Data:", this.imageData);
      const storedImageData = sessionStorage.getItem("droppedImage");
      console.log("Stored Image Data:", storedImageData);
    },
    addPNG(event) {
      if (event.dataTransfer) {
        // Handle dropped files from the drop area
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          this.uploadPNG = files[0];
          this.submitForm();
        }
      } else {
        // Handle file input button change event
        this.uploadPNG = event.target.files[0];
        this.submitForm();
      }
    },

    submitForm: async function () {
      this.uuid = String(uuid);
      let binary = await this.readBinary(this.uploadPNG);

      this.loading = true;

      try {
        await axios.post(s3, file, {
          headers: { "Content-Type": "image/png" },
        });
        setTimeout(() => {
          axios.get(url).then((resp) => {
            sessionStorage.setItem("karbonTanah", resp.data.body.karbon_tanah);
            this.loading = false; // Set loading to false after receiving the response
            router.push("/KalkulatorPage4");
          });
        }, 500);
      } catch (error) {
        console.error(error);
        this.loading = false; // Set loading to false in case of an error
      }

      const s3 =
        "https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/kalkulator-isai/" +
        uuid +
        ".png";
      const url =
        "https://nl227f95td.execute-api.us-east-1.amazonaws.com/dpl/kalkulator/" +
        uuid +
        ".png";

      let bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const contentType = "image/png";
      let file = new Blob([bytes], { type: contentType });
      axios.post(s3, file, { headers: { "Content-Type": "image/png" } });
      setTimeout(() => {
        axios.get(url).then((resp) => {
          sessionStorage.setItem("karbonTanah", resp.data.body.karbon_tanah);
          router.push("/KalkulatorPage4");
        });
      }, 500);
    },
    readBinary(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsBinaryString(file);
      });
    },
    reset() {
      sessionStorage.removeItem("karbonTanah");
      router.push("/KalkulatorKarbon");
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1); // Remove the image from the uploadedImages array
      sessionStorage.removeItem("droppedImage"); // Remove the image data from session storage
    },
  },
  mounted() {
    sessionStorage.removeItem("karbonTanah");
    let dropArea = document.getElementById("drop-area");
    dropArea.addEventListener("drop", this.addPNG);
    const vm = this; // Store reference to the Vue component instance

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight the drop area when an item is dragged over it
    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    // Unhighlight the drop area when an item is dragged out of it
    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener("drop", handleDrop, false);

    // Prevent default drag behaviors
    function preventDefaults(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Highlight the drop area
    function highlight() {
      dropArea.classList.add("highlight");
    }

    // Unhighlight the drop area
    function unhighlight() {
      dropArea.classList.remove("highlight");
    }

    // Handle the dropped files
    function handleDrop(event) {
      let dt = event.dataTransfer;
      let files = dt.files;

      handleFiles(files);
    }

    // Handle the dropped files by displaying them in the gallery
    function handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();

        reader.onloadend = function () {
          let img = document.createElement("img");
          img.src = reader.result;
          document.getElementById("gallery").appendChild(img);

          vm.imageData = reader.result; // Store the image data in Vue component data
          sessionStorage.setItem("droppedImage", reader.result); // Store the image data in session storage
        };

        reader.readAsDataURL(file);
      }
    }
  },
};
</script>

<style>
    .sebelah-kanan {
      float: right;
      right: 10px;
      margin-top: 80px;
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
    </style>