<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen bg-gray-100">
        <h1 class="text-7xl font-bold text-center">
            Welcome to PartCart
        </h1>
        <div class="flex flex-row gap-4">
            <SignIn/>
            <SignUp/>
        </div>
    </div>
</template>

<script setup>
    import SignIn from '../components/SignIn.vue';
    import SignUp from '../components/SignUp.vue';
</script>