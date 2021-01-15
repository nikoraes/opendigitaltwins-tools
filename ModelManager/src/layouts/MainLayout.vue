<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          DTDL Model Manager
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="500"
      content-class="bg-grey-1"
    >
      <ModelTree />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ModelTree from '../components/ModelTree'

export default {
  name: 'MainLayout',
  components: { ModelTree },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
