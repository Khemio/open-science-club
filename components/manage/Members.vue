<script setup>
// Approve / Decline Applications

const user = useSupabaseUser();
const client = useSupabaseClient();

const show = ref('all');
const tab = ref('applications');
const item = (null);

const {data: applications} = await useAsyncData('applications', async () => {
    const {data, error} = await client.from('applications')
    .select(`
        *,
        profiles(id, username, full_name, email)
    `)

    if(error) console.log(error)
    console.log(data);
    return data;
})

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

async function approveApplication(id) {
    await useAsyncData('approve_member', async () => {
        const { data, error } = await client.from('profiles')
        .update({
            // is_pending: false
            is_member: true
        })
        .eq('id', id)

        if( error) console.log(error);
        return;
    })

    // Delete application
    await useAsyncData('delete_application', async () => {
        const { error } = await client.from('applications')
        .delete()
        .eq('member_id', id)

        if( error) console.log(error);
        return;
    })
}

async function rejectApplication(id) {
    // await useAsyncData('post', async () => {
    //     const { data, error } = await client.from('posts')
    //     .update({
    //         status: 'rejected'
    //     })
    //     .eq('id', id)

    //     if( error) console.log(error);
    //     return;
    // })
    // Figure out how to handle rejection
    console.log(`Post with id: ${id} was rejected`);
}

function handleApprove(id) {
    approveApplication(id);
    show.value = 'all';
}

function handleReject(id) {
    rejectApplication(id);
    show.value = 'all';
}

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
        <div v-for="(application, index) in applications" @click="show='one'; item=index"
        class="py-3 flex justify-between hover:bg-slate-100">

            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ application.profiles.username }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(applications[item].profiles.id)">Approve</button>
                <button class="btn rounded" @click="handleReject(applications[item].profiles.id)">Reject</button>
            </div>
        
        </div>
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
        <div class="py-3 flex justify-between bg-slate-100">
            <h3 class="pl-2 grid grid-cols-1 place-content-center">{{ applications[item].profiles.username }}</h3>
            <div class="flex gap-5">
                <button class="btn rounded" @click="handleApprove(applications[item].profiles.id)">Approve</button>
                <button class="btn rounded" @click="handleReject(applications[item].profiles.id)">Reject</button>
            </div>
        </div>
        <p class="pl-2 mt-3">
            {{ applications[item].profiles.username }} - {{ applications[item].profiles.full_name }} - {{ applications[item].profiles.email }}
        </p>
        
    </div>
</template>