<script setup>
// fetch discussions and post ids and titles

const client = useSupabaseClient();
const user = useSupabaseUser();

const { data: is_admin } = await useAsyncData('role', async () => {
    if (!user) return false;
    const { data, error } = await client.from('profiles').select(`
        is_admin
    `)
    .eq('id', user.value.id)
    if(error) console.log(error);
    // console.log(data[0].role)
    return data[0].is_admin;
})

// Use server functions and composables
function isAuthorized() {
    if (is_admin.value) return true;
}


const { data: discussions } = await useAsyncData('discussions', async () => {
    const { data, error } = await client.from('discussions').select(`
        *,
        posts(id, title)
    `)
    .eq('posts.status', 'approved');
    if(error) console.log(error);
    return data;
})

const showId = ref('');
const showModal = ref(false)
const discussion = ref('');
const title = ref('');
const content = ref('');

function handleClick(id) {
    showId.value = showId.value === id ? '' : id;
    
}

async function createPost() {

    const { data: post } = await useAsyncData('post', async () => {
        const { data, error } = await client.from('posts').insert({
            owner: user.value.id,
            discussion_id: discussion.value,
            title: title.value,
            content: content.value,
            // is_pending: true
            status: 'approved'
        })
        .select();

        if( error) console.log(error);
        return data;
    })
}

function handleClose() {
    showModal.value = false;
    createPost();
}



</script>

<template>
    <div class="w-11/12 mx-auto my-10 ">
        <div class="px-5 py-3 flex justify-end border border-b-0 border-black">
            <button id="show-modal" @click="showModal = true">Create Post</button>
            <Teleport to="body">

                <modal :show="showModal" @close="handleClose()">
                    <template #header>
                        <h3>Create new post</h3>
                    </template>
                    
                    <template #body>
                        <form class="flex flex-col gap-3">
                            <div class="flex gap-3">
                                <label for="discussion">Discussion</label>
                                <select name="discussion" id="discussion" v-model="discussion"
                                class="px-1 rounded border border-black outline-none">
                                    <option v-for="disc in discussions" :value="disc.id">{{ disc.name }}</option>
                                </select>
                            </div>

                            <div class="flex gap-3">
                                <label for="title">Title</label>
                                <input name="title" id="title" v-model="title"
                                class="px-1 rounded border border-black outline-none" />
                            </div>

                            <label for="content">Content:</label>
                            <textarea name="content" id="content" cols="100" rows="10"
                            v-model="content"
                            class="p-3 border border-black outline-none"></textarea>
                        </form>
                    </template>
                </modal>
            </Teleport>
        </div>
        
        <div class="grid grid-cols-5 gap-5 min-h-screen border border-black">
            <div class="col-span-4 border-r border-black">
                <!-- {{console.log(client)}} -->
                <div v-for="disc in discussions" class="px-3 py-7 border-b border-black"
                @click="() => {
                    handleClick(disc.name);
                    }">
                
                    <div class="flex justify-between">
                        <h2 class="capitalize">{{disc.name}}</h2>
                        
                    </div>
                    <ul v-if="showId === disc.name" class="ml-3 pl-3 border-l border-black">
                        <li v-for="post in disc.posts" class="my-5 flex justify-between border-b border-black">
                            <NuxtLink :to="`posts/${post.id}`" >
                                {{ post.title }}
                            </NuxtLink>
                            <DeleteBtn v-if="isAuthorized()" item="posts" :id="post.id" />
                            <!-- <div>test</div> -->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="">

            </div>
        </div>
    </div>
</template>

