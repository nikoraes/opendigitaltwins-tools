export const index = (state, getters) => state.list.reduce((o, m) => ({
  ...o,
  [m.id]: {
    ...m,
    ...getters.mapModel(m.model)
  }
}), {})

export const mapModel = (state, getters) => model => {
  if (!model) return

  // generate propertylist
  const contents = { properties: [], relationships: [], telemetries: [], bases: [] }

  // recursively add all properties (also from parent models)
  const addModelContents = (model) => {
    if (!model) return
    if (model.contents) {
      contents.properties.unshift(...model.contents.filter(c => (c['@type'] === 'Property' || c['@type'][0] === 'Property') && c.schema && !contents.properties.some(p => p.name === c.name)))
      contents.relationships.unshift(...model.contents.filter(c => c['@type'] === 'Relationship' && !contents.relationships.some(p => p.name === c.name)))
      contents.telemetries.unshift(...model.contents.filter(c => (c['@type'] === 'Telemetry' || c['@type'][0] === 'Telemetry') && !contents.telemetries.some(p => p.name === c.name)))
    }
    if (model.extends) {
      if (Array.isArray(model.extends)) {
        model.extends.forEach(x => {
          contents.bases.unshift(x)
          addModelContents(state.list.find(y => y.id === x)?.model)
        })
      } else {
        contents.bases.unshift(model.extends)
        addModelContents(state.list.find(y => y.id === model.extends)?.model)
      }
    }
  }

  if (model) addModelContents(model)

  return contents
}

export const byId = (state, getters) => modelId => getters.index[modelId]

export const byBase = (state, getters) => baseId => Object.values(getters.index).filter(m => m.bases.includes(baseId))

export const properties = (state, getters) => modelId => getters.byId(modelId)?.properties ?? []

export const relationships = (state, getters) => modelId => getters.byId(modelId)?.relationships ?? []

export const property = (state, getters) => (modelId, propertyName) => getters.properties(modelId)?.find(x => x.name === propertyName)

export const displayName = (state, getters) => (modelId, language = 'en') => {
  const model = getters.byId(modelId)
  return model ? (model.displayName[language] || model.displayName) : undefined
}

export const tree = state => {
  const map = {}
  const list = []
  const tree = []
  let node
  let i

  for (i = 0; i < state.list.length; i += 1) {
    map[state.list[i].id] = i // initialize the map
    list[i] = {
      ...state.list[i],
      label: state.list[i].displayName?.en || state.list[i].displayName,
      children: [] // initialize the children
    }
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (!node.model.extends) {
      tree.push(node)
    } else {
      if (Array.isArray(node.model.extends)) {
        node.model.extends.forEach(parentId => list[map[parentId]].children.push(node))
      } else {
        list[map[node.model.extends]].children.push(node)
      }
    }
  }

  return tree
}
