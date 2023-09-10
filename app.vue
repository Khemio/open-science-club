<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient();

const { data: username } = await useAsyncData('username', async () => {
    const { data, error } = await client.from('profiles').select(`
        username
    
    `)
    .eq('id', user.value.id)
    if(error) console.log(error);
    return data;
})

</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="bg-red-500 text-2xl text-green-400">{{ username }}</div>
    <Navigation />
    <NuxtPage/>
    <Footer />
  </div>
</template>