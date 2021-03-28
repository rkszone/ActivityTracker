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
</section>
</template>

<script>
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
  }),
  methods:{
    deletecard:function(id){
      this.activitiesData = this.activitiesData.filter(function( obj ) {
        return obj.id !== id;
      });
      axios.delete(`https://activitytracker-api.azurewebsites.net/activitytracker/activities/${id}`)
      .then(function() {
      })
      .catch(function (response) {
        console.log(response);
      });
    },
    paginationClick(id){
      this.activitiesData = [{},{},{},{}];
      this.loading = true;
      let self = this;
      axios.get(`https://activitytracker-api.azurewebsites.net/activitytracker/activities?pageNo=${id}`)
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
    axios.get(`https://activitytracker-api.azurewebsites.net/activitytracker/activities`)
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
};
</script>
