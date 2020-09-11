import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT, completed INTEGER NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const saveToDB = (title, completed) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tasks (title, completed) VALUES (?, ?)",
        [title, completed],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllData = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks",
        [],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const changeData = (id, title) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tasks SET TITLE = (?) WHERE ID = (?)",
        [title, id],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteData = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tasks WHERE ID = (?)",
        [id],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const changeCheck = (id, check) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tasks SET COMPLETED = (?) WHERE ID = (?)",
        [check, id],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
