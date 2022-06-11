<script setup>
import { ref, computed, watch } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreGuruBk } from "@/stores/guruBk";
import { useRouter, useRoute } from "vue-router";

import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Toast from "@/components/lib/Toast.js";
import Api from "@/axios/axios";

moment.updateLocale("id", localization);
const storeGuruBk = useStoreGuruBk();
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("dashboard");

const router = useRouter();
const route = useRoute();
const getPaket = computed(() => storeGuruBk.getPaket);
const getStats = computed(() => storeGuruBk.getStats);
const getSekolah = computed(() => storeGuruBk.getSekolah);
const getIdentitas = computed(() => storeGuruBk.getIdentitas);
const data = ref([]);
const dataDetail = ref({
  nama: getIdentitas.value.nama,
  nomeridentitas: getIdentitas.value.nomeridentitas,
  alamat: getIdentitas.value.alamat,
  jk: getIdentitas.value.jk,
  tempatlahir: getIdentitas.value.tempatlahir,
  tgllahir: getIdentitas.value.tgllahir,
  usia: getIdentitas.value.usia,
  agama: getIdentitas.value.agama,
  anak: getIdentitas.value.anak,
  kandung: getIdentitas.value.kandung,
  angkat: getIdentitas.value.angkat,
  tiri: getIdentitas.value.tiri,
  statusanak: getIdentitas.value.statusanak,
  bahasa: getIdentitas.value.bahasa,
  tinggal: getIdentitas.value.tinggal,
  jarak: getIdentitas.value.jarak,
  telp: getIdentitas.value.telp,
  kelas_id: {
    label: `${getIdentitas.value.kelas ? getIdentitas.value.kelas.nama : ""}`,
    id: getIdentitas.value.kelas_id,
  },
});

const id = getSekolah.value.id;
// validasi
const validateData = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 2 characters";
  }
  return true;
};
const onSubmit = () => {
  const res = doStoreData();
};

const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
    nomeridentitas: dataDetail.value.nomeridentitas,
    alamat: dataDetail.value.alamat,
    jk: dataDetail.value.jk,
    // kelas_id: dataDetail.value.kelas_id.id,
    tempatlahir: dataDetail.value.tempatlahir,
    tgllahir: dataDetail.value.tgllahir,
    usia: dataDetail.value.usia,
    agama: dataDetail.value.agama,
    anak: dataDetail.value.anak,
    kandung: dataDetail.value.kandung,
    angkat: dataDetail.value.angkat,
    tiri: dataDetail.value.tiri,
    statusanak: dataDetail.value.statusanak,
    bahasa: dataDetail.value.bahasa,
    tinggal: dataDetail.value.tinggal,
    jarak: dataDetail.value.jarak,
    telp: dataDetail.value.telp,
  };
  try {
    const response = await Api.post(`siswa/myprofile/update`, dataStore);
    Toast.success("Success", "Data Berhasil update!");
    router.go();
    // resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
// vue pinia watch
storeGuruBk.$subscribe((mutation, state) => {});

const dataKelas = ref([]);
let pilihKelas = ref([]);
// get Kelas
const getDataKelas = async () => {
  try {
    const response = await Api.get(`siswa/datasekolah/${id}/kelas`);
    // console.log(response);
    dataKelas.value = response.data;
    dataKelas.value.forEach((item) => {
      pilihKelas.value.push({
        label: item.nama,
        id: item.id,
      });
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKelas();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm"
        >Dashboard</span
      >
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Dashboard <BreadCrumbSpace /> Index
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:px-10 py-4">
    <div class="alert alert-info shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Selamat Datang di Menu Siswa.</span>
      </div>
    </div>
  </div>

  <!-- <div class="px-4 py-4">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Jenis Paket :</div>
        <div class="stat-value">Kelas {{ getPaket.nama }}</div>
        <div class="stat-desc">
          Last Updated :
          {{
            moment(getSekolah.updated_at, "YYYY-MM-DD").format(" Do MMM YYYY")
          }}
        </div>
      </div>
    </div>
  </div>
  <div class="px-4 py-4">
    <div class="stats shadow stats-vertical md:stats-horizontal">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Kelas</div>
        <div class="stat-value">{{ getStats.kelas }} Kelas</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Siswa</div>
        <div class="stat-value">{{ getStats.siswa }} Siswa</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Walikelas</div>
        <div class="stat-value">{{ getStats.walikelas }}</div>
      </div>
    </div>
  </div> -->

  <div class="px-4 py-4">
    <h3 class="font-bold">Update Profile</h3>
  </div>

  <div class="px-4 py-4">
    <div class="w-full">
      <div class="bg-base-100 shadow rounded-lg px-0 py-4">
        <div class="w-full lg:w-fi mx-4">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-base-content block mb-2"
                          >Nama</label
                        >
                        <Field
                          v-model="dataDetail.nama"
                          :rules="validateData"
                          type="text"
                          name="nama"
                          ref="nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >NISN</label
                        >
                        <Field
                          v-model="dataDetail.nomeridentitas"
                          type="text"
                          name="nomeridentitas"
                          ref="nomeridentitas"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nomeridentitas }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Kelas</label
                        >
                        <v-select
                          class="py-2 px-3 w-72 mx-auto md:mx-0"
                          :options="pilihKelas"
                          v-model="dataDetail.kelas_id"
                          :disabled="true"
                        ></v-select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tempat Lahir</label
                        >
                        <Field
                          v-model="dataDetail.tempatlahir"
                          type="text"
                          name="tempatlahir"
                          ref="tempatlahir"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tempatlahir }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tanggal Lahir</label
                        >
                        <Datepicker
                          v-model="dataDetail.tgllahir"
                          format="yyyy/MM/dd"
                          value-format="yyyy-MM-dd"
                          :rules="validateData"
                          required
                        >
                          <template #calendar-header="{ index, day }">
                            <div
                              :class="
                                index === 5 || index === 6 ? 'red-color' : ''
                              "
                            >
                              {{ day }}
                            </div>
                          </template>
                        </Datepicker>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tgllahir }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Usia</label
                        >
                        <Field
                          v-model="dataDetail.usia"
                          type="text"
                          name="usia"
                          ref="usia"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.usia }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Alamat</label
                        >
                        <Field
                          v-model="dataDetail.alamat"
                          type="text"
                          name="alamat"
                          ref="alamat"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.alamat }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >No. Handphone</label
                        >
                        <Field
                          v-model="dataDetail.telp"
                          type="text"
                          name="telp"
                          ref="telp"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.telp }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jenis Kelamin</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.jk"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Laki-laki</option>
                          <option>Perempuan</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.jk }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Agama</label
                        >
                        <Field
                          v-model="dataDetail.agama"
                          type="text"
                          name="agama"
                          ref="agama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.agama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Anak ke</label
                        >
                        <Field
                          v-model="dataDetail.anak"
                          type="text"
                          name="anak"
                          ref="anak"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.anak }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jumlah Saudara Kandung</label
                        >
                        <Field
                          v-model="dataDetail.kandung"
                          type="text"
                          name="kandung"
                          ref="kandung"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kandung }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jumlah Saudara Angkat</label
                        >
                        <Field
                          v-model="dataDetail.angkat"
                          type="text"
                          name="angkat"
                          ref="angkat"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.angkat }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jumlah Saudara Tiri</label
                        >
                        <Field
                          v-model="dataDetail.tiri"
                          type="text"
                          name="tiri"
                          ref="tiri"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tiri }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Status Anak</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.statusanak"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Lengkap</option>
                          <option>Yatim</option>
                          <option>Piatu</option>
                          <option>Yatim Piatu</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.statusanak }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Bahasa Sehari-Hari Dirumah</label
                        >
                        <Field
                          v-model="dataDetail.bahasa"
                          type="text"
                          name="bahasa"
                          ref="bahasa"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.bahasa }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tinggal Dengan</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.tinggal"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Orang Tua</option>
                          <option>Saudara</option>
                          <option>Asrama/Kost</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tinggal }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Jarak Ke Sekolah</label
                        >
                        <Field
                          v-model="dataDetail.jarak"
                          type="text"
                          name="jarak"
                          ref="jarak"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.jarak }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                      <button class="btn btn-lg btn-primary">Simpan</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-4 py-4">
    <h3 class="font-bold">Update Photo</h3>
  </div>
  <div class="lg:flex felx-wrap gap-2 w-full px-4">
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          src="@/assets/img/logo/github-copilot.svg"
          alt="Shoes"
          class="rounded-xl text-white"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Nama Sekolah</h2>
        <p>Alamat</p>
        <div class="card-actions">
          <button class="btn btn-primary">Update Logo Sekolah</button>
        </div>
      </div>
    </div>

    <div class="card w-96 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          src="@/assets/img/logo/github-copilot.svg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Nama Kepala Sekolah</h2>
        <p>Alamat</p>
        <div class="card-actions">
          <button class="btn btn-primary">Update Photo Kepala Sekolah</button>
        </div>
      </div>
    </div>
  </div>
</template>
