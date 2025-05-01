<template>
    <div class="border-4 p-4 rounded-lg flex flex-col gap-2">
        <div class="border-2 p-2 rounded-lg text-3xl">
            {{ order_name }}
        </div>
        <div class="border-2 p-2 rounded-lg">
            {{ order_created_at }}
            <br>
            {{ order_description }}
            <br>
            {{ order_quantity }}
            <br>
            {{ order_url }}
            <br>
            {{ order_priority }}
            
        </div>
    </div>        
</template>

<script setup>
    import { supabase } from '@/supabase'
    import { onMounted } from 'vue'
    import { ref } from 'vue'

    const order_created_at = ref('')
    const order_name = ref('')
    const order_description = ref('')
    const order_quantity = ref('')
    const order_url = ref('')
    const order_priority = ref('')

    const getProfile = async () => {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();
        if (userError || !user) {
            alert(userError)
            return;
        }

        const { data, error } = await supabase.from('orders').select('*').eq('name', 'Minion').single();
        if (error) {
            alert(error.message);
            return;
        }

        order_created_at.value = data.created_at
        order_name.value = data.name
        order_description.value = data.description
        order_quantity.value = data.quantity
        order_url.value = data.url
        order_priority.value = data.priority

        return data;
    }

    onMounted(() => {
        getProfile();
    });

</script>