<script setup>
import Api from "@/axios/axios";
import { ref, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { Field, Form } from "vee-validate";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Fungsi from "@/components/lib/Psikotest.js";
import CardSertifikat1 from "@/components/organismes/sertifikat/CardSertifikat1.vue"; // paket premuin
import CardSertifikat2 from "@/components/organismes/sertifikat/CardSertifikat2.vue"; //gold and above

import { useStoreGuruBk } from "@/stores/guruBk";
const storeGuruBk = useStoreGuruBk();
const paket = computed(() => storeGuruBk.getPaket);
storeGuruBk.$subscribe((mutation, state) => {
  // console.log(mutation, state);
  // console.log(paket.value);
});

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("sertifikat");

const router = useRouter();
const route = useRoute();

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const dataDetail = ref([]);
const siswa = ref();
const aspekKepribadianRank = ref([]);
const temp = ref([{ nama: "" }]);
const kecerdasan = ref([]);
const kelas = ref(null);
const getDataId = async () => {
  try {
    const response = await Api.get(`siswa/data/sertifikat`);
    dataAsli.value = response.data;
    dataDetail.value = response.data;
    kelas.value = Fungsi.getKelas(response.data.kelas_nama);
    data.value = response.data.sertifikat;
    siswa.value = response.data;

    if (response.status == "failed") {
      Toast.danger("Warning", "Anda tidak memiliki Akses siswa ini!");
      return response.data;
    }
    if (response.data.sertifikat == null || response.data.deteksi == null) {
      Toast.danger("Warning", "Data Api Siswa tidak ditemukan!");
      return response.data;
    }

    aspekKepribadianRank.value = [
      {
        nama: "Faktor Sikap Dingin",
        rank: data.value.hspq_a_kr_rank,
        persen: data.value.hspq_a_kr_persen,
        ket: data.value.hspq_a_kr_keterangan,
        positif_diungkap: data.value.hspq_a_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Labil",
        rank: data.value.hspq_c_kr_rank,
        persen: data.value.hspq_c_kr_persen,
        ket: data.value.hspq_c_kr_keterangan,
        positif_diungkap: data.value.hspq_c_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Sulit Bergairah",
        rank: data.value.hspq_d_kr_rank,
        persen: data.value.hspq_d_kr_persen,
        ket: data.value.hspq_d_kr_keterangan,
        positif_diungkap: data.value.hspq_d_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Patuh atau Tunduk",
        rank: data.value.hspq_e_kr_rank,
        persen: data.value.hspq_e_kr_persen,
        ket: data.value.hspq_e_kr_keterangan,
        positif_diungkap: data.value.hspq_e_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sungguh-sungguh",
        rank: data.value.hspq_f_kr_rank,
        persen: data.value.hspq_f_kr_persen,
        ket: data.value.hspq_f_kr_keterangan,
        positif_diungkap: data.value.hspq_f_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Menolak Peraturan",
        rank: data.value.hspq_g_kr_rank,
        persen: data.value.hspq_g_kr_persen,
        ket: data.value.hspq_g_kr_keterangan,
        positif_diungkap: data.value.hspq_g_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keras Hati",
        rank: data.value.hspq_h_kr_rank,
        persen: data.value.hspq_h_kr_persen,
        ket: data.value.hspq_h_kr_keterangan,
        positif_diungkap: data.value.hspq_h_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemalu",
        rank: data.value.hspq_i_kr_rank,
        persen: data.value.hspq_i_kr_persen,
        ket: data.value.hspq_i_kr_keterangan,
        positif_diungkap: data.value.hspq_i_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bersemangat",
        rank: data.value.hspq_j_kr_rank,
        persen: data.value.hspq_j_kr_persen,
        ket: data.value.hspq_j_kr_keterangan,
        positif_diungkap: data.value.hspq_j_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Percaya Diri",
        rank: data.value.hspq_o_kr_rank,
        persen: data.value.hspq_o_kr_persen,
        ket: data.value.hspq_o_kr_keterangan,
        positif_diungkap: data.value.hspq_o_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Mandiri",
        rank: data.value.hspq_q2_kr_rank,
        persen: data.value.hspq_q2_kr_persen,
        ket: data.value.hspq_q2_kr_keterangan,
        positif_diungkap: data.value.hspq_q2_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Disiplin",
        rank: data.value.hspq_q3_kr_rank,
        persen: data.value.hspq_q3_kr_persen,
        ket: data.value.hspq_q3_kr_keterangan,
        positif_diungkap: data.value.hspq_q3_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Rileks atau santai",
        rank: data.value.hspq_q4_kr_rank,
        persen: data.value.hspq_q4_kr_persen,
        ket: data.value.hspq_q4_kr_keterangan,
        positif_diungkap: data.value.hspq_q4_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Hangat",
        rank: data.value.hspq_a_kn_rank,
        persen: data.value.hspq_a_kn_persen,
        ket: data.value.hspq_a_kn_keterangan,
        positif_diungkap: data.value.hspq_a_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Stabil",
        rank: data.value.hspq_c_kn_rank,
        persen: data.value.hspq_c_kn_persen,
        ket: data.value.hspq_c_kn_keterangan,
        positif_diungkap: data.value.hspq_c_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bergairah",
        rank: data.value.hspq_d_kn_rank,
        persen: data.value.hspq_d_kn_persen,
        ket: data.value.hspq_d_kn_keterangan,
        positif_diungkap: data.value.hspq_d_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Dominasi",
        rank: data.value.hspq_e_kn_rank,
        persen: data.value.hspq_e_kn_persen,
        ket: data.value.hspq_e_kn_keterangan,
        positif_diungkap: data.value.hspq_e_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_e_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keceriaan",
        rank: data.value.hspq_f_kn_rank,
        persen: data.value.hspq_f_kn_persen,
        ket: data.value.hspq_f_kn_keterangan,
        positif_diungkap: data.value.hspq_f_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Taat Peraturan",
        rank: data.value.hspq_g_kn_rank,
        persen: data.value.hspq_g_kn_persen,
        ket: data.value.hspq_g_kn_keterangan,
        positif_diungkap: data.value.hspq_g_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Lembut Hati / Peka",
        rank: data.value.hspq_h_kn_rank,
        persen: data.value.hspq_h_kn_persen,
        ket: data.value.hspq_h_kn_keterangan,
        positif_diungkap: data.value.hspq_h_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemberani",
        rank: data.value.hspq_i_kn_rank,
        persen: data.value.hspq_i_kn_persen,
        ket: data.value.hspq_i_kn_keterangan,
        positif_diungkap: data.value.hspq_i_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Menarik Diri",
        rank: data.value.hspq_j_kn_rank,
        persen: data.value.hspq_j_kn_persen,
        ket: data.value.hspq_j_kn_keterangan,
        positif_diungkap: data.value.hspq_j_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Ketakutan",
        rank: data.value.hspq_o_kn_rank,
        persen: data.value.hspq_o_kn_persen,
        ket: data.value.hspq_o_kn_keterangan,
        positif_diungkap: data.value.hspq_o_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Mandiri",
        rank: data.value.hspq_q2_kn_rank,
        persen: data.value.hspq_q2_kn_persen,
        ket: data.value.hspq_q2_kn_keterangan,
        positif_diungkap: data.value.hspq_q2_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Disiplin",
        rank: data.value.hspq_q3_kn_rank,
        persen: data.value.hspq_q3_kn_persen,
        ket: data.value.hspq_q3_kn_keterangan,
        positif_diungkap: data.value.hspq_q3_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Tegang",
        rank: data.value.hspq_q4_kn_rank,
        persen: data.value.hspq_q4_kn_persen,
        ket: data.value.hspq_q4_kn_keterangan,
        positif_diungkap: data.value.hspq_q4_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kn_aspek_negatif_di_ungkap,
      },
    ];

    // aspekKepribadianRank map args params

    aspekKepribadianRank.value = aspekKepribadianRank.value.map(
      (item, index) => {
        return {
          ...item,
          keterangan: Fungsi.kepanjangan(item.ket),
        };
      }
    );

    aspekKepribadianRank.value.sort(function (a, b) {
      return a.rank - b.rank;
    });

    kecerdasan.value = [
      {
        nama: "Kecerdasan Linguistik",
        persen: data.value.kb_persen,
        ket: data.value.kbh,
      },
      {
        nama: "Kecerdasan Logis - Matematis",
        persen: data.value.lm_persen,
        ket: data.value.lmh,
      },
      {
        nama: "Kecerdasan Spasial",
        persen: data.value.ks_persen,
        ket: data.value.ksh,
      },
      {
        nama: "Kecerdasan Musikal",
        persen: data.value.km_persen,
        ket: data.value.kmh,
      },
      {
        nama: "Kecerdasan Kinetik",
        persen: data.value.kk_persen,
        ket: data.value.kkh,
      },
      {
        nama: "Kecerdasan Interpersonal",
        persen: data.value.ki_persen,
        ket: data.value.kih,
      },
      {
        nama: "Kecerdasan Intrapersonal",
        persen: data.value.ka_persen,
        ket: data.value.kah,
      },
      {
        nama: "Kecerdasan Natural",
        persen: data.value.kn_persen,
        ket: data.value.knh,
      },
    ];
    temp.value = kecerdasan.value.slice(0);
    temp.value.sort(function (a, b) {
      return b.persen - a.persen;
    });
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data Siswa tidak ditemukan!");
    console.error(error);
  }
};
getDataId();
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
        <template v-slot:content> Sertifikat <BreadCrumbSpace /> </template>
      </BreadCrumb>
    </div>
  </div>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Sertifikat Psikologis
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <!-- <button
        class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Kembali
      </button> -->
    </div>
  </div>
  <div v-if="siswa">
    <CardSertifikat2
      v-if="paket.nama != 'Premium'"
      :siswa="siswa"
      :aspekKepribadianRank="aspekKepribadianRank"
      :temp="temp"
      :paket="paket"
      :kelas="kelas"
    />
    <CardSertifikat1
      v-else
      :siswa="siswa"
      :aspekKepribadianRank="aspekKepribadianRank"
      :temp="temp"
      :paket="paket"
      :kelas="kelas"
    />
  </div>
</template>
