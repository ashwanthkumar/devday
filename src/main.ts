import { Sources, Sinks } from './definitions';
import home from './home';
import event from './event';
import xs from 'xstream';

function main(sources: Sources): Sinks {
  const homeSinks = home(sources);
  const eventSinks = event(sources);
  const vdom$ = xs.merge(homeSinks.dom, eventSinks.dom);
  const route$ = xs.merge(homeSinks.routes, eventSinks.routes);
  const event$ = xs.merge(homeSinks.events, eventSinks.events);
  const prevent$ = xs.merge(homeSinks.prevent, eventSinks.prevent);
  return {
    dom: vdom$,
    routes: route$,
    events: event$,
    prevent: prevent$
  };
}

export default main;
