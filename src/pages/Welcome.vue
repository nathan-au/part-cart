<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen bg-gray-100">
        <h1 class="text-7xl font-bold text-center">
            Welcome to PartCart
        </h1>
        <div class="flex flex-row gap-4">
            <Login/>
            <Signup/>
        </div>
    </div>
</template>

<script setup>
    import Login from '../components/Login.vue';
    import Signup from '../components/Signup.vue';
</script>