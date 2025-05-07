<template>
    <pre>{{ orders }}</pre>
</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase';

    const orders = ref([])

    const fetchOrders = async() => {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
        if (error) {
            alert(error)
            return
        }
        orders.value = data
        return orders
    }

    onMounted(() => {
        fetchOrders();
    });
</script>