<template>
    <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="signOut">Sign out</button>
</template>

<script setup>
    import { supabase } from '@/supabase';
    const signOut = async() => {
        const { error } = await supabase.auth.signOut()
    }
</script>