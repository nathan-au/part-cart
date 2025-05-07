<template>
    <div class="h-screen bg-blue-200">
        <div class="border-b-4 pl-4 pr-4 pt-2 pb-2 flex flex-row mb-8 items-center">
            <button class="border-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="toggleMenu">
                Menu
            </button>
            <h1 class="absolute left-1/2 transform -translate-x-1/2 text-4xl">
                PartCart
            </h1>
            <button class="border-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer ml-auto" @click="toggleCreateOrder">
                Create Order
            </button>
        </div>
        
        <div class="grid grid-cols-6 gap-4 pr-4">
            <div v-if="show_menu" class="col-span-1 border-r-4 border-t-4 border-b-4 rounded-tr-lg rounded-br-lg p-4 flex flex-col gap-2">
                <ProfileCard/>
                <SignOut/>
            </div>
            
            <div :class="{
                'col-span-6 ml-4': !show_menu && !show_create_order,
                'col-span-5': show_menu && !show_create_order, 
                'col-span-4 ml-4': !show_menu && show_create_order, 
                'col-span-3': show_menu && show_create_order
            }">
                <div class="overflow-y-auto h-[80vh] border-4 p-4 rounded-lg">
                    <h1 class="text-6xl text-center mb-4">Orders</h1>
                    <OrdersList/>
                </div>
                

            </div>  
            <div v-if="show_create_order" class="col-span-2">
                <div class="border-4 rounded-lg p-4">
                    <h1 class="text-4xl text-center mb-4">Create Order</h1>
                    <CreateOrder/>
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

    const show_menu = ref(false)
    const show_create_order = ref(true)

    function toggleMenu () {
        show_menu.value = !show_menu.value
    }
    function toggleCreateOrder () {
        show_create_order.value = !show_create_order.value
    }

</script>