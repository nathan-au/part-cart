<template>
    <!-- if user is authenticated display dashboard, else display welcome -->
    <Dashboard v-if="session"/> 
    <Welcome v-else/>
</template>

<script setup>
	import Welcome from './pages/Welcome.vue'
    import Dashboard from './pages/Dashboard.vue'

    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from './supabase.js'

    const session = ref() // store session info

    onMounted(() => { // when page is loaded
        supabase.auth.getSession().then(({ data }) => { // verify session from supabase and get session info
            session.value = data.session
        })
        supabase.auth.onAuthStateChange((SIGNED_OUT, _session) => { // when signed out, store new session info (null)
            session.value = _session
        })
    })

</script>