<template>
    <div class="border-2 p-4 rounded-lg flex flex-col gap-2 text-xl text-center">
        <span class="text-3xl">{{ user_first_name + ' ' + user_last_name }}</span>
        <br>
        <span>{{ user_email }}</span>
        <br>
        <span>{{ user_user_type }}</span>
    </div>        
</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase'

    const user_first_name = ref('')
    const user_last_name = ref('')
    const user_email = ref('')
    const user_user_type = ref('')

    const getProfile = async () => {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();
        if (userError || !user) {
            alert(userError)
            return;
        }

        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (error) {
            alert(error.message);
            return;
        }

        user_first_name.value = data.first_name
        user_last_name.value = data.last_name
        user_email.value = data.email
        user_user_type.value = data.user_type
        return data;
    }

    onMounted(() => {
        getProfile();
    });

</script>