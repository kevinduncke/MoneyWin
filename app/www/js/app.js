document.addEventListener('deviceready', function () {
  const saveBtn = document.getElementById('save-btn');
  const output = document.getElementById('output');

  saveBtn.addEventListener('click', function () {
      const value = 'Hello, SQLite!';
      db.transaction(function (tx) {
          tx.executeSql('INSERT INTO test_table (value) VALUES (?)', [value], function (tx, res) {
              console.log('Value saved successfully');
              displayValue();
          }, function (tx, err) {
              console.log('INSERT ERROR: ' + err.message);
          });
      });
  });

  function displayValue() {
      db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM test_table ORDER BY id DESC LIMIT 1', [], function (tx, res) {
              if (res.rows.length > 0) {
                  const latestValue = res.rows.item(0).value;
                  output.innerText = 'Latest Value: ' + latestValue;
              }
          }, function (tx, err) {
              console.log('SELECT ERROR: ' + err.message);
          });
      });
  }
});
