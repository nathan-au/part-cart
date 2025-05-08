<template>
    <div class="flex flex-col gap-4 items-center justify-center overflow-hidden h-screen text-neutral-900 bg-neutral-200 font-sans font-medium font-stretch-semi-condensed tracking-wider">
        <div class="border-8 border-neutral-900 rounded-lg bg-white h-[80vh] w-[50vw] p-8">
            <div class="text-4xl font-bold text-center text-neutral-900">Welcome to</div>
            <div class="text-6xl font-bold text-center text-green-900">PartCart</div>
            <div class="text-2xl text-center text-neutral-900 mt-2">Simplifying repair part logistics for your team.</div>
            
            <div class="flex flex-row gap-4 mt-8 justify-center">
                <!-- call SignIn component -->
                <div v-if="show_sign_in">
                    <SignIn/> 
                </div>
                <div v-if="show_sign_up">
                    <SignUp/>
                </div>
            </div>


            <div class="mt-8 flex flex-row gap-2 justify-center">
                <button v-if="!show_sign_in" class="cursor-pointer text-green-900" @click="() => {toggleSignIn(); toggleSignUp();} ">
                    Already have an account? Sign in
                </button>
                <button v-if="!show_sign_up" class="cursor-pointer text-green-900" @click="() => {toggleSignUp(); toggleSignIn();} ">
                    Don't have an account? Sign up
                </button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    import SignIn from '../components/SignIn.vue' // import SignIn component from file path
    import SignUp from '../components/SignUp.vue'

    import { ref } from 'vue'

    const show_sign_in = ref(true)
    const show_sign_up = ref(false)

    function toggleSignIn() {
        show_sign_in.value = !show_sign_in.value
    }
    function toggleSignUp() {
        show_sign_up.value = !show_sign_up.value
    }

</script>