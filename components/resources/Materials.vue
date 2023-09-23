<script lang="ts" setup>
const client = useSupabaseClient();

const {is_member} = defineProps(['is_member'])

</script>

<template>
    <div class="mx-auto w-full">
        Resources Panel
    </div>
    <div class="mt-5 flex gap-3 justify-evenly">
        <span class="px-3 py-1 border border-black cursor-pointer rounded">Info</span>
        <span class="px-3 py-1 border border-black cursor-pointer rounded">Contacts</span>
        <span class="px-3 py-1 border border-black cursor-pointer rounded">Materials</span>
    </div>
</template>