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

## 2.3~4 GraphQL Yoha and Express

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
  - `src/api/` 아래에 각 api에 해당하는 폴더들을 만들고, 내부에 schema 파일(`.graphql`)과 resolver 파일(`.resolvers.ts`)을 생성
  - schema.ts 파일에서 import 하여 사용
- packages
  - [graphql-tools](https://github.com/ardatan/graphql-tools)
  - [merge-graphql-schemas](https://github.com/Urigo/merge-graphql-schemas) (merged into graphql-tools)
- 