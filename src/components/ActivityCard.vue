<template>
<v-col align-self="stretch" cols="12" md="12" lg="6" xl="3">
<v-skeleton-loader class="card" elevation="4" v-if="loading" type="card-heading,article, actions"></v-skeleton-loader>
  <v-card class="card" v-if="!loading">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{title}} - {{type}}
        </v-list-item-title>
        <v-list-item-subtitle class="text--primary">{{def}}</v-list-item-subtitle>
        <v-list-item-subtitle >{{new Date(time).toUTCString().replace('GMT','')}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-skeleton-loader v-if="internalLoading"
          type="list-item-three-line"
        ></v-skeleton-loader>
        <p>Statistic Data</p>
      <v-list class="transparent" v-if="!internalLoading">
            <v-list-item
              v-for="item in distance"
              :key="item.type"
            >
              <v-list-item-title>{{ item.type }}</v-list-item-title>

              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-subtitle class="text-right">
                {{ item.value }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
    </v-card-text>
  <v-card-actions>
      <v-btn color="deep-purple lighten-2" text align="center" v-on:click="deleteCard(id)">
        Delete
        <v-icon right dark>
        mdi-delete-forever
      </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'ActivityCard',

    props: {
      id:{
        type: Number,
        default: -1
      },
      type:{
        type: String,
        default: ''
      },
      def:{
        type:String,
        default:''
      },
      time:{
        type: String,
        default:''
      },
      title: {
        type: String,
        default: 'Activity Title'
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      internalLoading: true,
      distance:[]
    }),
    methods: {
     deleteCard: function (id) {
       this.$emit('delete', id);
    }
   },
   mounted:function () {
     let self = this;
     if (this.id && this.id > 0) {
     axios.get(`https://activitytracker-api.azurewebsites.net/activitytracker/summaryData/${this.id}`)
      .then(function (response) {
        self.internalLoading = false;
        self.distance.push({type:'Total Distance', icon:'mdi-map-marker-distance',value:response.data.total_distance});
        self.distance.push({type:'Total Duration', icon:'mdi-timer',value:response.data.total_duration + ' mins'});
        self.distance.push({type:'Average Power', icon:'mdi-parking',value:response.data.average_power});
        self.distance.push({type:'Average Cadence', icon:'mdi-bike',value:response.data.average_cadence});
      })
      .catch(function (response) {
        console.log(response);
      });
     }
   }
  };
</script>

<style scoped>
  .card{
    margin: 16px;
  }
</style>