<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();


const { data: discussions } = await useAsyncData('discussions', async () => {
    const { data, error } = await client.from('discussions').select(`
        *
    `)
    if(error) console.log(error);
    return data;
})

const { data: posts } = await useAsyncData('pending_posts', async () => {
    const { data, error } = await client.from('posts').select(`
        *
    `)
    .eq('status', 'pending');
    if(error) console.log(error);
    return data;
})

const showPost = ref(false);
const showAnnounc = ref(false);
const show = ref('all');
const item = ref(null);

const discussion = ref('');
const title = ref('');
const content = ref('');

async function createPost() {
    const { data: post } = await useAsyncData('post', async () => {
        const { data, error } = await client.from('posts').insert({
            owner: user.value.id,
            discussion_id: discussion.value,
            title: title.value,
            content: content.value,
            // is_pending: false
            status: 'approved'
        })
        .select();

        if( error) console.log(error);
        return data;
    })
}

async function createAnnouncement() {
    const { data: announcemnt } = await useAsyncData('announcement', async () => {
        const { data, error } = await client.from('announcements')
        .insert({
            owner: user.value.id,
            // discussion_id: discussion.value,
            title: title.value,
            content: content.value
        })
        .select();

        if( error) console.log(error);
        return data;
    })
}

async function approvePost(id) {
    await useAsyncData('post', async () => {
        const { data, error } = await client.from('posts')
        .update({
            // is_pending: false
            status: 'approved'
        })
        .eq('id', id)

        if( error) console.log(error);
        return;
    })
}

async function rejectPost(id) {
    await useAsyncData('post', async () => {
        const { data, error } = await client.from('posts')
        .update({
            status: 'rejected'
        })
        .eq('id', id)

        if( error) console.log(error);
        return;
    })
    // Figure out how to handle rejection
    console.log(`Post with id: ${id} was rejected`);
}

function handleApprove(id) {
    approvePost(id);
    show.value = 'all';
}

function handleReject(id) {
    rejectPost(id);
    show.value = 'all';
}


function handlePost() {
    showPost.value = false;
    createPost();
}
function handleAnnounc() {
    showAnnounc.value = false;
    createAnnouncement();
}
</script>

<template>
    <div class="pb-3 border-b border-black flex gap-3 justify-evenly">
        <button class="btn" @click="show='all'">Pending Posts</button>

        <button id="show-modal" @click="showPost = true"
            class="btn"
            >Create Post</button>
            <Teleport to="body">

                <modal :show="showPost" @close="handlePost()">
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
    
            <button id="show-modal" @click="showAnnounc = true"
                class="btn"
                >Make Announcment</button>
                <Teleport to="body">

                    <modal :show="showAnnounc" @close="handleAnnounc()">
                        <template #header>
                            <h3>Make Announcement</h3>
                        </template>
                        
                        <template #body>
                            <form class="flex flex-col gap-3">
                                <!-- <div class="flex gap-3">
                                    <label for="discussion">Discussion</label>
                                    <select name="discussion" id="discussion" v-model="discussion"
                                    class="px-1 rounded border border-black outline-none">
                                        <option v-for="disc in discussions" :value="disc.id">{{ disc.name }}</option>
                                    </select>
                                </div> -->

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
    <div v-if="show === 'all'" class="my-5 flex flex-col gap-3">
        <div v-for="(post, index) in posts" @click="show='one'; item=index"
        class="py-3 flex justify-between hover:bg-slate-100">

            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ post.title }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(post.id)">Approve</button>
                <button class="btn rounded" @click="handleReject(post.id)">Reject</button>
            </div>
        
        </div>
    </div>
    <div v-else-if="show === 'one'">
        <div class="py-3 flex justify-between bg-slate-100">
            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ posts[item].title }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(posts[item].id)">Approve</button>
                <button class="btn rounded" @click="handleReject(posts[item].id)">Reject</button>
            </div>
        </div>
        <p class="pl-2 mt-3">
            {{ posts[item].content }}
        </p>
        
    </div>
</template>