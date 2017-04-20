import {div, h1} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const intents = {
    apiResponse: sources.HTTP.select('api').flatten()
  }

  const state = intents.apiResponse.map(res => {
    return res.body.name;
  })
  .startWith('Loading');

  return {
    state: state,
    DOM: state.map((state) => {
      return div([
        h1("Hello World! " + state)
      ])
    }),
    HTTP: xs.of({
      url: 'https://swapi.co/api/people/1',
      category: 'api',
    })
  };
}
