<template>
    <ul 
        class="flex flex-col">
            <li v-for="n in 5" class="even:bg-slate-200 odd:bg-white">
                <HomeNewsItem />
            </li>
    </ul>
</template>