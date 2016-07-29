import { Stream } from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, header, h1, span, img, h2, h3, h4, p, main, article, a, i, nav, button, footer, makeDOMDriver, VNode } from '@cycle/dom';
import { Sources, Sinks, DevdayEvent, Author } from './definitions';
import { CHENNAI_ADDRESS, BANGALORE_ADDRESS } from './data/events';

const nouns = ['experiences', 'ideas', 'opinions', 'perspectives'];
const topics = ['technology', 'internet of things', 'cloud computing', 'arduino', 'databases'];

function topEvents(events: DevdayEvent[]): DevdayEvent[] {
  const chennaiEvent =
    events
      .filter(ev => ev.venue === CHENNAI_ADDRESS)
      .sort((a, b) => b.event_time.start_time.getTime() - a.event_time.start_time.getTime())
      .shift();
  const bangaloreEvent =
    events
      .filter(ev => ev.venue === BANGALORE_ADDRESS)
      .sort((a, b) => b.event_time.start_time.getTime() - a.event_time.start_time.getTime())
      .shift();
  return [bangaloreEvent, chennaiEvent];
}

function renderTopEvent(event: DevdayEvent): VNode {
  return article('.upcoming.event.card', [
    div('.info', [
      h4([event.event_time.start_time.toDateString()]),
      h3([event.title]),
      p([event.abstract]),
    ]),
    div('.speakers',
      [].concat.apply([], event.agenda.filter(entry => Boolean(entry.authors) && Boolean(entry.authors.length)).map(entry => entry.authors))
        .map((speaker: Author) => img('.avatar', { props: { src: speaker.image_url } }))
    ),
    div('.secondary.info', [
      div('.location'),
      div('.attending')
    ]),
    a('.go.to.event.button', { props: { title: 'go to event' } }, [
      span('.hidden', 'go to event'),
      i('.material-icons', 'keyboard_arrow_right')
    ])
  ]);
}

function home(sources: Sources): Sinks {
  const xs = Stream;
  const route$ = sources.routes.route$;
  const events$ = sources.events.events$;
  const noun$ = xs.periodic(1000)
    .startWith(0)
    .map(x => x % nouns.length)
    .map(i => nouns[i]);
  const topic$ = xs.periodic(3000)
    .startWith(0)
    .map(x => x % topics.length)
    .map(i => topics[i]);
  const currentDate = new Date();
  const vtree$ =
    route$
      .map(url =>
        xs.combine(noun$, topic$, events$)
          .filter(() => url === '')
          .map(([noun, topic, events]) =>
            div('.devday.home', [
              div('.container', [
                div('.layout', [
                  div('.content', [
                    header([
                      h1([
                        span('.hidden', 'devday_'),
                        img({ props: { src: 'images/logo.gif' } })
                      ]),
                      h2([
                        'a monthly informal event for developers to share their ',
                        span('.noun', noun),
                        ' about ',
                        span('.topic', topic)
                      ])
                    ]),
                    main([
                      ...topEvents(events).map(renderTopEvent),
                      nav([
                        a({ props: { href: '#/archive', title: 'view all previous events' } }, [
                          'More',
                          button([
                            i('.material-icons', { props: { role: 'presentation' } }, 'arrow_forward')
                          ])
                        ])
                      ])
                    ]),
                    footer([
                      div('.left.section', [
                        button('.twitter.social.button', [
                          span('.hidden', 'twitter')
                        ]),
                        button('.facebook.social.button', [
                          span('.hidden', 'facebook')
                        ]),
                        button('.google.plus.social.button', [
                          span('.hidden', 'google plus')
                        ])
                      ]),
                      div('.right.section', [
                        button('.share.social.button', [
                          i('.material-icons', { props: { role: 'presentation' } }, 'share'),
                          span('.hidden', 'share')
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          )
      ).flatten();

  return {
    dom: vtree$,
    events: xs.empty(),
    routes: xs.empty()
  };
}

export default home;
