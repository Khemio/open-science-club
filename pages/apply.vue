<script setup>
const client = useSupabaseClient()


const config = useRuntimeConfig()
const url = config.public.url;

const loading = ref(false)
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')

const handleLogin = async () => {
    // Create user and trigger profile creation
    try {
        loading.value = true
        const { error } = await client.auth.signInWithOtp({ email: email.value ,
            options: {
                emailRedirectTo: url,
                data: {
                    username: username.value,
                    full_name: `${firstName.value} ${lastName.value}` ,
                }
            }
        })

        if (error) throw error;

        alert('Check your email for the login link!')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }

}
</script>

<template>
    <div class="flex my-10">
        <form class="px-5 py-3 mx-auto border border-black flex flex-col gap-5" @submit.prevent="handleLogin">
            
                <h1 class="header">Open Science Club</h1>
                <p class="description">Sign in via magic link with your email below</p>
                <div>
                    <input class="w-full px-2 py-1 outline-none border border-black rounded" type="text" placeholder="Your username" v-model="username" />
                </div>
                <div>
                    <input class="w-full px-2 py-1 outline-none border border-black rounded" type="text" placeholder="Your first name" v-model="firstName" />
                </div>
                <div>
                    <input class="w-full px-2 py-1 outline-none border border-black rounded" type="text" placeholder="Your last name" v-model="lastName" />
                </div>
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