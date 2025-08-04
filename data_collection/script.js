// Part 1: Refactoring Old Code
// Refactoring code is the process of restructuring that code without changing its original behavior.
// For the first part of this assignment, revisit your code from ALAB 308.3.1, wherein you create a script that parsed CSVs. Now that you have knowledge of arrays and objects, how would you change your approach to this problem? Take a few minutes to examine and refactor the code before continuing.
// For reference, ALAB 308.3.1 is embedded below. The section on CSV parsing is “Part 3.”

console.log(`----------------- Old Code`);
/*
let csvStr = `ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26`;

//  Variables
let cell1 = "";
let cell2 = "";
let cell3 = "";
let cell4 = "";
let commas = 0; // Counter variable

// Loop through string, for loop to have access to the index
for (let i = 0; i < csvStr.length; i++) {
  if (csvStr[i] == ",") {
    // If comma
    commas++; // Add to comma counter
  } else if (csvStr[i] == "\n") {
    // If new line
    console.log(cell1, cell2, cell3, cell4); // print new line

    // Clear previous data for new row
    commas = 0;
    cell1 = "";
    cell2 = "";
    cell3 = "";
    cell4 = "";
  } else {
    // for all chars
    if (commas == 0) {
      // put in the appropriate cell, based on commas
      cell1 += csvStr[i];
    } else if (commas == 1) {
      cell2 += csvStr[i];
    } else if (commas == 2) {
      cell3 += csvStr[i];
    } else {
      cell4 += csvStr[i];
    }
  }

  // If last char in string print final cells
  if (csvStr.length - 1 == i) {
    console.log(cell1, cell2, cell3, cell4);
  }
}
*/
console.log(`Output from old code:
ID Name Occupation Age
42 Bruce Knight 41
57 Bob Fry Cook 19
63 Blaine Quiz Master 58`);
console.log(`------------------ End of old code.`);


console.log(`------ Refactoring start:`);

// Time complexity: O(n)
function csvToGrid (csvData) {
    const rows = csvData.split('\n');
    let gridData = [];
    for (const row of rows) {
        let cells = row.split(',');
        gridData.push(cells);
    }
    return gridData;
}

console.log(`Result of csvToGrid, output is object:`);

const data = 'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';
console.log(csvToGrid(data));
// console.log(typeof(csvToGrid(data)));


// grid is 2-D arrays or an array of objects.
// Time complexity: O(n**2)
function gridToStrTablePrint(grid) {
    let gridInString = "";
    for (let i = 0; i<grid.length-1; i++) {
        for (let j = 0; j < grid[i].length; j++){
            gridInString += grid[i][j];
            if( j < grid[i].length - 1) { // Add spaces between elements
                gridInString += " ";
            }
        }
        if (i < grid.length-1) { // Add newline between rows
        gridInString += "\n";
        }
    }
    return gridInString;
}

console.log(`Result of gridToStrTablePrint, output is string:`);

console.log(gridToStrTablePrint(csvToGrid(data)));
// console.log(typeof(gridToStrTablePrint(csvToGrid(data))));



// Part 2: Expanding Functionality
// Now that you are familiar with your code, and perhaps have improved it, it is time to expand upon its functionality.
// Begin with the following task:
    // Declare a variable that stores the number of columns in each row of data within the CSV.
    // Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.
// For example, if the first row of data (the headings) has eight entries, your program should create eight entries per row. You can safely assume that all rows that follow will contain the same number of entries per row.
// After you have implemented the above:
    // Store your results in a two-dimensional array.
        // Each row should be its own array, with individual entries for each column.
        // Each row should be stored in a parent array, with the heading row located at index 0.
    // Cache this two-dimensional array in a variable for later use.
// Using the original CSV example data, here is what the result of this step should look like:
    // ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26
// becomes
    // [["ID", "Name", "Occupation", "Age"],
    //  ["42", "Bruce", "Knight", "41"],
    //  ["57", "Bob", "Fry Cook", "19"],
    //  ["63", "Blaine", "Quiz Master", "58"],
    //  ["98", "Bill", "Doctor’s Assistant", "26"]]



// Part 3: Transforming Data
// While the data is now much more workable than it was in its string format, there is still a large amount of obscurity in the data itself. When we access an arbitrary index of the results array, it is impossible to know what that data is referring to without additional cross-referencing.
// In order to make it more obvious what the data is, we will transform our rows into objects.
// Implement the following:
    // For each row of data in the result array produced by your code above, create an object where the key of each value is the heading for that value’s column.
    // Convert these keys to all lowercase letters for consistency.
    // Store these objects in an array, in the order that they were originally listed.
    // Since the heading for each column will be stored in the object keys, you do not need to create an object for the heading row itself.
// For instance, the results of the example data above being passed through this step are as follows:
    // [["ID", "Name", "Occupation", "Age"],
    //  ["42", "Bruce", "Knight", "41"],
    //  ["57", "Bob", "Fry Cook", "19"],
    //  ["63", "Blaine", "Quiz Master", "58"],
    //  ["98", "Bill", "Doctor’s Assistant", "26"]]
// becomes
    // [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" },
    //  { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" },
    //  { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" },
    //  { id: "98", name: "Bill", occupation: "Doctor’s Assistant", age: "26" }]
// Important: While this functionality can be built into the original CSV parser you built in Part 2, we are intentionally creating two different algorithms to test different skillsets. Please leave these sections separate even if it would be more efficient to combine them.

// Part 4: Sorting and Manipulating Data
// It is important to know how to work with data in this format, an array of objects, as it is one of the most commonly used data formats in JavaScript.
// Using array methods, accomplish the following tasks, in order upon the result of Part 3:
    // Remove the last element from the sorted array.
    // Insert the following object at index 1:
        // { id: "48", name: "Barry", occupation: "Runner", age: "25" }
    // Add the following object to the end of the array:
        // { id: "7", name: "Bilbo", occupation: "None", age: "111" }
// So far, the results should look like this:
    // [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" },
    //  { id: "48", name: "Barry", occupation: "Runner", age: "25" },
    //  { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" },
    //  { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" },
    //  { id: "7", name: "Bilbo", occupation: "None", age: "111" }]
// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. This calculation should be accomplished using a loop.

// Part 5: Full Circle
// As a final task, transform the final set of data back into CSV format.
// There are a number of ways to do this; be creative!
