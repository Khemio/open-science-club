<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient();

const { data: discussions } = await useAsyncData('discussions', async () => {
    const { data, error } = await client.from('discussions').select(`
        *,
        posts(id, title)
    `)
    if(error) console.log(error);
    else {
      console.log(data);
      return data;
    }
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Navigation />
    <NuxtPage/>
    <Footer />
  </div>
</template>