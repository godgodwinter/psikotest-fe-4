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
          component: () => import("@/views/admin/DashBoard.vue"),
        },
        {
          path: '/pages/data/sertifikat',
          name: 'AdminSertifikat',
          component: () => import("@/views/admin/data/Sertifikat.vue"),
        },
        {
          path: '/pages/data/terapis',
          name: 'AdminTerapis',
          component: () => import("@/views/admin/data/Terapis.vue"),
        },
        {
          path: '/pages/data/deteksi',
          name: 'AdminDeteksi',
          component: () => import("@/views/admin/data/Deteksi.vue"),
        },
        {
          path: '/pages/data/penanganan',
          name: 'AdminPenanganan',
          component: () => import("@/views/admin/data/Penanganan.vue"),
        },
        {
          path: '/pages/data/catatan/kasus',
          name: 'AdminCatatanKasus',
          component: () => import("@/views/admin/data/CatatanKasus.vue"),
        },
        {
          path: '/pages/data/catatan/kasus/:id',
          name: 'AdminCatatanKasusDetail',
          component: () => import("@/views/admin/data/CatatanKasusDetail.vue"),
        },
        {
          path: '/pages/data/catatan/pengembangandiri',
          name: 'AdminPengembangandiri',
          component: () => import("@/views/admin/data/CatatanPengembangandiri.vue"),
        },
        {
          path: '/pages/data/catatan/pengembangandiri/:id',
          name: 'AdminPengembangandiriDetail',
          component: () => import("@/views/admin/data/CatatanPengembangandiriDetail.vue"),
        },
        {
          path: '/pages/data/catatan/prestasi',
          name: 'AdminPrestasi',
          component: () => import("@/views/admin/data/CatatanPrestasi.vue"),
        },
        {
          path: '/pages/data/catatan/prestasi:id',
          name: 'AdminPrestasiDetail',
          component: () => import("@/views/admin/data/CatatanPrestasiDetail.vue"),
        },
        {
          path: '/pages/data/catatan/klasifikasi',
          name: 'AdminKlasifikasi',
          component: () => import("@/views/admin/data/Klasifikasi.vue"),
        },
        {
          path: '/pages/data/catatan/klasifikasi/:id',
          name: 'AdminKlasifikasiDetail',
          component: () => import("@/views/admin/data/KlasifikasiDetail.vue"),
        },
        {
          path: '/pages/data/catatan/referensistudi',
          name: 'AdminReferensiStudi',
          component: () => import("@/views/admin/data/ReferensiStudi.vue"),
        },
        {
          path: '/pages/data/catatan/referensistudi/:id',
          name: 'AdminReferensiStudiDetail',
          component: () => import("@/views/admin/data/ReferensiStudiDetail.vue"),
        },
        {
          path: '/pages/data/catatan/buletin',
          name: 'AdminBuletin',
          component: () => import("@/views/admin/data/Buletin.vue"),
        },
        {
          path: '/pages/data/catatan/buletin/:id',
          name: 'AdminBuletinDetail',
          component: () => import("@/views/admin/data/BuletinDetail.vue"),
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
