import {div} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const state$ = model({
    apiRequest$: sources.HTTP.select('api')
  });

  const vtree$ = view(state$);

  const request$ = xs.of(null)
    .mapTo({
      url: 'https://swapi.co/api/people/1',
      category: 'api',
  });

  return {
    DOM: vtree$,
    HTTP: request$
  };
}

function model(actions) { // Returns state

  const character$ = actions.apiRequest$.flatten();

  return character$
  .map(res => res.body)
  .startWith({name: 'Loading...'});
}

function view(state$) {
  return state$.map( character => {
    return div([
      `Random number from server: ${character.name}`
    ])
  });
}
