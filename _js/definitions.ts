import { DOMSource } from '@cycle/dom/xstream-typings';
import { RoutesSource } from './router';
import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';

export interface Sources {
  dom: DOMSource;
  routes: RoutesSource;
}

export interface Sinks {
  dom: Stream<VNode>;
  routes: Stream<string>;
}

export interface EventTime {
  start_time: Date;
  end_time?: Date;
}

export interface Address {
  line_one: string;
  line_two?: string;
  landmark?: string;
  locality?: string;
  city: string;
  zip: number;
}

export enum AgendaEntryType {
  Talk,
  Break,
  Workshop
}

export interface Author {
  name: string;
  twitter_handle: string;
  github_username: string;
  facebook_username: string;
  linkedin_profile_url: string;
  image_url: string;
}

export interface AgendaEntry {
  type: AgendaEntryType;
  title: string;
  authors: Author[];
  time: EventTime;
  abstract: string;
}

export interface DevdayEvent {
  title: string;
  url: string;
  categories: string[];
  tags: string[];
  author: string;
  abstract: string;
  event_time: EventTime;
  publish_time: Date;
  registration_time: EventTime;
  venue: Address;
  agenda: AgendaEntry[];
}
