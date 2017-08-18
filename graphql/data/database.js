import { Asset, SQLite, FileSystem } from 'expo';
import data from './data.sql'

console.log('doc dir', Expo.FileSystem.documentDirectory)

const db = SQLite.openDatabase('data.db');
db.transaction(tx => {
  data.map( query => {
  	tx.executeSql(query, [], null, (_,error)=> console.log('setup error', error, query))
  } )
})
export default db
