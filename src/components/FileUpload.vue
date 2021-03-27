<template>
<div>
    <v-toolbar dense>
      <v-toolbar-title>Upload CSV Tracker File</v-toolbar-title>
    </v-toolbar>
<v-row class="h-100" justify="center" align="center">
    <v-col cols="12" >
  <v-file-input multiple class="input-file" v-model="files" color="deep-purple accent-4" counter label="Activity Tracker CSV File"
     placeholder="Select your files" prepend-icon="mdi-paperclip" outlined :show-size="1000"
     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
  <v-btn :disabled="!files" color="blue-grey" class="ma-2 white--text" @click="uploadFile">
      Upload
      <v-icon right dark >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </v-row>
  <v-row align="center" v-for="chart in charts" :key="chart.info">
    <v-col cols="12">
      <GChart v-if="files" type="ColumnChart" :data="chart.chartData"/>
    </v-col>
    <v-col cols="12" align-self="center">
      <p>{{chart.info}}</p>
    </v-col>
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
import { GChart } from 'vue-google-charts';
import axios from 'axios';
  export default {
    name: 'FileUpload',

    components:{
        GChart
    },

    data: () => ({
      snackbar: false,
      text: `File Uploaded Successfully`,
      files:null,
      charts : [{
        info:'Record chart for uploaded file',
         chartData: [],
      }]
    }),
    methods:{
        readFileAsync: function(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    var contents = e.target.result;
                    var lines = contents.split("\r\n"), chartData = [];
                    let start = 0;
                    let header = [];
                    for (var i=0; i<lines.length; i++){
                        if(lines[i].includes('record_def')){
                            start = i+1;
                            header = lines[i].split(',');
                            chartData.push(header.slice(1));
                        }
                    }
                    for(let inc = start ;inc < lines.length;++inc){
                        for(let arrInc = 1;arrInc<header.length;++arrInc){
                            if( lines[inc]){
                                let data = lines[inc].split(',');
                                if(data[0].includes('record')){
                                    let filterData = data.slice(1,2);
                                    for(let inc =2;inc< data.length;++inc){
                                        filterData.push(parseInt(data[inc]));
                                    }
                                    chartData.push(filterData);
                                }
                            }
                        }
                    }
                    resolve(chartData);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
        },
        uploadFile:function(){
            let formData = new FormData();
            for(let inc = 0; inc< this.files.length;++inc){
              formData.append('files', this.files[inc]);
            }
            let self = this;
            let config = {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
                }
            };
            axios.post('http://localhost:8080/activitytracker/uploadFile',formData,config)
              .then(function (response) {
                console.log(response);
                self.snackbar = true;
                self.files = null;
              })
              .catch(function (response) {
                console.log(response);
                self.snackbar = true;
                self.text='Failed to upload file';
                self.files = null;
              });
        }
    },
    watch: {
      files:async function(value){
          if(value){
            let self = this;
            for(let inc = 0; inc< value.length;++inc){
              let content = await this.readFileAsync(value[inc]);
              self.charts = ([{
                info: value[inc].name,
                chartData: content,
              }]);
            }
          }
          else{
              this.charts[{
                info:'Activity Record chart for uploaded file csv file',
                chartData:[],
              }];
          }
      }
    },
  };
</script>

<style scoped>
  .input-file{
      margin-top: 50px !important;
      width: 100%;
      height: 100%;
  }
</style>
