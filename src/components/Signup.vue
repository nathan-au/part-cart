<template>
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent>
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your first name" v-model="first_name"/>            
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your last name" v-model="last_name"/>       
        <select class="border-2 p-2 rounded-lg" v-model="user_type">
            <option selected disabled value>-- Select an option --</option>
            <option value="Technician">Technician</option>
            <option value="Buyer">Buyer</option>
        </select>
        <input class="border-2 p-2 rounded-lg" type="email" placeholder="Enter your email" v-model="email"/>            
        
        <input class="border-2 p-2 rounded-lg" type="password" placeholder="Enter your password" v-model="password"/>
        <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="handleSignup">Sign up</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import { supabase } from '../supabase.js';

    const loading = ref(false)
    const email = ref('')
    const password = ref('')
    const first_name = ref('')
    const last_name = ref('')
    const user_type = ref('')

    const handleSignup = async () => {
        if (
            !first_name.value.trim() ||
            !last_name.value.trim() ||
            !user_type.value ||
            !email.value.trim() ||
            !password.value.trim()
        ) {
            alert('Please fill out all fields.')
            return;
        }

        try {
            loading.value = true;
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
            });
            if (error) throw error
            // alert('Sign up successful');
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
        finally {
            loading.value = false
        }
    }
</script>