<template>
    <!-- @submit.prevent wil stop the form from submitting and call signIn function instead -->
    <form class="border-4 p-4 rounded-lg flex flex-col gap-2" @submit.prevent="signIn">
        <!-- v-model="email" will connect the email input field and the email ref variable    -->
        <input class="border-2 p-2 rounded-lg" type="text" placeholder="Enter your email" v-model="email"/>         
        <input class="border-2 p-2 rounded-lg" type="password" placeholder="Enter your password" v-model="password"/>
        <!-- different button text will be displayed depending on loading status -->
        <button class="rounded-lg p-2 hover:bg-green-950 bg-green-900 text-white cursor-pointer mt-4">
            <span v-if="!loading">Sign in</span> 
            <span v-if="loading">Signing in...</span>
        </button>
        <!-- display red error message -->
        <span v-if="error_message" class="text-neutral-900 bg-red-600 rounded-xs p-1 text-xs font-normal">{{ error_message }}</span>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { supabase } from '../supabase.js'

    // ref variables to store info and reference in the html
    const loading = ref(false)
    const error_message = ref('')

    const email = ref('')
    const password = ref('')
    
    const signIn = async () => { // define async function for handling signing in
        if (!email.value.trim() || !password.value.trim()) { // check if email and password text fields have a value (minus the whitespace)
            error_message.value = 'Please fill out all fields.'
            return
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { // verify email is a valid email with regex
            error_message.value = 'Please enter a valid email.'
            return
        }
        try {
            loading.value = true // tell the html that data is being loaded
            const { error } = await supabase.auth.signInWithPassword({ // pass entered email and password to supabase auth
                email: email.value,
                password: password.value,
            })
            if (error) { // throw error if supabase returns error
                throw error
            }
            error_message.value = '' // clear error message if successful 
        }
        catch (error) { // catch supabase error
            if (error instanceof Error) { // verify supabase error is actually an Error object
                error_message.value = error.message + '.'
            }
            else {
                error_message.value = 'An unexpected error occurred.'
            }
        }
        finally {
            loading.value = false // no matter what, whether success or error, loading is done
        }
    }
</script>