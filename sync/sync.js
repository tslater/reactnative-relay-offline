import db from '../graphql/data/database'

const query = `INSERT INTO accounts (first_name, last_name, email_address, num_legs) VALUES (?,?,?,?)`

export default class Sync {

  cleanParams = (user) => {
    const { user: {
      first_name,
      last_name,
      email_address
    }} = user
    return [
      first_name,
      last_name,
      email_address,
      2
    ]
  }

  syncOnInterval(timeInterval, records){
    this.syncer = setInterval( ()=>this.sync(records), timeInterval )
  }

  async sync(recordCount){
    const self = this
    return fetch('http://localhost:8080/people/'+recordCount).then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      const insertValues = responseJson.map( self.cleanParams )
      db.transaction(tx => {
          insertValues.map((values) =>
            tx.executeSql(query, values, null, (_,error)=> console.log('setup error', error, query))
          )
        },
        (error)=> console.log('insert error', error)
      )
    });
  }
}
