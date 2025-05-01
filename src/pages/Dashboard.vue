<template>
    <div class="h-screen bg-gray-100 grid grid-cols-6">
        <div class="bg-red-300 p-4 col-span-1">
            <ProfileCard/>
            <br>
            <SignOut/>
        </div>
        <div class="bg-blue-300 p-4 col-span-3">
            <h1 class="text-6xl text-center mt-8">ORDERS</h1>
            <br>
            <OrdersList/>
        </div>  
        <div class="bg-green-300 p-4 col-span-2">
            <h1 class="text-4xl text-center mt-8">Create Order</h1>
            <br>
            <CreateOrder/>
        </div>
    </div>
</template>

<script setup>
    import CreateOrder from '../components/CreateOrder.vue'
    import ProfileCard from '../components/ProfileCard.vue'
    import SignOut from '../components/SignOut.vue'
    import OrdersList from '../components/OrdersList.vue'
</script>