<script setup>
	import Welcome from './pages/Welcome.vue';
    
    import Next from './pages/Next.vue'

    import { ref } from 'vue';
    import { onMounted } from 'vue';
    import { supabase } from './supabase.js';

    const session = ref();

    onMounted(() => {
        supabase.auth.getSession().then(({ data }) => {
            session.value = data.session
        })
        supabase.auth.onAuthStateChange((_, _session) => {
            session.value = _session
        })
    })

</script>

<template>
    <Next v-if="session" :session="session"/>
    <Welcome v-else/>
</template>