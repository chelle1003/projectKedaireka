<template>
  <div style="margin-top: 90px">
    <div class="d-flex mb-n4" style="background-color: rgb(19, 66, 128)">
      <v-combobox
        style="font-family: 'BellotaText'; margin-left: 480px; margin-right: 48px; max-width: 185px; margin-top: 8px; margin-bottom: 0px;"
        prepend-inner-icon="mdi-map-marker" label="Lokasi" :items="Lokasi" v-model="selectedLocation"
        variant="solo-filled"></v-combobox>

      <v-row style="font-family: 'BellotaText'">
        <v-col class="mr-5 ml-n11 mt-2">
          <v-select class="mr-n16" prepend-inner-icon="mdi-gold" label="Komoditas" :items="Komoditas"
            v-model="selectedKomoditas" variant="solo-filled">
          </v-select>
        </v-col>

        <v-col class="mr-10 ml-6 mt-2">
          <v-select class="mr-n16" label="Device" :items="Devices" v-model="selectedDevice"
            variant="solo-filled"></v-select>
        </v-col>

      </v-row>

      <v-btn style="font-family: 'BellotaText'; color: white;" color="#eb5144" class="mt-5 ml-8 text-none" @click="clearSelection()" >Hapus Pilihan</v-btn>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </div>
  </div>

  <GoogleMap api-key="AIzaSyCi-XOBnxgXNnkw_a69Zbwz8s6P5l52NwQ" style="width: 100%; height: 100%" :center="{ lat: -7.610414032232811, lng: 110.69368913769722 }" :zoom="19">
    <Marker v-for="(marker) in filteredMarkers" :key="marker.id" :options="marker" @click="createChart(marker)">
      <InfoWindow :position="marker.position" style="font-family: 'BellotaText'">
        <div style="width: 350px">
          <p style="font-size: 15px">Nama Lahan : {{ marker.namaLahan }}</p>
          <p style="font-size: 15px">Komoditas : {{ marker.komoditas }}</p>
          <p style="font-size: 15px">
            Tanggal Sampling : {{ marker.tanggalSampling }}
          </p>
          <v-spacer></v-spacer>
          <br />
          <h3 style="text-align: center; font-size: 15px">Data Karbon (gr)</h3>
          <canvas :id="'chart' + marker.id" max-width="100" height="150"></canvas>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
  
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import axios from "axios";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "MapPage",
  components: {
    GoogleMap,
    Marker,
    InfoWindow,
  },
  data() {
    return {
      data: undefined,
      selectedLocation: "",
      selectedKomoditas: "",
      selectedDevice: "",
      Lokasi: [],
      Komoditas: [],
      Devices: [],
      markerOptions: [],
      icon: [
        "padiIcon.svg",
        "iconCabai.svg",
        "iconKentang.svg",
        "iconCamera.svg",
        "iconGasC.svg",
      ],
    };
  },
  async mounted() {
    try {
      await axios
        .get(
          "https://f7p2q26auk56oxdvp2sjaf6ioy0sximk.lambda-url.us-east-1.on.aws/"
        )
        .then((response) => {
          this.data = response.data.features;

          // Ambil Data lokasi
          this.Lokasi = Array.from(
            new Set(this.data.map((item) => item.properties.loc))
          );

          // Ambil Data komoditas
          this.Komoditas = Array.from(
            new Set(this.data.map((item) => item.properties.comodity))
          );

          // Ambil Data perangkat
          this.Devices = Array.from(
            new Set(this.data.map((item) => item.properties.device))
          );

          // Buat markerOptions
          this.markerOptions = this.data
            .filter((item) => item.properties.hst === "HST 2" || item.properties.hst === "HST 1" || item.properties.hst === "HST 0")
            .map((item) => {
              const koordinat = item.geometry.coordinates;
              const title = item.properties.loc;
              let icon = null;

              if (item.properties.comodity === "Padi") {
                icon = this.icon[0];
              } else if (item.properties.comodity === "Cabai") {
                icon = this.icon[1];
              } else if (item.properties.comodity === "Kentang") {
                icon = this.icon[2];
              }

              return {
                position: { lat: koordinat[1], lng: koordinat[0] },
                title: title,
                icon: {
                  url: icon,
                  scaledSize: { width: 40, height: 40 },
                },
                id: item.properties.id,
                namaLahan: item.properties.loc,
                komoditas: item.properties.comodity,
                tanggalSampling: item.properties.date,
                terserap_carbon_tanah: item.properties.carbon_tanah,
                device: item.properties.device,
                terserap_carbon_tanaman: item.properties.carbon_tanaman,
                emisi_carbon_tanah: item.properties.emisi_tanah,
                emisi_carbon_tanaman: item.properties.emisi_tanaman,
                emisi_carbon_lingkungan: item.properties.emisi_lingkungan,
                chart: null,
              };
            });
        });

    } catch {
      console.error()
    }

  },
  computed: {
    filteredMarkers() {
      let filteredMarkers = this.markerOptions;

      // Filter berdasarkan lokasi
      if (this.selectedLocation) {
        filteredMarkers = filteredMarkers.filter(
          (marker) => marker.title === this.selectedLocation
        );
      }

      // Filter berdasarkan komoditas
      if (this.selectedKomoditas) {
        filteredMarkers = filteredMarkers.filter(
          (marker) => marker.komoditas === this.selectedKomoditas
        );
      }

      // Filter berdasarkan perangkat
      if (this.selectedDevice) {
        filteredMarkers = filteredMarkers.filter(
          (marker) => marker.device === this.selectedDevice
        );
      }

      return filteredMarkers;
    },
  },
  methods: {
    createChart(marker) {
      const chartId = "chart" + marker.id;
      const canvas = document.getElementById(chartId);
      const dataItem = this.markerOptions.find((item) => item.id === marker.id);

      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        return;
      }

      if (dataItem) {
        marker.chart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Karbon Terserap", "Emisi Karbon"],
            datasets: [
              {
                label: "Tanah",
                data: [
                  dataItem.terserap_carbon_tanah,
                  dataItem.emisi_carbon_tanah,
                ],
                backgroundColor: ["#134280"],
              },
              {
                label: "Tanaman",
                data: [
                  dataItem.terserap_carbon_tanaman,
                  dataItem.emisi_carbon_tanaman,
                ],
                backgroundColor: ["#426799"],
              },
              {
                label: "Lingkungan",
                data: ["", dataItem.emisi_carbon_lingkungan],
                backgroundColor: ["#718db2"],
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
              y: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                fullSize: true,
              },
            },
          },
        });
      }
    },
    clearSelection() {
      try {
        this.selectedLocation = null;
        this.selectedKomoditas = null;
        this.selectedDevice = null;
      } catch {
        console.error()
      }
    }
  },
});
</script>
