<template>
    <button class="p-2 rounded-lg hover:bg-green-950 bg-green-900 cursor-pointer truncate" @click="signOut">
        <span v-if="!loading">Sign out</span>
        <span v-if="loading">Signing out...</span>
    </button>
    <br v-if="error_message">
    <span v-if="error_message" class="text-neutral-900 bg-red-600 rounded-xs p-1">{{ error_message }}</span>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '@/supabase'

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