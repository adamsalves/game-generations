import GenerationService from './Generation'
import SpecieService from './Specie'
import TypeService from './Type'
import PokemonSpecieService from './PokemonSpecie'
import EvolutionService from './Evolution'

export default ($axios) => ({
  generation: GenerationService($axios),
  specie: SpecieService($axios),
  type: TypeService($axios),
  pokemonSpecie: PokemonSpecieService($axios),
  evolution: EvolutionService($axios),
})
