<template>
    
    <!-- <pre v-if="orders.length > 0">{{ orders }}</pre> -->

    <div v-if="orders.length > 0" class="grid grid-cols-2 gap-2">
        <div v-for="order in orders" :key="order.id" class="border-2 rounded-lg p-2 bg-white">

            <div class="text-xl">
                <span class="font-bold">Order ID: </span>
                <span>{{ order.id }}</span>
            </div>
            

            <span class="font-bold">Part name: </span>
            <span>{{ order.name }}</span>

            <br>
            <div class="flex flex-row gap-2">
                <div v-if="order.priority == 'Low'" class="border-2 bg-green-500 p-1 rounded-lg inline">
                    {{ order.priority }} Priority
                </div>
                <div v-if="order.priority == 'Medium'" class="border-2 bg-yellow-500 p-1 rounded-lg inline">
                    {{ order.priority }} Priority
                </div>
                <div v-if="order.priority == 'High'" class="border-2 bg-red-500 p-1 rounded-lg inline">
                    {{ order.priority }} Priority
                </div>


                <div v-if="order.status == 'Submitted'" class="border-2 bg-yellow-500 p-1 rounded-lg inline">
                    {{ order.status }}
                </div>
            </div>

            

            <span>{{ new Date(order.created_at).toLocaleString() }}</span>

        </div>
    </div>

    <div v-if="orders.length == 0">No orders to display</div>
</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase'

    const orders = ref([])

    const fetchOrders = async() => {
        // get current user email
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            alert(userError)
            return
        }

        // get list of orders created by current user
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

    onMounted(() => { // onMounted runs on page load
        fetchOrders() // first fetch orders list

        // subscribe to orders-channel to any postgres change events to the orders table and fetch orders again if yes
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