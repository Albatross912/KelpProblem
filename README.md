# CSV to PostgreSQL Insertion

This script is designed to read data from a CSV file, convert it to JSON format, and then insert it into a PostgreSQL database table. It also calculates the age distribution of users in the database.

## How It Works

## How It Works

1. **Reading CSV File**: The script uses the Node.js `fs` module to read the contents of a CSV file specified by the `csvFilePath` variable. The CSV file is expected to contain data in a comma-separated format, with each row representing a record and each column representing a field.

2. **Converting to JSON**: After reading the CSV file, the script parses each line and splits it into individual values using the comma (`,`) as a delimiter. These values are then organized into arrays, with each array representing a row of data from the CSV file. The first row of the CSV file is assumed to contain headers that define the structure of the data.

    The script then iterates over each row of data and constructs a JSON object for each row. It uses the headers from the first row to determine the keys for the JSON object and assigns corresponding values from the current row. If a field in the CSV is empty, the script replaces it with the corresponding value from subsequent rows to ensure completeness of data.

3. **Inserting into PostgreSQL**: Once the JSON data is prepared, the script connects to a PostgreSQL database using the `pg` module. It inserts each JSON object as a record into a table named `public.users` in the database. The table schema should match the structure of the JSON objects, with columns corresponding to the keys of the JSON objects.

4. **Calculating Age Distribution**: After inserting the data into the database, the script executes a SQL query to retrieve the ages of all users from the `public.users` table. It then calculates the distribution of user ages into four categories: "< 20", "20 to 40", "40 to 60", and "> 60". This distribution is calculated as percentages of the total number of users.

5. **Printing Age Distribution**: Finally, the script prints out the age distribution percentages for each category to the console. This provides an overview of the age demographics of the users in the database.

This process allows for efficient handling of large datasets stored in CSV format, conversion into a structured JSON format, and insertion into a PostgreSQL database for further analysis and processing.

## How to Use

1. Ensure you have Node.js and PostgreSQL installed on your system.

2. Clone this repository to your local machine:

    ```
    git clone https://github.com/Albatross912/csv-to-json-postgresql.git
    ```

3. Navigate to the project directory:

    ```
    cd csv-to-json-postgresql
    ```

4. Install dependencies:

    ```
    npm install
    ```

5. Update the `csvFilePath` variable in `parser.js` with the path to your CSV file if new CSV file is added.

6. Run the script:

    ```
    node parser.js
    ```

## Dependencies

- `fs`: Node.js file system module for reading files.
- `pg`: PostgreSQL client for Node.js.

## Ouputs
![image](https://github.com/Albatross912/KelpProblem/assets/80098578/80a05a64-82ee-4a28-85ec-54eeccf5f9ff)
![image](https://github.com/Albatross912/KelpProblem/assets/80098578/04546128-47a9-41a1-8c68-e4b0cb67e143)
