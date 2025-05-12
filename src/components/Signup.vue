<template>
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent="signUp">
        <div class="flex flex-row gap-2">
            <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your first name" v-model="first_name"/>            
            <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your last name" v-model="last_name"/>       

        </div>
        <select class="border-2 p-2 rounded-lg" v-model="user_type">
            <!-- display prompt option by default -->
            <option selected disabled value>-- Select an option --</option> 
            <option value="Technician">Technician</option>
            <option value="Buyer">Buyer</option>
        </select>
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your email" v-model="email"/>            
        <input class="border-2 p-2 rounded-lg" type="password" placeholder="Enter your password" v-model="password"/>
        <button class="p-2 rounded-lg hover:bg-green-950 bg-green-900 text-neutral-50 cursor-pointer mt-4">
            <span v-if="!loading">Sign up</span> 
            <span v-if="loading">Signing up...</span>
        </button>
        <span v-if="error_message" class="text-neutral-900 bg-red-600 rounded-xs p-1 text-xs font-normal">{{ error_message }}</span>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase.js'

    const loading = ref(false)
    const error_message = ref('')

    const first_name = ref('')
    const last_name = ref('')
    const user_type = ref('')
    const email = ref('')
    const password = ref('')

    const signUp = async () => {
        if (!first_name.value.trim() || !last_name.value.trim() || !email.value.trim() || !user_type.value || !password.value.trim()) {
            error_message.value = 'Please fill out all fields.'
            return
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            error_message.value = 'Please enter a valid email.'
            return
        }
        try {
            loading.value = true
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        first_name: first_name.value,
                        last_name: last_name.value,
                        user_type: user_type.value
                    }
                }
            })
            if (error) {
                throw error
            }
            error_message.value = ''
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