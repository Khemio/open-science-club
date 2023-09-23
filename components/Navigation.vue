<script setup>
// const owner = useSupabaseUser().value.id;
const user = useSupabaseUser();
const client = useSupabaseClient();

// const role = 'admin';
const { data: is_admin } = await useAsyncData('role', async () => {
    if (!user) return false;
    const { data, error } = await client.from('profiles').select(`
        is_admin
    `)
    .eq('id', user.value.id)
    if(error) console.log(error);
    // console.log(data[0].role)
    console.log(data[0].is_admin);
    return data[0].is_admin;
})

// Use server functions and composables
function isAuthorized() {
    // if (is_admin.value) return true;
    return is_admin.value;
}

async function logOut() {
    let { error } = await client.auth.signOut()
}
</script>

<template>
    <div class="border-b border-black">
        <div class="w-11/12 m-auto py-3 flex justify-between">
            <ul class="flex gap-5">
                <li>
                    <NuxtLink to="/">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/forum">
                        Forum
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/announcements">
                        Announcements
                    </NuxtLink>
                </li>
                <li v-if="isAuthorized()">
                    <NuxtLink to="/profile">
                        Profile
                    </NuxtLink>
                </li>
                <!-- Use server functions and composables, add middleware and guards -->
                <li v-if="user">
                    <NuxtLink to="/resources">
                        Resources
                    </NuxtLink>
                </li>
                <li v-if="isAuthorized()">
                    <NuxtLink to="/manage">
                        Manage
                    </NuxtLink>
                </li>
                <!-- <li>
                    <div class="p-10 bg-red-500 text-2xl text-white">{{ user[0].username }}</div>
                </li> -->
            </ul>
            <ul v-if="!user" class="flex gap-5">
                <li>
                    <NuxtLink to="/apply">
                        Apply
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login" >
                        Log In
                    </NuxtLink>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <button @click="logOut()">Log Out</button>
                </li>
            </ul>
        </div>
    </div>
</template>
