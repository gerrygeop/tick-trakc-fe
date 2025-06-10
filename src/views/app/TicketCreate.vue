<script setup>
import { onMounted, ref } from 'vue'
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from 'pinia'

const ticketStore = useTicketStore()
const { success, error, loading } = storeToRefs(ticketStore)
const { createTicket } = ticketStore

const form = ref({
    title: '',
    description: '',
    priority: '',
})

const handleSubmit = async () => {
    await createTicket(form.value)
}

// onMounted(async () => {})
</script>

<template>
    <div class="mb-6">
        <RouterLink
            :to="{ name: 'app.dashboard' }"
            class="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
            <i data-feather="arrow-left" class="w-4 h-4 mr-2"></i>
            Kembali ke Daftar Tiket
        </RouterLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-gray-800">Buat Tiker Baru</h1>
            <p class="text-sm text-gray-500 mt-1">Isi form dibawah ini untuk membuat tiket</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-2"
                    >Judul Tiket</label
                >
                <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    placeholder="Contoh: gangguan  jaringan wifi"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <div v-if="error?.title" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">
                        {{ error.title[0] }}
                    </p>
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2"
                    >Deskripsi Masalah</label
                >
                <textarea
                    name="description"
                    id="description"
                    v-model="form.description"
                    rows="6"
                    placeholder="Jelaskan masalah anda secara detail. Sertakan informasi seperti:&#10;- Kapan masalah mulai&#10;- Apa yang sudah anda coba&#10;- Dampak masalah terhadap pekerjaan"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>

                <div v-if="error?.description" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">
                        {{ error.description[0] }}
                    </p>
                </div>
            </div>

            <!-- Priority -->
            <div>
                <label for="priority" class="block text-sm font-medium text-gray-700 mb-2"
                    >Prioritas</label
                >
                <div class="grid grid-cols-3 gap-4">
                    <label
                        class="relative flex cursor-pointer rounded-lg border"
                        :class="[
                            form.priority === 'low'
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200',
                        ]"
                    >
                        <input type="radio" v-model="form.priority" value="low" class="sr-only" />
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Rendah</p>
                                    <p class="text-gray-500">Tidak Mendesak</p>
                                </div>
                            </div>

                            <div class="shrink-0 text-green-600" v-show="form.priority === 'low'">
                                <i data-feather="check-cirlce" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>

                    <label
                        class="relative flex cursor-pointer rounded-lg border"
                        :class="[
                            form.priority === 'medium'
                                ? 'border-yellow-200 bg-yellow-50'
                                : 'border-gray-200',
                        ]"
                    >
                        <input
                            type="radio"
                            v-model="form.priority"
                            value="medium"
                            class="sr-only"
                        />
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Sedang</p>
                                    <p class="text-gray-500">Normal</p>
                                </div>
                            </div>

                            <div
                                class="shrink-0 text-yellow-600"
                                v-show="form.priority === 'medium'"
                            >
                                <i data-feather="check-cirlce" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>

                    <label
                        class="relative flex cursor-pointer rounded-lg border"
                        :class="[
                            form.priority === 'high'
                                ? 'border-red-200 bg-red-50'
                                : 'border-gray-200',
                        ]"
                    >
                        <input type="radio" v-model="form.priority" value="high" class="sr-only" />
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Tinggi</p>
                                    <p class="text-gray-500">Mendesak</p>
                                </div>
                            </div>

                            <div class="shrink-0 text-red-600" v-show="form.priority === 'high'">
                                <i data-feather="check-cirlce" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>
