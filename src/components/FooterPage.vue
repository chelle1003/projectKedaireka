<template>
    <v-card>
        <v-footer background-color: white>
            <v-card class="ml-16 pl-16 pr-16 mt-n2" style="box-shadow: none;">
                <v-sheet style="border-bottom: 2px solid rgb(19, 66, 128); color: rgb(19, 66, 128);" class="ma-2 pa-2 px-9 text-h6">
                    <strong style="font-family: 'BellotaText';">Hubungi Kami</strong>
                </v-sheet>
            </v-card>

            <v-spacer></v-spacer>

            <v-card class="ml-13 pl-16 pr-16 mr-16 mt-n2" style="box-shadow: none;">
                <v-sheet style="border-bottom: 2px solid rgb(19, 66, 128); color: rgb(19, 66, 128);" class="ma-2 pa-2 px-9 text-h6">
                    <strong style="font-family: 'BellotaText';">Didukung Oleh</strong>
                </v-sheet>
            </v-card>

            <v-spacer></v-spacer>

            <v-card class="ml-n10 mt-n2" style="box-shadow: none;">
                <v-sheet style="border-bottom: 2px solid rgb(19, 66, 128); color: rgb(19, 66, 128);" class="ma-2 pa-2 px-9 text-h6">
                    <strong style="font-family: 'BellotaText';">Sosial Media</strong>
                </v-sheet>
            </v-card>
            <v-spacer></v-spacer>
        </v-footer>

        <v-footer background-color: white>
            
            <v-card class="ml-n1 pl-5 mt-n9" style="box-shadow: none; color: rgb(19, 66, 128);">
                <v-icon style="margin-top: 0px;">mdi-map-marker</v-icon>
                <v-spacer></v-spacer>
                <v-icon style="margin-top: 0px;">mdi-email</v-icon>
                <v-spacer></v-spacer>
                <v-icon style="margin-top: 0px;">mdi-phone</v-icon>
            </v-card>

            <v-card class="ml-3 mt-n8" style="box-shadow: none; color: rgb(19, 66, 128);">
                <p style="font-family: 'BellotaText';">Jalan Arjuna No.4b, Wirobrajan, Kota Yogyakarta, DIY 55252</p>
                <v-spacer></v-spacer>

                <p style="font-family: 'BellotaText';">contact@beehivedrones.com</p>
                <v-spacer></v-spacer>

                <p style="font-family: 'BellotaText';">+6281 8999 7715</p>
            </v-card>

            <v-spacer></v-spacer>

            <v-img class="mt-n5 ml-n10 mr-n2" max-height="60" max-width="90" src="ukdw.png" density="compact"></v-img>
            <v-img class="mt-n5 mr-1" max-height="95" max-width="80" src="fti-ukdw.png" density="compact"></v-img>
            <v-img class="mt-n5 mr-n6" max-height="95" max-width="100" src="kedaireka.png" density="compact"></v-img>
            <v-img class="mt-n5 pr-16 ml-7" max-height="200" max-width="220" src="logoBeehive.png" density="compact"></v-img>

            <v-spacer></v-spacer>

            <v-card class="mt-1 ml-n16 pl-n16" style="box-shadow: none;">
                <v-sheet class="mt-n1 ml-n10 pl-n16 mr-n10 ma-2 pa-2 px-9">
                    <v-btn v-bind:href="item.link"  class="mx-2 px-3" v-for="(item, i) in items" :key="i" :icon="item.icon"
                        size="x-large" style="color: white; background-color: rgb(19, 66, 128);"></v-btn>
                </v-sheet>
            </v-card>
            <v-spacer></v-spacer>
        </v-footer>

    </v-card>
</template>

<script>
export default {
    data: () => ({
        items: [
            { icon: 'mdi-instagram', link: 'https://www.instagram.com/beehivedrones/?hl=en' },
            { icon: 'mdi-facebook', link: 'https://web.facebook.com/beehivedrone/?_rdc=1&_rdr' },
            { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/company/beehivedrones/?originalSubdomain=id' }
        ],
    }),
}
</script>

<style>

</style>