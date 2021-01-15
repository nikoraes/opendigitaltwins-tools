// import { twinsApiService } from '../../services/TwinsApiService'

/**
 * Retrieves model metadata and model definitions.
 */
/* export const getModels = async ({ commit }) => {
  const models = await twinsApiService.queryModels()

  commit('updateModels', models)

  return models
} */

/**
 * Deletes a model. A model can only be deleted if no other models reference it.
 */
/* export const deleteModel = async ({ commit }, modelId) => {
  await twinsApiService.deleteModel(modelId)
  commit('removeModelFromList', modelId)
}
 */
/**
 * Deletes a model. A model can only be deleted if no other models reference it.
 */
/* export const deleteAllModels = async ({ dispatch, state }) => {
  const deleted = {}
  const deleteModel = async model => {
    if (deleted[model.id]) return
    const childModels = state.list.filter(m => m.model.extends?.includes(model.id))
    if (childModels.length > 0) {
      for (const m of childModels) {
        await deleteModel(m)
      }
    }
    try {
      await dispatch('deleteModel', model.id)
      deleted[model.id] = true
    } catch (e) { console.log(e) }
  }

  for (const model of [...state.list]) {
    await deleteModel(model)
  }
}
 */
/**
 * Uploads models breadth first. When any error occurs, no models are uploaded.
 */
/* export const addModels = async ({ dispatch }, models) => {
  const uploaded = {}

  const addModel = async model => {
    if (uploaded[model['@id']]) return
    if (model.extends || model.contents.some(x => x['@type'] === 'Component')) {
      const extendsArr = typeof model.extends === 'string' ? [model.extends] : [...model.extends]
      if (model.contents) model.contents.filter(x => x['@type'] === 'Component' && typeof x.schema === 'string').forEach(x => extendsArr.push(x.schema))

      for (const mId of extendsArr) {
        const parentModel = models.find(m => m['@id'] === mId)
        if (parentModel) await addModel(parentModel)
      }
    }
    try {
      await twinsApiService.addModels([model])
      uploaded[model['@id']] = true
    } catch (e) { console.log(e) }
  }

  for (const model of models) {
    await addModel(model)
  }

  dispatch('getModels')
}
 */
