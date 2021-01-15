<template>
  <div>
    <q-expansion-item
      :label="(value.displayName && (value.displayName.en || value.displayName)) || value.name"
      :content-inset-level="0.5"
      header-class="text-subtitle2"
    >
      <div class="column full-width q-gutter-y-sm q-pt-xs">
        <component
          v-for="property of schema"
          :key="property.key"
          :is="property.is"
          v-bind="property"
          @input="val => emitValueFn(property.key, val)"
        />
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import LanguageMap from './LanguageMap'

export default {
  name: 'Property',

  components: { LanguageMap },

  props: {
    value: Object
  },

  data () {
    return {}
  },

  computed: {
    schema () {
      return [
        {
          is: 'q-input',
          value: this.value['@id'],
          // outlined: true,
          dense: true,
          label: '@id',
          key: '@id',
          rules: [val => !val || RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(val) || 'The pattern of DTMI is dtmi:<path>;<version>. Path may contain only letters, digits, underscore, and colon. Version must be numeric.'],
          hideBottomSpace: true,
          clearable: true
        },
        {
          is: 'q-input',
          value: this.value['@type'],
          // outlined: true,
          dense: true,
          disable: true,
          label: '@type',
          key: '@type',
          clearable: true
        },
        {
          is: 'q-input',
          value: this.value.name,
          // outlined: true,
          dense: true,
          rules: [val => (!!val && RegExp('^[a-zA-Z](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?$').test(val)) || 'String does not match the pattern of ^[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?$'],
          hideBottomSpace: true,
          key: 'name',
          clearable: true
        },
        {
          is: 'LanguageMap',
          value: this.value.displayName,
          // outlined: true,
          dense: true,
          label: 'displayName',
          key: 'displayName',
          rules: [val => !val || val.length <= 64 || 'String length is greater than the maximum length of 64'],
          hideBottomSpace: true,
          clearable: true
        },
        {
          is: 'LanguageMap',
          value: this.value.description,
          // outlined: true,
          dense: true,
          label: 'description',
          key: 'description',
          rules: [val => !val || val.length <= 512 || 'String length is greater than the maximum length of 512'],
          hideBottomSpace: true,
          clearable: true
        },
        {
          is: 'q-input',
          value: this.value.comment,
          // outlined: true,
          dense: true,
          label: 'comment',
          key: 'comment',
          rules: [val => !val || val.length <= 512 || 'String length is greater than the maximum length of 512'],
          hideBottomSpace: true,
          clearable: true
        }
      ]
    }
  },

  methods: {
    emitValueFn (key, val) {
      console.log('bla', key, val)
      this.$emit('input', { ...this.value, [key]: val })
    }
  }
}
</script>
