<script setup>
import { onMounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { useDashboardStore } from '@/stores/dashboard'
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from 'pinia'
import { DateTime } from 'luxon'
import { capitalize } from 'lodash'
import feather from 'feather-icons'

const dashboardStore = useDashboardStore()
const { statistic } = storeToRefs(dashboardStore)
const { fetchStatistics } = dashboardStore

const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)
const { fetchTickets } = ticketStore

const toggleTicketMenu = (ticket) => {
    ticket.showMenu = !ticket.showMenu
}

let chart = null
watch(
    statistic,
    () => {
        if (statistic.value && chart) {
            chart.data.datasets[0].data = [
                statistic.value.status_distribution?.open,
                statistic.value.status_distribution?.onprogress,
                statistic.value.status_distribution?.resolved,
                statistic.value.status_distribution?.rejected,
            ]
            chart.update()
        }
    },
    { deep: true },
)

onMounted(async () => {
    await fetchTickets()
    await fetchStatistics()

    const statusCtx = document.getElementById('statusChart')?.getContext('2d')

    if (statusCtx && statistic.value) {
        chart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['open', 'onprogress', 'resolved', 'rejected'],
                datasets: [
                    {
                        data: [
                            statistic.value.status_distribution?.open,
                            statistic.value.status_distribution?.onprogress,
                            statistic.value.status_distribution?.resolved,
                            statistic.value.status_distribution?.rejected,
                        ],
                        backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'],
                    },
                ],
            },
            optons: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                cutout: '70%',
            },
        })
    }

    feather.replace()
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Total Tiket</p>
                    <h3 class="text-2xl font-bold text-gray-800 mt-1">
                        {{ statistic?.total_tickets }}
                    </h3>
                </div>
                <div class="p-3 bg-blue-50 rounded-lg">
                    <i data-feather="tag" class="w-6 h-6 text-blue-600"></i>
                </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
                <span class="text-green-500 flex items-center">
                    <i data-feather="trending-up" class="w-4 h-4 mr-1"></i>
                    %12
                </span>
                <span class="text-gray-500 ml-2">vs bulan lalu</span>
            </div>
        </div>

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Tiket Aktif</p>
                    <h3 class="text-2xl font-bold text-gray-800 mt-1">
                        {{ statistic?.active_tickets }}
                    </h3>
                </div>
                <div class="p-3 bg-yellow-50 rounded-lg">
                    <i data-feather="clock" class="w-6 h-6 text-yellow-600"></i>
                </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
                <span class="text-red-500 flex items-center">
                    <i data-feather="trending-down" class="w-4 h-4 mr-1"></i>
                    %12
                </span>
                <span class="text-gray-500 ml-2">vs bulan lalu</span>
            </div>
        </div>

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Selesai</p>
                    <h3 class="text-2xl font-bold text-gray-800 mt-1">
                        {{ statistic?.resolved_tickets }}
                    </h3>
                </div>
                <div class="p-3 bg-green-50 rounded-lg">
                    <i data-feather="check-circle" class="w-6 h-6 text-green-600"></i>
                </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
                <span class="text-green-500 flex items-center">
                    <i data-feather="trending-up" class="w-4 h-4 mr-1"></i>
                    %12
                </span>
                <span class="text-gray-500 ml-2">vs bulan lalu</span>
            </div>
        </div>

        <div class="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Rata-rata Waktu</p>
                    <h3 class="text-2xl font-bold text-gray-800 mt-1">
                        {{ statistic?.avg_resolution_time }}
                    </h3>
                </div>
                <div class="p-3 bg-purple-50 rounded-lg">
                    <i data-feather="clock" class="w-6 h-6 text-purple-600"></i>
                </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
                <span class="text-green-500 flex items-center">
                    <i data-feather="trending-up" class="w-4 h-4 mr-1"></i>
                    %12
                </span>
                <span class="text-gray-500 ml-2">vs bulan lalu</span>
            </div>
        </div>
    </div>
</template>
