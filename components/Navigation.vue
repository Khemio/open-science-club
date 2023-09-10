<!-- <script setup>

</script> -->

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
                    Log Out
                </li>
            </ul>
        </div>
    </div>
</template>
