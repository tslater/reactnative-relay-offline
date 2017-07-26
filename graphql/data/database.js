import { Asset, SQLite } from 'expo';
import data from './data.sql'

const db = SQLite.openDatabase('my_database.db');
db.transaction(tx => {
  data.map( query => {
  	tx.executeSql(query, [], null, (_,error)=> console.log('setup error', error, query))
  } )
})
export default db
