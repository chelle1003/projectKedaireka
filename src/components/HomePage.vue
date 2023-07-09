<template>
  <div class="HomePage">
  <v-app class="box">
  <v-main>
  <v-container fluid>
  <v-row no-gutters justify="end">
  <v-col >
      <v-col >
        <v-container class="d-flex align-center">
          <div>
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1>
              
            </h1>
          </div>
         <v-container align="center" justify="center">
           <v-img
            max-height="400"
            max-width="400"
            src="droneISAI.png"
            density="compact"
            class="mb-8"
          ></v-img>
          <h2 class=" font-weight-thin text-white mb-4">
            Sistem berbasis cerdas yang dapat memprediksi nilai karbon suatu lahan ataupun area sekitarnya <br/>serta mendukung pengambilan data karbon secara otomatis melalui drone
          </h2>
          <v-img
          max-height="170"
          max-width="170"
          src="drone-human.png"
          density="compact"
          ></v-img>
        </v-container>
        <v-container align="center" justify="center"> 
         <h3 class=" font-weight-thin text-white mb-4">
           #AutomationSystem <br/>
         </h3>
       </v-container>
          <v-container>
            <v-row class="langkah">
              <v-container class="d-flex align-center">
                <v-timeline align="start">
                  <v-timeline-item dot-color="#426799">
                    <template v-slot:opposite>
                    </template>
                    <div>
                      <div class="text-h6" style="color: white;">Kekuatan Drone</div>
                      <p  style="color: white;">
                        Untuk melakukan aerial imaging yang akan menjadi dasar prediksi nilai karbon pada suatu lahan dan lingkungan sekitarnya.
                      </p>
                    </div>
                  </v-timeline-item>
              
                  <v-timeline-item dot-color="#718db2">
                    <template v-slot:opposite>
                    </template>
                    <div>
                      <div class="text-h6" align="right" style="color: white;">Kolaborasi software & hardware</div>
                      <p align="right" style="color: white;">
                        Embeded system yang dirancang dengan kemampuan otomatisasi pengambilan data melalui drone.
                      </p>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item dot-color="#cfd9e5">
                    <template v-slot:opposite>
                    </template>
                    <div>
                      <div class="text-h6"  style="color: white;">Website ISAI</div>
                      <p  style="color: white;">
                        Untuk visualisasi informasi pemetaan nilai karbon, kalkulator karbon, 
                        monitoring tren perubahan dan histori nilai karbon yang dapat diakses dengan mudah.
                      </p>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                </v-container>
            </v-row>
          </v-container>
          </div>
        </v-container>
      </v-col>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</v-app>
</div>
</template>

<script>
  export default {
   data(){
    return{
    }
   },
  }
</script>

<style>
  .langkah{
    margin-top: -30px;
  }
  .font{
    color: white;
  }
  .box {
    background: linear-gradient(#134280,#134280,#597aa6,#89a0bf);   
   }
   .img{
    max-height:80px;
    max-width:80px;
    height:auto;
    width:auto;
   }
</style>
