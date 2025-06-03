import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios'
import { handleError } from '@/helpers/errorHelper'
import router from '@/router'

export const useTicketStore = defineStore('ticket', {
    state: () => ({
        tickets: [],
        loading: false,
        error: null,
        success: null,
    }),

    actions: {
        async fetchTickets(params) {
            this.loading = true

            try {
                const response = await axiosInstance.get(`tickets`, { params })
                this.tickets = response.data.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },

        async fetchTicket(code) {},

        async createTicket(payload) {},
    },
})
