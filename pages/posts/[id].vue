<script setup>

const client = useSupabaseClient();
const route = useRoute();
const owner = useSupabaseUser().value.id;

const showModal = ref(false)
const content = ref('');

const { data: post } = await useAsyncData('post', async () => {
    const { data, error } = await client.from('posts').select(`
        *,
        comments(*,
        profiles!comments_owner_fkey(username))
    `)
    .eq('id', route.params.id)
    if(error) console.log(error);
    return data;
})

async function createComment() {

const { data: comment } = await useAsyncData('comment', async () => {
    const { data, error } = await client.from('comments').insert({
        owner: owner,
        post: post.value[0].id,
        // title: title.value,
        content: content.value
    })
    .select();

    if( error) console.log(error);
    return data;
})
}

function handleClose() {
showModal.value = false;
createComment();
}


// const comments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"]
</script>

<template>
    <div class="w-11/12 mx-auto my-10 flex flex-col min-h-screen border border-black">
        <div class=" border-b border-black">
            <div class="w-full ml-auto pr-5 py-3 flex gap-5 justify-end border-b border-black">
                <button>View staff comments</button>
                <button id="show-modal" @click="showModal = true">Make a Comment</button>
                
                <Teleport to="body">
                    
                    <modal :show="showModal" @close="handleClose()">
                        <template #header>
                            <h3>Make a comment></h3>
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

                            <!-- <div class="flex gap-3">
                                <label for="title">Title</label>
                                <input name="title" id="title" v-model="title"
                                class="px-1 rounded border border-black outline-none" />
                            </div> -->

                            <label for="content">Content:</label>
                            <textarea name="content" id="content" cols="100" rows="10"
                            v-model="content"
                            class="p-3 border border-black outline-none"></textarea>
                        </form>
                    </template>
                </modal>
                </Teleport>
            </div>
            <h2 class="px-5 py-3 text-2xl text-bold">
                {{ post[0].title }}
            </h2>
        </div>
        <div class="px-5 flex-auto grid grid-cols-7">
            <div class="py-3 col-span-5 border-r border-black">
                <p>{{ post[0].content }}</p>
            </div>
            <div class="col-span-2">

            </div>
        </div>
        
    </div>

    <ul v-if="post[0].comments" class="w-11/12 mb-3 mx-auto flex flex-col gap-3">
        <li v-for="comment in post[0].comments" class="min-w-full px-3 py-1 border border-black">
            <div class="flex justify-between">
                <p>{{ comment.content }}</p>
                <span>{{ comment.profiles.username }}</span>
            </div>

            
        </li>
    </ul>
</template>