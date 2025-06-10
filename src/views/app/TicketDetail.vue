<script setup>
import { onMounted, ref } from 'vue'
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { capitalize } from 'lodash'
import { DateTime } from 'luxon'

const ticketStore = useTicketStore()
const { success, error, loading } = storeToRefs(ticketStore)
const { fetchTicket, createTicketreply } = ticketStore

const route = useRoute()

const ticket = ref({})
const form = ref({
    content: '',
})

const fetchTicketDetail = async () => {
    const response = await fetchTicket(route.params.code)

    ticket.value = response
    form.value.status = response.status
}

const handleSubmit = async () => {
    await createTicketreply(route.params.code, form.value)

    error.value = null
    form.value.content = null

    await fetchTicketDetail()
}

onMounted(async () => {
    await fetchTicketDetail()
})
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

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div class="p-6">
            <div class="flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">
                        {{ ticket.title }}
                    </h1>
                    <div class="mt-2 flex items-center space-x-4">
                        <span
                            class="px-3 py-1 text-xs font-medium rounded-full"
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
                            class="px-3 py-1 text-xs font-medium rounded-full"
                            :class="{
                                'text-red-700 bg-red-100': ticket.status === 'high',
                                'text-yellow-700 bg-yellow-100': ticket.status === 'medium',
                                'text-green-700 bg-green-100': ticket.status === 'low',
                            }"
                        >
                            {{ capitalize(ticket.priority) }}
                        </span>
                        <span class="text-sm text-gray-500"> #{{ ticket.code }} </span>
                        <span class="text-sm text-gray-500">
                            Dibuat pada
                            {{
                                DateTime.fromISO(ticket.created_at).toFormat('dd MMMM yyyy, HH:mm')
                            }}
                        </span>
                    </div>
                </div>

                <button
                    class="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                    <i data-feather="download" class="w-4 h-4 inline-block mr-2"></i>
                    Lampiran
                </button>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div
            class="p-6 border-b border-gray-100"
            v-for="reply in ticket.ticket_replies"
            :key="reply.id"
        >
            <div class="flex items-start space-x-4">
                <img
                    :src="`https://ui-avatars.com/api/?name=${reply.user.name}&background=0D8ABC&color=fff`"
                    alt="User"
                    class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="text-sm font-medium text-gray-800">
                                {{ reply.user.name }}
                            </h4>
                            <p class="text-xs text-gray-500">
                                {{
                                    DateTime.fromISO(reply.created_at).toFormat(
                                        'dd MMMM yyyy, HH:mm',
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-3 text-sm text-gray-800">
                        <p>{{ reply.content }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6 border-t border-gray-100">
            <h4 class="text-sm font-medium text-gray-800 mb-4">Tambah Balasan</h4>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="group">
                    <textarea
                        v-model="form.content"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        :class="{ 'border-red-500 ring-red-500': error?.content }"
                        rows="4"
                        placeholder="Tulis balasan anda disini.."
                        minglenght="10"
                    ></textarea>

                    <p class="mt-1 text-xs text-red-500" v-if="error?.content">
                        {{ error?.content?.join(', ') }}
                    </p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button
                            class="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                        >
                            <i data-feather="paperclip" class="w-4 h-4 inline-block mr-2"></i>
                            Lampiran
                        </button>
                    </div>

                    <button
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    >
                        <i data-feather="send" class="w-4 h-4 inline-block mr-2"></i>
                        <span v-if="!loading"> Kirim Balasan </span>
                        <span v-else> Loading... </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
