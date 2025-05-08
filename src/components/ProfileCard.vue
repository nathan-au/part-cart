<template>
    <div class="p-4 rounded-lg flex flex-col gap-2 text-xl text-center truncate">
        <span v-if="loading">Loading profile...</span>
        <span class="text-3xl">{{ user_first_name + ' ' + user_last_name }}</span>
        <span class="text-xl">{{ user_email }}</span>
        <span class="text-xl">{{ user_user_type }}</span>
    </div>        
</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase'

    const loading = ref(false)

    const user_first_name = ref('')
    const user_last_name = ref('')
    const user_email = ref('')
    const user_user_type = ref('')

    const getProfile = async () => {
        loading.value = true

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            alert(userError)
            return
        }

        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (error) {
            alert(error.message)
            return
        }

        user_first_name.value = data.first_name
        user_last_name.value = data.last_name
        user_email.value = data.email
        user_user_type.value = data.user_type

        loading.value = false

        return data

    }

    onMounted(() => {
        getProfile()
    })

</script>