# RESTful api

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/labData.git
```

2. Change to lab direcotry, ex. express_lab
```
cd restful_api
```

3. Install all the required dependencies
```
npm install
```

4. Start the server
```
npm start dev
```

5. Its viewable in your browser by entering
```
localhost:3000
```


# Technologies
- express



## cassandra
```
npm install cassandra-driver

const cassandra = require('cassandra-driver');
const client = new  cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', (err, result) => {
    if (err) throw err
    console.log(result.rows[0])
})
```
## couchbase
```
npm install couchnode

const counchbase = require('counchbase');
const bucket = (new couchbase.Cluster("http://localhost:8091")).openBucket('bucketName')

// add a document to a bucket
bucket.insert('document-key', {name: 'Matt', shoeSize: 13}, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log(result)
    }
})
```

## couchDB

```
npm install nano

const nano = require('nano') ('http://localhost:5984');
nano.db.create('books);
const books = nano.db.use('books');

// insert a book document in the books database
books.insert({name: 'the art of world' }, null, (err, body) => {
    if (err) {
        console.log(err)
    } else {
        console.log(body)
    }
})

```



## levelDB
```
npm install level levelup leveldown

const levelup = require('levelup');
const db = levelup('./mydb');

db.put('name', 'LevelUP', (err) => {
    if(err) return console.log('Opps!', err)

    db.get('name', (err, value) => {
        if(err) return console.log('Opps!', err)

        console.log(`name=${value}`)
    })
})
```

## MySQL

```
npm install mysql

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 's3kreee7',
    database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS Solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution isL', rows[0].solution)
})

connection.end()
```

## mangoDB

```
npm install mongodb

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
    if (err) throw err
    const db = client.db('animals')

    db.collection('mammals').find().toArray((err, result) => {
        if (err) throw err

        console.log(result)
    })
})

```

## Neo4j
```
npm install neo4j-driver

const neo4j = require('neo4j-driver')
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'letmein'))

const session = driver.session()

session.readTransaction((tx) => {
    return tx.run('MATCH (n) RETURN count(n) AS count')
        .then((res) => {
            console.log(res.records[0].get('count'))
        })
        .catch((error) => {
            console.log(error)
        })
})

```

## oracle

```
npm install oracledb

const oracledb = require('oracledb')
const config = {
    user: '<your db user>',
    password: '<your db password>',
    connectionString: 'localhost:1521/orcl'
}

async function getEmployee (empId) {
    let conn

    try {
        conn = await oracledb.getConnection(config)

        const result = await conn.execute(
            'select * from employees where employee_id = :id',
            [empId]
        )

        console.log(result.rows[0])
    } catch(err) {
        console.log('ouch'! err)
    } finally {
        if (conn) {
            await conn.close()
        }
    }
}

getEmployee(101)
```

## postgreSQL
```
npm install pg-promise

const pgp = require('pg-promise')
const db = pgp('postgre://username:password@host:port/databse')

db.one('SELECT $1 AS value', 123)
    .then((data) => {
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })

```


## redis
```
npm install redis

const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
    console.log(`Error ${err}`)
})

client.set('string key', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

client.hkeys('hash key', (err, replies) => {
    console.log(`${replies.length} replies:`)

    replies.forEach((reply, i) => {
        console.log(`   ${i}: ${reply}`)
    })

    client.quit()
})
```

## SQL server

```
npm install tedious

const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username',
            password: 'your_password'
        }
    }
}

const connection = new Connection(config)

connection.on('connect', (err) => {
    if (err) {
        console.log(err)
    } else {
        executeStatement()
    }
})

```

## SQL lite
```
npm install sqlite3

const sqlite3 = require('sqlite').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
    db.run('CREATE TABLE lorem (info TEXT)')
    const stmt = db.prepare('INSERT INTO lorem VALUE (?)')

    for (let i=0; i<10; i++) {
        stmt.run(`Ipsum ${i}`)
    }

    stmt.finalize()

    db.each(`SELECT rowid AS id, info FROM lorem`, (err, row) => {
        console.log(`${row.id}: ${row.info}`)
    })
})

db.close()
```

## elsticsearch
```
npm install elasticsearch

const elasticsearch = require('elasticsearch')
const client = elasticsearch.Client({
    host: 'localhost:9200'
})

client.search({
    index: 'books',
    type: 'book',
    body: {
        query: {
            multi_match: {
                query: 'express_js',
                field: ['title', 'description']
            }
        }
    }
}).then((response) => {
    const hits = response.hits.hits
}, (error) => {
    console.trace(error.message)
}) 

```