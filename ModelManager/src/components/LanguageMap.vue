<template>
  <div>
    <div
      v-if="typeof value !== 'object'"
      class="row"
    >
      <q-input
        :value="value"
        @input="val => $emit('input', val)"
        :label="label"
        :outlined="outlined"
        :dense="dense"
        :rules="rules"
        :hide-bottom-space="hideBottomSpace"
        :clearable="clearable"
        class="col-11"
      />
      <div class="col-1 column justify-center items-center">
        <q-btn
          @click="toObject"
          icon="mdi-flag-plus-outline"
          color="grey"
          flat
          dense
          round
        >
          <q-tooltip>Add localization</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div v-else>
      <q-item
        dense
        class="q-pl-none"
      >
        <q-item-section class="text-subtitle2">
          {{label}}
        </q-item-section>
        <q-item-section
          side
          avatar
        >
          <q-btn
            color="grey"
            icon="mdi-flag-remove-outline"
            flat
            round
            dense
            @click="toString"
          >
            <q-tooltip>Remove localization</q-tooltip>
          </q-btn>
        </q-item-section>
        <q-item-section
          side
          avatar
        >
          <q-btn
            color="grey"
            icon="mdi-plus"
            flat
            round
            dense
            @click="addElement"
          />
        </q-item-section>
      </q-item>
      <div
        v-for="([key, val], index) of entries"
        :key="'e' + index"
        class="column full-width q-gutter-y-xs"
      >
        <div class="row">
          <div class="col-1 column justify-center">
            {{key}}
          </div>

          <q-input
            :value="val"
            @input="val => emitValueFn(val, index)"
            :outlined="outlined"
            :dense="dense"
            class="col-10"
            :rules="rules"
            :hide-bottom-space="hideBottomSpace"
            :clearable="clearable"
          />
          <div class="col-1 column justify-center items-center">
            <q-btn
              @click="removeElement(index)"
              icon="mdi-close"
              color="grey"
              flat
              dense
              round
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LanguageMap',

  props: {
    value: [String, Object],
    label: String,
    outlined: Boolean,
    dense: Boolean,
    rules: Array,
    hideBottomSpace: Boolean,
    clearable: Boolean
  },

  data () {
    return {
      isObject: false,
      entries: []
    }
  },

  mounted () {
    if (typeof this.value === 'object') {
      this.isObject = true
      this.entries = Object.entries(this.value)
    }
  },

  watch: {
    value (val, oldVal) {
      if (val && typeof val === 'object' && typeof oldVal === 'string') {
        this.isObject = true
        this.entries = Object.entries(this.value)
      } else if (typeof val === 'string' && typeof oldVal === 'object') {
        this.isObject = false
        this.entries = []
      }
    }
  },

  methods: {
    toObject () {
      this.isObject = true
      this.$emit('input', {
        en: this.value || null
      })
    },

    toString () {
      const entry = this.entries.find(([key, value]) => key === 'en') || this.entries[0]
      this.$emit('input', entry && entry[1])
    },

    addElement () {
      this.$q.dialog({
        title: 'Add language',
        message: 'ISO 639 language tag',
        prompt: {
          model: '',
          isValid: val => val.length === 2
        },
        cancel: true,
        persistent: true
      }).onOk(lang => {
        this.entries.push([lang, null])
        this.$emit('input', Object.fromEntries(this.entries))
      })
    },

    removeElement (index) {
      this.entries.splice(index, 1)
      this.$emit('input', Object.fromEntries(this.entries))
    },

    emitValueFn (val, index) {
      if (val) this.entries.splice(index, 1, [this.entries[index][0], val])
      else this.entries.splice(index, 1)
      this.$emit('input', Object.fromEntries(this.entries))
    }
  }
}
</script>
