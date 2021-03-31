<template>
 <v-container>
   <v-row>
     <v-col cols="12">
      <v-card
          class="mx-auto"
          max-width="344"
        >
        <v-card-text>
          <p class="display-1 text--primary text-center">
              Welcome !!
          </p>
        </v-card-text>
      </v-card>
     </v-col>
   </v-row>
      <v-row dense>
        <v-col cols="12" lg="6" xl="6">
          <v-card color="#385F73" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" >Upload File</v-card-title>
                <v-card-subtitle >Upload your activity File here. </v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ml-2 mt-5" outlined rounded href="#/fileupload">
                    Upload File
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-icon x-large="true" dark>mdi-cloud-upload</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" xl="6">
          <v-card color="#952175" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" >Activity </v-card-title>
                <v-card-subtitle >Track all your acticity and records here </v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ml-2 mt-5" outlined rounded href="#/activity">
                    Activity
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-icon x-large="true" dark>mdi-bike</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
 </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
    }),
  };
</script>
