<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

// const role = 'admin';
const { data: is_member } = await useAsyncData('role', async () => {
    if (!user) return false;
    const { data, error } = await client.from('profiles').select(`
        is_member
    `)
    .eq('id', user.value.id)
    if(error) console.log(error);
    // console.log(data[0].role)
    return data[0].is_member;
})

const current = ref("resources")

function changeView(e) {
    const elem = e.target;
    if(elem.parentElement) current.value = elem.parentElement.id;

}

</script>

<template>
    <div class="w-11/12 mx-auto my-10 grid grid-cols-7 gap-5">
        <div class="p-3 border border-black col-span-1">
            <ul class="flex flex-col gap-5">
                <li id="resources">
                    <button @click="(e) => changeView(e)">
                        Resources
                    </button>
                </li>
                <li id="members">
                    <button @click="(e) => changeView(e)">
                        Members
                    </button>
                </li>
                <!-- <li id="documents">
                    <button @click="(e) => changeView(e)">
                        Documents
                    </button>
                </li> -->
            </ul>
        </div>
        <div class="pl-3 pt-3 border-l border-black col-start-3 col-end-7">
            <ResourcesMaterials :is_member="is_member" v-if="current === 'resources' && is_member" />
            <ResourcesMembers :is_member="is_member" v-else-if="current === 'members' && is_member" />
            <!-- <ProfileDocuments v-else-if="current === 'documents'" /> -->
        </div>
    </div>
</template>