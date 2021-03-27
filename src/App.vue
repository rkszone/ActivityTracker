<template>
  <v-app>
  <v-navigation-drawer app v-model="drawer" absolute bottom temporary>
    <v-list nav dense>
      <v-list flat  v-model="group">
      <v-subheader>Menu</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :href="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-list>
  </v-navigation-drawer>
   <v-app-bar app color="deep-purple accent-4" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Activity Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
   </v-app-bar>
  <v-main>
    <v-container class="height" fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    data: () => ({
      drawer: false,
      group: null,
      selectedItem: 0,
        items: [
          { text: 'Home', icon: 'mdi-home', link: '#/' },
          { text: 'File Upload', icon: 'mdi-upload', link: '#/fileupload' },
          { text: 'Activity Summary', icon: 'mdi-bike', link: '#/activity' },
        ],
    }),
    watch:{
        '$route' (to){
            this.selectedItem = this.items.findIndex(x => x.link ===`#${to.path}`);
        }
    },
  };
</script>

<style >
  .height-100{
    height: 100vh;
  }
</style>