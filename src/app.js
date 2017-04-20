import {div, p, input} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const intents = {
    apiResponse: sources.HTTP.select('api').flatten(),

    changeSearchTerm: sources.DOM.select('#search')
      .events("input")
      .map(ev => ev.target.value)
      .startWith('')
  }

  const state = xs.combine(intents.apiResponse, intents.changeSearchTerm)
    .map(([res, searchTerm]) => {
      return [res.body.results, searchTerm];
    })
    .startWith([[{name: 'Loading'}], ''])

  return {
    state: state,
    DOM: view(state),
    HTTP: intents.changeSearchTerm .map( searchTerm => {
      return {
        url: 'https://swapi.co/api/people/?search=' + searchTerm,
        category: 'api',
      }
    })
  };
}

function view(state) {  
  return state.map(([res, searchTerm]) => {

    console.log(searchTerm);

    const list = res.map( character => {
      return p(character.name);
    });

    return div([
    input("#search", {type: "text", value: searchTerm, autocomplete: "off"}),
    div(list)
   ]);

  });
  

  
}


