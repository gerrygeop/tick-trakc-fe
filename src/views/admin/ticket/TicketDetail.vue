<script setup>
const ticket = ref({})
const form = ref({
    status: '',
    content: '',
})

const fetchTicketDetail = async () => {
    const response = await fetchTicket(route.params.code)

    ticket.value = response
    form.value.status = response.status
}

const handleSubmit = async () => {
    await createTicketReply(route.params.code, form.value)

    await fetchTicketDetail()
}

onMounted(async () => {
    await fetchTicketDetail()
    feather.replace()
})
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div class="p-6">
                <div class="grid grod-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
