<template>
    <div class="h-screen bg-gray-100 grid grid-cols-6">
        <div class="bg-red-300 p-4 col-span-1">
            <div class="border-4 p-4 rounded-lg flex flex-col gap-2">
                <div class="border-2 p-2 rounded-lg text-3xl">
                    {{ user_first_name }}
                    {{ user_last_name }}
                </div>
                <div class="border-2 p-2 rounded-lg">
                    {{ user_email }}
                </div>
                <div class="border-2 p-2 rounded-lg">
                    {{ user_user_type }}
                </div>
                <button class="border-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer" @click="signOut">Sign out</button>
            </div>        
        </div>
        <div class="bg-blue-300 p-4 col-span-3">
            <h1 class="text-6xl text-center mt-8">ORDERS</h1>
        
        </div>  
        <div class="bg-green-300 p-4 col-span-2">
            <h1 class="text-4xl text-center mt-8">Create Order</h1>
            <br>
            <CreateOrder/>
        </div>
    </div>
</template>

<script setup>
    import CreateOrder from '../components/CreateOrder.vue';

    import { supabase } from '@/supabase';
    import { onMounted } from 'vue';
    import { ref } from 'vue';



    const user_first_name = ref('')
    const user_last_name = ref('')
    const user_email = ref('')
    const user_user_type = ref('')
    
    const signOut = async() => {
        const { error } = await supabase.auth.signOut()
    }


    const getProfile = async () => {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();
        if (userError || !user) {
            alert(userError)
            return;
        }

        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (error) {
            alert(error.message);
            return;
        }

        user_first_name.value = data.first_name
        user_last_name.value = data.last_name
        user_email.value = data.email
        user_user_type.value = data.user_type
        return data;
    }

    onMounted(() => {
        getProfile();
    });

</script>