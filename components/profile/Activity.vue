<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const { data: posts } = await useAsyncData('my_posts', async () => {
    const { data, error } = await client.from('posts').select(`
        *
    `)
    .eq('owner', user.value.id);
    if(error) console.log(error);
    return data;
})

</script>

<template>
    <div class="border-b border-black">
        Activity Panel
    </div>
    <div v-for="post in posts" class="flex flex-col gap-5" 
        :class="{'bg-red-500 text-white': post.status === 'rejected', 'bg-green-500': post.status === 'approved', 'bg-gray-300': post.status === 'pending'}"
        >
        <div class="px-2 py-3 border-b border-black">
            {{ post.title }} - {{ post.status }}
        </div>
    </div>
</template>