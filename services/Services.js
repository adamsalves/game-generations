import GenerationService from './Generation'

export default ($axios) => ({
  generation: GenerationService($axios),
})

