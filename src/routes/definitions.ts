import { Sources, Sinks } from '../definitions';

export interface RouteResolution {
  path?: string;
  component: (sources: Sources) => Sinks;
  sources?: any;
}

export interface RouteDefinitions extends Object {
    [path: string]: RouteDefinitions | any;
}

