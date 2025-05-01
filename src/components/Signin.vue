<template>
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent>
        <input class="border-2 p-2 rounded-lg" type="email" placeholder="Enter your email" v-model="email"/>            
        <input class="border-2 p-2 rounded-lg" type="password" placeholder="Enter your password" v-model="password"/>
        <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="handleLogin">Sign in</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase.js'

    const loading = ref(false)
    const email = ref('')
    const password = ref('')
    
    const handleLogin = async () => {
        if (
            !email.value.trim() ||
            !password.value.trim()
        ) {
            alert('Please fill out all fields.')
            return;
        }
        try {
            loading.value = true
            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            });
            if (error) throw error
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
        finally {
            loading.value = false
        }
    }
</script>