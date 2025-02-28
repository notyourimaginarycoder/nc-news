## How to initialize
- create two files called .env.development && .env.test and input the database required.

```
touch .env.development && touch .env.test
```

```
echo 'PGDATABASE=nc_news' > .env.development && echo 'PGDATABASE=nc_news_test' > .env.test
```

- install all dependencies required.
```
npm install
```

- commands setup and ready to use.
```
npm run setup-dbs
npm run seed-dev
npm run test
npm run prepare
npm run start
npm run test-seed
```