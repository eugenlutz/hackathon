## Commands for server (directory) ##

Change directory to: 

_src/server/_

### Commands for build and run ###

**Build** Server:

`npx tsc`


**Run** Server:

`npm start`

### Commands for db migrations ###

**Generate** Migration:

`npx typeorm-ts-node-commonjs migration:generate --pretty .\migrations\<migration name> -d data-source.ts`


**Run** Migration:

`npx typeorm-ts-node-commonjs migration:run -d data-source.ts`


**Revert** Migration:

`npx typeorm-ts-node-commonjs migration:revert -d data-source.ts`