const fs = require("fs");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "master",
  password: "12345",
  port: "5432",
});

const csvFilePath = "./file.csv";
// Custom function to convert a array into json format
function convertToJSON(array) {
  let jsonObj = {};

  array.forEach((item) => {
    let keys = item.split(".");
    let current = jsonObj;

    keys.forEach((key, index) => {
      if (!current[key]) {
        current[key] = {};
      }

      if (index === keys.length - 1) {
        current[key] = "";
      }

      current = current[key];
    });
  });

  return jsonObj;
}

let tempData;
let idx = 0;
// function to replace the data with empty object using recurrsion
function replaceEmptyWithData(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      replaceEmptyWithData(obj[key]);
    } else {
      if (obj[key] === "") {
        obj[key] = tempData[idx++];
      }
    }
  }
}

// reading the CSV file and processing the data
fs.readFile(csvFilePath, "utf8", (err, fileData) => {
  if (err) {
    console.error("Error reading CSV file:", err);
    return;
  }
  const lines = fileData.trim().split("\n");
  const data = [];
  lines.forEach((line, index) => {
    const values = line.split(",").map((value) => value.trim());
    data.push(values);
  });
  let firstRow = convertToJSON(data[0]);
  const jsonDatas = [];
  for (let i = 1; i < data.length; i++) {
    tempData = data[i];
    let tempObj = JSON.parse(JSON.stringify(firstRow));
    replaceEmptyWithData(tempObj);
    jsonDatas.push(tempObj);
    idx = 0;
  }

  processData(jsonDatas);
});

// adding the processed data into the database
function processData(jsonDatas) {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }

    for (const item of jsonDatas) {
      const name = `${item.name.firstName} ${item.name.lastName}`;
      const age = parseInt(item.age);
      const address = JSON.stringify(item.address);
      const additionalInfo = JSON.stringify(
        Object.fromEntries(
          Object.entries(item).filter(
            ([key]) => !["name", "age", "address"].includes(key)
          )
        )
      );

      client.query(
        "INSERT INTO public.users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)",
        [name, age, address, additionalInfo],
        (err, result) => {
          if (err) {
            console.error("Error executing SQL query:", err);
          }
        }
      );
    }

    client.query("SELECT age FROM public.users", (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        done(err); 
        return;
      }

      const ages = result.rows.map((row) => row.age);
      const ageDistribution = calculateAgeDistribution(ages);
      console.log("Age-Group % Distribution");
      for (const [group, percentage] of Object.entries(ageDistribution)) {
        console.log(`${group}: ${percentage.toFixed(2)}`);
      }

      done();
      pool.end();
    });
  });
}
// additional function for performing calculation of age percentage
function calculateAgeDistribution(ages) {
  const ageGroups = {
    "< 20": 0,
    "20 to 40": 0,
    "40 to 60": 0,
    "> 60": 0,
  };

  ages.forEach((age) => {
    if (age < 20) {
      ageGroups["< 20"] += 1;
    } else if (age >= 20 && age <= 40) {
      ageGroups["20 to 40"] += 1;
    } else if (age >= 41 && age <= 60) {
      ageGroups["40 to 60"] += 1;
    } else {
      ageGroups["> 60"] += 1;
    }
  });

  const totalUsers = ages.length;
  const ageDistribution = {};
  for (const [group, count] of Object.entries(ageGroups)) {
    ageDistribution[group] = (count / totalUsers) * 100;
  }
  return ageDistribution;
}
