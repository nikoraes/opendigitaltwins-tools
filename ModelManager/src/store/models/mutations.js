
/**
 * Update entire list
 * @param {*} state
 * @param {Object[]} payload Response from server
 * @param {Object} payload[].model DTDL model
 */
export const updateModels = (state, payload) => {
  state.list = payload.sort((a, b) => a.id < b.id ? -1 : 1)
}

/**
 * Add or update a single model in the list
 * @param {*} state
 * @param {Object} model DTDL model
 */
export const upsertModel = (state, model) => {
  console.log(model)
  const idx = state.list.findIndex(m => m.id === model['@id'])
  if (idx > -1) {
    state.list.splice(idx, 1, {
      ...state.list[idx],
      id: model['@id'],
      displayName: typeof model.displayName === 'object' ? model.displayName : { en: model.displayName },
      model: model
    })
  } else {
    state.list.push({
      id: model['@id'],
      displayName: typeof model.displayName === 'object' ? model.displayName : { en: model.displayName },
      model: model
    })
  }
}

/**
 * Removes a single model in the list
 * @param {*} state
 * @param {string} id model id
 */
export const removeModel = (state, id) => {
  const idx = state.list.findIndex(m => m.id === id)
  if (idx > -1) state.list.splice(idx, 1)
}

export const clearStore = (state) => {
  state.list = []
}
