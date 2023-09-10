<script setup>
const client = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await client
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    let { error } = await client.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    let { error } = await client.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <form class="flex flex-col gap-5" @submit.prevent="updateProfile">
        <ProfileAvatar class="w-max border border-black" v-model:path="avatar_path" @upload="updateProfile" />
        <div class="flex gap-3">
            <label for="email">Email</label>
            <input id="email" type="text" :value="user.email" disabled />
        </div>
        <div class="flex gap-3">
            <label for="username">Name</label>
            <input id="username" type="text" v-model="username" />
        </div>
        <div class="flex gap-3">
            <label for="website">Website</label>
            <input id="website" type="url" v-model="website" />
        </div>

    <div>
        <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
        />
    </div>
  
        <div>
            <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
        </div>
    </form>
</template>