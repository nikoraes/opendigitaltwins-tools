<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >

      <div class="full-width row q-gutter-sm">
        <h4 class="q-mb-xs q-ml-none">{{(model.displayName && (model.displayName.en || model.displayName)) || model['@id']}}</h4>
        <q-space />
        <q-btn
          rounded
          no-caps
          flat
          label="Cancel"
          @click="onCancel"
        />
        <q-btn
          type="submit"
          rounded
          no-caps
          color="primary"
          label="Save"
          class="q-px-sm"
        />
      </div>
      <div
        v-if="model"
        class="column full-width q-gutter-y-sm"
      >

        <component
          v-for="property of interfaceSchema"
          :key="property.key"
          :is="property.is"
          v-bind="property"
          @input="val=>setValue(property.key, val)"
        />
        <h6 class="q-mt-md q-mb-xs">Contents</h6>
        <div
          v-for="(c, cIdx) of model.contents"
          :key="`c_${cIdx}`"
        >
          <Relationship
            v-if="c['@type'].includes('Relationship')"
            :value="c"
            @input="val => setContentValue(cIdx, val)"
          />
          <Property
            v-if="c['@type'].includes('Property')"
            :value="c"
            @input="val => setContentValue(cIdx, val)"
          />
        </div>

        <!--         <div
          v-for="rel of filteredContents('Relationship')"
          :key="`rel_${rel.name}`"
        >
          <Relationship
            :value="rel"
            @input="val => setContentValue('Relationship', val)"
          />
        </div>
        <h6 class="q-mt-md q-mb-xs">Properties</h6>
        <div
          v-for="prop of filteredContents('Property')"
          :key="`prop_${prop.name}`"
        >
          <Property
            :value="prop"
            @input="val => setContentValue('Property', val)"
          />
        </div>
        <h6 class="q-mt-md q-mb-xs">Telemetries</h6>
        <div
          v-for="telemetry of filteredContents('Telemetry')"
          :key="`tel_${telemetry.name}`"
        >{{telemetry}}</div>-->
      </div>
    </q-form>
  </div>
</template>

<script>
import { extend } from 'quasar'

import LanguageMap from './LanguageMap'
import Property from './Property'
import Relationship from './Relationship'

export default {
  name: 'Interface',

  components: { LanguageMap, Property, Relationship },

  props: {
    id: String
  },

  data () {
    return {
      model: null
    }
  },

  mounted () { if (this.id) this.load(this.id) },
  watch: { id (val) { this.load(val) } },

  computed: {
    interfaceSchema () {
      return [
        {
          is: 'q-input',
          value: this.model['@id'],
          // outlined: true,
          dense: true,
          label: '@id',
          key: '@id',
          rules: [val => (!!val && RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(val)) || 'The pattern of DTMI is dtmi:<path>;<version>. Path may contain only letters, digits, underscore, and colon. Version must be numeric.'],
          hideBottomSpace: true,
          clearable: true
        },
        {
          is: 'q-input',
          value: this.model['@type'],
          // outlined: true,
          dense: true,
          disable: true,
          label: '@type',
          key: '@type',
          clearable: true
        },
        {
          is: 'q-input',
          value: this.model['@context'],
          // outlined: true,
          dense: true,
          disable: true,
          label: '@context',
          key: '@context',
          clearable: true
        },
        {
          is: 'LanguageMap',
          value: this.model.displayName,
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
          value: this.model.description,
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
          value: this.model.comment,
          // outlined: true,
          dense: true,
          label: 'comment',
          key: 'comment',
          rules: [val => !val || val.length <= 512 || 'String length is greater than the maximum length of 512'],
          hideBottomSpace: true,
          clearable: true
        },
        {
          is: 'q-select',
          value: (this.model.extends && !Array.isArray(this.model.extends)) ? [this.model.extends] : this.model.extends,
          options: this.modelOptions,
          multiple: true,
          maxValues: 2,
          emitValue: true,
          mapOptions: true,
          optionValue: 'id',
          optionLabel: 'id',
          // outlined: true,
          dense: true,
          label: 'extends',
          key: 'extends',
          hideBottomSpace: true,
          clearable: true
        }
      ]
    },

    modelOptions () { return this.$store.state.models.list }
  },

  methods: {
    load (id) {
      this.model = extend(true, {}, this.$store.getters['models/byId'](this.id)?.model)
    },
    filteredContents (type) {
      if (!this.model.contents) return []
      return this.model.contents.filter(x => x['@type'].includes(type))
    },
    setValue (key, val) {
      if (val) this.$set(this.model, key, val)
      else this.$delete(this.model, key)
    },
    setContentValue (cIdx, val) {
      this.model.contents.splice(cIdx, 1, val)
    },
    onSubmit () {
      if (this.model['@id'] !== this.id) {
        // find all references and change all ids
      }
      this.$store.commit('models/upsertModel', this.model)
    },
    onCancel () {

    }
  }
}
</script>
