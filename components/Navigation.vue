<script setup>
// const owner = useSupabaseUser().value.id;
const user = useSupabaseUser();
const client = useSupabaseClient();

console.log(user);

// const { data: user } = await useAsyncData('user', async () => {
//     const { data, error } = await client.from('profiles').select(`
//         *
//     `)
//     .eq('id', owner)
//     if(error) console.log(error);
//     return data;
// })
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
                <li>
                    <NuxtLink to="/profile">
                        Profile
                    </NuxtLink>
                </li>
                <!-- <li>
                    <div class="p-10 bg-red-500 text-2xl text-white">{{ user[0].username }}</div>
                </li> -->
            </ul>
            <ul v-if="!useSupabaseUser()" class="flex gap-5">
                <li>
                    <NuxtLink to="/">
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
                    {{console.log(user)}}
                    Log Out
                </li>
            </ul>
        </div>
    </div>
</template>
