# Overview

We are building a type-safe SQL builder language.

Source code:

```
query get_user_by_id($id: text) {
    select * from users where id = $id
}
```

Compiled code:

```ts
class Client {
    function getUserById(id: string): User[] {
        return this.pg.execute("select * from users where id = $1", [id]);
    }
}
```

## Programming Language

1. Filename: ends with `.pgl`

