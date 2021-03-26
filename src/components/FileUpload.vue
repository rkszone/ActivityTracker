<template>
  <div>
      <v-toolbar dense>
        <v-toolbar-title>Upload CSV Tracker File</v-toolbar-title>
      </v-toolbar>
      <v-row class="h-100" justify="center" align="center">
      <v-col cols="8" offset="1">
      <v-file-input class="input-file" v-model="files" color="deep-purple accent-4" counter label="Activity Tracker CSV File"
        multiple placeholder="Select your files" prepend-icon="mdi-paperclip" outlined :show-size="1000"
      >
      <template v-slot:selection="{ index, text }">
        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
          {{ text }}
        </v-chip>
        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </v-file-input>
    </v-col>
    </v-row>
    <v-row justify="center">
    <v-btn color="blue-grey" class="ma-2 white--text" @click="snackbar = true">
        Upload
        <v-icon right dark >
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </v-row>
        <v-snackbar
        v-model="snackbar"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'FileUpload',
    data: () => ({
      snackbar: false,
      text: `File Uploaded Successfully`,
      files:null,
    }),
  };
</script>

<style scoped>
.input-file{
    margin-top: 50px !important;
    width: 100%;
    height: 100%;
}
</style>
