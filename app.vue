<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient();

const { data: discussions } = await useAsyncData('discussions', async () => {
    const { data, error } = await client.from('discussions').select(`
        *,
        posts(id, title)
    `)
    if(error) console.log(error);
    
    return data;
})

async function test() {
  console.log(discussions);
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    {{ test() }}
    <Navigation />
    <NuxtPage/>
    <Footer />
  </div>
</template>