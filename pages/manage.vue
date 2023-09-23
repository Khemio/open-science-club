<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const current = ref("posts")

function changeView(e) {
  const elem = e.target;
  if(elem.parentElement) current.value = elem.parentElement.id;
  
}

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



</script>

<template>
<div class="w-11/12 mx-auto my-10 grid grid-cols-7 gap-5">
    <div class="p-3 border border-black col-span-1">
        <ul class="flex flex-col gap-5">
            <li id="posts">
            <button @click="(e) => changeView(e)">
                Posts
            </button>
            </li>
            <li id="members">
            <button @click="(e) => changeView(e)">
                Members
            </button>
            </li>
            <li id="resources">
            <button @click="(e) => changeView(e)">
                Resources
            </button>
            </li>
        </ul>
    </div>
    <div class="pl-3 pt-3 border-l border-black col-start-3 col-end-7">
        <ManagePosts v-if="current === 'posts'"/>
        <ManageMembers v-else-if="current === 'members'"/>
        <ManageResources v-else-if="current === 'resources'" class="flex gap-3 justify-evenly" />
    </div>
</div>

</template>