const db = require("../connection")
const format = require('pg-format')
const { convertTimestampToDate, formatArticleID } = require("./utils")

const seed = ({ topicData, userData, articleData, commentData }) => {

  return db.query('BEGIN')
    .then(() => {
      console.log("drop existing tables")
      return db.query("DROP TABLE IF EXISTS comments, articles, users, topics")
    })
    .then(() => {
      console.log("topics table created")
      return createTopics()
    })
    .then(() => {
      console.log("users table created")
      return createUsers()
    })
    .then(() => {
      console.log("articles table created")
      return createArticles()
    })
    .then(() => {
      console.log("comments table created")
      return createComments()
    })
    .then(() => {
      console.log("topics inserted")
      return insertTopics(topicData)
    })
    .then(() => {
      console.log("users inserted")
      return insertUsers(userData)
    })
    .then(() => {
      console.log("articles inserted")
      return insertArticles(articleData)
    })
    .then(() => {
      console.log("comments inserted")
      return insertComments(commentData, articleData)
    })
    .then(() => {
      return db.query('COMMIT')
    })
    .catch((error) => {
      return db.query('ROLLBACK')
      .then(() => {
        console.log('rollback initiated: ', error)
      })
    })

}

function createTopics() {

  return db.query("CREATE TABLE topics (slug VARCHAR(32) PRIMARY KEY, description VARCHAR(256), img_url VARCHAR(1000))")
  .then(() => {
    return db
  })

}

function createUsers() {

  return db.query("CREATE TABLE users (username VARCHAR(32) PRIMARY KEY, name VARCHAR(64) NOT NULL, avatar_url VARCHAR(1000))")
  .then(() => {
    return db
  })

}

function createArticles() {

  return db.query("CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title VARCHAR(256) NOT NULL, topic VARCHAR(32) REFERENCES topics(slug) NOT NULL, author VARCHAR(32) REFERENCES users(username) NOT NULL, body TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))")
  .then(() => {
    return db
  })

}

function createComments() {

  return db.query("CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, article_id INT REFERENCES articles(article_id) NOT NULL, body TEXT NOT NULL, votes INT DEFAULT 0, author VARCHAR(32) REFERENCES users(username) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
  .then(() => {
    return db
  })

}

function insertTopics(topicData) {

  const formattedTopics = topicData.map((obj) => {
    return Object.values(obj)
  })

  const sqlString = format(`INSERT INTO topics (description, slug, img_url) VALUES %L`, formattedTopics)
  return db.query(sqlString)

}

function insertUsers(userData) {

  const formattedUsers = userData.map((obj) => {
    return Object.values(obj)
  })

  const sqlString = format(`INSERT INTO users (username, name, avatar_url) VALUES %L`, formattedUsers)
  return db.query(sqlString)

}

function insertArticles(articleData) {

  const convertTimeStamp = articleData.map((obj) => {
    return convertTimestampToDate(obj)
  })

  const formattedArticles = convertTimeStamp.map((obj) =>{
    return Object.values(obj)
  })

  const withVotes = formattedArticles.map((arr)=>{
    if(arr.length === 6) {
      arr.splice(5, 0, 0)
    }
    return arr
  })

  const sqlString = format(`INSERT INTO articles (created_at, title, topic, author, body, votes, article_img_url) VALUES %L`, withVotes)
  return db.query(sqlString)

}

function insertComments(commentData, articleData) {

  const convertTimeStamp = commentData.map((obj) => {
    return convertTimestampToDate(obj)
  })

  const withArticleID = formatArticleID(convertTimeStamp, articleData)

  const sqlString = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`, withArticleID)
  return db.query(sqlString)

}

module.exports = seed;