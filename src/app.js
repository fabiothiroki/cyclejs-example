import {div} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const request$ = xs.of(null)
    .mapTo({
      url: 'https://swapi.co/api/people/1',
      category: 'api',
    });

  const vtree$ = sources.HTTP.select('api')
    .flatten()
    .map(res => res.body)
    .startWith('null')
    .map(result =>
      div([
        `Random number from server: ${result.name}`
      ])
    );


  return {
    DOM: vtree$,
    HTTP: request$
  };
}
