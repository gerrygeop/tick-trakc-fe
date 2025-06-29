<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from 'pinia'
import { debounce } from 'lodash'
import { DateTime } from 'luxon'
import { capitalize } from 'lodash'
import feather from 'feather-icons'

const ticketStore = useTicketStore()
const { tickets, success } = storeToRefs(ticketStore)
const { fetchTickets } = ticketStore

const filters = ref({
    search: '',
    status: '',
    priority: '',
    date: '',
})

watch(
    filters,
    debounce(async () => {
        await fetchTickets(filters.value)
    }, 300),
    { deep: true },
)

onMounted(async () => {
    await fetchTickets()

    feather.replace()
})
</script>

<template>
    <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-y-4 sm:gap-y-0">
        <div class="text-center sm:text-start">
            <h1 class="text-2xl font-bold text-gray-800">Tiket Saya</h1>
            <p class="text-sm text-gray-500 sm:mt-1">Kelola dan pantau status tiket saya</p>
        </div>

        <RouterLink
            :to="{ name: 'app.ticket.create' }"
            class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
            <i data-feather="plus" class="w-4 h-4 mr-2"></i>
            Buat Tiket Baru
        </RouterLink>
    </div>

    <div
        class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative flex items-center justify-between"
        role="alert"
        v-if="success"
    >
        <div class="flex items-center">
            <i data-feather="check-circle" class="w-5 h-5 mr-2"></i>
            <span>{{ success }}</span>
        </div>

        <button class="flex items-center justify-between" @click="success = null">
            <i data-feather="x" class="w-4 h-4 text-green-600"></i>
        </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Cari..."
                        v-model="filters.search"
                        class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <i
                        data-feather="search"
                        class="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                    ></i>
                </div>

                <select
                    v-model="filters.status"
                    class="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Semua Status</option>
                    <option value="open">Open</option>
                    <option value="onprogress">On Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    v-model="filters.priority"
                    class="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Semua Prioritas</option>
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                </select>
                <select
                    v-model="filters.date"
                    class="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Semua Tanggal</option>
                    <option value="today">Hari ini</option>
                    <option value="week">Minggu ini</option>
                    <option value="month">Bulan ini</option>
                </select>
            </div>
        </div>
    </div>

    <div class="space-y-4">
        <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            v-for="ticket in tickets"
            :key="ticket.code"
        >
            <RouterLink
                :to="{ name: 'app.ticket.detail', params: { code: ticket.code } }"
                class="block p-6"
            >
                <div>
                    <div
                        class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-y-1 sm:gap-y-0 space-x-3"
                    >
                        <h3 class="text-lg font-semibold text-gray-800">
                            {{ ticket.title }}
                        </h3>

                        <div class="flex items-center space-x-2">
                            <span
                                class="px-3 py-1 text-xs font-medium rounded-lg"
                                :class="{
                                    'text-blue-700 bg-blue-100': ticket.status === 'open',
                                    'text-yellow-700 bg-yellow-100': ticket.status === 'onprogress',
                                    'text-green-700 bg-green-100': ticket.status === 'resolved',
                                    'text-red-700 bg-red-100': ticket.status === 'rejected',
                                }"
                            >
                                {{ capitalize(ticket.status) }}
                            </span>

                            <span
                                class="px-3 py-1 text-xs font-medium rounded-lg"
                                :class="{
                                    'text-red-700 bg-red-100': ticket.priority === 'high',
                                    'text-yellow-700 bg-yellow-100': ticket.priority === 'medium',
                                    'text-green-700 bg-green-100': ticket.priority === 'low',
                                }"
                            >
                                {{ capitalize(ticket.priority) }}
                            </span>
                        </div>
                    </div>

                    <p class="text-sm text-gray-500 mt-2 sm:mt-1">
                        #{{ ticket.code }} | Dibuat pada
                        {{ DateTime.fromISO(ticket.created_at).toFormat('dd MMMM yyyy, HH:mm') }}
                    </p>

                    <p class="text-base text-gray-700 mt-2 sm:mt-1">
                        {{ ticket.description }}
                    </p>

                    <div
                        class="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-x-4 text-gray-500 text-sm"
                    >
                        <div class="shrink-0 flex items-end">
                            <i data-feather="message-square" class="w-4 h-4 inline-block mr-1"></i>
                            <span>{{ ticket.ticket_replies.length }} balasan</span>
                        </div>
                        <div class="shrink-0 flex items-end">
                            <i data-feather="clock" class="w-4 h-4 mr-1"></i>
                            <span>
                                Terakhir diupdate
                                {{
                                    DateTime.fromISO(ticket.updated_at).toFormat(
                                        'dd MMMM yyyy, HH:mm',
                                    )
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
