## How to initialize
- create two files called .env.development && .env.test and input the database required.

```
touch .env.development && touch .env.test
```

```
echo 'PGDATABASE=nc_news' > .env.development && echo 'PGDATABASE=nc_news_test' > .env.test
```