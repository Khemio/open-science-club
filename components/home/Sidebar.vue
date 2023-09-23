<script setup>
const client = useSupabaseClient();

const { data: announcements } = await useAsyncData('announcements', async () => {
    const { data, error } = await client.from('announcements').select(`
        id, title, content
    `)
    .range(0,5)
    .order('created_at', { ascending: false });
    if(error) console.log(error);
    return data;
})

</script>

<template>
    <ul 
        class="grid grid-cols-1 grid-rows-5 border border-slate-200">
            <li v-for="post in announcements" class="even:bg-slate-200 odd:bg-white">
                <NuxtLink :to="`/news/${post.id}`">
                    <HomeNewsItem :title="post.title" :content="post.content" />
                </NuxtLink>
            </li>
    </ul>
</template>