<template>
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent>
        <input class="border-2 p-2 rounded-lg" required type="email" placeholder="Enter your email" v-model="email"/>            
        <br>
        <input class="border-2 p-2 rounded-lg" required type="password" placeholder="Enter your password" v-model="password"/>
        <br>
        <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="handleSignup">Sign up</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import { supabase } from '../supabase.js';

    const loading = ref(false);
    const email = ref('');
    const password = ref('');

    const handleSignup = async () => {
        try {
            loading.value = true;
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
            });
            if (error) throw error
            // alert('Login successful');
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
        finally {
            loading.value = false
        }
    }
</script>