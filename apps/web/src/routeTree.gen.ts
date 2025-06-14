/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutSearchImport } from './routes/_layout/search'
import { Route as LayoutTvShowsTopRatedImport } from './routes/_layout/tv-shows.top-rated'
import { Route as LayoutTvShowsPopularImport } from './routes/_layout/tv-shows.popular'
import { Route as LayoutTvShowsIdImport } from './routes/_layout/tv-shows.$id'
import { Route as LayoutTrendingTvShowsImport } from './routes/_layout/trending.tv-shows'
import { Route as LayoutTrendingPeopleImport } from './routes/_layout/trending.people'
import { Route as LayoutTrendingMoviesImport } from './routes/_layout/trending.movies'
import { Route as LayoutPeoplePopularImport } from './routes/_layout/people.popular'
import { Route as LayoutPeopleIdImport } from './routes/_layout/people.$id'
import { Route as LayoutMoviesTopRatedImport } from './routes/_layout/movies.top-rated'
import { Route as LayoutMoviesPopularImport } from './routes/_layout/movies.popular'
import { Route as LayoutMoviesIdImport } from './routes/_layout/movies.$id'
import { Route as LayoutTvShowsIdIndexImport } from './routes/_layout/tv-shows.$id.index'
import { Route as LayoutPeopleIdIndexImport } from './routes/_layout/people.$id.index'
import { Route as LayoutMoviesIdIndexImport } from './routes/_layout/movies.$id.index'
import { Route as LayoutTvShowsDiscoverLayoutImport } from './routes/_layout/tv-shows.discover._layout'
import { Route as LayoutTvShowsIdWatchImport } from './routes/_layout/tv-shows.$id.watch'
import { Route as LayoutTvShowsIdTrailerImport } from './routes/_layout/tv-shows.$id.trailer'
import { Route as LayoutTvShowsIdSimilarImport } from './routes/_layout/tv-shows.$id.similar'
import { Route as LayoutTvShowsIdCreditsImport } from './routes/_layout/tv-shows.$id.credits'
import { Route as LayoutMoviesDiscoverLayoutImport } from './routes/_layout/movies.discover._layout'
import { Route as LayoutMoviesIdWatchImport } from './routes/_layout/movies.$id.watch'
import { Route as LayoutMoviesIdTrailerImport } from './routes/_layout/movies.$id.trailer'
import { Route as LayoutMoviesIdSimilarImport } from './routes/_layout/movies.$id.similar'
import { Route as LayoutMoviesIdCreditsImport } from './routes/_layout/movies.$id.credits'
import { Route as LayoutTvShowsDiscoverLayoutIndexImport } from './routes/_layout/tv-shows.discover._layout.index'
import { Route as LayoutMoviesDiscoverLayoutIndexImport } from './routes/_layout/movies.discover._layout.index'

// Create Virtual Routes

const LayoutTvShowsDiscoverImport = createFileRoute(
  '/_layout/tv-shows/discover',
)()
const LayoutMoviesDiscoverImport = createFileRoute('/_layout/movies/discover')()

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSearchRoute = LayoutSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTvShowsDiscoverRoute = LayoutTvShowsDiscoverImport.update({
  id: '/tv-shows/discover',
  path: '/tv-shows/discover',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMoviesDiscoverRoute = LayoutMoviesDiscoverImport.update({
  id: '/movies/discover',
  path: '/movies/discover',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTvShowsTopRatedRoute = LayoutTvShowsTopRatedImport.update({
  id: '/tv-shows/top-rated',
  path: '/tv-shows/top-rated',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTvShowsPopularRoute = LayoutTvShowsPopularImport.update({
  id: '/tv-shows/popular',
  path: '/tv-shows/popular',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTvShowsIdRoute = LayoutTvShowsIdImport.update({
  id: '/tv-shows/$id',
  path: '/tv-shows/$id',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTrendingTvShowsRoute = LayoutTrendingTvShowsImport.update({
  id: '/trending/tv-shows',
  path: '/trending/tv-shows',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTrendingPeopleRoute = LayoutTrendingPeopleImport.update({
  id: '/trending/people',
  path: '/trending/people',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTrendingMoviesRoute = LayoutTrendingMoviesImport.update({
  id: '/trending/movies',
  path: '/trending/movies',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPeoplePopularRoute = LayoutPeoplePopularImport.update({
  id: '/people/popular',
  path: '/people/popular',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPeopleIdRoute = LayoutPeopleIdImport.update({
  id: '/people/$id',
  path: '/people/$id',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMoviesTopRatedRoute = LayoutMoviesTopRatedImport.update({
  id: '/movies/top-rated',
  path: '/movies/top-rated',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMoviesPopularRoute = LayoutMoviesPopularImport.update({
  id: '/movies/popular',
  path: '/movies/popular',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMoviesIdRoute = LayoutMoviesIdImport.update({
  id: '/movies/$id',
  path: '/movies/$id',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTvShowsIdIndexRoute = LayoutTvShowsIdIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutTvShowsIdRoute,
} as any)

const LayoutPeopleIdIndexRoute = LayoutPeopleIdIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutPeopleIdRoute,
} as any)

const LayoutMoviesIdIndexRoute = LayoutMoviesIdIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutMoviesIdRoute,
} as any)

const LayoutTvShowsDiscoverLayoutRoute =
  LayoutTvShowsDiscoverLayoutImport.update({
    id: '/_layout',
    getParentRoute: () => LayoutTvShowsDiscoverRoute,
  } as any)

const LayoutTvShowsIdWatchRoute = LayoutTvShowsIdWatchImport.update({
  id: '/watch',
  path: '/watch',
  getParentRoute: () => LayoutTvShowsIdRoute,
} as any)

const LayoutTvShowsIdTrailerRoute = LayoutTvShowsIdTrailerImport.update({
  id: '/trailer',
  path: '/trailer',
  getParentRoute: () => LayoutTvShowsIdRoute,
} as any)

const LayoutTvShowsIdSimilarRoute = LayoutTvShowsIdSimilarImport.update({
  id: '/similar',
  path: '/similar',
  getParentRoute: () => LayoutTvShowsIdRoute,
} as any)

const LayoutTvShowsIdCreditsRoute = LayoutTvShowsIdCreditsImport.update({
  id: '/credits',
  path: '/credits',
  getParentRoute: () => LayoutTvShowsIdRoute,
} as any)

const LayoutMoviesDiscoverLayoutRoute = LayoutMoviesDiscoverLayoutImport.update(
  {
    id: '/_layout',
    getParentRoute: () => LayoutMoviesDiscoverRoute,
  } as any,
)

const LayoutMoviesIdWatchRoute = LayoutMoviesIdWatchImport.update({
  id: '/watch',
  path: '/watch',
  getParentRoute: () => LayoutMoviesIdRoute,
} as any)

const LayoutMoviesIdTrailerRoute = LayoutMoviesIdTrailerImport.update({
  id: '/trailer',
  path: '/trailer',
  getParentRoute: () => LayoutMoviesIdRoute,
} as any)

const LayoutMoviesIdSimilarRoute = LayoutMoviesIdSimilarImport.update({
  id: '/similar',
  path: '/similar',
  getParentRoute: () => LayoutMoviesIdRoute,
} as any)

const LayoutMoviesIdCreditsRoute = LayoutMoviesIdCreditsImport.update({
  id: '/credits',
  path: '/credits',
  getParentRoute: () => LayoutMoviesIdRoute,
} as any)

const LayoutTvShowsDiscoverLayoutIndexRoute =
  LayoutTvShowsDiscoverLayoutIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => LayoutTvShowsDiscoverLayoutRoute,
  } as any)

const LayoutMoviesDiscoverLayoutIndexRoute =
  LayoutMoviesDiscoverLayoutIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => LayoutMoviesDiscoverLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/search': {
      id: '/_layout/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof LayoutSearchImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/movies/$id': {
      id: '/_layout/movies/$id'
      path: '/movies/$id'
      fullPath: '/movies/$id'
      preLoaderRoute: typeof LayoutMoviesIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/movies/popular': {
      id: '/_layout/movies/popular'
      path: '/movies/popular'
      fullPath: '/movies/popular'
      preLoaderRoute: typeof LayoutMoviesPopularImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/movies/top-rated': {
      id: '/_layout/movies/top-rated'
      path: '/movies/top-rated'
      fullPath: '/movies/top-rated'
      preLoaderRoute: typeof LayoutMoviesTopRatedImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/people/$id': {
      id: '/_layout/people/$id'
      path: '/people/$id'
      fullPath: '/people/$id'
      preLoaderRoute: typeof LayoutPeopleIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/people/popular': {
      id: '/_layout/people/popular'
      path: '/people/popular'
      fullPath: '/people/popular'
      preLoaderRoute: typeof LayoutPeoplePopularImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/trending/movies': {
      id: '/_layout/trending/movies'
      path: '/trending/movies'
      fullPath: '/trending/movies'
      preLoaderRoute: typeof LayoutTrendingMoviesImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/trending/people': {
      id: '/_layout/trending/people'
      path: '/trending/people'
      fullPath: '/trending/people'
      preLoaderRoute: typeof LayoutTrendingPeopleImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/trending/tv-shows': {
      id: '/_layout/trending/tv-shows'
      path: '/trending/tv-shows'
      fullPath: '/trending/tv-shows'
      preLoaderRoute: typeof LayoutTrendingTvShowsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/tv-shows/$id': {
      id: '/_layout/tv-shows/$id'
      path: '/tv-shows/$id'
      fullPath: '/tv-shows/$id'
      preLoaderRoute: typeof LayoutTvShowsIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/tv-shows/popular': {
      id: '/_layout/tv-shows/popular'
      path: '/tv-shows/popular'
      fullPath: '/tv-shows/popular'
      preLoaderRoute: typeof LayoutTvShowsPopularImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/tv-shows/top-rated': {
      id: '/_layout/tv-shows/top-rated'
      path: '/tv-shows/top-rated'
      fullPath: '/tv-shows/top-rated'
      preLoaderRoute: typeof LayoutTvShowsTopRatedImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/movies/$id/credits': {
      id: '/_layout/movies/$id/credits'
      path: '/credits'
      fullPath: '/movies/$id/credits'
      preLoaderRoute: typeof LayoutMoviesIdCreditsImport
      parentRoute: typeof LayoutMoviesIdImport
    }
    '/_layout/movies/$id/similar': {
      id: '/_layout/movies/$id/similar'
      path: '/similar'
      fullPath: '/movies/$id/similar'
      preLoaderRoute: typeof LayoutMoviesIdSimilarImport
      parentRoute: typeof LayoutMoviesIdImport
    }
    '/_layout/movies/$id/trailer': {
      id: '/_layout/movies/$id/trailer'
      path: '/trailer'
      fullPath: '/movies/$id/trailer'
      preLoaderRoute: typeof LayoutMoviesIdTrailerImport
      parentRoute: typeof LayoutMoviesIdImport
    }
    '/_layout/movies/$id/watch': {
      id: '/_layout/movies/$id/watch'
      path: '/watch'
      fullPath: '/movies/$id/watch'
      preLoaderRoute: typeof LayoutMoviesIdWatchImport
      parentRoute: typeof LayoutMoviesIdImport
    }
    '/_layout/movies/discover': {
      id: '/_layout/movies/discover'
      path: '/movies/discover'
      fullPath: '/movies/discover'
      preLoaderRoute: typeof LayoutMoviesDiscoverImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/movies/discover/_layout': {
      id: '/_layout/movies/discover/_layout'
      path: '/movies/discover'
      fullPath: '/movies/discover'
      preLoaderRoute: typeof LayoutMoviesDiscoverLayoutImport
      parentRoute: typeof LayoutMoviesDiscoverRoute
    }
    '/_layout/tv-shows/$id/credits': {
      id: '/_layout/tv-shows/$id/credits'
      path: '/credits'
      fullPath: '/tv-shows/$id/credits'
      preLoaderRoute: typeof LayoutTvShowsIdCreditsImport
      parentRoute: typeof LayoutTvShowsIdImport
    }
    '/_layout/tv-shows/$id/similar': {
      id: '/_layout/tv-shows/$id/similar'
      path: '/similar'
      fullPath: '/tv-shows/$id/similar'
      preLoaderRoute: typeof LayoutTvShowsIdSimilarImport
      parentRoute: typeof LayoutTvShowsIdImport
    }
    '/_layout/tv-shows/$id/trailer': {
      id: '/_layout/tv-shows/$id/trailer'
      path: '/trailer'
      fullPath: '/tv-shows/$id/trailer'
      preLoaderRoute: typeof LayoutTvShowsIdTrailerImport
      parentRoute: typeof LayoutTvShowsIdImport
    }
    '/_layout/tv-shows/$id/watch': {
      id: '/_layout/tv-shows/$id/watch'
      path: '/watch'
      fullPath: '/tv-shows/$id/watch'
      preLoaderRoute: typeof LayoutTvShowsIdWatchImport
      parentRoute: typeof LayoutTvShowsIdImport
    }
    '/_layout/tv-shows/discover': {
      id: '/_layout/tv-shows/discover'
      path: '/tv-shows/discover'
      fullPath: '/tv-shows/discover'
      preLoaderRoute: typeof LayoutTvShowsDiscoverImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/tv-shows/discover/_layout': {
      id: '/_layout/tv-shows/discover/_layout'
      path: '/tv-shows/discover'
      fullPath: '/tv-shows/discover'
      preLoaderRoute: typeof LayoutTvShowsDiscoverLayoutImport
      parentRoute: typeof LayoutTvShowsDiscoverRoute
    }
    '/_layout/movies/$id/': {
      id: '/_layout/movies/$id/'
      path: '/'
      fullPath: '/movies/$id/'
      preLoaderRoute: typeof LayoutMoviesIdIndexImport
      parentRoute: typeof LayoutMoviesIdImport
    }
    '/_layout/people/$id/': {
      id: '/_layout/people/$id/'
      path: '/'
      fullPath: '/people/$id/'
      preLoaderRoute: typeof LayoutPeopleIdIndexImport
      parentRoute: typeof LayoutPeopleIdImport
    }
    '/_layout/tv-shows/$id/': {
      id: '/_layout/tv-shows/$id/'
      path: '/'
      fullPath: '/tv-shows/$id/'
      preLoaderRoute: typeof LayoutTvShowsIdIndexImport
      parentRoute: typeof LayoutTvShowsIdImport
    }
    '/_layout/movies/discover/_layout/': {
      id: '/_layout/movies/discover/_layout/'
      path: '/'
      fullPath: '/movies/discover/'
      preLoaderRoute: typeof LayoutMoviesDiscoverLayoutIndexImport
      parentRoute: typeof LayoutMoviesDiscoverLayoutImport
    }
    '/_layout/tv-shows/discover/_layout/': {
      id: '/_layout/tv-shows/discover/_layout/'
      path: '/'
      fullPath: '/tv-shows/discover/'
      preLoaderRoute: typeof LayoutTvShowsDiscoverLayoutIndexImport
      parentRoute: typeof LayoutTvShowsDiscoverLayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutMoviesIdRouteChildren {
  LayoutMoviesIdCreditsRoute: typeof LayoutMoviesIdCreditsRoute
  LayoutMoviesIdSimilarRoute: typeof LayoutMoviesIdSimilarRoute
  LayoutMoviesIdTrailerRoute: typeof LayoutMoviesIdTrailerRoute
  LayoutMoviesIdWatchRoute: typeof LayoutMoviesIdWatchRoute
  LayoutMoviesIdIndexRoute: typeof LayoutMoviesIdIndexRoute
}

const LayoutMoviesIdRouteChildren: LayoutMoviesIdRouteChildren = {
  LayoutMoviesIdCreditsRoute: LayoutMoviesIdCreditsRoute,
  LayoutMoviesIdSimilarRoute: LayoutMoviesIdSimilarRoute,
  LayoutMoviesIdTrailerRoute: LayoutMoviesIdTrailerRoute,
  LayoutMoviesIdWatchRoute: LayoutMoviesIdWatchRoute,
  LayoutMoviesIdIndexRoute: LayoutMoviesIdIndexRoute,
}

const LayoutMoviesIdRouteWithChildren = LayoutMoviesIdRoute._addFileChildren(
  LayoutMoviesIdRouteChildren,
)

interface LayoutPeopleIdRouteChildren {
  LayoutPeopleIdIndexRoute: typeof LayoutPeopleIdIndexRoute
}

const LayoutPeopleIdRouteChildren: LayoutPeopleIdRouteChildren = {
  LayoutPeopleIdIndexRoute: LayoutPeopleIdIndexRoute,
}

const LayoutPeopleIdRouteWithChildren = LayoutPeopleIdRoute._addFileChildren(
  LayoutPeopleIdRouteChildren,
)

interface LayoutTvShowsIdRouteChildren {
  LayoutTvShowsIdCreditsRoute: typeof LayoutTvShowsIdCreditsRoute
  LayoutTvShowsIdSimilarRoute: typeof LayoutTvShowsIdSimilarRoute
  LayoutTvShowsIdTrailerRoute: typeof LayoutTvShowsIdTrailerRoute
  LayoutTvShowsIdWatchRoute: typeof LayoutTvShowsIdWatchRoute
  LayoutTvShowsIdIndexRoute: typeof LayoutTvShowsIdIndexRoute
}

const LayoutTvShowsIdRouteChildren: LayoutTvShowsIdRouteChildren = {
  LayoutTvShowsIdCreditsRoute: LayoutTvShowsIdCreditsRoute,
  LayoutTvShowsIdSimilarRoute: LayoutTvShowsIdSimilarRoute,
  LayoutTvShowsIdTrailerRoute: LayoutTvShowsIdTrailerRoute,
  LayoutTvShowsIdWatchRoute: LayoutTvShowsIdWatchRoute,
  LayoutTvShowsIdIndexRoute: LayoutTvShowsIdIndexRoute,
}

const LayoutTvShowsIdRouteWithChildren = LayoutTvShowsIdRoute._addFileChildren(
  LayoutTvShowsIdRouteChildren,
)

interface LayoutMoviesDiscoverLayoutRouteChildren {
  LayoutMoviesDiscoverLayoutIndexRoute: typeof LayoutMoviesDiscoverLayoutIndexRoute
}

const LayoutMoviesDiscoverLayoutRouteChildren: LayoutMoviesDiscoverLayoutRouteChildren =
  {
    LayoutMoviesDiscoverLayoutIndexRoute: LayoutMoviesDiscoverLayoutIndexRoute,
  }

const LayoutMoviesDiscoverLayoutRouteWithChildren =
  LayoutMoviesDiscoverLayoutRoute._addFileChildren(
    LayoutMoviesDiscoverLayoutRouteChildren,
  )

interface LayoutMoviesDiscoverRouteChildren {
  LayoutMoviesDiscoverLayoutRoute: typeof LayoutMoviesDiscoverLayoutRouteWithChildren
}

const LayoutMoviesDiscoverRouteChildren: LayoutMoviesDiscoverRouteChildren = {
  LayoutMoviesDiscoverLayoutRoute: LayoutMoviesDiscoverLayoutRouteWithChildren,
}

const LayoutMoviesDiscoverRouteWithChildren =
  LayoutMoviesDiscoverRoute._addFileChildren(LayoutMoviesDiscoverRouteChildren)

interface LayoutTvShowsDiscoverLayoutRouteChildren {
  LayoutTvShowsDiscoverLayoutIndexRoute: typeof LayoutTvShowsDiscoverLayoutIndexRoute
}

const LayoutTvShowsDiscoverLayoutRouteChildren: LayoutTvShowsDiscoverLayoutRouteChildren =
  {
    LayoutTvShowsDiscoverLayoutIndexRoute:
      LayoutTvShowsDiscoverLayoutIndexRoute,
  }

const LayoutTvShowsDiscoverLayoutRouteWithChildren =
  LayoutTvShowsDiscoverLayoutRoute._addFileChildren(
    LayoutTvShowsDiscoverLayoutRouteChildren,
  )

interface LayoutTvShowsDiscoverRouteChildren {
  LayoutTvShowsDiscoverLayoutRoute: typeof LayoutTvShowsDiscoverLayoutRouteWithChildren
}

const LayoutTvShowsDiscoverRouteChildren: LayoutTvShowsDiscoverRouteChildren = {
  LayoutTvShowsDiscoverLayoutRoute:
    LayoutTvShowsDiscoverLayoutRouteWithChildren,
}

const LayoutTvShowsDiscoverRouteWithChildren =
  LayoutTvShowsDiscoverRoute._addFileChildren(
    LayoutTvShowsDiscoverRouteChildren,
  )

interface LayoutRouteChildren {
  LayoutSearchRoute: typeof LayoutSearchRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutMoviesIdRoute: typeof LayoutMoviesIdRouteWithChildren
  LayoutMoviesPopularRoute: typeof LayoutMoviesPopularRoute
  LayoutMoviesTopRatedRoute: typeof LayoutMoviesTopRatedRoute
  LayoutPeopleIdRoute: typeof LayoutPeopleIdRouteWithChildren
  LayoutPeoplePopularRoute: typeof LayoutPeoplePopularRoute
  LayoutTrendingMoviesRoute: typeof LayoutTrendingMoviesRoute
  LayoutTrendingPeopleRoute: typeof LayoutTrendingPeopleRoute
  LayoutTrendingTvShowsRoute: typeof LayoutTrendingTvShowsRoute
  LayoutTvShowsIdRoute: typeof LayoutTvShowsIdRouteWithChildren
  LayoutTvShowsPopularRoute: typeof LayoutTvShowsPopularRoute
  LayoutTvShowsTopRatedRoute: typeof LayoutTvShowsTopRatedRoute
  LayoutMoviesDiscoverRoute: typeof LayoutMoviesDiscoverRouteWithChildren
  LayoutTvShowsDiscoverRoute: typeof LayoutTvShowsDiscoverRouteWithChildren
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutSearchRoute: LayoutSearchRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutMoviesIdRoute: LayoutMoviesIdRouteWithChildren,
  LayoutMoviesPopularRoute: LayoutMoviesPopularRoute,
  LayoutMoviesTopRatedRoute: LayoutMoviesTopRatedRoute,
  LayoutPeopleIdRoute: LayoutPeopleIdRouteWithChildren,
  LayoutPeoplePopularRoute: LayoutPeoplePopularRoute,
  LayoutTrendingMoviesRoute: LayoutTrendingMoviesRoute,
  LayoutTrendingPeopleRoute: LayoutTrendingPeopleRoute,
  LayoutTrendingTvShowsRoute: LayoutTrendingTvShowsRoute,
  LayoutTvShowsIdRoute: LayoutTvShowsIdRouteWithChildren,
  LayoutTvShowsPopularRoute: LayoutTvShowsPopularRoute,
  LayoutTvShowsTopRatedRoute: LayoutTvShowsTopRatedRoute,
  LayoutMoviesDiscoverRoute: LayoutMoviesDiscoverRouteWithChildren,
  LayoutTvShowsDiscoverRoute: LayoutTvShowsDiscoverRouteWithChildren,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/movies/$id': typeof LayoutMoviesIdRouteWithChildren
  '/movies/popular': typeof LayoutMoviesPopularRoute
  '/movies/top-rated': typeof LayoutMoviesTopRatedRoute
  '/people/$id': typeof LayoutPeopleIdRouteWithChildren
  '/people/popular': typeof LayoutPeoplePopularRoute
  '/trending/movies': typeof LayoutTrendingMoviesRoute
  '/trending/people': typeof LayoutTrendingPeopleRoute
  '/trending/tv-shows': typeof LayoutTrendingTvShowsRoute
  '/tv-shows/$id': typeof LayoutTvShowsIdRouteWithChildren
  '/tv-shows/popular': typeof LayoutTvShowsPopularRoute
  '/tv-shows/top-rated': typeof LayoutTvShowsTopRatedRoute
  '/movies/$id/credits': typeof LayoutMoviesIdCreditsRoute
  '/movies/$id/similar': typeof LayoutMoviesIdSimilarRoute
  '/movies/$id/trailer': typeof LayoutMoviesIdTrailerRoute
  '/movies/$id/watch': typeof LayoutMoviesIdWatchRoute
  '/movies/discover': typeof LayoutMoviesDiscoverLayoutRouteWithChildren
  '/tv-shows/$id/credits': typeof LayoutTvShowsIdCreditsRoute
  '/tv-shows/$id/similar': typeof LayoutTvShowsIdSimilarRoute
  '/tv-shows/$id/trailer': typeof LayoutTvShowsIdTrailerRoute
  '/tv-shows/$id/watch': typeof LayoutTvShowsIdWatchRoute
  '/tv-shows/discover': typeof LayoutTvShowsDiscoverLayoutRouteWithChildren
  '/movies/$id/': typeof LayoutMoviesIdIndexRoute
  '/people/$id/': typeof LayoutPeopleIdIndexRoute
  '/tv-shows/$id/': typeof LayoutTvShowsIdIndexRoute
  '/movies/discover/': typeof LayoutMoviesDiscoverLayoutIndexRoute
  '/tv-shows/discover/': typeof LayoutTvShowsDiscoverLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/movies/popular': typeof LayoutMoviesPopularRoute
  '/movies/top-rated': typeof LayoutMoviesTopRatedRoute
  '/people/popular': typeof LayoutPeoplePopularRoute
  '/trending/movies': typeof LayoutTrendingMoviesRoute
  '/trending/people': typeof LayoutTrendingPeopleRoute
  '/trending/tv-shows': typeof LayoutTrendingTvShowsRoute
  '/tv-shows/popular': typeof LayoutTvShowsPopularRoute
  '/tv-shows/top-rated': typeof LayoutTvShowsTopRatedRoute
  '/movies/$id/credits': typeof LayoutMoviesIdCreditsRoute
  '/movies/$id/similar': typeof LayoutMoviesIdSimilarRoute
  '/movies/$id/trailer': typeof LayoutMoviesIdTrailerRoute
  '/movies/$id/watch': typeof LayoutMoviesIdWatchRoute
  '/movies/discover': typeof LayoutMoviesDiscoverLayoutIndexRoute
  '/tv-shows/$id/credits': typeof LayoutTvShowsIdCreditsRoute
  '/tv-shows/$id/similar': typeof LayoutTvShowsIdSimilarRoute
  '/tv-shows/$id/trailer': typeof LayoutTvShowsIdTrailerRoute
  '/tv-shows/$id/watch': typeof LayoutTvShowsIdWatchRoute
  '/tv-shows/discover': typeof LayoutTvShowsDiscoverLayoutIndexRoute
  '/movies/$id': typeof LayoutMoviesIdIndexRoute
  '/people/$id': typeof LayoutPeopleIdIndexRoute
  '/tv-shows/$id': typeof LayoutTvShowsIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/search': typeof LayoutSearchRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/movies/$id': typeof LayoutMoviesIdRouteWithChildren
  '/_layout/movies/popular': typeof LayoutMoviesPopularRoute
  '/_layout/movies/top-rated': typeof LayoutMoviesTopRatedRoute
  '/_layout/people/$id': typeof LayoutPeopleIdRouteWithChildren
  '/_layout/people/popular': typeof LayoutPeoplePopularRoute
  '/_layout/trending/movies': typeof LayoutTrendingMoviesRoute
  '/_layout/trending/people': typeof LayoutTrendingPeopleRoute
  '/_layout/trending/tv-shows': typeof LayoutTrendingTvShowsRoute
  '/_layout/tv-shows/$id': typeof LayoutTvShowsIdRouteWithChildren
  '/_layout/tv-shows/popular': typeof LayoutTvShowsPopularRoute
  '/_layout/tv-shows/top-rated': typeof LayoutTvShowsTopRatedRoute
  '/_layout/movies/$id/credits': typeof LayoutMoviesIdCreditsRoute
  '/_layout/movies/$id/similar': typeof LayoutMoviesIdSimilarRoute
  '/_layout/movies/$id/trailer': typeof LayoutMoviesIdTrailerRoute
  '/_layout/movies/$id/watch': typeof LayoutMoviesIdWatchRoute
  '/_layout/movies/discover': typeof LayoutMoviesDiscoverRouteWithChildren
  '/_layout/movies/discover/_layout': typeof LayoutMoviesDiscoverLayoutRouteWithChildren
  '/_layout/tv-shows/$id/credits': typeof LayoutTvShowsIdCreditsRoute
  '/_layout/tv-shows/$id/similar': typeof LayoutTvShowsIdSimilarRoute
  '/_layout/tv-shows/$id/trailer': typeof LayoutTvShowsIdTrailerRoute
  '/_layout/tv-shows/$id/watch': typeof LayoutTvShowsIdWatchRoute
  '/_layout/tv-shows/discover': typeof LayoutTvShowsDiscoverRouteWithChildren
  '/_layout/tv-shows/discover/_layout': typeof LayoutTvShowsDiscoverLayoutRouteWithChildren
  '/_layout/movies/$id/': typeof LayoutMoviesIdIndexRoute
  '/_layout/people/$id/': typeof LayoutPeopleIdIndexRoute
  '/_layout/tv-shows/$id/': typeof LayoutTvShowsIdIndexRoute
  '/_layout/movies/discover/_layout/': typeof LayoutMoviesDiscoverLayoutIndexRoute
  '/_layout/tv-shows/discover/_layout/': typeof LayoutTvShowsDiscoverLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/search'
    | '/'
    | '/movies/$id'
    | '/movies/popular'
    | '/movies/top-rated'
    | '/people/$id'
    | '/people/popular'
    | '/trending/movies'
    | '/trending/people'
    | '/trending/tv-shows'
    | '/tv-shows/$id'
    | '/tv-shows/popular'
    | '/tv-shows/top-rated'
    | '/movies/$id/credits'
    | '/movies/$id/similar'
    | '/movies/$id/trailer'
    | '/movies/$id/watch'
    | '/movies/discover'
    | '/tv-shows/$id/credits'
    | '/tv-shows/$id/similar'
    | '/tv-shows/$id/trailer'
    | '/tv-shows/$id/watch'
    | '/tv-shows/discover'
    | '/movies/$id/'
    | '/people/$id/'
    | '/tv-shows/$id/'
    | '/movies/discover/'
    | '/tv-shows/discover/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/search'
    | '/'
    | '/movies/popular'
    | '/movies/top-rated'
    | '/people/popular'
    | '/trending/movies'
    | '/trending/people'
    | '/trending/tv-shows'
    | '/tv-shows/popular'
    | '/tv-shows/top-rated'
    | '/movies/$id/credits'
    | '/movies/$id/similar'
    | '/movies/$id/trailer'
    | '/movies/$id/watch'
    | '/movies/discover'
    | '/tv-shows/$id/credits'
    | '/tv-shows/$id/similar'
    | '/tv-shows/$id/trailer'
    | '/tv-shows/$id/watch'
    | '/tv-shows/discover'
    | '/movies/$id'
    | '/people/$id'
    | '/tv-shows/$id'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/search'
    | '/_layout/'
    | '/_layout/movies/$id'
    | '/_layout/movies/popular'
    | '/_layout/movies/top-rated'
    | '/_layout/people/$id'
    | '/_layout/people/popular'
    | '/_layout/trending/movies'
    | '/_layout/trending/people'
    | '/_layout/trending/tv-shows'
    | '/_layout/tv-shows/$id'
    | '/_layout/tv-shows/popular'
    | '/_layout/tv-shows/top-rated'
    | '/_layout/movies/$id/credits'
    | '/_layout/movies/$id/similar'
    | '/_layout/movies/$id/trailer'
    | '/_layout/movies/$id/watch'
    | '/_layout/movies/discover'
    | '/_layout/movies/discover/_layout'
    | '/_layout/tv-shows/$id/credits'
    | '/_layout/tv-shows/$id/similar'
    | '/_layout/tv-shows/$id/trailer'
    | '/_layout/tv-shows/$id/watch'
    | '/_layout/tv-shows/discover'
    | '/_layout/tv-shows/discover/_layout'
    | '/_layout/movies/$id/'
    | '/_layout/people/$id/'
    | '/_layout/tv-shows/$id/'
    | '/_layout/movies/discover/_layout/'
    | '/_layout/tv-shows/discover/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/search",
        "/_layout/",
        "/_layout/movies/$id",
        "/_layout/movies/popular",
        "/_layout/movies/top-rated",
        "/_layout/people/$id",
        "/_layout/people/popular",
        "/_layout/trending/movies",
        "/_layout/trending/people",
        "/_layout/trending/tv-shows",
        "/_layout/tv-shows/$id",
        "/_layout/tv-shows/popular",
        "/_layout/tv-shows/top-rated",
        "/_layout/movies/discover",
        "/_layout/tv-shows/discover"
      ]
    },
    "/_layout/search": {
      "filePath": "_layout/search.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/movies/$id": {
      "filePath": "_layout/movies.$id.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/movies/$id/credits",
        "/_layout/movies/$id/similar",
        "/_layout/movies/$id/trailer",
        "/_layout/movies/$id/watch",
        "/_layout/movies/$id/"
      ]
    },
    "/_layout/movies/popular": {
      "filePath": "_layout/movies.popular.tsx",
      "parent": "/_layout"
    },
    "/_layout/movies/top-rated": {
      "filePath": "_layout/movies.top-rated.tsx",
      "parent": "/_layout"
    },
    "/_layout/people/$id": {
      "filePath": "_layout/people.$id.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/people/$id/"
      ]
    },
    "/_layout/people/popular": {
      "filePath": "_layout/people.popular.tsx",
      "parent": "/_layout"
    },
    "/_layout/trending/movies": {
      "filePath": "_layout/trending.movies.tsx",
      "parent": "/_layout"
    },
    "/_layout/trending/people": {
      "filePath": "_layout/trending.people.tsx",
      "parent": "/_layout"
    },
    "/_layout/trending/tv-shows": {
      "filePath": "_layout/trending.tv-shows.tsx",
      "parent": "/_layout"
    },
    "/_layout/tv-shows/$id": {
      "filePath": "_layout/tv-shows.$id.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/tv-shows/$id/credits",
        "/_layout/tv-shows/$id/similar",
        "/_layout/tv-shows/$id/trailer",
        "/_layout/tv-shows/$id/watch",
        "/_layout/tv-shows/$id/"
      ]
    },
    "/_layout/tv-shows/popular": {
      "filePath": "_layout/tv-shows.popular.tsx",
      "parent": "/_layout"
    },
    "/_layout/tv-shows/top-rated": {
      "filePath": "_layout/tv-shows.top-rated.tsx",
      "parent": "/_layout"
    },
    "/_layout/movies/$id/credits": {
      "filePath": "_layout/movies.$id.credits.tsx",
      "parent": "/_layout/movies/$id"
    },
    "/_layout/movies/$id/similar": {
      "filePath": "_layout/movies.$id.similar.tsx",
      "parent": "/_layout/movies/$id"
    },
    "/_layout/movies/$id/trailer": {
      "filePath": "_layout/movies.$id.trailer.tsx",
      "parent": "/_layout/movies/$id"
    },
    "/_layout/movies/$id/watch": {
      "filePath": "_layout/movies.$id.watch.tsx",
      "parent": "/_layout/movies/$id"
    },
    "/_layout/movies/discover": {
      "filePath": "_layout",
      "parent": "/_layout",
      "children": [
        "/_layout/movies/discover/_layout"
      ]
    },
    "/_layout/movies/discover/_layout": {
      "filePath": "_layout/movies.discover._layout.tsx",
      "parent": "/_layout/movies/discover",
      "children": [
        "/_layout/movies/discover/_layout/"
      ]
    },
    "/_layout/tv-shows/$id/credits": {
      "filePath": "_layout/tv-shows.$id.credits.tsx",
      "parent": "/_layout/tv-shows/$id"
    },
    "/_layout/tv-shows/$id/similar": {
      "filePath": "_layout/tv-shows.$id.similar.tsx",
      "parent": "/_layout/tv-shows/$id"
    },
    "/_layout/tv-shows/$id/trailer": {
      "filePath": "_layout/tv-shows.$id.trailer.tsx",
      "parent": "/_layout/tv-shows/$id"
    },
    "/_layout/tv-shows/$id/watch": {
      "filePath": "_layout/tv-shows.$id.watch.tsx",
      "parent": "/_layout/tv-shows/$id"
    },
    "/_layout/tv-shows/discover": {
      "filePath": "_layout",
      "parent": "/_layout",
      "children": [
        "/_layout/tv-shows/discover/_layout"
      ]
    },
    "/_layout/tv-shows/discover/_layout": {
      "filePath": "_layout/tv-shows.discover._layout.tsx",
      "parent": "/_layout/tv-shows/discover",
      "children": [
        "/_layout/tv-shows/discover/_layout/"
      ]
    },
    "/_layout/movies/$id/": {
      "filePath": "_layout/movies.$id.index.tsx",
      "parent": "/_layout/movies/$id"
    },
    "/_layout/people/$id/": {
      "filePath": "_layout/people.$id.index.tsx",
      "parent": "/_layout/people/$id"
    },
    "/_layout/tv-shows/$id/": {
      "filePath": "_layout/tv-shows.$id.index.tsx",
      "parent": "/_layout/tv-shows/$id"
    },
    "/_layout/movies/discover/_layout/": {
      "filePath": "_layout/movies.discover._layout.index.tsx",
      "parent": "/_layout/movies/discover/_layout"
    },
    "/_layout/tv-shows/discover/_layout/": {
      "filePath": "_layout/tv-shows.discover._layout.index.tsx",
      "parent": "/_layout/tv-shows/discover/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
