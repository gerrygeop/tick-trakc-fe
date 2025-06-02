<script setup>
const filters = ref({})
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative">
                        <input
                            type="text"
                            v-model="filters.search"
                            placeholder="Cari tiket"
                            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-300"
                        />
                        <i
                            data-feather="search"
                            class="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                        ></i>
                    </div>

                    <select
                        v-model="filters.status"
                        class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1"
                    >
                        <option value="">Semua Status</option>
                        <option value="open">Open</option>
                        <option value="onprogress">On Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <select
                        v-model="filters.priority"
                        class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1"
                    >
                        <option value="">Semua Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <select
                        class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1"
                    >
                        <option value="">Semua Tanggal</option>
                        <option value="today">Hari ini</option>
                        <option value="week">Minggu ini</option>
                        <option value="month">Bulan ini</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
