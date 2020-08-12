# CUBER Server

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
    console.log('works')
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
    import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
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
      export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello: Greeting!\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n"];
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
    export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(name: String!): SayHelloResponse!\n}\n\ntype SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n"];
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

