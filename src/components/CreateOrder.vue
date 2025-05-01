<template>
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent>
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Part Name *" v-model="name"/>            
        <textarea class="border-2 p-2 rounded-lg resize-none" rows="3" placeholder="Description" v-model="description"></textarea>
        <input class="border-2 p-2 rounded-lg" type="number" placeholder="Quantity *" v-model="quantity"/>            
        <input class="border-2 p-2 rounded-lg" type="url" placeholder="URL *" v-model="url"/>    
        <select class="border-2 p-2 rounded-lg" v-model="priority">
            <option selected disabled value>-- Select an option -- *</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
        </select>
        <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="submitOrder">Submit Order</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase.js'

    const loading = ref(false)

    const name = ref('');
    const description = ref('')
    const quantity = ref('')
    const url = ref('')
    const priority = ref('')

    const submitOrder = async () => {
        if (
            !name.value.trim() ||
            !quantity.value ||
            !url.value.trim() ||
            !priority.value.trim()
        ) {
            alert('Please fill out required fields (*).')
            return;
        }
        try {
            loading.value = true
            const { error } = await supabase.from('orders').insert({ 
                name: name.value, 
                description: description.value, 
                quantity: quantity.value, 
                url: url.value, 
                priority: priority.value
            })
            if (error) throw error
            
            name.value = ''
            description.value = ''
            quantity.value = ''
            url.value = ''
            priority.value = ''
            
            alert('Order successful');
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
        finally {
            
            loading.value = false
        }
    }
</script>