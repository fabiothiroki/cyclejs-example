import {div, h1, p} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const intents = {
    apiResponse: sources.HTTP.select('api').flatten()
  }

  const state = intents.apiResponse.map(res => {
    return res.body.results.map( result => result.name );
  })
  .startWith(['Loading']);

  return {
    state: state,
    DOM: state.map( characters => {
      const html = characters.map( character => {
        return p(character)  
      });
      return div(html)   
    }),
    HTTP: xs.of({
      url: 'https://swapi.co/api/people',
      category: 'api',
    })
  };
}
