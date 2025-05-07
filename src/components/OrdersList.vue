<template>
    <pre v-if="orders.length != 0">{{ orders }}</pre>
    <h1 v-if="orders.length == 0">No orders to display</h1>
</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase'

    const orders = ref([])

    

    const fetchOrders = async() => {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            alert(userError)
            return
        }

        const { data, error } = await supabase.from('orders').select('*').eq('created_by', user.email).order('created_at', { ascending: false })
        if (error) {
            alert(error.message)
            return
        }
        orders.value = data
        return orders
    }

    // get live database updates
    let channel

    onMounted(() => {
        fetchOrders()

        channel = supabase
            .channel('orders-channel')
            .on(
                'postgres_changes', 
                {
                    schema: 'public', 
                    table: 'orders',
                    event: '*'}, 
                    (payload) => {console.log(payload), fetchOrders()
                }
            )
            .subscribe()
    })

</script>