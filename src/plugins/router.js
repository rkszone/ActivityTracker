import Vue from 'vue';
import VueRouter from 'vue-router';
import FileUpload from './../components/FileUpload';
import Activity from './../components/Activity';
import Home from './../components/Home';

Vue.use(VueRouter);

const routes = [
    { path: '/fileupload', component: FileUpload },
    { path: '/activity', component: Activity },
    { path: '*' , component: Home}
  ];

  const router = new VueRouter({
    routes
  });

export default router;

