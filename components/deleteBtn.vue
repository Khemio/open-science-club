<script setup>
// const owner = useSupabaseUser().value.id;
const user = useSupabaseUser();
const client = useSupabaseClient();

const {item, id} = defineProps(['item', 'id'])

// const role = 'admin';
// const { data: role } = await useAsyncData('role', async () => {
//     if (!user) return false;
//     const { data, error } = await client.from('profiles').select(`
//         role
//     `)
//     .eq('id', user.value.id)
//     if(error) console.log(error);
//     // console.log(data[0].role)
//     return data[0].role;
// })

// Use server functions and composables
function isAuthorized(permission) {
    if (role.value === permission) return true;
}

async function deleteItem() {
    // await useAsyncData('role', async () => {
    // if (!user) return false;
    const {error } = await client.from(item).delete()
    .eq('id', id)
    if(error) console.log(error);
}
</script>

<template>
    <!-- <div class="px-3 py-1 border border-black"> -->
            
        <button class="px-3 py-1" @click="deleteItem()">Delete</button>
        
    <!-- </div> -->
</template>
