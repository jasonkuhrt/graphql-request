# graphql-request

Minimal GraphQL client supporting Node and browsers for scripts or simple apps

![GitHub Action](https://github.com/jasonkuhrt/graphql-request/workflows/trunk/badge.svg) [![npm version](https://badge.fury.io/js/graphql-request.svg)](https://badge.fury.io/js/graphql-request)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Install](#install)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Node Version Support](#node-version-support)
- [Examples](#examples)
  - [Authentication via HTTP header](#authentication-via-http-header)
    - [Incrementally setting headers](#incrementally-setting-headers)
    - [Set endpoint](#set-endpoint)
    - [passing-headers-in-each-request](#passing-headers-in-each-request)
    - [Passing dynamic headers to the client](#passing-dynamic-headers-to-the-client)
  - [Passing more options to `fetch`](#passing-more-options-to-fetch)
  - [Custom JSON serializer](#custom-json-serializer)
  - [Using GraphQL Document variables](#using-graphql-document-variables)
  - [Making a GET request](#making-a-get-request)
  - [GraphQL Mutations](#graphql-mutations)
  - [Error handling](#error-handling)
  - [Using `require` instead of `import`](#using-require-instead-of-import)
  - [Cookie support for `node`](#cookie-support-for-node)
  - [Using a custom `fetch` method](#using-a-custom-fetch-method)
  - [Receiving a raw response](#receiving-a-raw-response)
  - [File Upload](#file-upload)
    - [Browser](#browser)
    - [Node](#node)
  - [Batching](#batching)
  - [Cancellation](#cancellation)
  - [Middleware](#middleware)
  - [ErrorPolicy](#errorpolicy)
    - [None (default)](#none-default)
    - [Ignore](#ignore)
    - [All](#all)
- [Knowledge Base](#knowledge-base)
  - [Why do I have to install `graphql`?](#why-do-i-have-to-install-graphql)
  - [Do I need to wrap my GraphQL documents inside the `gql` template exported by `graphql-request`?](#do-i-need-to-wrap-my-graphql-documents-inside-the-gql-template-exported-by-graphql-request)
  - [What's the difference between `graphql-request`, Apollo and Relay?](#whats-the-difference-between-graphql-request-apollo-and-relay)
  - [Why is the package `main` field missing?](#why-is-the-package-main-field-missing)
  - [How do I work around React Native + Metro's lack of `exports` support?](#how-do-i-work-around-react-native--metros-lack-of-exports-support)
  - [Get typed GraphQL Queries with GraphQL Code Generator](#get-typed-graphql-queries-with-graphql-code-generator)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- Most **simple & lightweight** GraphQL client
- Promise-based API (works with `async` / `await`)
- ESM native package (CJS build is included for now as well, but will eventually be removed)
- TypeScript support
- Isomorphic (works with Node / browsers)

## Install

```sh
npm add graphql-request graphql
```

## Quick Start

Send a GraphQL query with a single line of code. ▶️ [Try it out](https://runkit.com/593130bdfad7120012472003/593130bdfad7120012472004).

```js
import { request, gql } from 'graphql-request'

const query = gql`
  {
    company {
      ceo
    }
    roadster {
      apoapsis_au
    }
  }
`

request('https://api.spacex.land/graphql/', query).then((data) => console.log(data))
```

## Usage

```js
import { request, GraphQLClient } from 'graphql-request'

// Run GraphQL queries/mutations using a static function
request(endpoint, query, variables).then((data) => console.log(data))

// ... or create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} })
client.request(query, variables).then((data) => console.log(data))
```

You can also use the single argument function variant:

```js
request({
  url: endpoint,
  document: query,
  variables: variables,
  requestHeaders: headers,
}).then((data) => console.log(data))
```

## Node Version Support

We only officially support [LTS Node versions](https://github.com/nodejs/Release#release-schedule). We also make an effort to support two additional versions:

1. The latest even Node version if it is not LTS already.
2. The odd Node version directly following the latest even version.

You are free to try using other versions of Node (e.g. `13.x`) with `graphql-request` but at your own risk.

## Examples

### Authentication via HTTP header

```js
import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  })

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

[TypeScript Source](examples/authentication-via-http-header.ts)

#### Incrementally setting headers

If you want to set headers after the GraphQLClient has been initialised, you can use the `setHeader()` or `setHeaders()` functions.

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(endpoint)

// Set a single header
client.setHeader('authorization', 'Bearer MY_TOKEN')

// Override all existing headers
client.setHeaders({
  authorization: 'Bearer MY_TOKEN',
  anotherheader: 'header_value',
})
```

#### Set endpoint

If you want to change the endpoint after the GraphQLClient has been initialised, you can use the `setEndpoint()` function.

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(endpoint)

client.setEndpoint(newEndpoint)
```

#### passing-headers-in-each-request

It is possible to pass custom headers for each request. `request()` and `rawRequest()` accept a header object as the third parameter

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(endpoint)

const query = gql`
  query getMovie($title: String!) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`

const variables = {
  title: 'Inception',
}

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
}

// Overrides the clients headers with the passed values
const data = await client.request(query, variables, requestHeaders)
```

#### Passing dynamic headers to the client

It's possible to recalculate the global client headers dynamically before each request.
To do that, pass a function that returns the headers to the `headers` property when creating a new `GraphQLClient`.

```js
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(endpoint, {
  headers: () => ({ 'X-Sent-At-Time': Date.now().toString() }),
})

const query = gql`
  query getCars {
    cars {
      name
    }
  }
`
// Function saved in the client runs and calculates fresh headers before each request
const data = await client.request(query)
```

### Passing more options to `fetch`

```js
import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
  })

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

[TypeScript Source](examples/passing-more-options-to-fetch.ts)

### Custom JSON serializer

If you want to use non-standard JSON types, you can use your own JSON serializer to replace `JSON.parse`/`JSON.stringify` used by the `GraphQLClient`.

An original use case for this feature is `BigInt` support:

```js
import JSONbig from 'json-bigint'
import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const jsonSerializer = JSONbig({ useNativeBigInt: true })
  const graphQLClient = new GraphQLClient(endpoint, { jsonSerializer })
  const data = await graphQLClient.request(
    gql`
      {
        someBigInt
      }
    `
  )
  console.log(typeof data.someBigInt) // if >MAX_SAFE_INTEGER then 'bigint' else 'number'
}
```

### Using GraphQL Document variables

```js
import { request, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = gql`
    query getMovie($title: String!) {
      Movie(title: $title) {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const variables = {
    title: 'Inception',
  }

  const data = await request(endpoint, query, variables)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

### Making a GET request

Queries can be sent as an HTTP GET request:

```js
import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    method: 'GET',
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  })

  const query = gql`
    query getMovie($title: String!) {
      Movie(title: $title) {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const variables = {
    title: 'Inception',
  }

  const data = await graphQLClient.request(query, variables)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

### GraphQL Mutations

```js
import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  })

  const mutation = gql`
    mutation AddMovie($title: String!, $releaseDate: Int!) {
      insert_movies_one(object: { title: $title, releaseDate: $releaseDate }) {
        title
        releaseDate
      }
    }
  `

  const variables = {
    title: 'Inception',
    releaseDate: 2010,
  }
  const data = await graphQLClient.request(mutation, variables)

  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

[TypeScript Source](examples/using-variables.ts)

### Error handling

```js
import { request, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          fullname # "Cannot query field 'fullname' on type 'Actor'. Did you mean 'name'?"
        }
      }
    }
  `

  try {
    const data = await request(endpoint, query)
    console.log(JSON.stringify(data, undefined, 2))
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2))
    process.exit(1)
  }
}

main().catch((error) => console.error(error))
```

[TypeScript Source](examples/error-handling.ts)

### Using `require` instead of `import`

```js
const { request, gql } = require('graphql-request')

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const data = await request(endpoint, query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

### Cookie support for `node`

```sh
npm install fetch-cookie
```

```js
require('fetch-cookie/node-fetch')(require('node-fetch'))

import { GraphQLClient, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  })

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const data = await graphQLClient.rawRequest(query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

[TypeScript Source](examples/cookie-support-for-node.ts)

### Using a custom `fetch` method

```sh
npm install fetch-cookie
```

```js
import { GraphQLClient, gql } from 'graphql-request'
import crossFetch from 'cross-fetch'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  // a cookie jar scoped to the client object
  const fetch = require('fetch-cookie')(crossFetch)
  const graphQLClient = new GraphQLClient(endpoint, { fetch })

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const data = await graphQLClient.rawRequest(query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
```

### Receiving a raw response

The `request` method will return the `data` or `errors` key from the response.
If you need to access the `extensions` key you can use the `rawRequest` method:

```js
import { rawRequest, gql } from 'graphql-request'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const { data, errors, extensions, headers, status } = await rawRequest(endpoint, query)
  console.log(JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2))
}

main().catch((error) => console.error(error))
```

### Batching

It is possible with `graphql-request` to use [batching](https://github.com/graphql/graphql-over-http/blob/main/rfcs/Batching.md) via the `batchRequests()` function. Example available at [examples/batching-requests.ts](examples/batching-requests.ts)

```ts
import { batchRequests, gql } from 'graphql-request'

const endpoint = 'https://api.spacex.land/graphql/'

const query1 = gql`
  query ($id: ID!) {
    capsule(id: $id) {
      id
      landings
    }
  }
`

const query2 = gql`
  {
    rockets(limit: 10) {
      active
    }
  }
`

const data = await batchRequests(endpoint, [
  { document: query1, variables: { id: 'C105' } },
  { document: query2 },
])

console.log(JSON.stringify(data, undefined, 2))
```

### Cancellation

It is possible to cancel a request using an `AbortController` signal.

You can define the `signal` in the `GraphQLClient` constructor:

```ts
const abortController = new AbortController()

const client = new GraphQLClient(endpoint, { signal: abortController.signal })
client.request(query)

abortController.abort()
```

You can also set the signal per request (this will override an existing GraphQLClient signal):

```ts
const abortController = new AbortController()

const client = new GraphQLClient(endpoint)
client.request({ document: query, signal: abortController.signal })

abortController.abort()
```

In Node environment, `AbortController` is supported since version v14.17.0.
For Node.js v12 you can use [abort-controller](https://github.com/mysticatea/abort-controller) polyfill.

```
 import 'abort-controller/polyfill'

 const abortController = new AbortController()
```

### Middleware

It's possible to use a middleware to pre-process any request or handle raw response.

Request middleware example (set actual auth token to each request):

```ts
function middleware(request: RequestInit) {
  const token = getToken()
  return {
    ...request,
    headers: { ...request.headers, 'x-auth-token': token },
  }
}

const client = new GraphQLClient(endpoint, { requestMiddleware: middleware })
```

It's also possible to use an async function as a request middleware. The resolved data will be passed to the request:

```ts
async function middleware(request: RequestInit) {
  const token = await getToken()
  return {
    ...request,
    headers: { ...request.headers, 'x-auth-token': token },
  }
}

const client = new GraphQLClient(endpoint, { requestMiddleware: middleware })
```

Response middleware example (log request trace id if error caused):

```ts
function middleware(response: Response<unknown>) {
  if (response.errors) {
    const traceId = response.headers.get('x-b3-traceid') || 'unknown'
    console.error(
      `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`
    )
  }
}

const client = new GraphQLClient(endpoint, { responseMiddleware: middleware })
```

### ErrorPolicy

By default GraphQLClient will throw when an error is received. However, sometimes you still want to resolve the (partial) data you received.
You can define `errorPolicy` in the `GraphQLClient` constructor.

```ts
const client = new GraphQLClient(endpoint, { errorPolicy: 'all' })
```

#### None (default)

Allow no errors at all. If you receive a GraphQL error the client will throw.

#### Ignore

Ignore incoming errors and resolve like no errors occurred

#### All

Return both the errors and data, only works with `rawRequest`.

## Knowledge Base

#### Why was the file upload feature taken away? Will it return?

In [this issue](https://github.com/jasonkuhrt/graphql-request/issues/500) we decided to make this library more stable and maintainable. In principal the feature is still in scope of this library and will make a return when we find time to do the feature right.

#### Why do I have to install `graphql`?

`graphql-request` uses methods exposed by the `graphql` package to handle some internal logic. On top of that, for TypeScript users, some types are used from the `graphql` package to provide better typings.

#### Do I need to wrap my GraphQL documents inside the `gql` template exported by `graphql-request`?

No. It is there for convenience so that you can get the tooling support like prettier formatting and IDE syntax highlighting. You can use `gql` from `graphql-tag` if you need it for some reason too.

#### What's the difference between `graphql-request`, Apollo and Relay?

`graphql-request` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graphql-request` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

#### Why is the package `main` field missing?

The `main` field was deprecated by Node.js on April 23 2019 when version 12 was released, in favour of [entrypoints (`exports` package manifest field)](https://nodejs.org/api/packages.html#package-entry-points). I believe enough time has passed that tools should be adopting the new standards now.

#### How do I work around React Native + Metro's lack of `exports` support?

You might encounter the error below when you try to build a React Native app that uses `graphql-request`:

```
Error: While trying to resolve module "graphql-request" from file "/path/to/src/App.ts", the package "/path/to/node_modules/graphql-request/package.json" was successfully found. However, this package itself specifies a "main" module field that could not be resolved ("/path/to/node_modules/graphql-request/index".
```

This happens because Metro [does not support yet](https://github.com/facebook/metro/issues/670) the `exports` field in package.json. A workaround for this problem is to edit the `metro.config.js` file in your project and add a new [`resolveRequest`](https://facebook.github.io/metro/docs/configuration/#resolverequest) for `graphql-request`. Like this:

```javascript
resolver: {
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName.startsWith('graphql-request')) {
      return {
        filePath: `${__dirname}/node_modules/graphql-request/build/esm/index.js`,
        type: 'sourceFile',
      }
    }

    return context.resolveRequest(context, moduleName, platform)
  }
}
```

After doing this change, clear Metro's cache and restart your application.

#### Get typed GraphQL Queries with GraphQL Code Generator

`graphql-request@^5` supports `TypedDocumentNode`, the typed counterpart of `graphql`'s `DocumentNode`.

Installing and configuring [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen) requires a few steps in order to get end-to-end typed GraphQL operations using the provided `graphql()` helper:

```ts
import request from 'graphql-request'
import { graphql } from './gql/gql'

const getMovieQueryDocument = graphql(gql`
  query getMovie($title: String!) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`)

const data = await request(
  'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr',
  getMovieQueryDocument,
  // variables are type-checked!
  { title: 'Inception' }
)

// `data.Movie` is typed!
```

[_The complete example is available in the GraphQL Code Generator repository_](https://github.com/dotansimha/graphql-code-generator/tree/master/examples/front-end/react/graphql-request)

Visit GraphQL Code Generator's dedicated guide to get started: https://www.the-guild.dev/graphql/codegen/docs/guides/react-vue.
