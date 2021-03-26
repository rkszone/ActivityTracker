<template>
<v-col align-self="stretch" cols="12" md="12" lg="6" xl="3">
<v-skeleton-loader class="card" elevation="4" v-if="loading" v-bind="attrs" type="card-heading,article, actions"></v-skeleton-loader>
  <v-card class="card" v-if="!loading">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{title}}
        </v-list-item-title>
        <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-list class="transparent">
            <v-list-item
              v-for="item in distance"
              :key="item.type"
            >
              <v-list-item-title>{{ item.type }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle class="text-right">
                {{ item.value }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text align="center" v-on:click="deleteCard">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</template>

<script>
  export default {
    name: 'ActivityCard',
    props: {
      title: {
        type: String,
        default: 'Activity Title'
      },
      loading: {
        type: Boolean,
        default: true
      },
      distance: {
        type: Array
      }
    },
    data: () => ({
    }),
    methods: {
     deleteCard: function () {
       alert('Event to fire to parent to delete');
    }
   }
  };
</script>

<style scoped>
.card{
  margin: 16px;
}
</style>