### Graphql Apollo sample

### Installation

`npm install`

### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Usage

```
// 查询全部
query {
  cats { 
  	id,
    name,
    age
  }
}

// 根据 ID 查询
# query {
#   cat(id:2) {
#     id
#     name,
#     age
#   }
# }

// 新增数据
# mutation {
#   createCat(createCatInput: { name:"haha", age: 9}) {
#     age,
#     name
#   }
# }

// 删除数据
# mutation {
#   deleteCat(id:1) {
#     id,
#     name,
#     age
#   }
# }

// 更新数据
# mutation {
#   updateCat(updateCatInput:{ id:1, name:"qwe111", age:6}) {
#     id,
#     name,
#     age
#   }
# }
```