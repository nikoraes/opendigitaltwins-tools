<template>
  <q-page
    padding
    class="column items-center"
  >
    <Interface
      :id="$route.params.id"
      style="width:600px;"
    />
  </q-page>
</template>

<script>
import Interface from '../components/Interface'

export default {
  name: 'Model',

  components: { Interface }

}
</script>
