# CSV to PostgreSQL Insertion

This script is designed to read data from a CSV file, convert it to JSON format, and then insert it into a PostgreSQL database table. It also calculates the age distribution of users in the database.

## How It Works

1. **Reading CSV File**: The script reads data from a CSV file specified by the `csvFilePath` variable.

2. **Converting to JSON**: It converts each row of the CSV file into a JSON object using recurrsion. Empty fields in the CSV are replaced with corresponding data from subsequent rows.

3. **Inserting into PostgreSQL**: The JSON data is then inserted into a PostgreSQL database table named `public.users`.

4. **Calculating Age Distribution**: After insertion, the script queries the database to retrieve ages of all users. It then calculates the age distribution of users into four categories: "< 20", "20 to 40", "40 to 60", and "> 60".

5. **Printing Age Distribution**: Finally, the script prints the age distribution percentages for each category.

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
