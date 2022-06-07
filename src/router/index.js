import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
// pages
import NotFound from '../views/NotFound.vue';
import Locked from '../views/Locked.vue';
import Maintenance from '../views/Maintenance.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingLogin from '../views/landing/LandingLogin.vue';

// admin
import DashBoard from '../views/admin/DashBoard.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingLayout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'LandingIndex',
          component: LandingLogin,
        },
        {
          path: '/login',
          name: 'LandingLogin',
          component: LandingLogin,
        },
        {
          path: '/404',
          name: 'NotFound',
          component: NotFound,
        },
        {
          path: '/locked',
          name: 'Locked',
          component: Locked,
        },
        {
          path: '/maintenance',
          name: 'Maintenance',
          component: Maintenance,
        },
      ],
    },
    {
      path: '/:catchAll(.*)', redirect: '/404',
    },

    {
      path: '/pages/',
      name: 'LandingAdmin',
      component: AdminLayout,
      redirect: '/pages/admin',
      children: [
        {
          path: '/pages/admin',
          name: 'AdminDashboard',
          component: DashBoard,
        },
        {
          path: '/pages/data/sertifikat',
          name: 'AdminSertifikat',
          component: () => import("@/views/admin/data/Sertifikat.vue"),
        },
        {
          path: '/pages/data/deteksi',
          name: 'AdminDeteksi',
          component: () => import("@/views/admin/data/Deteksi.vue"),
        },
      ],
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
