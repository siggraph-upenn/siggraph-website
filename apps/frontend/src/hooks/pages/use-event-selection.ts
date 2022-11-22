import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import { EventData, StrapiCollection, StrapiItem } from 'lib/types'

export type UseEventSelectionReturn = {
  setEventSlug: (slug: string) => void
} & (
  | {
      empty: false
      currentEvent: StrapiItem<EventData>
      prevEvents: StrapiItem<EventData>[]
      nextEvents: StrapiItem<EventData>[]
      eventSlug: string
    }
  | {
      empty: true
      currentEvent: undefined
      prevEvents: undefined
      nextEvents: undefined
      eventSlug: undefined
    }
)

export const useEventSelection = ({
  events,
}: {
  events: StrapiCollection<EventData>
}) => {
  // specified event from memo
  const {
    query: { slug: querySlug },
    replace,
  } = useRouter()

  // if we have no events
  const empty = events.length === 0

  // find next upcoming event
  const nextUpcomingEventSlug = useMemo(
    () =>
      empty
        ? null
        : events.reduce((prev, curr) => {
            const currDate = new Date(curr.attributes.start)
            return currDate > new Date() ? curr.attributes.slug : prev
          }, events[events.length - 1].attributes.slug),
    [events, empty]
  )

  // get event slug from query, or next upcoming
  const eventSlug = useMemo(() => {
    if (querySlug === undefined) {
      return nextUpcomingEventSlug
    }
    if (typeof querySlug === 'string') {
      return querySlug
    }
    return querySlug.join('')
  }, [nextUpcomingEventSlug, querySlug])

  // get event index
  const eventIndex = useMemo(() => {
    if (empty) {
      return undefined
    }
    const index = events.findIndex(
      ({ attributes: { slug } }) => slug === eventSlug
    )
    if (index === -1) {
      return events.findIndex(
        ({ attributes: { slug } }) => slug === nextUpcomingEventSlug
      )
    }
    return index
  }, [eventSlug, events, nextUpcomingEventSlug, empty])

  // set new slug
  const setEventSlug = useCallback(
    (slug: string) => {
      replace({ query: { slug } })
    },
    [replace]
  )

  const prevEvents = useMemo(
    () => (empty ? undefined : events.slice(0, eventIndex as number)),
    [events, eventIndex, empty]
  )
  const currentEvent = useMemo(
    () => (empty ? undefined : events[eventIndex as number]),
    [events, eventIndex, empty]
  )
  const nextEvents = useMemo(
    () => (empty ? undefined : events.slice((eventIndex as number) + 1)),
    [events, eventIndex, empty]
  )

  return {
    empty,
    currentEvent,
    prevEvents,
    nextEvents,
    eventSlug,
    setEventSlug,
  } as UseEventSelectionReturn
}
