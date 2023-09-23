<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

// const role = 'admin';
const { data: is_admin } = await useAsyncData('role', async () => {
    if (!user) return false;
    const { data, error } = await client.from('profiles').select(`
        is_admin
    `)
    .eq('id', user.value.id)
    if(error) console.log(error);
    // console.log(data[0].role)
    console.log(data[0].is_admin);
    return data[0].is_admin;
})


</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">   
    <Navigation />
    <NuxtPage/>
    <Footer />
  </div>
</template>