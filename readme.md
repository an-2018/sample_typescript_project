# Setup a TypeScript + Node.js Project

## Steps

```bash
npm init -y

```

```bash
npm install typescript --save-dev

```

```bash
npm install @types/node --save-dev

```

### Setup the tsconfig.json

```bash
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

### Setup nodemon and ts-node for auto reloading and compiling

```bash
npm install -D ts-node nodemon
```

Nodemon configurations

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

### Setup run, build and production start script
```bash
npm install -D rimraf
```

```json
"start:dev": "nodemon",
"build": "rimraf ./build && tsc"
"start": "npm run build && node ./build/index.js"

```

```bash

```


## Reference
https://khalilstemmler.com/blogs/typescript/node-starter-project/

**next step**
https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/