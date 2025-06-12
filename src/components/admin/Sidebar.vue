<script setup>
import { useAuthStore } from '@/stores/auth'
import feather from 'feather-icons'

const authStore = useAuthStore()
const { logout } = authStore

const handleLogout = async () => {
    await logout()
}
</script>

<template>
    <aside class="w-64 bg-white border-r border-gray-100">
        <nav class="mt-6">
            <RouterLink
                :to="{ name: 'admin.dashboard' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{
                    'bg-blue-50 border-l-4 border-blue-600': $route.name === 'admin.dashboard',
                }"
            >
                <i data-feather="database" class="w-6 h-6 mr-2"></i>
                Dashboard
            </RouterLink>
            <RouterLink
                :to="{ name: 'admin.ticket' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{
                    'bg-blue-50 border-l-4 border-blue-600': $route.name === 'admin.ticket',
                }"
            >
                <i data-feather="message-square" class="w-6 h-6 mr-2"></i>
                Tiket
            </RouterLink>
        </nav>
    </aside>
</template>
