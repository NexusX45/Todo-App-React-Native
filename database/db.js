import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db");

export const initTasks = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT, completed INTEGER NOT NULL, sectionid INTEGER NOT NULL)",
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

export const deleteTasks = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE tasks",
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

export const initSections = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sections (id INTEGER PRIMARY KEY NOT NULL, name TEXT)",
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

export const saveToDB = (title, completed, secID) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tasks (title, completed, sectionid) VALUES (?, ?, ?)",
        [title, completed, secID],
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

export const fetchAllData = (secID) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks WHERE sectionid = (?)",
        [secID],
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

export const saveSection = (name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sections (name) VALUES (?)",
        [name],
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

export const changeSection = (id, name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE sections SET NAME = (?) WHERE ID = (?)",
        [name, id],
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

export const fetchSection = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sections",
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

export const deleteSection = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM sections WHERE id = (?)",
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
