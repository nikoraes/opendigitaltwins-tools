<template>
  <div>
    <q-tree
      :nodes="modelTree"
      :selected.sync="selected"
      node-key="id"
    >
      <template v-slot:default-header="prop">
        <div class="column">
          <div>{{prop.node.label}}</div>
          <div class="text-weight-light text-grey">{{prop.node.id}}</div>
        </div>
      </template>
    </q-tree>
    {{selected}}
  </div>
</template>

<script>
export default {
  name: 'ModelTree',

  data () {
    return {
      selected: null
    }
  },

  computed: {
    modelTree () { return this.$store.getters['models/tree'] }
  },

  watch: {
    selected (val) { this.$router.push(`/${val}`) }
  }
}
</script>
