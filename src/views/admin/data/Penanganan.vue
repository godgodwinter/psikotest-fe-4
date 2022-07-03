<script setup>
import ButtonCetak from "@/components/atoms/ButtonCetak.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";

import CardLockedFitur from "@/components/organismes/CardLockedFitur.vue";
import Api from "@/axios/axios";
import { ref, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("penanganan");

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const paket = computed(() => storeGuruBk.getPaket);
const identitas = computed(() => storeGuruBk.getIdentitas);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const dataDetail = ref([]);
const siswa = ref();

const getDataId = async () => {
  try {
    const response = await Api.get(
      `siswa/data/penanganan/${identitas.value.id}`
    );
    dataAsli.value = response.data;
    data.value = response.data;
    siswa.value = response.siswa;

    if (response.status == "failed") {
      Toast.danger("Warning", "Anda tidak memiliki Akses siswa ini!");
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataId();

const id = route.params.id;

const dataKetNegativ = ref([
  {
    label: "91-99",
    ket: "Sangat Tinggi Sekali / Sangat Mengganggu Sekali",
    kode: "STS",
  },
  {
    label: "81-90",
    ket: "Tinggi Sekali / Mengganggu Sekali",
    kode: "TS",
  },
  {
    label: "71-80",
    ket: "Tinggi / Mengganggu",
    kode: "T",
  },
  {
    label: "61-70",
    ket: "Cukup Tinggi / Cukup Mengganggu",
    kode: "CT",
  },
  {
    label: "41-60",
    ket: "Cukup / Terkendali",
    kode: "C",
  },
  {
    label: "31-40",
    ket: "Agak Rendah / Cukup Terkendali",
    kode: "AR",
  },
  {
    label: "21-30",
    ket: "Rendah / Terkendali Baik",
    kode: "R",
  },
  {
    label: "11-20",
    ket: "Rendah Sekali / Terkendali Baik Sekali",
    kode: "RS",
  },
  {
    label: "01-10",
    ket: "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali",
    kode: "SRS",
  },
]);

const encode = (value) => window.btoa(value);

const doCetak = (id = null, token = moment().format("YYYY-MM-DD")) => {
  if (id === null) {
    Toast.danger("Warning", "Data tidak valid!");
  } else {
    window.open(
      `${BASE_URL}api/guest/cetak/penanganan/${encode(id)}?token=${encode(
        token
      )}`
    );
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
      >
        <!-- {{ dataAsli.nama }} -->
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Penanganan Deteksi Masalah <BreadCrumbSpace />
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm px-2"
        >Penanganan Deteksi Masalah</span
      >
      <ButtonCetak @click="doCetak(identitas.id)" />
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>

  <div v-if="paket.penanganandeteksi != 'Aktif'">
    <CardLockedFitur />
  </div>
  <div v-else>
    <div v-if="siswa">
      <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto">
              <table class="table table-compact">
                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <td class="whitespace-nowrap w-1/12">No Induk</td>
                    <td class="whitespace-nowrap w-1/12">:</td>
                    <td class="whitespace-nowrap w-10/12">
                      {{ siswa.nomeridentitas }}
                    </td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ siswa.nama }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Umur</td>
                    <td>:</td>
                    <td>{{ siswa.umur }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{{ siswa.jk }}</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Sekolah</td>
                    <td>:</td>
                    <td>{{ siswa.sekolah_nama }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
          <div class="bg-white shadow rounded-lg px-4 py-4">
            <div class="overflow-x-auto px-4 space-y-10 mt-4 py-4">
              <div v-for="(item, index) in data" class="space-y-2">
                <h1 class="text-lg font-bold text-gray-700">
                  {{ index + 1 }}. {{ item.nama }} : {{ item.score }} -
                  {{ item.singkatan }}
                </h1>
                <p class="indent-8 text-gray-700">{{ item.penanganan }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
