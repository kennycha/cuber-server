# CUBER Server

## Resolvers

### Public Resolvers:

- [x] Sing In / Sign up with Facebook
- [x] Sing In with Email
- [x] Starts Phone Number Verification
- [x] Complete Phone Number Verification
- [x] Sign Up with Email

---

### Authentication:

- [x] Generate JWT
- [x] Verify JWT

---

### Private Resolvers:

- [x] Get my Profile
- [x] Request Email Verification
- [x] Complete Email Verification
- [x] Update my Profile
- [x] Toggle Driving Mode
- [x] Report Location / Orientation
- [x] Add Place
- [x] Edit Place
- [x] Delete Place
- [x] Get My Places
- [x] See Nearby Drivers
- [x] Subscribe to Nearby Drivers
- [x] Request a Ride
- [x] Get Nearby Ride Requests
- [x] Subscribe to Nearby Ride Requests
- [x] Update Ride Status
- [x] Get Ride
- [x] Subscribe to Ride Status
- [x] Create a Chat Room
- [x] Get Chat Room Messages
- [ ] Send a Chat Message
- [ ] Subscribe to Chat Room Messages

## Code Challenge

- [ ] Get Ride History
- [ ] See Ride Detail

## 2.0 Project Setup: Git & Installation

- [npm install with devDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

  - use `--save-dev`

- packages

  - typescript
  - ts-node
  - nodemon

- **tsconfig.json**

  - to configure typescript

    ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom", "esnext.asynciterable"],
        "sourceMap": true,
        "allowJs": true,
        "moduleResolution": "node",
        "rootDir": "src",
        "forceConsistentCasingInFileNames": true,
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": false,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
      },
      "exclude": [
        "node_modules",
        "build",
        "scripts",
        "acceptance-tests",
        "webpack",
        "jest",
        "src/setupTests.ts"
      ]
    }
    ```

- **tslint.json**

  - to configure linter

  - need to install a package: tslint-config-prettier

    ```json
    {
      "extends": ["tslint:recommended", "tslint-config-prettier"],
      "linterOptions": {
        "exclude": ["config/**/*.js", "node_modules/**/*."]
      },
      "rules": {
        "no-console": false,
        "member-access": false,
        "object-literal-sort-keys": false,
        "ordered-imports": true,
        "interface-name": false,
        "strict-null-checks": false
      },
      "rulesDirectory": []
    }
    ```

- [definitely typed](https://github.com/DefinitelyTyped/DefinitelyTyped)

  - about types of everything

  - 외부 패키지들 중 typescript를 지원하지 않는 경우 사용하기 좋다

    ```bash
    $ npm i @types/node --save-dev
    ```

## 2.1 Project Setup: TypeScript and NodeJS

- add **scripts**

  - nodemon을 통해 매번 서버를 재시작할 필요가 없도록

  - 또한 ts-node를 통해 index.ts 파일을 열도록

    ```json
    // package.json
    {
      ...
      "scripts": {
        "dev": "cd src && nodemon --exec ts-node index.ts"
      },
      ...
    }
    ```

    ```typescript
    // index.ts
    console.log("works");
    ```

    ```bash
    $ npm run dev

    # works
    ```

  - nodemon이 주시하는 파일 확장

    - ts, graphql 확장자 파일을 모두 주시

    - 실제 production 설정과는 다르지만, 개발과정 편의를 위해 사용

      ```json
      // package.json
      {
        ...
        "scripts": {
          "dev": "cd src && nodemon --exec ts-node index.ts -e ts,graphql"
        },
        ...
      }
      ```

## 2.2 A word on @types

## 2.3~4 GraphQL Yoga and Express

- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)

- graphql 서버 개발 환경을 만들어주는, create-react-app과 유사한 역할의 패키지

- [middleware](https://developer.mozilla.org/en-US/docs/Glossary/Middleware)

  - 앱의 연결이나 요청들을 다루는 방식을 수정하는 역할

  - [helmet](https://www.npmjs.com/package/helmet): for security

  - [morgan](https://www.npmjs.com/package/morgan): for logging

  - [cors](https://www.npmjs.com/package/cors): for handling cors

    ```bash
    $ npm i helmet morgan cors
    $ npm i @types/helmet @types/morgan @types/cors --save-dev
    ```

- [express](https://expressjs.com/ko/)

  - nodejs 환경의 서버 개발 프레임워크
  - graphql의 서버 부분은 express를 포함한다

- JavaScript class

  - public
  - constructor
  - private

- GraphQLServer

- 인스턴스 생성 시에 **resolvers**와 **definitions**를 option으로 포함해야 한다

- appOptions

  - type은 graphql-yoga에서 import 한 Options

  - app을 시작할 때 넘겨줘야 하는 **port**, **playground**, **endpoint** 등의 옵션을 담고 있는 객체

  - 추가적으로 app.start는 callback 함수를 파라미터로 받을 수 있다

    ```typescript
    import { Options } from "graphql-yoga";
    import app from "./app";

    const PORT: number | string = process.env.PORT || 4000;
    const PLAYGROUND_ENDPOINT: string = "/playground";
    const GRAPHQL_ENDPOINT: string = "/graphql";

    const appOptions: Options = {
      port: PORT,
      playground: PLAYGROUND_ENDPOINT,
      endpoint: GRAPHQL_ENDPOINT,
    };

    const handleAppStart = () => console.log(`Listening on port ${PORT}`);

    app.start(appOptions, handleAppStart);
    ```

## 2.5~6 API and Schema Structure

- graphql api

  - django, express api와는 달리 url을 사용하지 않는다
  - schema와 resolver를 사용

- packages

  - [graphql-tools](https://github.com/ardatan/graphql-tools)
  - [merge-graphql-schemas](https://github.com/Urigo/merge-graphql-schemas) (merged into graphql-tools)

- merging types and resolvers

  - `src/api/` 아래에 각 api에 해당하는 폴더들을 만들고, 내부에 schema 파일(`.graphql`)과 resolver 파일(`.resolvers.ts`)을 생성

  - schema.ts 파일에서 import하여 merge 한 후 export

    ```typescript
    // schema.ts
    import { GraphQLSchema } from "graphql";
    import { makeExecutableSchema } from "graphql-tools";
    import {
      fileLoader,
      mergeResolvers,
      mergeTypes,
    } from "merge-graphql-schemas";
    import path from "path";

    const allTypes: GraphQLSchema[] = fileLoader(
      path.join(__dirname, "./api/**/*.graphql")
    );

    const allResolvers: any[] = fileLoader(
      path.join(__dirname, "./api/**/*.resolvers.*")
    );

    const mergedTypes = mergeTypes(allTypes);
    const mergedResolvers = mergeResolvers(allResolvers);

    const schema = makeExecutableSchema({
      typeDefs: mergedTypes,
      resolvers: mergedResolvers,
    });

    export default schema;
    ```

    ```typescript
    // app.ts
    import { GraphQLServer } from "graphql-yoga";
    import schema from "./schema";

    class App {
      public app: GraphQLServer;
      constructor() {
        this.app = new GraphQLServer({
          schema,
        });
      ...
    }

    export default new App().app;
    ```

## 2.7 Graphql To Typescript

- graphql이 응답으로 가져오는 data의 type 과 typescript의 type 설정이 같지 않을때

  - 예시

    ```
    # sayHello.graphql

    type Greeting {
      text: String!
      error: Boolean!
    }

    type Query {
      sayHello: Greeting!
    }
    ```

    ```typescript
    // sayHello.resolvers.ts

    const resolvers = {
      Query: {
        sayHello: () => "Hey hello how are ya",
      },
    };

    export default resolvers;
    ```

    - graphql에 따르면, sayHello 쿼리는 String과 Boolean을 포함한 객체형의 데이터를 응답으로 받는데,
    - resolvers 파일에서는 쿼리의 결과값이 Srting 이다

  - 기본 상황에서는 Typescript가 이것을 알려주지 않는다

    - 단지 request 에 대한 응답을 하지 않는다

  - 이를 Typescript 가 알려주도록 만드는 것이 중요하다

    - 내가 **return 해야 하는 것**을 아는 것은 중요하다

- graphql을 types로 바꾸기

  - [graphql-to-typescript](https://www.npmjs.com/package/graphql-to-typescript)

  - [gql-merge](https://www.npmjs.com/package/gql-merge)

  - 설치

    ```bash
    $ npm i graphql-to-typescript gql-merge --save-dev
    ```

    - src 내의 코드에 사용되지 않고, package.json에서만 사용

  - package.json 의 scripts에 `types` script 추가

    - 모든 graphql 파일들을 복제해서 Typescript definition으로 바꾸는 명령어

      ```json
      "scripts": {
      	"types": "graphql-to-typescript ./src/schema.graphql ./src/types/graph.d.ts"
      }
      ```

    - `graphql-to-typescript`를 사용해서, `./src/schema.graphql` 파일을 복제해, `./src/types/graph.d.ts` 라는 Typescript definition 파일로 만들어라

  - types 가 실행되기 전에 실행되는 `pretypes`도 추가

    - graphql 파일들을 합쳐서 하나의 graphql 파일로 만들어 주는 명령어

      ```json
      "scripts": {
          "pretypes": "gql-merge --out-file ./src/schema.graphql ./src/api/**/*.graphql"
      }
      ```

    - `gql-merge`를 사용해서, `./src/schema.graphql` 이라는 파일을 만드는데, 이때 `./src/api/**/*.graphql` 형식의 파일들을 병합해서 만들어라

  - 실행

    ```bash
    $ npm run types
    ```

    - 이때, `babel-runtime` 모듈을 필요로 한다

      ```bash
      $ npm i babel-runtime --save-dev
      ```

    - 정상적으로 동작하면, 지정한 위치에 Typescript definition 파일이 생성된다

  - 결과

    - src/schema.graphql

      ```
      type Query {
        sayBye: String!
        sayHello: Greeting!
      }

      type Greeting {
        text: String!
        error: Boolean!
      }
      ```

    - src/types/graph.d.ts

      ```typescript
      export const typeDefs = [
        "type Query {\n  sayBye: String!\n  sayHello: Greeting!\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n",
      ];
      /* tslint:disable */

      export interface Query {
        sayBye: string;
        sayHello: Greeting;
      }

      export interface Greeting {
        text: string;
        error: boolean;
      }
      ```

  - 적용

    - sayHello.resolvers.ts

      ```typescript
      import { Greeting } from "src/types/graph";

      const resolvers = {
        Query: {
          sayHello: (): Greeting => {
            return {
              text: "Hey hello how are ya",
              error: false,
            };
          },
        },
      };

      export default resolvers;
      ```

## 2.8 Typechecking Graphql Arguments

- query의 arguments에 대한 type 설정

  - sayHello.graphql

    ```
    type SayHelloResponse {
      text: String!
      error: Boolean!
    }

    type Query {
      sayHello(name: String!): SayHelloResponse!
    }
    ```

  - ```bash
    $ npm run types
    ```

  - graph.d.ts

    ```typescript
    export const typeDefs = [
      "type Query {\n  sayBye: String!\n  sayHello(name: String!): SayHelloResponse!\n}\n\ntype SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n",
    ];
    /* tslint:disable */

    export interface Query {
      sayBye: string;
      sayHello: SayHelloResponse;
    }

    export interface SayHelloQueryArgs {
      name: string;
    }

    export interface SayHelloResponse {
      text: string;
      error: boolean;
    }
    ```

  - sayHello.resovers.ts

    ```typescript
    import { SayHelloResponse, SayHelloQueryArgs } from "src/types/graph";

    const resolvers = {
      Query: {
        sayHello: (_, args: SayHelloQueryArgs): SayHelloResponse => {
          return {
            text: `Hello ${args.name}`,
            error: false,
          };
        },
      },
    };

    export default resolvers;
    ```

  - graphql 파일의 type설정을 typescript definition 파일로 변환한 후, resolvers 파일에서 이를 활용

    - 넘기는 값과 받는 값의 type을 알 수 있다는 강력함

## 2.9 Configuring TypeORM

- ORM

  - Object Relational Mapper
  - 코드를 SQL 언어로 바꿔주는 프로그램
  - cf) Django ORM

- [typeorm](https://typeorm.io/#/)

  - Django 등과는 달리 Nodejs에는 전용 공식 ORM이 없다

  - made in TypeScript

  - app 시작 전에 DB를 먼저 연결하고 시작

  - 설치

    ```bash
    $ npm i typeorm
    ```

- ormConfig.ts

  - [configuring connection options](https://typeorm.io/#/connection-options)

  - entities

    - modeling과 관련한 파일들이 저장되는 폴더

    ```typescript
    import { ConnectionOptions } from "typeorm";

    const connectionOptions: ConnectionOptions = {
      type: "postgres",
      database: "cuber",
      synchronize: true,
      logging: true,
      entities: ["entities/**/*.*"],
      host: process.env.DB_ENDPOINT || "localhost",
      port: 5432,
      username: process.env.DB_USERNAME || "kennycha",
      password: process.env.DB_PASSWORD || "",
    };

    export default connectionOptions;
    ```

- index.ts 에 적용

  - [pg](https://www.npmjs.com/package/pg)

    ```bash
    $ npm i pg
    ```

  - 적용

    ```tsx
    import { createConnection } from "typeorm";
    import app from "./app";
    import connectionOptions from "./ormConfig";

    createConnection(connectionOptions)
      .then(() => {
        app.start(appOptions, handleAppStart);
      })
      .catch((e) => {
        console.log(e);
      });
    ```

    - 이때, then과 catch 모두 정의해줘야 한다

- [postgres tutorial](http://www.gurubee.net/postgresql/basic)

  - `psql`을 통해 password를 포함한 user와 database를 생성한 후, ormConfig.ts 파일을 통해 옵션 정의

- `pgadmin4 failed to locate pgadmin4.py`

  - postgres 삭제 시 data까지 완전히 삭제되지 않은 채 재설치할 경우

## 2.10 Creating a Virtual Environment on NodeJS

- `.env`

  - 환경변수를 정의하는 파일
  - `.gitignore` 에 추가

- [dotenv](https://www.npmjs.com/package/dotenv)

  - .env에 접근할 수 있도록 하는 패키지

  - 설치

    ```bash
    $ npm i dotenv
    ```

  - 사용

    ```tsx
    // index.ts
    import dotenv from "dotenv";
    dotenv.config();
    ```

    - 이때 위의 두 줄을 코드의 최상단에 같이 작성해야 한다
    - 특히 connectOptions 를 import 하기 전에 환경변수 설정이 이루어져야 한다

## 2.11 User Entity GraphQL Type

- modeling
  - graphql type 생성 후, ORM 작성하는 순서
- `flag`
  - state of user
  - true or false

## 2.12~13 User Entity

- Entity 생성

  - typeorm 패키지 사용
  - Entity, Column 등 decorator 함수 사용
  - User Entity의 경우, AbstractUser와 유사한 BaseEntity 를 상속하여 정의

- decorator 함수

  - [reference | TOAST UI](https://ui.toast.com/weekly-pick/ko_20200102/)
  - 새 함수를 반환하여 전달 된 함수 또는 메서드의 동작을 수정하는 함수

- [class-validator](https://www.npmjs.com/package/class-validator)

  - type을 validate 하도록 돕는 패키지

    - decorator 함수를 통해 validate

    ```bash
    $ npm i class-validator
    ```

  - typeorm 과 함께 사용가능

    ```typescript
    import { IsEmail } from "class-validator";
    import {
      Entity,
      BaseEntity,
      PrimaryGeneratedColumn,
      Column,
    } from "typeorm";

    @Entity()
    class User extends BaseEntity {
      @PrimaryGeneratedColumn() id: number;

      @Column({ type: "text", unique: true })
      @IsEmail()
      email: string;
      ...
    }

    export default User;
    ```

## 2.14 Hashing and Encrypting User Passwords

- [bcrypt](https://www.npmjs.com/package/bcrypt)

  - 암호화를 위한 패키지

  - 설치

    ```bash
    $ npm i bcrypt
    $ npm i @types/bcrypt --save-dev
    ```

  - BCRYPT_ROUND

    - 암호화 반복 횟수
    - `bcrypt.hash()`의 두번째 인자로 넣어준다

  - `async await`

    - 해시화하는 과정에 시간이 소요되기 때문에, 비동기로 진행

- `@BeforeInsert`, `@BeforeUpdate`

  - save 혹은 update 하기 전에 호출되는 method
  - BeforeInsert와 BeforeUpdate 를 사용해, 사용자가 저장하기 전에 암호화를 진행

## 2.15 Verifying User Password

- 사용자의 password는 저장하지 않는다

  - 암호화된 password만을 저장해두고

  - 사용자가 로그인 시 password를 입력하면, 이를 암호화 해서 저장된 값과 같은지 판단

  - `bcrypt`의 `compare` method를 사용

    ```tsx
    import bcrypt from "bcrypt";
    import { Entity } from "typeorm";

    @Entity()
    class User extends BaseEntity {
      // ...
      public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
      }
      // ...
    }
    export default User;
    ```

- public method

  - verifying method는 resolver에서 사용할 수 있도록 public으로 정의
  - public method는 클래스 밖에서 사용 가능

## 2.16 Verification Entity

- User Entity와 동일하게, graphql 작성 후 ORM 작성

  - `Verification.graphql`

    ```
    type Verification {
      id: Int!
      target: String!
      payload: String!
      key: String!
      user: Boolean!
      createdAt: String!
      updatedAt: String!
    }
    ```

  - `Verification.ts`

    ```typescript
    import {
      BaseEntity,
      Column,
      Entity,
      PrimaryGeneratedColumn,
      CreateDateColumn,
      UpdateDateColumn,
    } from "typeorm";

    @Entity()
    class Verification extends BaseEntity {
      @PrimaryGeneratedColumn() id: number;

      @Column({ type: "text" })
      target: string;

      @Column({ type: "text" })
      payload: string;

      @Column({ type: "text" })
      key: string;

      @Column({ type: "boolean", default: false })
      used: boolean;

      @CreateDateColumn() createdAt: string;
      @UpdateDateColumn() updatedAt: string;
    }

    export default Verification;
    ```

## 2.17 Using Types on the Entities

- verification target의 type

  - 현재는 string으로만 제한해 놓았기 때문에, "EMAIL", "Email", "email", "e-mail" 등 통일되지 않은 값들이 들어올 수 있다

  - 이를 혼동하지 않고 사용할 수 있도록, `verificationTarget` 을 정의하여 사용

  - 정의

    ```typescript
    // types.d.ts
    export type verificationTarget = "PHONE" | "EMAIL";
    ```

  - 사용

    ```typescript
    // Verification.ts
    import { verificationTarget } from "src/types/types";

    @Entity()
    class Verification extends BaseEntity {
      ...

      @Column({ type: "text" })
      target: verificationTarget;
      ...
    }

    export default Verification;
    ```

- `enum`

  - enumerated type (열거형 값)

  - typeorm에 `enum` key - value를 함께 넣어 작성하면, 열거형 값 안의 값들 중에서만 값이 선택될 수 있다

  - 즉, 아래와 같이 사용한다면

    ```typescript
    @Column({ type: "text", enum: ["PHONE", "EMAIL"] })
      target: verificationTarget;
    ```

    target column에는 `"PHONE"` 혹은 `"EMAIL"`만이 그 값으로 들어갈 수 있다

- `predev` script

  - 현재는 새로운 type을 넣을 때 마다 `types` script를 입력해야 한다

  - `dev` script 전에 실행되는 `predev` script를 추가해서, 서버 실행 전 자동으로 새로운 type이 있다면 추가하고 서버를 실행하도록 자동화

    ```json
    // package.json
    {
      ...
      "scripts": {
        "predev": "npm run types",
        ...
      }
    }
    ```

  - 서버 실행 시 새로운 type이 있다면 `graph.d.ts`에 자동으로 추가

## 2.18 Creating the Verification Key

- key for PHONE

  - `Math` 사용
    - `Math.random()`
    - `Math.floor()`
  - `toString()`

- key for EMAIL

  - `Math` 사용
    - `Math.random()`
  - `toString()`에 radix를 적용
    - [radix](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
    - 2와 36사이의 정수를 받아, 해당하는 진수법으로 표기

- `@BeforeInsert()`

  - BeforeInsert 를 통해, verification entity를 저장하기 전에 키를 생성

    ```typescript
    import { BeforeInsert } from "typeorm";

    @Entity()
    class Verification extends BaseEntity {
      ...

      @Column({ type: "text" })
      key: string;
      ...

      @BeforeInsert()
      createKey(): void {
        if (this.target === PHONE) {
          this.key = Math.floor(Math.random() * 100000).toString();
        } else if (this.target === EMAIL) {
          this.key = Math.random().toString(36).substr(2);
        }
      }
    }

    export default Verification;
    ```

## 2.19 Place Entity

- Place.graphql

  ```
  type Place {
    id: Int!
    name: String!
    lat: Float!
    lng: Float!
    address: String!
    isFav: Boolean!
    createdAt: String!
    updatedAt: String
  }
  ```

- Place Entity

  ```typescript
  import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity()
  class Place extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "double precision", default: 0 })
    lat: number;

    @Column({ type: "double precision", default: 0 })
    lng: number;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "boolean", default: false })
    isFav: boolean;

    @CreateDateColumn() createdAt: string;

    @UpdateDateColumn() updatedAt: string;
  }

  export default Place;
  ```

## 2.20 Ride Entity

- Ride.graphql

  ```
  type Ride {
    id: Int!
    status: String!
    pickUpAddress: String!
    pickUpLat: Float!
    pickUplng: Float!
    dropOffAddress: String!
    dropOffLat: Float!
    dropOfflng: Float!
    price: Float!
    distance: String!
    duration: String!
    createdAt: String!
    updatedAt: String
  }
  ```

- Ride entity

  ```typescript
  import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { rideStatus } from "src/types/types";

  @Entity()
  class Ride extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({
      type: "text",
      enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    })
    status: rideStatus;

    @Column({ type: "text" })
    pickUpAddress: string;

    @Column({ type: "double precision", default: 0 })
    pickUpLat: number;

    @Column({ type: "double precision", default: 0 })
    pickUpLng: number;

    @Column({ type: "text" })
    dropOffAddress: string;

    @Column({ type: "double precision", default: 0 })
    dropOffLat: number;

    @Column({ type: "double precision", default: 0 })
    dropOffLng: number;

    @Column({ type: "double precision", default: 0 })
    price: number;

    @Column({ type: "text" })
    distance: string;

    @Column({ type: "text" })
    duration: string;

    @CreateDateColumn() createdAt: string;

    @UpdateDateColumn() updatedAt: string;
  }

  export default Ride;
  ```

## 2.21~22 Chat and Message Entities

- relationship in `graphql`

  - one relationship 은 `entity type name`을 통해 표현

    ```
    // Message.graphql

    type Message {
      ...
      chat: Chat!
      ...
    }
    ```

  - many relationship 은 `[entity type name]` 을 통해 표현

    ```
    // Chat.graphql

    type Chat {
      ...
      participants: [User]!
      ...
    }
    ```

- relationship in `typeorm`

  - `OneToMany`

    ```typescript
    // Chat.ts

    import { Entity, BaseEntity, OneToMany } from "typeorm";
    import Message from "./Message";

    @Entity()
    class Chat extends BaseEntity {
      ...
      @OneToMany((type) => Message, (message) => message.chat)
      messages: Message[];
      ...
    }

    export default Chat;
    ```

  - `ManyToOne`

    ```typescript
    // Message.ts

    import { Entity, BaseEntity, ManyToOne } from "typeorm";
    import Chat from "./Chat";

    @Entity()
    class Message extends BaseEntity {
      ...
      @ManyToOne((type) => Chat, (chat) => chat.messages)
      chat: Chat;
      ...
    }

    export default Message;
    ```

  - `ManyToMany`

## 2.23 Model Relationships like a Boss

## 2.24 Resolver Types

- resolver의 parameter

  - Resolver = ( `parent`, `args`, `context`, `info` ) => {}

- type Resolver

  ```typescript
  export type Resolver = (
    parent: any,
    args: any,
    context: any,
    info: any
  ) => any;
  ```

- interface Resolvers

  ```typescript
  export interface Resolvers {
    [key: string]: {
      [key: string]: Resolver;
    };
  }
  ```

## 2.25~26 Planning the Resolvers

## 2.27~29 FacebookConnect Resolver

- FacebookConnect.graphql

  ```
  type FacebookConnectResponse {
    ok: Boolean!
    error: String
    token: String
  }
  
  type Mutation {
    FacebookConnect(
      firstName: String!
      lastName: String!
      email: String
      fbId: String!
    ): FacebookConnectResponse
  }
  ```

  - `fbId`를 로그인 후에도 사용하기 위해, User entity정의 및 type에도 `fbId`를 추가

- typeorm findOne

  - [find](https://typeorm.io/#/find-options)
  - 건네받은 fbId 를 가진 User 가 있다면 생성하지 않고 return
  - 없다면 새로운 User를 생성하고 저장한 후 return
    - fbId를 이용해서 프로필 사진까지 추가해서 저장

- FacebookConnect Resolvers

  ```typescript
  import { Resolvers } from "src/types/resolvers";
  import {
    FacebookConnectMutationArgs,
    FacebookConnectResponse,
  } from "src/types/graph";
  import User from "../../../entities/User";
  
  const resolvers: Resolvers = {
    Mutation: {
      FacebookConnect: async (
        _,
        args: FacebookConnectMutationArgs
      ): Promise<FacebookConnectResponse> => {
        const { fbId } = args;
        try {
          const existingUser = await User.findOne({ fbId });
          if (existingUser) {
            return {
              ok: true,
              error: null,
              token: "Coming soon, already",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
        try {
          await User.create({
            ...args,
            profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
          }).save();
          return {
            ok: true,
            error: null,
            token: "Coming soon, created",
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
      },
    },
  };
  export default resolvers;
  ```

## 2.31~32 EmailSignIn Resolver

- EmailSignIn.graphql

  ```
  type EmailSignInResponse {
    ok: Boolean!
    error: String
    token: String
  }
  
  type Mutation {
    EmailSignIn(email: String!, password: String!): EmailSignInResponse!
  }
  ```

- EmailSignIn Resolvers

  ```typescript
  import { Resolvers } from "src/types/resolvers";
  import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";
  import User from "src/entities/User";
  
  const resolvers: Resolvers = {
    Mutation: {
      EmailSignIn: async (
        _,
        args: EmailSignInMutationArgs
      ): Promise<EmailSignInResponse> => {
        const { email, password } = args;
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return {
              ok: false,
              error: "No user found",
              token: null,
            };
          }
          const checkPassword = await user.comparePassword(password);
          if (checkPassword) {
            return {
              ok: true,
              error: null,
              token: "Comming Soon",
            };
          } else {
            return {
              ok: false,
              error: "Wrong password",
              token: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
      },
    },
  };
  
  export default resolvers;
  ```

  - `findOne`을 통해 args.email에 해당하는 user 가 있는 지 찾음
  - 있다면 args.password가 저장된 비밀번호와 동일한지 비교

## 2.33 Introduction to Twilio

- [twilio](https://www.twilio.com/)

  - for SMS verification

  - [twilio docs](https://www.twilio.com/docs)

  - [npm|twilio](https://www.npmjs.com/package/twilio)

    ```bash
    $ npm i twilio
    ```

  - [npm |@types/twilio](https://www.npmjs.com/package/@types/twilio)

    ```bash
    $ npm i @types/twilio --save-dev
    ```

  - twillio 에서 trial number 생성 후, `id`, `number`, `token`을 `.env` 파일에 저장

  - `process.env.변수명` 으로 불러와서 사용

## 2.34~36 StartPhoneVerification Resolver

- StartPhoneVerification.graphql

  ```
  type StartPhoneVerificationResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!
  }
  ```

- StartPhoneVerification Resolver

  ```typescript
  import { Resolvers } from "src/types/resolvers";
  import {
    StartPhoneVerificationResponse,
    StartPhoneVerificationMutationArgs,
  } from "../../../types/graph";
  import Verification from "../../../entities/Verification";
  import { sendVerificationSMS } from "../../../utils/sendSMS";
  
  const resolvers: Resolvers = {
    Mutation: {
      StartPhoneVerification: async (
        _,
        args: StartPhoneVerificationMutationArgs
      ): Promise<StartPhoneVerificationResponse> => {
        const { phoneNumber } = args;
        try {
          const existingVerification = await Verification.findOne({
            payload: phoneNumber,
          });
          if (existingVerification) {
            existingVerification.remove();
          }
          const newVerification = await Verification.create({
            payload: phoneNumber,
            target: "PHONE",
          }).save();
          await sendVerificationSMS(newVerification.payload, newVerification.key);
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      },
    },
  };
  
  export default resolvers;
  ```

  - 만약 현재 phoneNumber에 해당하는 인증이 있다면 삭제
  - 새로운 인증을 생성하고 `src/utils/` 에 정의한 `sendVerificationSMS` 함수를 호출해 인증문자를 발송

## 2.37~38 CompletePhoneVerification

- CompletePhoneVerification.graphql

  ```
  type CompletePhoneVerificationResponse {
    ok: Boolean!
    error: String
    token: String
  }
  
  type Mutation {
    CompletePhoneVerification(
      phoneNumber: String!
      key: String!
    ): CompletePhoneVerificationResponse!
  }
  ```

- CompletePhoneVerification Resolvers

  ```typescript
  import { Resolvers } from "src/types/resolvers";
  import {
    CompletePhoneVerificationMutationArgs,
    CompletePhoneVerificationResponse,
  } from "../../../types/graph";
  import Verification from "src/entities/Verification";
  import User from "src/entities/User";
  
  const resolvers: Resolvers = {
    Mutation: {
      CompletePhoneVerification: async (
        _,
        args: CompletePhoneVerificationMutationArgs
      ): Promise<CompletePhoneVerificationResponse> => {
        const { phoneNumber, key } = args;
        try {
          const verification = await Verification.findOne({
            payload: phoneNumber,
            key,
          });
          if (!verification) {
            return {
              ok: false,
              error: "Verification key not valid",
              token: null,
            };
          } else {
            verification.verified = true;
            verification.save();
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
  
        try {
          const user = await User.findOne({ phoneNumber });
          if (user) {
            user.verifiedPhoneNumber = true;
            user.save();
            return {
              ok: true,
              error: null,
              token: "Coming Soon",
            };
          } else {
            return {
              ok: true,
              error: null,
              token: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
      },
    },
  };
  
  export default resolvers;
  ```

  - 흐름
    - 넘겨받은 번호와 키를 가진 Verification이 없다면 `not valid` 에러를 리턴
    - 찾았다면 해당 Verification의 `verified` 값을 true로 변경 후 저장
    - verification을 찾은 경우에는 아직 return을 하지 않았으므로, 추가로 `try-catch` 를 통해 return 을 실시
    - phoneNumber를 통해 user를 찾고, 해당 user의 `verifiedPhoneNumber`를 true로 변경 후 저장
    - 토큰을 발행(로그인)
    - 만약 user가 없다면(가입 단계라면) `ok`  true값, `token`은 null 을 가지는 객체를 반환
    - 이후 로그인 진행
  - type 및 entity 변경
    - Verification Entity에 `verified` column을 추가
    - 인증 진행 중인 번호로 이미 인증이 이루어졌다면, 확인 단계 거치지 않고 유저를 로그인 시키기 위함

## 2.39 EmailSignup Resolver

- EmailSignUp.graphql

  ```
  type EmailSignUpResponse {
    ok: Boolean!
    error: String
    token: String
  }
  
  type Mutation {
    EmailSignUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      profilePhoto: String!
      age: Int!
      phoneNumber: String!
    ): EmailSignUpResponse!
  }
  ```

- EmailSignUp Resolvers

  ```typescript
  import { Resolvers } from "src/types/resolvers";
  import { EmailSignInMutationArgs, EmailSignUpResponse } from "src/types/graph";
  import User from "src/entities/User";
  
  const resolvers: Resolvers = {
    Mutation: {
      EmailSignUp: async (
        _,
        args: EmailSignInMutationArgs
      ): Promise<EmailSignUpResponse> => {
        const { email } = args;
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return {
              ok: false,
              error: "You should log in instead",
              token: null,
            };
          } else {
            const newUser = await User.create({ ...args }).save();
            return {
              ok: true,
              error: null,
              token: "Coming soon",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            token: null,
          };
        }
      },
    },
  };
  
  export default resolvers;
  ```

  - 흐름
    - 만약 email에 해당하는 유저가 있다면 login 하도록 에러를 return
    - 없다면 받은 args를 가지고 새로운 User를 생성
  - newUser 정의 후 사용하지 않았기 때문에 에러 발생
    - newUser를 이용해 JWT를 만들어 return 문의 token에 사용

## 2.40 Creating Custom JWT

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

  - [velopert|JSON Web Token](https://velopert.com/2389)

    - user가 API 서버로 request를 보낼 때, 함께 보내는 토큰

  - 설치

    ```bash
    $ npm i jsonwebtoken
    $ npm i @types/jsonwebtoken --save-dev
    ```

  - `payload`와 `secret key`를 담아서 `jwt.sign(payload, jwt)` method로 token 생성

    - payload
      - token에 담고 싶은 정보
    - secret key
      - token 암호화 및 해석에 필요한 키
      - [Strong Random Password Generator](https://passwordsgenerator.net/)

    ```typescript
    import jwt from "jsonwebtoken";
    
    const createJWT = (id: number): string => {
      const token = jwt.sign(
        {
          id,
        },
        process.env.JWT_TOKEN || ""
      );
      return token;
    };
    
    export default createJWT;
    ```

## 2.41 Authenticating Users with Custom JWT

- authentication 관련 Resolvers 들에 jwt를 적용
  - user의 id를 받아와서, token을 생성
  - return 객체의 token에 생성한 token을 적용
- 해당 resolvers
  - FacebookConnect
  - EmailSignUp
  - EmailSignIn
  - CompletePhoneVerification

## 2.42 Testing Authentication Resolvers

## 2.43~44 Custom Auth Middleware on Express

- custom middelware를 통해 JWT 열기
  - request의 header에 있는 `X-JWT (변경 가능한 이름)` 에 접근해서, token에 들어있는 `id`를 얻음
  - `id` 에 해당하는 `user`를 찾음
- Express middleware 의 args
  - express middleware 생성 시,  `req`, `res`, `next` 를 자동으로 받는다
  - 각각 request, response, 다음 middleware 호출
    - middleware 종료 시점에 `next()` 를 호출해줘야 한다
- decodeJWT
  - `jwt.verify()` method를 사용
  - token과 secret key를 args로 받아서 검증
    - token을 오픈한 객체를 return

## 2.45 Using Resolver Context for Authentication

- middleware 에서 찾은 `user`를 어떻게 사용할 것인가
  - 찾은 user를 다시 `req` 객체 안에 넣어서 graphql server로
  - `context`를 활용
  - 모든 resolver에서 3번째 args에 해당하는 `context`를 사용해, context에 접근할 수 있음

## 2.46 GetMyProfile Resolver

- GetMyProfile.graphql

  ```
  type GetMyProfileResponse {
    ok: Boolean!
    error: String
    user: User
  }
  
  type Query {
    GetMyProfile: GetMyProfileResponse!
  }
  ```

- GetMyProfile Resolvers

  - resolver의 context 안에 있는 user를 사용
    - middleware에서 req의 헤더에 있는 토큰을 통해 user를 찾고 req.user에 할당
    - graphql 시작 시, schema와 함께 context를 받고, 이때 req에 대해 req.request를 context에 담도록 설정

  ```typescript
  import { Resolvers } from "../../../types/resolvers";
  
  const resolvers: Resolvers = {
    Query: {
      GetMyProfile: async (_, __, { req }) => {
        const { user } = req;
        return {
          ok: true,
          error: null,
          user,
        };
      },
    },
  };
  
  export default resolvers;
  ```

## 2.47 Protecting Resolvers with Middlewares

- protect resolver

  - 로그인 후 사용 가능한 기능들에 대해, user를 갖고 있지 못한 요청들을 거부하는 것

  - `privateResolver` 를 거쳐서 context 내 user가 존재할 때만, 목표 Resolver를 호출하도록 구조

    - `privateResolver`는 resolver 에 해당하는 function을 인자로 받아서 호출
    - 개별 resolver 앞에 `if~else` 를 붙이는 구조와 동일한 결과

  - 정의

    ```typescript
    // privateResolver.ts
    
    const privateResolver = (resolverFunction) => async (
      parent,
      args,
      context,
      info
    ) => {
      if (!context.req.user) {
        throw new Error("No JWT. I refuse to proceed.");
      }
      const resolved = await resolverFunction(parent, args, context, info);
      return resolved;
    };
    
    export default privateResolver;
    ```

  - 적용

    - resolver를 `privateResolver`의 인자로 넘겨줌

    ```typescript
    // GetMyProfile.resolvers.ts
    
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    
    const resolvers: Resolvers = {
      Query: {
        GetMyProfile: privateResolver(async (_, __, { req }) => {
          const { user } = req;
          return {
            ok: true,
            error: null,
            user,
          };
        }),
      },
    };
    
    export default resolvers;
    
    ```

- currying

  - [Modern JS Ttutorial|Currying function](https://ko.javascript.info/currying-partials)
  - [Blog|JS Currying](https://edykim.com/ko/post/writing-a-curling-currying-function-in-javascript/)

- [babeljs.io|Try It Out]([https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.11.4&externalPlugins=](https://babeljs.io/repl#?browsers=defaults%2C not ie 11%2C not ie_mob 11&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.11.4&externalPlugins=))

  - code를 입력하면, compile 되기 전의 code를 보여줌

  ```JS
  // privateResolver.ts compile 전
  // async/await 구문 제외한 코드
  
  var privateResolver = function privateResolver(resolverFunction) {
    return function (parent, args, context, info) {
      if (!context.req.user) {
        throw new Error("No JWT. I refuse to proceed.");
      }
  
      var resolved = resolverFunction(parent, args, context, info);
      return resolved;
    };
  };
  
  var _default = privateResolver;
  exports.default = _default;
  ```

## 2.48~50 Sending Confirmation Email

- [mailgun](https://www.mailgun.com/)

  - 이메일 전송 API

  - [mailgun.js](https://www.npmjs.com/package/mailgun-js)

  - 설치

    ```bash
    $ npm i mailgun-js
    $ npm i @types/mailgun-js --save-dev
    ```

- `src/utils` 폴더 내에 sendEmail.ts 파일을 생성

  - 이메일을 보내는 함수를 정의한 후
  - EmailSignUp Resolvers에서 사용

- sendEmail

  ```typescript
  // sendEmail.ts
  
  import Mailgun from "mailgun-js";
  
  const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandboxd450e169c47441c482686592965902ce.mailgun.org",
  });
  
  const sendEmail = (subject: string, html: string) => {
    const emailData = {
      from: "dudqn136@naver.com",
      to: "dudqn136@naver.com",
      subject,
      html,
    };
    return mailGunClient.messages().send(emailData);
  };
  
  export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/>here</a>`;
    return sendEmail(emailSubject, emailBody);
  };
  ```

  - `apiKey`, `domain` 을 가진 mailGunClient 생성
  - 해당 client로 `from`, `to`, `subject` , `html` 정보를 가진 메일을 전송

- EmailSignUp Resolvers

  ```typescript
  // EmailSignUp.resovers.ts
  
  const resolvers: Resolvers = {
    Mutation: {
      EmailSignUp: async (
        _,
        args: EmailSignUpMutationArgs
      ): Promise<EmailSignUpResponse> => {
  	  // ...
        if (phoneVerification) {
          const newUser = await User.create({ ...args }).save();
          if (newUser.email) {
            const emailVerification = await Verification.create({
              payload: newUser.email,
              target: "EMAIL",
            }).save();
            await sendVerificationEmail(
              newUser.fullName,
              emailVerification.key
            );
          }
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "You haven't verified your phone number",
            token: null,
          };
        }
  	  // ...
  export default resolvers
  ```

  - 이메일 가입 시, 해당 전화번호로 인증된 Verification이 있는 지 확인
    - 있다면 입력받은 이메일로 인증 이메일을 전송
    - 없다면, 전화번호 인증 되지 않았다는 error를 전송

## 2.51 Testing Email Sending

## 2.52 RequestEmailVerification Resolver

- RequestEmailVerification.graphql

  - context의 token을 통해 email을 받아올 것이므로, args 를 갖지 않는다

  ```
  type RequestEmailVerificationResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    RequestEmailVerification: RequestEmailVerificationResponse!
  }
  ```

- RequestEmailVerification Resolver

  - 흐름

    - `privateResolver()` 를 거쳐서 호출
    - context의 user에 접근해서 email을 받음
      - 이때 해당 user의 verifiedEmail이 true라면 이미 인증이 완료된 상태이므로, 인증메일을 전송하지 않음
    - 해당 email로 진행됐던 전화번호 인증 verification을 삭제한 후, email verification을 새로 생성
    - sendVerificationEmail로 인증메일 발송

  - 구현

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import Verification from "../../../entities/Verification";
    import { sendVerificationEmail } from "../../../utils/sendEmail";
    import { RequestEmailVerificationResponse } from "../../../types/graph";
    
    const resolvers: Resolvers = {
      Mutation: {
        RequestEmailVerification: privateResolver(
          async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
            const user: User = req.user;
            if (user.email && !user.verifiedEmail) {
              try {
                const oldVerification = await Verification.findOne({
                  payload: user.email,
                });
                if (oldVerification) {
                  oldVerification.remove();
                }
                const newVerification = await Verification.create({
                  payload: user.email,
                  target: "EMAIL",
                }).save();
                await sendVerificationEmail(user.fullName, newVerification.key);
                return {
                  ok: true,
                  error: null,
                };
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                };
              }
            } else {
              return {
                ok: false,
                error: "Your user has no email to verify",
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.53 CompleteEmailVerification Resolver

- CompleteEmailVerification.graphql

  ```
  type CompleteEmailVerificationResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!
  }
  ```

- CompleteEmailVerification resolver

  - 흐름

    - user는 Request와 동일하게, context에서 받아와서 사용
    - 

  - 구현

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import Verification from "../../../entities/Verification";
    import {
      CompleteEmailVerificationMutationArgs,
      CompleteEmailVerificationResponse,
    } from "../../../types/graph";
    
    const resolvers: Resolvers = {
      Mutation: {
        CompleteEmailVerification: privateResolver(
          async (
            _,
            args: CompleteEmailVerificationMutationArgs,
            { req }
          ): Promise<CompleteEmailVerificationResponse> => {
            const user: User = req.user;
            const { key } = args;
            if (user.email) {
              try {
                const verification = await Verification.findOne({
                  key,
                  payload: user.email,
                });
                if (verification) {
                  user.verifiedEmail = true;
                  user.save();
                  return {
                    ok: true,
                    error: null,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Can't verify email",
                  };
                }
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                };
              }
            } else {
              return {
                ok: false,
                error: "No email to verify",
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.54 Testing Email Verification Resolvers

## 2.55~56 UpdateMyProfile Resolver

- UpdateMyProfile.graphql

  ```
  type UpdateMyProfileResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    UpdateMyProfile(
      firstName: String
      lastName: String
      email: String
      password: String
      profilePhoto: String
      age: Int
    ): UpdateMyProfileResponse!
  }
  ```

- UpdateMyProfile resolver

  ```typescript
  import { Resolvers } from "../../../types/resolvers";
  import privateResolver from "../../../utils/privateResolver";
  import {
    UpdateMyProfileMutationArgs,
    UpdateMyProfileResponse,
  } from "../../../types/graph";
  import User from "../../../entities/User";
  
  const resolvers: Resolvers = {
    Mutation: {
      UpdateMyProfile: privateResolver(
        async (
          _,
          args: UpdateMyProfileMutationArgs,
          { req }
        ): Promise<UpdateMyProfileResponse> => {
          const user: User = req.user;
          const notNull = {};
          Object.keys(args).forEach((key) => {
            if (args[key] !== null) {
              notNull[key] = args[key];
            }
          });
          try {
            await User.update({ id: user.id }, { ...notNull });
            return {
              ok: true,
              error: null,
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        }
      ),
    },
  };
  
  export default resolvers;
  ```

  - null handling

    - notNull 객체를 만들고, args 중 값이 null이 아닌 key와 값을 notNull에 저장한 후, notNull을 update에 넘겨주는 방식
    - cf) User.update() 를 통한 업데이트는 인스턴스 존재 여부를 확인하지 않는다

  - password hash 관련 handling

    - User entity의 `@BeforeUpdate()` 를 trigger하기 위해서는, User.update() 를 사용하면 안된다
    - User entity의 인스턴스인 user를 update해야 정상적으로 trigger 가능하다
    - password 변경의 경우에는 user 인스턴스를 직접 바꾸도록 분기

    ```typescript
    if (args.password !== null) {
      user.password = args.password;
      user.save();
    }
    ```

## 2.57 ToggleDrivingMode Resolver

- `toggleDrivingMode` and `Report Location / Orientation` 

  - User에 관한 내용이므로 UpdateMyProfile resolver를 통해 변경도 가능
  - 하지만, 두 가지 기능은 `publish notifications` 를 포함해야 하고, 자칫 UpdateMyProfile resolver의 크기를 지나치게 크게 만들 수 있으므로 따로 resolver를 정의

- ToggleDrivingMode.graphql

  ```
  type ToggleDrivingModeResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    ToggleDrivingMode: ToggleDrivingModeResponse!
  }
  ```

- ToggleDrivingMode resolver

  - context에 있는 user의 `isDriving`을 현재 값의 반대로 변경 후 저장

  ```typescript
  
  ```

- cf) Auto import relative path with typescript

  ```json
  // settings.json
  {
      // ...
      "typescript.preferences.importModuleSpecifier": "relative"
      // ...
  }
  ```


## 2.58 ReportMovement Resolver

- cleanNullArgs

  - null 값을 갖는 key들을 제외하는 기능을 따로 파일에 정의
  - export 하여 재사용

  ```typescript
  const cleanNullArgs = (args: object): object => {
    const notNull = {};
    Object.keys(args).forEach((key) => {
      if (args[key] !== null) {
        notNull[key] = args[key];
      }
    });
    return notNull;
  };
  
  export default cleanNullArgs;
  ```

- ReportMovement .graphql

  ```
  type ReportMovementResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    ReportMovement(
      orientation: Float
      lastLat: Float
      lastLng: Float
    ): ReportMovementResponse!
  }
  ```

- ReportMovement  resolver

  - 흐름

    - context에서 user를 읽어 옴
    - args로 `orientation, lat, lng`를 받음
    - null 값을 갖는 key들을 제외한 후 업데이트

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import {
      ReportMovementMutationArgs,
      ReportMovementResponse,
    } from "../../../types/graph";
    import User from "../../../entities/User";
    import cleanNullArgs from "../../../utils/cleanNullArgs";
    
    const resolvers: Resolvers = {
      Mutation: {
        ReportMovement: privateResolver(
          async (
            _,
            args: ReportMovementMutationArgs,
            { req }
          ): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try {
              await User.update({ id: user.id }, { ...notNull });
              return {
                ok: true,
                error: null,
              };
            } catch (error) {
              return {
                ok: false,
                error: error.message,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.59 AddPlace Resolver

- AddPlace.graphql

  ```
  type AddPlaceResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    AddPlace(
      name: String!
      lat: Float!
      lng: Float!
      address: String!
      isFav: Boolean!
    ): AddPlaceResponse!
  }
  ```

- AddPlace resolver

  - 변경

    - User entity에 `places` 추가

      ```typescript
      @OneToMany((type) => Place, (place) => place.user)
        places: Place[];
      ```

    - Place entity에 `user` 추가

      ```typescript
      @ManyToOne((type) => User, (user) => user.places)
        user: User;
      ```

  - 코드

    ```typescript
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import Place from "../../../entities/Place";
    import { Resolvers } from "../../../types/resolvers";
    import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
    
    const resolvers: Resolvers = {
      Mutation: {
        AddPlace: privateResolver(
          async (
            _,
            args: AddPlaceMutationArgs,
            { req }
          ): Promise<AddPlaceResponse> => {
            const user: User = req.user;
            try {
              await Place.create({ ...args, user }).save();
              return {
                ok: true,
                error: null,
              };
            } catch (error) {
              return {
                ok: false,
                error: error.message,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.60 EditPlace Resolver

- EditPlace.graphql

  ```
  type EditPlaceResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    EditPlace(placeId: Int!, name: String, isFav: Boolean): EditPlaceResponse!
  }
  ```

- EditPlace resolver

  - 흐름

    - args 에 담긴 placeId로 Place 인스턴스를 탐색
    - 있으면 place의 userId와 현재 context에 담긴 (request를 보낸) user의 id가 같은지 비교
    - 같다면 EditPlace 진행

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import Place from "../../../entities/Place";
    import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
    import cleanNullArgs from "../../../utils/cleanNullArgs";
    
    const resolvers: Resolvers = {
      Mutation: {
        EditPlace: privateResolver(
          async (
            _,
            args: EditPlaceMutationArgs,
            { req }
          ): Promise<EditPlaceResponse> => {
            const user: User = req.user;
            try {
              const place = await Place.findOne({ id: args.placeId });
              if (place) {
                if (place.userId === user.id) {
                  const notNull = cleanNullArgs(args);
                  await Place.update({ id: args.placeId }, { ...notNull });
                  return {
                    ok: true,
                    error: null,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Not authorized",
                  };
                }
              } else {
                return {
                  ok: false,
                  error: "Place not found",
                };
              }
            } catch (error) {
              return {
                ok: false,
                error: error.message,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    
    ```

  - typeorm short-cut for `id`

    ```typescript
    // Place.ts
    
    @Column({ nullable: true })
      userId: number;
    
    @ManyToOne((type) => User, (user) => user.places)
      user: User;
    ```

    - typeorm은 place 인스턴스를 불러올 때,  relations를 자동으로 함께 불러오지 않는다

    - 원래는 아래와 같이 findOne의 두번째 인자로 relations 정보를 넘겨줘야 한다

      ```typescript
      const place = await Place.findOne({ id: args.placeId }, { relations: ["user"] })
      ```

    - 하지만 위의 방식은, userId 와 같은 하나의 필드값을 가져오기 위해 수많은 쓰지않을 필드들을 함께 가져온다

    - Entity 정의 시, relation column을 정의한 후, 해당 Column 뒤에 `Id`를 붙이고 위와 같이 정의하면 자동으로 해당 Column의 id로 연동된다

## 2.61 DeletePlace Resolver

- DeletePlace.graphql

  ```
  type DeletePlaceResponse {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    DeletePlace(placeId: Int!): DeletePlaceResponse!
  }
  ```

- DeletePlace resovler

  - 흐름

    - placeId를 받아와서 해당하는 place가 있는지 확인
    - 있다면 request를 보낸 user의 id와 place의 userId가 동일한지 확인
    - 동일하다면 삭제

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import Place from "../../../entities/Place";
    import {
      DeletePlaceMutationArgs,
      DeletePlaceResponse,
    } from "../../../types/graph";
    
    const resolvers: Resolvers = {
      Mutation: {
        DeletePlace: privateResolver(
          async (
            _,
            args: DeletePlaceMutationArgs,
            { req }
          ): Promise<DeletePlaceResponse> => {
            const user: User = req.user;
            try {
              const place = await Place.findOne({ id: args.placeId });
              if (place) {
                if (place.userId === user.id) {
                  place.remove();
                  return {
                    ok: true,
                    error: null,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Not authorized",
                  };
                }
              } else {
                return {
                  ok: false,
                  error: "Place not found",
                };
              }
            } catch (error) {
              return {
                ok: true,
                error: error.message,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.62 GetMyPlaces Resolver and Testing

- GetMyPlaces.graphql

  ```
  type GetMyPlacesResponse {
    ok: Boolean!
    error: String
    places: [Place]
  }
  
  type Query {
    GetMyPlaces: GetMyPlacesResponse!
  }
  ```

- GetMyPlaces resolver

  - 흐름

    - request보내는 user의 id를 받아와서, 해당 User 인스턴스를 다시 불러온다

    - 이는 places를 relations에 추가해서 받아오기 위함

      ```typescript
      const user = await User.findOne({ id: req.user.id }, { relations: ["places"] });
      ```

    - places를 포함한 user가 있다면 리턴

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import { GetMyPlacesResponse } from "../../../types/graph";
    import User from "../../../entities/User";
    
    const resolvers: Resolvers = {
      Query: {
        GetMyPlaces: privateResolver(
          async (_, __, { req }): Promise<GetMyPlacesResponse> => {
            try {
              const user = await User.findOne(
                { id: req.user.id },
                { relations: ["places"] }
              );
              if (user) {
                return {
                  ok: true,
                  error: null,
                  places: user.places,
                };
              } else {
                return {
                  ok: false,
                  error: "User not found",
                  places: null,
                };
              }
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                places: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.63~64 GetNearbyDrivers

- GetNearbyDrivers.graphql

  ```
  type GetNearbyDriversResponse {
    ok: Boolean!
    error: String
    drivers: [User]
  }
  
  type Query {
    GetNearbyDrivers: GetNearbyDriversResponse!
  }
  ```

- GetNearbyDrivers resolver

  - 흐름

    - request를 보낸 user의 `lastLat`, `lastLng`에 `+/-0.05` 이내에 있는 운전중인 User entity들

  - [typeorm find options](https://typeorm.io/#/find-options)

    - `Between` of typeorm

      - 위 내 값을 갖는 경우를 탐색할 때

    - [active record vs data mapper](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper#what-is-the-data-mapper-pattern)

      - [active record pattern](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper#what-is-the-active-record-pattern)
        - `BaseEntity` 를 extends하여 entity 정의
        - 현재 project 의 entity 정의 시 사용한 방법
      - [data mapper pattern](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper#what-is-the-data-mapper-pattern)
        - `repository` 를 사용
      - operator는 Active Record에서 작동하지 않는다
        - `getRepository` 와 `getConnection`을 통해 해결

      ```typescript
      const drivers = await getRepository(User).find({
        isDriving: true,
        lastLat: Between(lastLat - 0.05, lastLat + 0.05),
        lastLng: Between(lastLng - 0.05, lastLng + 0.05),
      });
      ```

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import { GetNearbyDriversResponse } from "../../../types/graph";
    import { Between, getRepository } from "typeorm";
    
    const resolvers: Resolvers = {
      Query: {
        GetNearbyDrivers: privateResolver(
          async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
            const user: User = req.user;
            const { lastLat, lastLng } = user;
            try {
              const drivers: User[] = await getRepository(User).find({
                isDriving: true,
                lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                lastLng: Between(lastLng - 0.05, lastLng + 0.05),
              });
              return {
                ok: true,
                error: null,
                drivers,
              };
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                drivers: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.65~66 DriversSubscription

- [subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

  - 계속 주시하다가 변화가 생기는 경우에 확인
  - `PubSub` 을 사용해 subscription 서버 생성
    - cf) publish subscription

  ```typescript
  // app.ts
  
  class App {
    public app: GraphQLServer;
    public pubSub: any;
    constructor() {
      this.pubSub = new PubSub();
      this.pubSub.ee.setMaxListeners(99);
      // ...
    }
  }
  
  export default new App().app;
  ```

  - PubSub은 데모버전과 같다

    - 제품화 단계에서는 [Redes](https://redis.io/topics/pubsub)나 [Memcached](https://memcached.org/) 같은 걸 사용해야 한다
    - [참고|Redis vs Memcached](https://americanopeople.tistory.com/148)

  - context에 PubSub 인스턴스인 `pubSub` 을 넣어주고 필요한 resolver에서 받아서 사용

    ```typescript
    // app.ts
    
    class App {
      //...
      this.app = new GraphQLServer({
          schema,
          context: req => {
              return {
                  req: req.request,
                  pubSub: this.pubSub
              }
          }
      })
      //...
    }
    
    export default new App().app;
    ```

- DriversSubscription.graphql

  ```
  type Subscription {
    DriversSubscription: User
  }
  ```

- DriversSubscription Resolver

  - 흐름

    - context에 있는 PubSub 인스턴스를 받아옴
    - 받아온 pubSub의 asyncIterator를 return
      - 이때 subscribe할 채널을 넣어서 return
      - ex) driverUpdate

  - 코드

    ```typescript
    const resolvers = {
      Subscription: {
        DriversSubscription: {
          subscribe: (_, __, { pubSub }) => {
            return pubSub.asyncIterator("driverUpdate");
          },
        },
      },
    };
    
    export default resolvers;
    ```

- ReportMovement resolver 변경

  - context에 있는 pubSub을 받음

  - User의 위치가 변경되었을 때, driverUpdate 채널로 publish

    - publish하면 listening 중이던 resolver 에서 감지하고 payload를 받음
    - cf) 이때, 해당 User가 현재 채팅에 참여하고 있는 User인지 filtering 해야한다(Authenticating Subscription)

  - publish()는 두가지 인자를 받는다

    - 첫번째는 publish할 채널
    - 두번째는 payload (보낼 데이터)
      - 이때 payload는 graphql 파일에서 정의한 `type Subscription` 안의 이름과 일치해야 한다

    ```typescript
    // ReportMovement.resolvers.ts
    
    const resolvers: Resolvers = {
      Mutation: {
        ReportMovement: privateResolver(
        // ...
        await User.update({ id: user.id }, { ...notNull });
        pubSub.publish("driverUpdate", { DriversSubscription: user });
        // ...
        )
      }
    }
    export default resolvers
    ```


## 2.67~68 Authentication WebSocket Subscription

- `appOptions` for subscription

  - [Apollo GraphQL | Authentication Over WebSocket](https://www.apollographql.com/docs/graphql-subscriptions/authentication/)

  - subscription 시작 될 때, 몇가지 커스터마이즈가 가능

    - `onConnect`에 함수를 넘겨줌

  - 인증 완료시 서버 메모리가 기억할 수 있도록 connect

  - `connectionParams`를 통해 JWT 토큰을 받아와서 decode하는 과정을 추가

    - middleware와 비슷하지만, http 통신이 아닌, WebSocket connection을 위한 과정

  - `onConnect`에서 return 하는 객체 안의 `currentUser`값이 `req.connection.context`에 저장 됨

    - 이걸 다시 app context 에 넣어줘서 사용

    ```typescript
    // index.ts
    
    const appOptions: Options = {
      // ...
      subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async (connectionParams) => {
          const token = connectionParams["X-JWT"];
          if (token) {
            const user = await decodeJWT(token);
            return {
              currentUser: user,
            };
          } else {
            return {
              currentUser: null,
            };
          }
        },
      },
    };
    ```

## 2.69~70 Filtering Subscription Messages 

- 알림을 보낼 driver 들을 필터링

  - 채널로 보내는 알림을 막지는 못한다
  - 유저가 채널로부터 알림을 받을 것인지 여부에 따라 필터링

- `withFilter`를 사용

  - [Apollo graphql | Filter Subscriptions](https://www.apollographql.com/docs/graphql-subscriptions/setup/#filter-subscriptions)
  - 첫번째 인자로는 `asyncIteratorFn`을, 두번째 인자로는 `filterFn`을 받는다
    - filterFn의 return 값이 true / false인지에 따라 필터링
  - request를 보내는 user와, 알림을 보내는 driver에 해당하는 user의 lastLat과 lastLng을 비교해서 가까이 있는지 판단
    - 이때 user의 정보는 context에서, driver의 정보는 payload에서 가져온다

- ```typescript
  // DriverSubscription.resolvers.ts
  
  import { withFilter } from "graphql-yoga";
  import User from "../../../entities/User";
  
  const resolvers = {
    Subscription: {
      DriversSubscription: {
        subscribe: withFilter(
          (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
          (payload, _, { context }) => {
            const user: User = context.currentUser;
            const {
              DriversSubscription: {
                lastLat: driverLastLat,
                lastLng: driverLastLng,
              },
            } = payload;
            const { lastLat: userLastLat, lastLng: userLastLng } = user;
            return (
              driverLastLat >= userLastLat - 0.05 &&
              driverLastLat <= userLastLat + 0.05 &&
              driverLastLng >= userLastLng - 0.05 &&
              driverLastLng <= userLastLng + 0.05
            );
          }
        ),
      },
    },
  };
  
  export default resolvers;
  ```

- error fix

  - ReportMovement  resolver에서, user 정보 업데이트 후 업데이트 된 유저가 아닌 이전 유저를 그대로 사용

  - 업데이트 한 후 user.id를 통해 다시 findOne해서 가져와서 사용 (채널에 publish)

    ```typescript
    // ReportMovement.resolvers.ts
    
    await User.update({ id: user.id }, { ...notNull });
    const updatedUser = await User.findOne({ id: user.id });
    pubSub.publish("driverUpdate", { DriversSubscription: updatedUser });
    ```


## 2.71 RequestRide Resolver

- Ride entity 수정

  - `status` column에 default로 `"Requesting"` 부여

    - Ride 생성되는 경우는 Request하는 경우이기 때문

      ```typescript
      @Column({
        type: "text",
        enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
        default: "REQUESTING",
      })
      status: rideStatus;
      ```

  - `driver` column에 `nullable: true` 속성 부여

    - 요청이 승낙되기 전에는 driver가 비어있기 때문

      ```typescript
      @ManyToOne((type) => User, (user) => user.ridesAsDriver, { nullable: true })
      driver: User
      ```

- RequestRide.graphql

  ```
  type RequestRideResponse {
    ok: Boolean!
    error: String
    ride: Ride
  }
  
  type Mutation {
    RequestRide(
      pickUpAddress: String!
      pickUpLat: Float!
      pickUpLng: Float!
      dropOffAddress: String!
      dropOffLat: Float!
      dropOffLng: Float!
      price: Float!
      distance: String!
      duration: String!
    ): RequestRideResponse!
  }
  ```

- RequestRide resolver

  - 흐름

    - 필요한 정보들을 args로 받아옴
    - context에서 request를 보내는 user를 받아옴
    - 정보들을 가지고 Ride 인스턴스 생성

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import {
      RequestRideMutationArgs,
      RequestRideResponse,
    } from "../../../types/graph";
    import User from "../../../entities/User";
    import Ride from "../../../entities/Ride";
    
    const resolvers: Resolvers = {
      Mutation: {
        RequestRide: privateResolver(
          async (
            _,
            args: RequestRideMutationArgs,
            { req }
          ): Promise<RequestRideResponse> => {
            const user: User = req.user;
            try {
              const ride = await Ride.create({ ...args, passenger: user }).save();
              return {
                ok: true,
                error: null,
                ride,
              };
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                ride: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.72 GetNearbyRide Resolver

- GetNearbyRide.graphql

  ```
  type GetNearbyRidesResponse {
    ok: Boolean!
    error: String
    ride: Ride
  }
  
  type Query {
    GetNearbyRides: GetNearbyRidesResponse!
  }
  ```

- GetNearbyRide resolver

  - 흐름

    - request를 보낸 user가 driver일 때 (`isDriving`이 true일때)
    - Ride 인스턴스 중 status가 `"REQUESTING"`이고, driver의 현재 위치와 가까이 있는 인스턴스를 읽어 옴
    - 찾지 못해로 따로 error를 return하지는 않는다

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import { GetNearbyRidesResponse } from "../../../types/graph";
    import User from "../../../entities/User";
    import { getRepository, Between } from "typeorm";
    import Ride from "../../../entities/Ride";
    
    const resolvers: Resolvers = {
      Query: {
        GetNearbyRides: privateResolver(
          async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
            const user: User = req.user;
            if (user.isDriving) {
              const { lastLat, lastLng } = user;
              try {
                const ride = await getRepository(Ride).findOne({
                  status: "REQUESTING",
                  pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                  pickUpLng: Between(lastLng - 0.05, lastLng + 0.05),
                });
                if (ride) {
                  return {
                    ok: true,
                    error: null,
                    ride,
                  };
                } else {
                  return {
                    ok: true,
                    error: null,
                    ride: null,
                  };
                }
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                  ride: null,
                };
              }
            } else {
              return {
                ok: false,
                error: "You are not a driver",
                ride: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.73 NearbyRideSubscription

- NearbyRideSubscription.graphql

  ```
  type Subscription {
    NearbyRideSubscription: Ride
  }
  ```

- RequestRide resolver 수정

  - 새로운 Ride entity 생성 시 `"rideRequest"` 채널로 알림

    ```typescript
    // RequestRide.resolvers.ts
    
    const ride = await Ride.create({ ...args, passenger: user }).save();
    pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
    ```

- NearbyRideSubscription resolver

  - 흐름

    - withFilter를 통해, 요청을 보내는 user(`driver`) 의 위치와 가까이 있는 `pickUpLat`, `pickUpLng` 을 가진 Ride entity에 대한 알림을 받음

  - 코드

    ```typescript
    import { withFilter } from "graphql-yoga";
    import User from "../../../entities/User";
    
    const resolvers = {
      Subscription: {
        NearbyRideSubscription: {
          subscribe: withFilter(
            (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
            (payload, _, { context }) => {
              const user: User = context.currentUser;
              const {
                NearbyRideSubscription: { pickUpLat, pickUpLng },
              } = payload;
              const { lastLat: userLastLat, lastLng: userLastLng } = user;
              return (
                pickUpLat >= userLastLat - 0.05 &&
                pickUpLat <= userLastLat + 0.05 &&
                pickUpLng >= userLastLng - 0.05 &&
                pickUpLng <= userLastLng + 0.05
              );
            }
          ),
        },
      },
    };
    
    export default resolvers;
    ```

## 2.74 Testing the NearbyRideSubscription

- RequestRide resolver 수정

  - 현재 차에 타있지 않은 user만 request 할 수 있도록
  - ride request 생성한 후에 `isRiding`을 true로 바꿔서 한 번에 하나의 request만 가능하도록

  ```typescript
  if (!user.isRiding) {
    try {
      const ride = await Ride.create({ ...args, passenger: user }).save();
      pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
      user.isRiding = true;
      user.save();
      return {
        ok: true,
        error: null,
        ride,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        ride: null,
      };
    }
  } else {
    return {
      ok: false,
      error: "You can't request two rides",
      ride: null,
      };
    }
  }
  ```

## 2.75~76 UpdateRideStatus Resolver

- UpdateRideStatus.graphql

  - [graphql enum](https://graphql-kr.github.io/learn/schema/#)
    - 열거형 타입
    - 주어진 선택지 내의 값만 가질 수 있다

  ```
  type UpdateRideStatusResponse {
    ok: Boolean!
    error: String
  }
  
  enum StatusOptions {
    ACCEPTED
    FINISHED
    CANCELED
    REQUESTING
    ONROUTE
  }
  
  type Mutation {
    UpdateRideStatus(
      rideId: Int!
      status: StatusOptions!
    ): UpdateRideStatusResponse!
  }
  ```

- UpdateRideStatus resolver

  - 흐름

    - ridestatus를 변경하는 주체는 driver
      - req.user의 isDriving 이 true 일 때만 정상 진행
    - request를 수락하려고 한다면 ('ACCEPTED'로 바꾸려고 한다면), rideId를 통해 status가 'REQUESTING'인 Ride 인스턴스를 찾음
      - 수락하는 경우, ride의 driver에 user를 할당
      - user의 isTaken을 true로 변경
    - 이미 request가 수락된 상태라면(그 외의 태로 바꾸려고 한다면, rideId를 통해 driver가 req.user인 Ride 인스턴스를 찾음 
    - 찾은 Ride 인스턴스의 status를 args에 담긴 status로 변경

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import {
      UpdateRideStatusMutationArgs,
      UpdateRideStatusResponse,
    } from "../../../types/graph";
    import Ride from "../../../entities/Ride";
    
    const resolvers: Resolvers = {
      Mutation: {
        UpdateRideStatus: privateResolver(
          async (
            _,
            args: UpdateRideStatusMutationArgs,
            { req }
          ): Promise<UpdateRideStatusResponse> => {
            const user: User = req.user;
            if (user.isDriving) {
              try {
                let ride: Ride | undefined;
                if (args.status === "ACCEPTED") {
                  ride = await Ride.findOne({
                    id: args.rideId,
                    status: "REQUESTING",
                  });
                  if (ride) {
                    ride.driver = user;
                    user.isTaken = true;
                    user.save();
                  }
                } else {
                  ride = await Ride.findOne({
                    id: args.rideId,
                    driver: user,
                  });
                }
                if (ride) {
                  ride.status = args.status;
                  ride.save();
                  return {
                    ok: true,
                    error: null,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Can't update ride",
                  };
                }
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                };
              }
            } else {
              return {
                ok: false,
                error: "You are not driving",
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```


## 2.77 GetRide Resolver

- GetRide.graphql

  ```
  type GetRideResponse {
    ok: Boolean!
    error: String
    ride: Ride
  }
  
  type Query {
    GetRide(rideId: Int!): GetRideResponse!
  }
  ```

- typeorm findOne 활용

  - Ride 인스턴스의 passenger.id와 driver.id가 필요한 경우

  - `relations` 옵션을 통해 `ManyToOne` Column에 속하는 passenger나 driver를 함께 불러올 수도 있지만,  passenger/ driver에 해당하는 user 객체 전체를 가져오기 때문에 비효율

    ```typescript
    // GetRide.resolvers.ts
    
    const ride = await Ride.findOne(
        { id: args.rideId }, 
        { relations: ["passenger", "driver"]}
    )
    ```

  - typeorm은 `relations column`에 해당하는 entity에 대해 특별한 기능을 제공

    - ex) passenger column의 id를 가져오려고 할때, 객체를 가져온 후 `.id`로 받아오는 대신, Ride 인스턴스에 `passengerId` column을 추가

      ```typescript
      // Ride.ts
      
      @Entity()
      class Ride extends BaseEntity {
        // ...
        
        @Column({ nullable: true })
        passengerId: number;
      
        @ManyToOne((type) => User, (user) => user.ridesAsPassenger)
        passenger: User;
      
        @Column({ nullable: true })
        driverId: number;
      
        @ManyToOne((type) => User, (user) => user.ridesAsDriver, { nullable: true })
        driver: User;
      }
      export default Ride;
      ```

      ```
      // Ride.graphql
      
      type Ride {
        // ...
        passengerId: Int!
        passenger: User!
        driverId: Int
        driver: User
      }
      ```

    - 추가 설정없이 `passengerId` 라는 nullable column을 추가하면, typeorm에서 자동으로 passenger의 id와 연결

    - Ride를 불러와 `passengerId` column을 사용

- GetRide resolver

  - 흐름

    - args.rideId로 Ride 인스턴스를 찾음
    - 찾았다면, 현재 요청을 보낸 user가 해당 Ride 인스턴스에 대한 권한이 있는지 확인
      - 즉, 해당 Ride의 driver 혹은 passenger인지 확인

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph";
    import Ride from "../../../entities/Ride";
    
    const resolvers: Resolvers = {
      Query: {
        GetRide: privateResolver(
          async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
            const user: User = req.user;
            try {
              const ride = await Ride.findOne({
                id: args.rideId,
              });
              if (ride) {
                if (ride.passengerId === user.id || ride.driverId === user.id) {
                  return {
                    ok: true,
                    error: null,
                    ride,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Not authorized",
                    ride: null,
                  };
                }
              } else {
                return {
                  ok: false,
                  error: "Ride not found",
                  ride: null,
                };
              }
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                ride: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.78 RideStatusSubscription

- RideStatusSubscription.graphql

  ```
  type Subscription {
    RideStatusSubscription: Ride
  }
  ```

- UpdateRideStatus resolver 변경

  - Ride 인스턴스의 status 변경 후 `rideUpdate` 채널로 해당 ride를 payload에 담아서 publish

    ```typescript
    ride.status = args.status;
    ride.save();
    pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
    ```

- RideStatusSubscription resolver

  - 흐름

    - `rideUpdate` 채널을 주시하고 있다가, `withFilter` 를 통해 현재 user가 driver 혹은 passenger인 Ride 인스턴스의 알림을 받아 옴

  - 코드

    ```typescript
    import { withFilter } from "graphql-yoga";
    import User from "../../../entities/User";
    
    const resolvers = {
      Subscription: {
        RideStatusSubscription: {
          subscribe: withFilter(
            (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
            (payload, _, { context }) => {
              const user: User = context.currentUser;
              const {
                RideStatusSubscription: { driverId, passengerId },
              } = payload;
              return user.id === driverId || user.id === passengerId;
            }
          ),
        },
      },
    };
    
    export default resolvers;
    ```

## 2.79 Testing the RideStatusSubscription

## 2.80 Creating a ChatRoom

- Chat.ts 변경

  - participants를 `passenger`와 `driver`로 구분

    ```typescript
    // Chat.ts
    
    @Column({ nullable: true })
    passengerId: number;
    
    @ManyToOne((type) => User, (user) => user.chatsAsPassenger)
    passenger: User;
    
    @Column({ nullable: true })
    driverId: number;
    
    @ManyToOne((type) => User, (user) => user.chatsAsRider)
    driver: User;
    ```

  - 이때, Chat.graphql 또한 변경 필요

    - participants 대신 passengerId, passenger, driverId, driver

- User.ts 변경

  - chat를 `chatsAsPassenger`와 `chatsAsDriver`로 구분

    ```typescript
    // User.ts
    
    @OneToMany((type) => Chat, (chat) => chat.passenger)
    chatsAsPassenger: Chat[];
    
    @OneToMany((type) => Chat, (chat) => chat.driver)
    chatsAsDriver: Chat[];
    ```

    - 이때, User.graphql 또한 변경 필요

- UpdateRideStatus resolver 수정

  - 흐름

    - driver가 request를 수락할 때 (Ride의 상태를 'REQUESTING'에서 'ACCEPTED'로 바꿀 때) chatroom을 생성
    - 이때 driver에는 현재 request를 보내는 user를, passenger에는 Ride 인스턴스 생성 시 입력된 passenger를 할당
      - ride.passenger를 참조하기 위해서는, findOne 으로 불러올 때, relations 옵션을 통해 함께 불러와야 함

  - 코드

    ```typescript
    // UpdateRideStatus.resolvers.ts
    
    if (args.status === "ACCEPTED") {
      ride = await Ride.findOne(
        {
          id: args.rideId,
          status: "REQUESTING",
        },
        { relations: ["passenger"] }
      );
      if (ride) {
        ride.driver = user;
        user.isTaken = true;
        user.save();
        await Chat.create({
          driver: user,
          passenger: ride.passenger,
        }).save();
      }
    }
    ```

## 2.81 GetChat Resolver

- GetChat.graphql

  ```
  type GetChatResponse {
    ok: Boolean!
    error: String
    chat: Chat
  }
  
  type Query {
    GetChat(chatId: Int!): GetChatResponse!
  }
  ```

- GetChat resolver

  - 흐름

    - chatId로 Chat 인스턴스를 찾음
    - 찾았다면, Chat의 passenger나 driver에 현재 request를 보낸 user가 해당하는지 확인
    - 해당한다면 chat을 return

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import User from "../../../entities/User";
    import { GetChatResponse, GetChatQueryArgs } from "../../../types/graph";
    import Chat from "../../../entities/Chat";
    
    const resolvers: Resolvers = {
      Query: {
        GetChat: privateResolver(
          async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
            const user: User = req.user;
            try {
              const chat = await Chat.findOne({
                id: args.chatId,
              });
              if (chat) {
                if (chat.passengerId === user.id || chat.driverId === user.id) {
                  return {
                    ok: true,
                    error: null,
                    chat,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Not authorized",
                    chat: null,
                  };
                }
              } else {
                return {
                  ok: false,
                  error: "Not found",
                  chat: null,
                };
              }
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                chat: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

- OneToOne relations

  - [typeorm|OneToOne relations](https://orkhan.gitbook.io/typeorm/docs/one-to-one-relations)

  - Chat entity와 Ride entity 사이에 relation 설정

  - 양 entity에 OneToOne column을 추가하되, 관계의 owner에 해당하는 Ride에는 `@JoinColumn()` 을 추가로 적어줘야 한다

    - Ride가 생성된 후에, 새로운 Chat 이 생성될 수 있으며 여기에 귀속되기 때문
      - Ride가 'REQUESTING' 상태일 때는 Chat이 없기에 `nullable` column 설정
    - join에 있어 기준이 되는 쪽에 작성

    ```typescript
    // Chat.ts
    
    @Column({ nullable: true })
    rideId: number;
    
    @OneToOne((type) => Ride, (ride) => ride.chat)
    ride: Ride;
    ```

    ```typescript
    // Ride.ts
    
    @Column({ nullable: true })
    chatId: number;
    
    @OneToOne((type) => Chat, (chat) => chat.ride, { nullable: true })
    @JoinColumn()
    chat: Chat;
    ```

  - 이때 Chat.graphql과 Ride.graphql 또한 변경 필요

- UpdateRideStatus resolver 변경

  - ride status를 "ACCEPTED"로 바꿨을 때 (ride request를 승낙했을 때), Chat 인스턴스를 생성한 후 해당 Ride 인스턴스에 등록

    ```typescript
    // UpdateRideStatus.resolvers.ts
    
    if (args.status === "ACCEPTED") {
      ride = await Ride.findOne(
        {
          id: args.rideId,
          status: "REQUESTING",
        },
        { relations: ["passenger"] }
      );
      if (ride) {
        ride.driver = user;
        user.isTaken = true;
        user.save();
        const chat = await Chat.create({
          driver: user,
          passenger: ride.passenger,
        }).save();
        ride.chat = chat;
        ride.save();
      }
    }
    ```

## 2.82 BugFixing

## 2.83 Testing GetChat Resolver

## 2.84 SendChatMessage Resolver

- SendChatMessage.graphql

  ```
  type SendChatMessageResponse {
    ok: Boolean!
    error: String
    message: Message
  }
  
  type Mutation {
    SendChatMessage(text: String!, chatId: Int!): SendChatMessageResponse!
  }
  ```

- SendChatMessage resolver

  - 흐름

    - args의 chatId에 해당하는 Chat 인스턴스를 찾음
    - 찾았다면, 해당 Chat 인스턴스의 passengerId 나 driverId 중 user의 id 와 동일한 것이 있는 지 확인 (현재 Chat에 참여중인지)
    - 동일한 것이 있다면 Message 인스턴스 생성 후 저장

  - 코드

    ```typescript
    import { Resolvers } from "../../../types/resolvers";
    import privateResolver from "../../../utils/privateResolver";
    import {
      SendChatMessageMutationArgs,
      SendChatMessageResponse,
    } from "../../../types/graph";
    import User from "../../../entities/User";
    import Message from "../../../entities/Message";
    import Chat from "../../../entities/Chat";
    
    const resolvers: Resolvers = {
      Mutation: {
        SendChatMessage: privateResolver(
          async (
            _,
            args: SendChatMessageMutationArgs,
            { req }
          ): Promise<SendChatMessageResponse> => {
            const user: User = req.user;
            try {
              const chat = await Chat.findOne({ id: args.chatId });
              if (chat) {
                if (chat.passengerId === user.id || chat.driverId === user.id) {
                  const message = await Message.create({
                    text: args.text,
                    chat,
                    user,
                  }).save();
                  return {
                    ok: true,
                    error: null,
                    message,
                  };
                } else {
                  return {
                    ok: false,
                    error: "Not authorized",
                    message: null,
                  };
                }
              } else {
                return {
                  ok: false,
                  error: "Chat not found",
                  message: null,
                };
              }
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                message: null,
              };
            }
          }
        ),
      },
    };
    
    export default resolvers;
    ```

## 2.85 MessageSubscription

- MessageSubscription.graphql

  ```
  type Subscription {
    MessageSubscription: Message
  }
  ```

- MessageSubscription resolver

  - 흐름

    - payload의 message의 chatId를 가진 Chat 인스턴스를 찾음
    - 있다면, 현재 user가 해당 Chat 인스턴스의 driver 혹은 passenger인지 확인하여 필터링

  - 코드

    ```typescript
    import { withFilter } from "graphql-yoga";
    import User from "../../../entities/User";
    import Chat from "../../../entities/Chat";
    
    const resolvers = {
      Subscription: {
        MessageSubscription: {
          subcribe: withFilter(
            (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
            async (payload, _, { context }) => {
              const user: User = context.currentUser;
              const {
                MessageSubscription: { chatId },
              } = payload;
              try {
                const chat = await Chat.findOne({ id: chatId });
                if (chat) {
                  return chat.driverId === user.id || chat.passengerId === user.id;
                } else {
                  return false;
                }
              } catch (error) {
                return false;
              }
            }
          ),
        },
      },
    };
    
    export default resolvers;
    ```

- SendChatMessage resolver 변경

  - message 생성 저장 후, "newChatMessage" 채널로 payload에 message를 담아 전송

    ```typescript
    const message = await Message.create({
      text: args.text,
      chat,
      user,
    }).save();
    pubSub.publish("newChatMessage", {
      MessageSubscription: message,
    });
    ```

    