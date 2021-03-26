<template>
<section>
    <v-toolbar dense>
      <v-toolbar-title>Activity List</v-toolbar-title>
    </v-toolbar>

     <v-row  no-gutters>
       <ActivityCard :title="title"></ActivityCard>
       <ActivityCard :title="title"></ActivityCard>
       <ActivityCard :title="title"></ActivityCard>
     </v-row>

     <v-row>
      <v-pagination v-model="page" :length="6" ></v-pagination>
     </v-row>


</section>
</template>

<script>
import ActivityCard from './ActivityCard';
  export default {
    name: 'Activity',
    components: {
      ActivityCard
    },
    data: () => ({
      title: "Sample",
      page: 1
    }),
  }
</script>
