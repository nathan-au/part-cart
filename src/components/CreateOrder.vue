<template>
    <form class="flex flex-col gap-2" @submit.prevent="submitOrder">
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Part Name" v-model="name"/>            
        <textarea class="border-2 p-2 rounded-lg resize-none" rows="3" placeholder="Description" v-model="description"></textarea>
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Quantity" v-model="quantity"/>            
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="URL" v-model="url"/>    
        <select class="border-2 p-2 rounded-lg" v-model="priority">
            <option selected disabled value>-- Select an option --</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
        </select>
        <button class="p-2 rounded-lg bg-green-900 hover:bg-green-950 cursor-pointer">
            <span v-if="!loading">Submit order</span>    
            <span v-if="loading">Submitting order...</span>
        </button>
        
        <br v-if="error_message">
        <span v-if="error_message" class="text-neutral-900 bg-red-600 rounded-xs p-1">{{ error_message }}</span>
        <br v-if="success_message && !error_message">
        <span v-if="success_message && !error_message" class="text-neutral-900">{{ success_message }}</span>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase.js'

    const loading = ref(false)
    const error_message = ref('')
    const success_message = ref('')

    const name = ref('')
    const description = ref('')
    const quantity = ref('')
    const url = ref('')
    const priority = ref('')

    const submitOrder = async () => {
        if (!name.value.trim() || !description.value.trim() || !quantity.value || !url.value.trim() || !priority.value.trim()) {
            error_message.value = 'Please fill out all fields.'
            return
        }
        else if (!/^\d+$/.test(quantity.value.trim())) {
            error_message.value = 'Please enter a valid quantity.'
            return
        }
        else if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(url.value.trim())) {
            error_message.value = 'Please enter a valid URL.'
            return
        }
        try {

            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError || !user) {
                alert(userError)
                return
            }

            console.log(user.email)


            loading.value = true
            const { error } = await supabase.from('orders').insert({ 
                name: name.value, 
                description: description.value, 
                quantity: quantity.value, 
                url: url.value, 
                priority: priority.value,
                created_by: user.email,
                status: 'Submitted'
            })
            if (error) {
                throw error
            }
            error_message.value = ''
            success_message.value = 'Order submitted successfully.'

            name.value = ''
            description.value = ''
            quantity.value = ''
            url.value = ''
            priority.value = ''            
        }
        catch (error) {
            if (error instanceof Error) {
                error_message.value = error.message + '.'
            }
            else {
                error_message.value = 'An unexpected error occurred.' 
            }
        }
        finally {
            loading.value = false
        }
    }
</script>