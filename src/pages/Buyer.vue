<template>
    
    <div class="h-screen overflow-hidden text-neutral-900 bg-neutral-200 font-sans font-medium font-stretch-semi-condensed tracking-wider">
        <!-- top bar -->
        <div class="border-b-4 border-neutral-900 pl-4 pr-4 pt-2 pb-2 flex flex-row items-center bg-neutral-50 justify-between">
            <!-- @click calls the function on button click -->
            <div>
                <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="toggleMenu" >
                    Menu
                </button>
            </div>
            <div>
                <h1 class="text-4xl text-green-900">
                    PartCart
                </h1>
            </div>
            
            <button v-if="show_order_details" class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="closeOrderDetails" >
                Unselect order
            </button>
            <button v-else class="p-2 bg-neutral-50 text-neutral-50" disabled >
                Unselect order
            </button>
        </div>
        
        <!-- screen content -->
        <div class="grid grid-cols-6 gap-4 pr-4 mt-4">

            <!-- left side menu -->
            <div v-if="show_menu" class="col-span-1 rounded-tr-lg rounded-br-lg p-4 flex flex-col gap-2 text-neutral-50 bg-neutral-900 text-center">
                <span>
                    <ProfileCard/>
                </span>
                <span class="mt-auto">
                    <SignOut/>

                </span>
            </div>
            
            <!-- center orders list -->
            <div :class="{ // select different col span for center depending on if showing components on left and/or right
                'col-span-6 ml-4': !show_menu && !show_order_details,
                'col-span-5': show_menu && !show_order_details, 
                'col-span-4 ml-4': !show_menu && show_order_details, 
                'col-span-3': show_menu && show_order_details
            }">
                <div class="h-[80vh] p-4 rounded-lg bg-neutral-50 text-green-900 overflow-hidden flex flex-col">
                    <h1 class="text-6xl text-center mb-4">Pending Orders</h1>
                    <OrdersList @orderSelected="openOrderDetails"/>
                </div>
            </div>  

            <!-- right create order section -->
            <div v-if="selected_order_details" class="col-span-2 text-neutral-50">
                <div class="rounded-lg p-4 bg-green-700">
                    <div class="text-4xl text-center mb-4">
                        <span class="font-bold">Order ID: </span>
                        <span>{{ selected_order_details.id }}</span>
                    </div>
                    <div>
                        <span class="font-bold">Part name: </span>
                        <span>{{ selected_order_details.name }}</span>
                    </div>
                    <div class="flex flex-row gap-2 mt-1 mb-1 text-neutral-900">
                        <div v-if="selected_order_details.priority == '3'" class="bg-blue-200 p-1 pl-2 pr-2 rounded-full inline">
                            Low Priority
                        </div>
                        <div v-if="selected_order_details.priority == '2'" class="bg-blue-400 p-1 pl-2 pr-2 rounded-full inline">
                            Medium Priority
                        </div>
                        <div v-if="selected_order_details.priority == '1'" class="bg-blue-600 p-1 pl-2 pr-2 rounded-full inline">
                            High Priority
                        </div>

                        <div v-if="selected_order_details.status == 'Pending'" class="bg-yellow-400 p-1 pl-2 pr-2 rounded-full inline">
                                    {{ selected_order_details.status }}
                                </div>
                                <div v-else-if="selected_order_details.status == 'Approved'" class="bg-green-500 p-1 pl-2 pr-2 rounded-full inline">
                                    {{ selected_order_details.status }}
                                </div>
                                <div v-else-if="selected_order_details.status == 'Denied'" class="bg-red-500 p-1 pl-2 pr-2 rounded-full inline">
                                    {{ selected_order_details.status }}
                                </div>
                    </div>
                    <div>
                        <span class="font-bold">URL: </span>
                        <a class="text-neutral-900 underline" :href="selected_order_details.url" target="_blank">{{ selected_order_details.url }}</a>
                    </div>
                    <div>
                        <span class="font-bold">Description: </span>
                        <span>{{ selected_order_details.description }}</span>
                    </div>
                    <div>
                        <span class="font-bold">Quantity: </span>
                        <span>{{ selected_order_details.quantity }}</span>
                    </div>
                    <div>
                        <span>Date: </span>
                        <span>{{ new Date(selected_order_details.created_at).toLocaleString() }}</span>
                    </div>
                    <div>
                        <span>Created by: </span>
                        <span>{{ selected_order_details.created_by }}</span>
                    </div>
                    
                    <div class="flex flex-row gap-4 mt-4 justify-between">
                        <button class="p-2 rounded-lg cursor-pointer bg-red-900 text-neutral-50 hover:bg-red-950" @click="denyOrder" >
                            Deny Order
                        </button>
                        <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="approveOrder" >
                            Approve Order
                        </button>
                        
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CreateOrder from '../components/CreateOrder.vue'
    import ProfileCard from '../components/ProfileCard.vue'
    import SignOut from '../components/SignOut.vue'
    import OrdersList from '../components/OrdersList.vue'

    import { ref } from 'vue'
    import { supabase } from '@/supabase'

    // values for toggling different menu components
    const show_menu = ref(false)
    const show_create_order = ref(true)

    // corresponding functions for toggling the menu components
    function toggleMenu () {
        show_menu.value = !show_menu.value
    }
    function toggleCreateOrder () {
        show_create_order.value = !show_create_order.value
    }

    const show_order_details = ref(false)
    const selected_order_details = ref(null)

    function openOrderDetails(order) {
        selected_order_details.value = order
        show_order_details.value = true
    }

    function closeOrderDetails() {
        show_order_details.value = false
        selected_order_details.value = null
    }

    const denyOrder = async() => {
        if (!confirm("This action cannot be undone.")) {
            return
        }

        const response = await supabase.from('orders').update({status: 'Denied'}).eq('id', selected_order_details.value.id)
        closeOrderDetails()
    }

    const approveOrder = async() => {
        if (!confirm("This action cannot be undone.")) {
            return
        }

        const response = await supabase.from('orders').update({status: 'Approved'}).eq('id', selected_order_details.value.id)
        closeOrderDetails()
    }

    

</script>