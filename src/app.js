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

  const request$ = xs.of({
    url: 'https://swapi.co/api/people/1',
    category: 'api',
  });

  return {
    state: state,
    DOM: state.map((state) => {
      return div([
        h1("Hello World! " + state)
      ])
    }),
    HTTP: request$
  };
}

function model(actions) { // Returns state

  const character$ = actions.apiRequest$.flatten();

  return character$
  .map(res => {res.body})
  .startWith({name: 'Loading...'});
}

function view(state$) {
  return state$.map( character => {
    return div([
      `Random number from server: ${character.name}`
    ])
  });
}
