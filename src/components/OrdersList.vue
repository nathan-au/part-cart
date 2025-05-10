<template>
    <div class="flex flex-row gap-2 justify-end items-center">
        <div class="mr-2">Sort by:</div>
        <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="fetchOrders('a-z')" >
            A-Z
        </button>
        <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="fetchOrders('latest')" >
            Latest
        </button>
        <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="fetchOrders('oldest')" >
            Oldest
        </button>
        <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="fetchOrders('urgent')" >
            Urgent
        </button>
    </div>
    <div class="bg-neutral-200 rounded-lg p-4 overflow-y-auto mt-2">
        <div v-if="orders.length > 0 && !loading" class="grid grid-cols-2 gap-2">

            <div v-for="order in orders" :key="order.id" class="border-2 rounded-lg p-2 bg-white cursor-pointer text-neutral-900" @click="emitOrder(order)">

                <div class="text-xl">
                    <span class="font-bold">Order ID: </span>
                    <span>{{ order.id }}</span>
                </div>
                <div>
                    <span class="font-bold">Part name: </span>
                    <span>{{ order.name }}</span>
                </div>
                <div>
                    <span>Date: </span>
                    <span>{{ new Date(order.created_at).toLocaleString() }}</span>
                </div>

                <div class="flex flex-row gap-2 mt-1 mb-1">
                    <div v-if="order.priority == '3'" class="border-1 bg-green-400 p-1 pl-2 pr-2 rounded-full inline">
                        Low Priority
                    </div>
                    <div v-if="order.priority == '2'" class="border-1 bg-yellow-400 p-1 pl-2 pr-2 rounded-full inline">
                        Medium Priority
                    </div>
                    <div v-if="order.priority == '1'" class="border-1 bg-red-400 p-1 pl-2 pr-2 rounded-full inline">
                        High Priority
                    </div>

                    <div v-if="order.status == 'Submitted'" class="border-1 bg-blue-300 p-1 pl-2 pr-2 rounded-full inline">
                        {{ order.status }}
                    </div>
                </div>


            </div>
        </div>

        <div v-if="orders.length == 0 && !loading">No orders to display</div>
        <div v-if="loading">Loading orders...</div>
    </div>

</template>

<script setup>
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { supabase } from '@/supabase'

    const orders = ref([])
    const loading = ref(false)


    const fetchOrders = async(sort) => {
        loading.value = true
        // get current user email
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            alert(userError)
            return
        }

        let query = supabase.from('orders').select('*').eq('created_by', user.email)

        switch(sort) {
            case 'latest':
                query = query.order('created_at', { ascending: false })
                break
            case 'oldest':
                query = query.order('created_at', { ascending: true })
                break
            case 'a-z':
                query = query.order('name', {ascending: true})
                break
            case 'urgent':
                query = query.order('priority', {ascending: true})
            default:
                query = query.order('created_at', {ascending: false})
        }

        // get list of orders created by current user
        const { data, error } = await query
        if (error) {
            alert(error.message)
            return
        }
        orders.value = data
        loading.value = false

        return orders
    }

    const emit = defineEmits(['orderSelected'])
    function emitOrder(order) {
        emit('orderSelected', order)
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