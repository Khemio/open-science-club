<script setup>
const {title, content} = defineProps(['title', 'content']);

</script>

<template>
        <div class="p-3">
            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iusto accusamus distinctio asperiores pariatur laboriosam voluptas magnam incidunt eum eaque. -->
            <h3>{{ title }}</h3>
            <!-- <br> -->
            <p class="truncate">{{ content }}</p>
        </div>
</template>