<template>


 <v-container>
   <v-row>
     <v-col cols="12">
      <v-card
          class="mx-auto"
          max-width="344"
        >
        <v-card-text>
          <p class="display-1 text--primary">
              Activity Tracker !!
          </p>
        </v-card-text>
      </v-card>
     </v-col>
   </v-row>
      <v-row dense>
        <v-col cols="12" lg="6" xl="6">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">
              Upload File
            </v-card-title>

            <v-card-subtitle>Upload Your activity file here. </v-card-subtitle>

            <v-card-actions>
              <v-btn >
                Upload Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" xl="6">
          <v-card color="#952175" dark>
            <v-card-title class="headline">
              Activity Summary
            </v-card-title>

            <v-card-subtitle>See your total Activity here </v-card-subtitle>

            <v-card-actions>
              <v-btn >
                Activity Page
              </v-btn>
            </v-card-actions>
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
  }
</script>
