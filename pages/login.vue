<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
    try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
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
    <div class="flex my-10">
        <form class="px-5 py-3 mx-auto border border-black flex flex-col gap-5" @submit.prevent="handleLogin">
            
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