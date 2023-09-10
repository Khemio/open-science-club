<script setup>
const user = useSupabaseUser()

</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Navigation />
    <NuxtPage/>
    <Footer />
  </div>
</template>