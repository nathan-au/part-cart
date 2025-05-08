<template>
    <div class="h-screen overflow-hidden text-neutral-900 bg-neutral-200 font-sans font-medium font-stretch-semi-condensed tracking-wider">
        <!-- top bar -->
        <div class="border-b-4 border-neutral-900 pl-4 pr-4 pt-2 pb-2 flex flex-row mb-8 items-center bg-neutral-50">
            <!-- @click calls the function on button click -->
            <button class="p-2 rounded-lg cursor-pointer bg-green-900 text-neutral-50 hover:bg-green-950" @click="toggleMenu" >
                Menu
            </button>
            <h1 class="absolute left-1/2 transform -translate-x-1/2 text-4xl text-green-900">
                PartCart
            </h1>
            <button class="p-2 rounded-lg cursor-pointer ml-auto bg-green-900 text-neutral-50 hover:bg-green-950" @click="toggleCreateOrder">
                Create Order
            </button>
        </div>
        
        <!-- screen content -->
        <div class="grid grid-cols-6 gap-4 pr-4">

            <!-- left side menu -->
            <div v-if="show_menu" class="col-span-1 rounded-tr-lg rounded-br-lg p-4 flex flex-col gap-2 text-neutral-50 bg-neutral-900">
                <ProfileCard/>
                <SignOut/>
            </div>
            
            <!-- center orders list -->
            <div :class="{ // select different col span for center depending on if showing components on left and/or right
                'col-span-6 ml-4': !show_menu && !show_create_order,
                'col-span-5': show_menu && !show_create_order, 
                'col-span-4 ml-4': !show_menu && show_create_order, 
                'col-span-3': show_menu && show_create_order
            }">
                <div class="h-[80vh] p-4 rounded-lg bg-neutral-50 text-green-900 overflow-hidden flex flex-col">
                    <h1 class="text-6xl text-center mb-4">My Orders</h1>
                    <div class="bg-neutral-200 rounded-lg p-2 overflow-y-auto">
                        <OrdersList/>

                    </div>
                </div>
            </div>  

            <!-- right create order section -->
            <div v-if="show_create_order" class="col-span-2 text-neutral-50">
                <div class="rounded-lg p-4 bg-green-700">
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

</script>