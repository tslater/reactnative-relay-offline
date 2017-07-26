export default function dbCall(sql, db, context) {
	return promise = new Promise(function (resolve, reject) {
		db.transaction(tx => {
			tx.executeSql(
				sql,
				[],
				(_, { rows: { _array } }) => {
					resolve(_array)
				},
				(_, error) => {
					reject(error)
				}
			);
		});
	});
};
