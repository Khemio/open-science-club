<script lang="ts" setup>

const current = ref("details")

function changeView(e: Event) {
  const elem = e.target as HTMLElement;
  if(elem.parentElement) current.value = elem.parentElement.id;
  
}

</script>

<template>
  <div class="w-11/12 mx-auto my-10 grid grid-cols-7 gap-5">
    <div class="p-3 border border-black col-span-1">
      <ul class="flex flex-col gap-5">
        <li id="details">
          <button @click="(e: Event) => changeView(e)">
            Details
          </button>
        </li>
        <li id="activity">
          <button @click="(e: Event) => changeView(e)">
            Activity
          </button>
        </li>
        <li id="documents">
          <button @click="(e: Event) => changeView(e)">
            Documents
          </button>
        </li>
      </ul>
    </div>
    <div class="pl-3 pt-3 border-l border-black col-start-3 col-end-7">
      <ProfileDetails v-if="current === 'details'" />
      <ProfileActivity v-else-if="current === 'activity'" />
      <ProfileDocuments v-else-if="current === 'documents'" />
    </div>
  </div>
</template>