### Commands for server (directory) ###

_src/server/<...>_


**Build** Server:

`npx tsc`


**Run** Server:

`npm start`


Generate Migration:

`npx typeorm-ts-node-commonjs migration:generate --pretty .\migrations\<migration name> -d data-source.ts`


**Run** Migration:

`npx typeorm-ts-node-commonjs migration:run -d data-source.ts`


**Revert** Migration:

`npx typeorm-ts-node-commonjs migration:revert -d data-source.ts`