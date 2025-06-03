import { handleError } from '@/helpers/errorHelper'
import { axiosInstance } from '@/plugins/axios'
import Cookies from 'js-cookie'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
        error: null,
        success: null,
    }),

    getters: {},

    actions: {
        async login(credentials) {},

        async register(credentials) {},

        async logout() {
            this.loading = true

            try {
                const response = await axiosInstance.post('/logout')

                Cookies.remove('token')
                this.user = null
                this.error = null

                this.success = response.data.message

                router.push({ name: 'login' })
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },

        async checkAuth() {},
    },
})
