import {div} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  // const searchIntent$ = sources.DOM.select


  const vtree$ = sources.HTTP.select('api')
    .flatten()
    .map(res => res.body)
    .startWith('null')
    .map(renderState);


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

function renderState(state) {

  return div([
    `Random number from server: ${state.name}`
  ])

}
