<template>
<section>
    <v-toolbar dense>
      <v-toolbar-title>Activity List</v-toolbar-title>
    </v-toolbar>
     <v-row  no-gutters>
       <ActivityCard v-for="activityData in activitiesData" :key="activityData.name" :id="activityData.id" :type="activityData.type"
        :title="activityData.name" :loading="loading"  :time="activityData.start_time" :def="activityData.activty_def"
        @delete="deletecard"></ActivityCard>
     </v-row>
     <v-row>
      <v-pagination v-if="pagination" v-model="page" :length="pageLength" :total-visible="6"
        @input="paginationClick" ></v-pagination>
     </v-row>
             <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <template v-slot:action="{ }">
        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</section>
</template>

<script>
import Constant from '../constant';
import ActivityCard from './ActivityCard';
import axios from 'axios';
export default {
  name: 'Activity',
  components: {
    ActivityCard
  },
  data: () => ({
    activitiesData:[
      {},{},{},{}
    ],
    loading: true,
    pagination: false,
    page: 1,
    pageLength: 1,
    snackbar: false,
    text: `Activit deleted Successfully`,
  }),
  methods:{
    deletecard:function(id){
      this.activitiesData = this.activitiesData.filter(function( obj ) {
        return obj.id !== id;
      });
      axios.delete(`${Constant.BASE_URL}/activitytracker/activities/${id}`)
      .then(function() {
      })
      .catch(function (response) {
        console.log(response);
      });
      this.snackbar = true;
      this.text = `Activity deleted Successfully`;
    },
    paginationClick(id){
      this.activitiesData = [{},{},{},{}];
      this.loading = true;
      let self = this;
      axios.get(`${Constant.BASE_URL}/activitytracker/activities?pageNo=${id}`)
      .then(function (response) {
        self.pageLength = parseInt(response.data.maxPage);
        self.page = parseInt(response.data.currentPage);
        self.activitiesData = response.data.activities;
        self.loading = false;
        self.pagination = true;
      })
      .catch(function (response) {
        console.log(response);
      });
    }
  },
  mounted:function(){
    let self = this;
    axios.get(`${Constant.BASE_URL}/activitytracker/activities`)
    .then(function (response) {
      self.pageLength = parseInt(response.data.maxPage);
      self.page = parseInt(response.data.currentPage);
      self.activitiesData = response.data.activities;
      self.loading = false;
      self.pagination = true;
    })
    .catch(function (response) {
      console.log(response);
      self.loading = false;
      self.activitiesData = [];
    });
  }
};
</script>
