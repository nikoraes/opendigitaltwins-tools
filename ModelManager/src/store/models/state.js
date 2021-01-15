import models from './allModels'

export default function () {
  return {
    list: models.map(m => ({
      id: m['@id'],
      displayName: {
        en: m.displayName?.en || m.displayName
      },
      model: m
    }))
  }
}
