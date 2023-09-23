<script setup>
// Fetch Applications
// Approve / Decline Applications
// Fetch Members
// Promote / Delete Members

const user = useSupabaseUser();
const client = useSupabaseClient();

const show = ref('all');
const tab = ref('applications');
const id = (null);


const { data: members } = await useAsyncData('members', async () => {
    // if (!is_member) return false;
    const { data, error } = await client.from('profiles').select(`
        *
    `)
    .eq('is_member', true)
    if(error) console.log(error);
    // console.log(data)
    return data;
})

function handlePromote(username) {
    console.log(`Member ${username} has been promoted`);
}

function handleKick(username) {
    console.log(`Member ${username} has been kicked out`);
}

</script>

<template>
    <div class="flex gap-3 justify-evenly">
        <div @click="tab = 'applications'; show = 'all'" class="btn cursor-pointer">Applications</div>
        <div @click="tab = 'members'; show = 'all'" class="btn cursor-pointer">Members</div>
    </div>

    <div v-if="show === 'all' && tab === 'applications'" class="my-5 flex flex-col gap-3">
        <div v-for="n in 5" @click="show = 'one'; id = n">
            Applications {{ n }}
        </div>
        <!-- <div v-for="(post, index) in posts" @click="show='one'; item=index"
        class="py-3 flex justify-between hover:bg-slate-100">

            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ post.title }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(post.id)">Approve</button>
                <button class="btn rounded" @click="handleReject(post.id)">Reject</button>
            </div>
        
        </div> -->
    </div>

    <div v-if="show === 'all' && tab === 'members'" class="my-5 flex flex-col gap-3">
        <div v-for="member in members" class="py-3 flex justify-between hover:bg-slate-100">

            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ member.username }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handlePromote(member.username)">Promote</button>
                <button class="btn rounded" @click="handleKick(member.username)">Kick out</button>
            </div>
        
        </div>
    </div>  

    <div v-else-if="show === 'one'">
        Application: {{ id }}
        <!-- <div class="py-3 flex justify-between bg-slate-100">
            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ posts[item].title }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(posts[item].id)">Approve</button>
                <button class="btn rounded" @click="handleReject(posts[item].id)">Reject</button>
            </div>
        </div>
        <p class="pl-2 mt-3">
            {{ posts[item].content }}
        </p> -->
        
    </div>
</template>