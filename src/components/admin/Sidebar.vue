<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { logout } = authStore

const handleLogout = async () => {
    await logout()
}
</script>

<template>
    <aside class="w-64 bg-white shadow-lg">
        <div class="p-6 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-blue-600 flex items-center">TickTrack</h1>
        </div>
        <nav class="mt-6">
            <RouterLink
                :to="{ name: 'admin.dashboard' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{
                    'bg-blue-50 border-l-4 border-blue-600': $route.name === 'admin.dashboard',
                }"
            >
                Dashboard
            </RouterLink>
            <RouterLink
                :to="{ name: 'admin.tiket' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{
                    'bg-blue-50 border-l-4 border-blue-600': $route.name === 'admin.tiket',
                }"
            >
                Tiket
            </RouterLink>
            <a
                @click="handleLogout"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200 mt-6"
            >
                Dashboard
            </a>
        </nav>
    </aside>
</template>
