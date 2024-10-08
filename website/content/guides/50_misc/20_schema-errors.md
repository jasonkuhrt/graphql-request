# Schema Errors <GeneratedClientBadge />

There is a GraphQL schema design pattern that advocates for encoding errors into your schema. It generally has two parts: One, objects that represent errors; Two, root fields that return unions of one success object and multiple error objects. The benefit of this approach is letting users know about error states and enabling clients to receive them in a type safe way. The general net positive is higher quality and easier to develop software.

Tools that support this pattern:

- https://pothos-graphql.dev/docs/plugins/errors

Articles about this pattern:

- ...

## Generation

This pattern has first class support. By default all objects whose name begin with `Error` will be considered to be "error objects". You can customize this at generate time with your own regular expression.

## Toggle

You can disable schema errors by disabling the generation in the first place or adjusting your constructor.

```ts
const client = Client.create({ schemaErrors: false })
```

## `isError`

You can use a helper function `isError` that will narrow objects to just error objects. For example:

```ts
const result = await client.mutation.foo()
if (isError(result)) {
  result // type is narrowed to just errors
} else {
  result // type is narrowed to just success
}
```

## How It Works

This is achieved by automatically adding `__typename` field to each object-like root field's selection set. Then the returned object name can be analyzed. Example:

```graphql
mutation {
	foo {
		... on Bar {
			id
		}
	}
}
```

becomes:

```graphql
mutation {
	foo {
		__typename
		... on Bar {
			id
		}
	}
}
```

The error that gets thrown is an instance of `Error` and its message is generic. However if all your error objects share an interface that contains a `message` field of `String` type then that message will be automatically be queried for used in the thrown Error. Example:

```graphql
mutation {
	foo {
		... on Bar {
			id
		}
	}
}
```

becomes:

```graphql
mutation {
	foo {
		__typename
		... on Error { # You could name your interface anything.
			message # Your interface must have a message field of String type.
		}
		... on Bar {
			id
		}
	}
}
```

Example:

```ts
const result = await client.throws().mutation.foo({ onBar: { id } })
result // type is narrowed to just Bar case.
```
