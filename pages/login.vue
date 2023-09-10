<script setup>
const client = useSupabaseClient();

const loading = ref(false);
const loginType = ref('email');
const email = ref('');
const password = ref('');

const otpLogin = async () => {
    try {
        loading.value = true
        const { error } = await client.auth.signInWithOtp({ email: email.value })

        if (error) throw error

        alert('Check your email for the login link!')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}

const emailLogin = async () => {
    try {
        loading.value = true
        let { data, error } = await client.auth.signInWithPassword({
            email:  email.value,
            password: password.value
        })

        if (error) throw error

        alert('Check your email for the login link!')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="my-10 flex flex-col gap-5">

        <div class="mx-auto flex gap-5">
            <button @click="loginType = 'email'" class="px-3 py-1 border border-black">Email</button>
            <button @click="loginType = 'otp'" class="px-3 py-1 border border-black">Magic Link</button>
        </div>
        
        <form v-if="loginType === 'email'" class="px-5 py-3 mx-auto border border-black flex flex-col gap-5" @submit.prevent="emailLogin">
            
            <h1 class="header">Open Science Club</h1>
            <p class="description">Sign in with your email and password below</p>
            <div>
                <input class="w-full px-2 py-1 outline-none border border-black rounded" type="email" placeholder="Your email" v-model="email" />
            </div>
            <div>
                <input class="w-full px-2 py-1 outline-none border border-black rounded" type="password" placeholder="Your password" v-model="password" />
            </div>
            <div>
                <input
                    type="submit"
                    class="border border-black px-3 py-1 rounded"
                    :value="loading ? 'Loading' : 'Login'"
                    :disabled="loading"
                />
            </div>
        
        </form>

        <form v-if="loginType === 'otp'" class="px-5 py-3 mx-auto border border-black flex flex-col gap-5" @submit.prevent="otpLogin">
            
                <h1 class="header">Open Science Club</h1>
                <p class="description">Sign in via magic link with your email below</p>
                <div>
                    <input class="w-full px-2 py-1 outline-none border border-black rounded" type="email" placeholder="Your email" v-model="email" />
                </div>
                <div>
                    <input
                        type="submit"
                        class="border border-black px-3 py-1 rounded"
                        :value="loading ? 'Loading' : 'Send magic link'"
                        :disabled="loading"
                    />
                </div>
            
        </form>
    </div>
</template>