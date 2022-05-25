// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'transactions' and set it to version 1
const request = indexedDB.open('transactions', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  // save a reference to the database 
  const db = event.target.result;
  // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts 
  db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadTransaction() function to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    // uploadTransaction();
  }
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_transaction'], 'readwrite');

  // access the object store for `new_pizza`
  const transactionsObjectStore = transaction.objectStore('new_transaction');

  // add record to your store with add method
  transactionsObjectStore.add(record);
}

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
  saveRecord(formData);
};