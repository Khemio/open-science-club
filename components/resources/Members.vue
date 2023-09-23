<script setup>
// const user = useSupabaseUser();
const client = useSupabaseClient();

// const role = 'admin';
const {is_member} = defineProps(['is_member'])

const { data: members } = await useAsyncData('members', async () => {
    if (!is_member) return false;
    const { data, error } = await client.from('profiles').select(`
        *
    `)
    .eq('is_member', true)
    if(error) console.log(error);
    // console.log(data[0].role)
    return data;
})

// Use server functions and composables
// function isAuthorized() {
//     if (is_admin.value) return true;
// }

</script>

<template>
    <div>
        <h2 class="">Members Panel</h2>
        <div v-for="member in members" class="my-3">
            <span>{{ member.username }}</span> - <span>{{ member.email ? member.email : "no email" }}</span>
        </div>
    </div>
</template>