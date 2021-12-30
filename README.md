### Graphql Apollo sample

### Installation

`npm install`

### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Usage

```
query {
  cats { 
  	id,
    name,
    age
  }
}

# query {
#   cat(id:2) {
#     id
#     name,
#     age
#   }
# }

# mutation {
#   createCat(createCatInput: { name:"haha", age: 9}) {
#     age,
#     name
#   }
# }

# mutation {
#   deleteCat(id:1) {
#     id,
#     name,
#     age
#   }
# }
```