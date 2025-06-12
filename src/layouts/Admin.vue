<script setup>
import Sidebar from '@/components/admin/Sidebar.vue'
import Navbar from '@/components/app/Navbar.vue'
</script>
<template>
    <div class="flex flex-col h-screen">
        <Navbar />

        <main class="flex h-screen">
            <Sidebar />

            <div class="flex-1 overflow-x-hidden overflow-y-auto">
                <!-- Content -->
                <div class="p-6 space-y-6">
                    <router-view></router-view>
                </div>
            </div>
        </main>
    </div>
</template>
