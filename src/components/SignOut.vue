<template>
    <button class="border-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="signOut">
        <span v-if="!loading">Sign out</span>
        <span v-if="loading">Signing out...</span>
    </button>
    <br v-if="error_message">
    <span v-if="error_message" class="text-red-700">{{ error_message }}</span> 
</template>

<script setup>
    import { ref } from 'vue';
    import { supabase } from '@/supabase';

    const loading = ref(false)
    const error_message = ref('')

    const signOut = async() => {
        try {
            loading.value = true
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            error_message.value = ''
        }
        catch (error) {
            if (error instanceof Error) {
                error_message.value = error.message + '.'
            }
            else {
                error_message.value = 'An unexpected error occurred.'
            }
        }
        finally {
            loading.value = false
        }
    }
</script>