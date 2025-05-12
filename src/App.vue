<template>

    <!-- if user is authenticated display dashboard, else display welcome -->
    <Technician v-if="session && session.user && session.user.user_metadata && session.user.user_metadata.user_type && session.user.user_metadata.user_type == 'Technician'"/>
    <Buyer v-else-if="session && session.user && session.user.user_metadata && session.user.user_metadata.user_type && session.user.user_metadata.user_type == 'Buyer'"/>
    <Welcome v-else/>


</template>

<script setup>
	import Welcome from './pages/Welcome.vue'
    import Technician from './pages/Technician.vue'
    import Buyer from './pages/Buyer.vue'

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