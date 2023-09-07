
/*
The ShortDate class is designed to simplify date manipulation in JavaScript, offering flexibility and debugging capabilities for developers working with date-related code.
*/
class ShortDate {
    constructor(input = false) {
        this.id = this.setId();
        this.debug = false;
        this.debugDelimeter = ' | ';
        this.delimeter = '-';
        // Initialize the date properties (year and month)
        this.initializeDate(input);
    }



    /* --------- EVENT LISTENERS  (no debugging) -------------- */
    /**
     * Initialize the date properties (year and month) based on the input.
     * This method can be used during construction and whenever the date needs to be updated.
     *
     * @param {Date|string|boolean} input - The input date (Date object, date string, or false for the current date).
     */
    initializeDate(input) {
        if (input === false) {
            input = new Date();
        }
        if (input instanceof Date) {
            this.month = input.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
            this.year = input.getFullYear();
        } else if (typeof input === 'string') {
            const dateParts = input.split(/\/|-/); // Split using '/' or '-'
            if (dateParts.length >= 2) {
                this.year = parseInt(dateParts[0], 10);
                this.month = parseInt(dateParts[1], 10);

                if (isNaN(this.month) || isNaN(this.year)) {
                    throw new Error('Invalid date format. Please use "MM/YYYY" or "MM-YYYY"');
                }
            } else {
                throw new Error('Invalid input. Please provide a valid date or date string.');
            }
        }
    }

    /**
     * Trigger the "dateChanged" event.
     */
    triggerDateChanged() {
        // You can use a custom event or callback mechanism here to notify listeners.
        // For simplicity, we'll use a callback function in this example.

        if (typeof this.dateChangedCallback === 'function') {
            this.dateChangedCallback(this);
        }
    }

    /**
     * Set a callback function to be called when the date changes.
     *
     * @param {Function} callback - The callback function to be called when the date changes.
     */
    onDateChanged(callback) {
        this.dateChangedCallback = callback;
    }





    /* --------- MANAGE FUNCTIONS -------------- */


    setDate(input) {
        if (input === false) {
            input = new Date();
        }
        if (input instanceof Date) {
            this.month = input.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
            this.year = input.getFullYear();
        } else if (typeof input === 'string') {
            const dateParts = input.split(/\/|-/); // Split using '/' or '-'
            if (dateParts.length >= 2) {
                this.month = parseInt(dateParts[0], 10);
                this.year = parseInt(dateParts[1], 10);

                if (isNaN(this.month) || isNaN(this.year)) {
                    throw new Error('Invalid date format. Please use "MM/YYYY" or "MM-YYYY"');
                }
            } else {
                throw new Error('Invalid input. Please provide a valid date or date string.');
            }
        }
        this.triggerDateChanged();
    }


    /**
     * Get the current date as a formatted string in "YYYY-MM" format.
     *
     * @param {string} delimiter - The delimiter used in the formatted string.
     * @returns {string} - The current date in "YYYY-MM" format as a string.
     */
    getShortDate(delimeter = this.delimeter)
    {
        let result = this.year + delimeter + String(this.month).padStart(2, 0);
        if (this.debug)
        {
            console.log(
            'object id: ' + this.id,
            this.debugDelimeter,
            'method : getShortDate',
            this.debugDelimeter,
            'params: delimeter = ' + delimeter,
            this.debugDelimeter,
            'result: ' + result);
        }
        return result;
    }

    toString(){
        return this.getShortDate();
    }

    /**
     * Get the name of the current month based on the user's locale.
     *
     * @returns {string} - The name of the current month.
     */
    getCurrentMonthName() {
        const date = new Date(this.year, this.month - 1, 1); // Month is 0-based index
        const options = { month: 'long' };
        return date.toLocaleDateString(undefined, options);
    }


    /**
     * Move the current date to the next month.
     *
     * @returns {string} - The updated date in "YYYY-MM" format as a string.
     */
    moveNextMonth() {
        if (this.month === 12) {
            this.month = 1;
            this.year++;
        } else {
            this.month++;
        }
        const result = this.getShortDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: moveNextMonth',
                this.debugDelimeter,
                'result: ' + result
            );
        }
        this.triggerDateChanged();
        return result;
    }


    /**
     * Move the current date to the previous month.
     *
     * @returns {string} - The updated date in "YYYY-MM" format as a string.
     */
    movePreviousMonth() {
        if (this.month === 1) {
            this.month = 12;
            this.year--;
        } else {
            this.month--;
        }
        const result = this.getShortDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: movePreviousMonth',
                this.debugDelimeter,
                'result: ' + result
            );
        }
        this.triggerDateChanged();
        return result;
    }


    /**
     * Move the current date to the next year.
     *
     * @returns {string} - The updated date in "YYYY-MM" format as a string.
     */
    moveNextYear() {
        this.year++;
        const result = this.getShortDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: moveNextYear',
                this.debugDelimeter,
                'result: ' + result
            );
        }
        this.triggerDateChanged();
        return result;
    }


    /**
     * Move the current date to the previous year.
     *
     * @returns {string} - The updated date in "YYYY-MM" format as a string.
     */
    movePreviousYear() {
        this.year--;
        const result = this.getShortDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: movePreviousYear',
                this.debugDelimeter,
                'result: ' + result
            );
        }
        this.triggerDateChanged();
        return result;
    }


    /**
     * Get the last day of the current month.
     *
     * @returns {number} - The last day of the current month as a number.
     */
    getLastDayOfMonth() {
        // Calculate the last day of the current month
        const lastDay = new Date(this.year, this.month, 0).getDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: getLastDayOfMonth',
                this.debugDelimeter,
                'result: ' + lastDay
            );
        }
        return lastDay;
    }


    /**
     * Calculate the last date of the previous month based on the current date.
     *
     * @param {boolean} asString - If true, returns the result as a formatted string in "YYYY-MM-DD" format; if false, returns a Date object.
     * @param {string} delimiter - The delimiter used in the formatted string (ignored if asString is false).
     * @returns {string|Date} - The last date of the previous month, either as a formatted string or a Date object, depending on the 'asString' parameter.
     */
    getLastDateOfPreviousMonth(asString = true, delimiter = this.delimeter) {
        let previousMonth;
        let previousYear;

        if (this.month === 1) {
            previousMonth = 12;
            previousYear = this.year - 1;
        } else {
            previousMonth = this.month - 1;
            previousYear = this.year;
        }

        const lastDay = new Date(previousYear, previousMonth, 0).getDate();

        if (asString) {
            const formattedMonth = String(previousMonth).padStart(2, '0');
            const result = `${previousYear}${delimiter}${formattedMonth}${delimiter}${lastDay}`;
            if (this.debug) {
                console.log(
                    'object id: ' + this.id,
                    this.debugDelimeter,
                    'method: getLastDateOfPreviousMonth',
                    this.debugDelimeter,
                    'params: asString = ' + asString + ', delimiter = ' + delimiter,
                    this.debugDelimeter,
                    'result: ' + result
                );
            }
            return result;
        } else {
            const result = new Date(previousYear, previousMonth - 1, lastDay); // Month is 0-based index
            if (this.debug) {
                console.log(
                    'object id: ' + this.id,
                    this.debugDelimeter,
                    'method: getLastDateOfPreviousMonth',
                    this.debugDelimeter,
                    'params: asString = ' + asString + ', delimiter = ' + delimiter,
                    this.debugDelimeter,
                    'result: ' + result
                );
            }
            return result;
        }
    }


    /**
    * Calculate the first date of the next month based on the current date.
    *
    * @param {boolean} asString - If true, returns the result as a formatted string in "YYYY-MM-DD" format; if false, returns a Date object.
    * @param {string} delimiter - The delimiter used in the formatted string (ignored if asString is false).
    * @returns {string|Date} - The first date of the next month, either as a formatted string or a Date object, depending on the 'asString' parameter.
    */
    getFirstDateOfNextMonth(asString = true, delimiter = this.delimeter) {
        let nextMonth;
        let nextYear;

        if (this.month === 12) {
            nextMonth = 1;
            nextYear = this.year + 1;
        } else {
            nextMonth = this.month + 1;
            nextYear = this.year;
        }

        if (asString) {
            const formattedMonth = String(nextMonth).padStart(2, '0');
            const result = `${nextYear}${delimiter}${formattedMonth}${delimiter}01`;
            if (this.debug) {
                console.log(
                    'object id: ' + this.id,
                    this.debugDelimeter,
                    'method: getFirstDateOfNextMonth',
                    this.debugDelimeter,
                    'params: asString = ' + asString + ', delimiter = ' + delimiter,
                    this.debugDelimeter,
                    'result: ' + result
                );
            }
            return result;
        } else {
            const result = new Date(nextYear, nextMonth - 1, 1); // Month is 0-based index
            if (this.debug) {
                console.log(
                    'object id: ' + this.id,
                    this.debugDelimeter,
                    'method: getFirstDateOfNextMonth',
                    this.debugDelimeter,
                    'params: asString = ' + asString + ', delimiter = ' + delimiter,
                    this.debugDelimeter,
                    'result: ' + result
                );
            }
            return result;
        }
    }

    
    /**
     * Move the current date forward or backward by a specified number of months.
     *
     * @param {number} operator - The number of months to move the date. Positive values move it forward; negative values move it backward.
     * @returns {string} - The updated date in "YYYY-MM" format as a string.
     * @throws {Error} - Throws an error if the 'operator' is not a valid integer.
     */
    moveMonth(operator = 1) {
        if (typeof operator !== 'number' || !Number.isInteger(operator)) {
            throw new Error('Operator must be an integer.');
        }

        // Calculate the new month and year based on the operator
        let newMonth = this.month + operator;
        let newYear = this.year;

        if (newMonth > 12) {
            newYear += Math.floor((newMonth - 1) / 12);
            newMonth = (newMonth - 1) % 12 + 1;
        } else if (newMonth < 1) {
            newYear -= Math.floor((-newMonth) / 12);
            newMonth = 12 - ((-newMonth) % 12);
        }

        this.month = newMonth;
        this.year = newYear;

        const result = this.getShortDate();
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: moveMonth',
                this.debugDelimeter,
                'params: operator = ' + operator,
                this.debugDelimeter,
                'result: ' + result
            );
        }
        this.triggerDateChanged();
        return result;
    }


    /* --------- COMPARISON PART  (no debugging) -------------- */

     /**
     * Compare two ShortDate instances.
     * @param {ShortDate} date1 - The first ShortDate instance to compare.
     * @param {ShortDate} date2 - The second ShortDate instance to compare.
     * @returns {number} - Returns -1 if date1 is before date2, 0 if they are equal, and 1 if date1 is after date2.
     */
     static compare(date1, date2) {
        if (date1.year < date2.year || (date1.year === date2.year && date1.month < date2.month)) {
            return -1; // date1 is before date2
        } else if (date1.year === date2.year && date1.month === date2.month) {
            return 0; // date1 is equal to date2
        } else {
            return 1; // date1 is after date2
        }
    }

    /**
     * Check if the ShortDate instance is before or equal to another ShortDate instance.
     *
     * @param {ShortDate} otherDate - The other ShortDate instance to compare.
     * @returns {boolean} - True if the current ShortDate is before or equal to the other ShortDate; otherwise, false.
     */
    isBeforeOrEqual(otherDate) {
        if (this.year < otherDate.year) {
            return true;
        } else if (this.year === otherDate.year && this.month <= otherDate.month) {
            return true;
        }
        return false;
    }

    /**
     * Calculate the difference in months between two ShortDate instances.
     * @param {ShortDate} date1 - The first ShortDate instance.
     * @param {ShortDate} date2 - The second ShortDate instance.
     * @param {boolean} abs - If true, returns the absolute difference; if false, returns a negative value if date2 is before date1.
     * @returns {number} - The number of months between date1 and date2.
     */
    static difference(date1, date2, abs = true) {
        const months1 = date1.year * 12 + date1.month;
        const months2 = date2.year * 12 + date2.month;
        const diff = months2 - months1;
        return abs ? Math.abs(diff) : diff;
    }

    /**
     * Check if the ShortDate represents the current month and year.
     *
     * @returns {boolean} - True if the ShortDate is the current month and year; otherwise, false.
     */
    isCurrentDate() {
        const currentDate = new Date(); // Get the current date
        const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
        const currentYear = currentDate.getFullYear();

        return this.month === currentMonth && this.year === currentYear;
    }




   


    /* --------- MAINTAIN PART  (no debugging) -------------- */

    /**
     * Generate an array of ShortDate objects between two ShortDate instances.
     *
     * @static
     * @param {ShortDate} startDate - The starting ShortDate instance (past).
     * @param {ShortDate} endDate - The ending ShortDate instance (future).
     * @returns {ShortDate[]} - An array of ShortDate objects between the start and end dates.
     */
    static getDateRange(startDate, endDate) {
        if (!startDate || !endDate || startDate.constructor !== ShortDate || endDate.constructor !== ShortDate) {
            throw new Error('Both startDate and endDate must be valid ShortDate instances.');
        }

        const dateRange = [];
        let currentDate = startDate.clone(); // Create a clone of the start date

        while (currentDate.isBeforeOrEqual(endDate)) {
            dateRange.push(currentDate.clone()); // Push a clone of the current date to the array
            currentDate.moveNextMonth();
        }

        return dateRange;
    }


    clone(){
        let clon = new ShortDate(this.year + '-' + this.month);
        clon.debug = this.debug;
        clon.delimeter = this.delimeter;
        clon.debugDelimeter = this.debugDelimeter;
        return clon;
    }

    setId(id = '') {
        if (id.length != 0){
            this.id = id;
            return id;
        }
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10;
        let randomId = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        this.id = randomId;
        return randomId;
    }


    log(){
        console.log(
            'SHORTDATE object id: ' + this.id,
            this.debugDelimeter,
            'month: ' + this.month,
            this.debugDelimeter,
            'year: ' + this.year,
            this.debugDelimeter,
            'object: '
        );
        console.log(this);
    }

    static info() {
        return `
            <div>
                <h1>ShortDate Class</h1>
                <p>
                    The ShortDate class is a JavaScript class designed to simplify the handling of date-related operations,
                    particularly focused on month and year representations.
                </p>
                <h2>Constructor</h2>
                <p>
                    <code>constructor(input = false, debug = false)</code>: The constructor method initializes a new instance of the ShortDate class.
                    It accepts an optional input parameter, which can be a Date object or a date string in "MM/YYYY" or "MM-YYYY" format.
                    Additionally, it allows you to enable debugging mode by setting the debug parameter to true.
                    When debugging is enabled, the class logs detailed information about method calls and their results, helping with code analysis and troubleshooting.
                </p>
                <!-- Add descriptions for properties and methods here -->
                <h2>Properties</h2>
                <p>
                    <code>id: </code>Each instance of the ShortDate class is assigned a unique random id. 
                    This id serves as a helpful identifier when debugging code that involves multiple instances of the class.
                </p>
                <p>
                <code>debug: </code>The debug property is a boolean that can be set to true or false. When set to true, it enables debugging mode, causing the class to log information about method calls and their outcomes. This is useful for tracking the behavior of the class during debugging.
                </p>
                <h2>Methods</h2>
                <p>
                    <code>getShortDate(delimiter = '-'): </code>This method returns the current date in "YYYY-MM" format as a string. You can specify a custom delimiter (e.g., "/", "-") as an optional parameter.
                </p>
                <p>
                    <code>moveNextMonth(): </code>Moves the current date to the next month and returns the updated date in "YYYY-MM" format as a string.
                </p>
                <p>
                <code>movePreviousMonth(): </code>Moves the current date to the previous month and returns the updated date in "YYYY-MM" format as a string.
                </p>
                <p>
                <code>moveNextYear(): </code>Moves the current date to the next year and returns the updated date in "YYYY-MM" format as a string.
                </p>
                <p>
                <code>movePreviousYear(): </code>Moves the current date to the previous year and returns the updated date in "YYYY-MM" format as a string.
                </p>
                <p>
                <code>getLastDayOfMonth(): </code>Calculates and returns the last day of the current month as a number.
                </p>
                <p>
                <code>getLastDateOfPreviousMonth(asString = true, delimiter = '-'): </code>Calculates and returns the last date of the previous month based on the current date. You can specify whether to return the result as a string or a Date object and set a custom delimiter.
                </p>
                <p>
                <code>getFirstDateOfNextMonth(asString = true, delimiter = '-'): </code>Calculates and returns the first date of the next month based on the current date. You can specify whether to return the result as a string or a Date object and set a custom delimiter.
                </p>
                <p>
                <code>moveMonth(operator = 1): </code>Allows you to move the current date forward or backward by a specified number of months (the operator parameter). It returns the updated date in "YYYY-MM" format as a string.
                </p>


            </div>
        `;
    }
    
/*

To enhance the functionality and usability of the ShortDate class, you can consider adding the following methods:

Comparison Methods:

Methods for comparing ShortDate instances, such as isEqual, isBefore, and isAfter, to compare dates.
Date Formatting Methods:

Additional methods for formatting dates in different styles or locales.
Date Parsing Methods:

Methods for parsing date strings in various formats into ShortDate objects.
Arithmetic Methods:

Methods for performing date arithmetic, such as adding or subtracting days, weeks, or other time units.
Day-of-the-Week Methods:

Methods to determine the day of the week (e.g., Monday, Tuesday) for a given date.
Holidays and Special Dates:

Methods for detecting holidays or special dates based on the current date.
Date Range Methods:

Methods for working with date ranges, such as checking if a date falls within a specific range.
Time Zone Handling:

Methods for handling time zones and conversions between time zones.
Custom Formatting Options:

Additional options for customizing date formatting, including custom date and time patterns.
Event Handling:

Event listeners or hooks that allow users of the class to execute custom code when specific events or date changes occur.
Localization and Internationalization:

Methods to handle different languages and cultural conventions for date formatting and parsing.
Calendar Functions:

Methods for generating calendars, including displaying multiple months or weeks.
Validation Methods:

Methods for validating date strings or ShortDate instances to ensure they are valid dates.
Consider adding these methods based on the specific requirements and use cases of your application. These additions can make the ShortDate class even more versatile and useful for date-related tasks.

*/
}


class DateUtils {
    static location = { x: 0, y: 0 }
    static getDateMinusMonth(date, monthCount = 1) {
      const month = date.getMonth();
      const year = date.getFullYear();
  
      // Calculate the total months to subtract
      const totalMonthsToSubtract = month + (year * 12);
  
      // Calculate the new total months after subtracting the specified months
      const newTotalMonths = totalMonthsToSubtract - monthCount;
  
      // Calculate the new year and month from the new total months
      const newYear = Math.floor(newTotalMonths / 12);
      const newMonth = newTotalMonths % 12;
  
      // Create a new Date object with the updated month, year, and the same date of the month
      const newDate = new Date(newYear, newMonth, date.getDate());
  
      return newDate;
    }
  
    static getDatePlusMonth(date, monthCount = 1) {
      const month = date.getMonth();
      const year = date.getFullYear();
  
      // Calculate the total months to subtract
      const totalMonthsToSubtract = month + (year * 12);
  
      // Calculate the new total months after subtracting the specified months
      const newTotalMonths = totalMonthsToSubtract + monthCount;
  
      // Calculate the new year and month from the new total months
      const newYear = Math.floor(newTotalMonths / 12);
      const newMonth = newTotalMonths % 12;
  
      // Create a new Date object with the updated month, year, and the same date of the month
      const newDate = new Date(newYear, newMonth, date.getDate());
  
      return newDate;
    }
  
    static isDateToday(date) {
      // Get the current date
      const today = new Date();
      const dateIn = new Date(date);
  
      // Compare year, month, and day of the input date with today's date
      const isToday = (
        dateIn.getFullYear() === today.getFullYear() &&
        dateIn.getMonth() === today.getMonth() &&
        dateIn.getUTCDate() === today.getUTCDate()
        );
  
      return isToday;
    }
  
    updateURLParameter(url, param, paramVal) {
      var newAdditionalURL = "";
      var tempArray = url.split("?");
      var baseURL = tempArray[0];
      var additionalURL = tempArray[1];
      var temp = "";
      if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
          if (tempArray[i].split('=')[0] != param) {
            newAdditionalURL += temp + tempArray[i];
            temp = "&";
          }
        }
      }
  
      var rows_txt = temp + "" + param + "=" + paramVal;
      return baseURL + "?" + newAdditionalURL + rows_txt;
    }
  
    addParam(v) {
      var newURL = updateURLParameter(window.location.href, 'locId', 'newLoc');
      newURL = updateURLParameter(newURL, 'resId', 'newResId');
  
      window.history.replaceState('', '', updateURLParameter(window.location.href, "t", v));
      location.reload();
    }
  
  
    static getMonthColor($num) {
      const monthColors = [
        '#e1a7ed', // January 
        '#a7b1ed', // February
        '#a7cbed', // March
        '#a7e8ed', // April 
        '#9bf1d8', // May 
        '#99ebb5', // June 
        '#c3eda7', // July 
        '#eaf1a2', // August
        '#ede6a7', // September
        '#edd0a7', // October
        '#edb6a7', // November
        '#eda7bf', // December
      ];
      $num;
      return monthColors[$num];
    }
  
    static getCurrentDateAsString() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    static getDateAsString(currentDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    static getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(EventorUtils.setPosition, EventorUtils.showError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  
    static setPosition(position) {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
  
      EventorUtils.location.x = position.coords.latitude;
      EventorUtils.location.y = position.coords.longitude;
      console.log("Location:", EventorUtils.location);
    }
  
    static showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }
    }
  
    static getNextMonth(date) {
      const month = new Date(date).getMonth();
      const year = new Date(date).getFullYear();
      const day = new Date(date).getDate();
  
      return new Date(year, month + 1, 1);
    }
  
    static getPrevMonth(date) {
      const month = new Date(date).getMonth();
      const year = new Date(date).getFullYear();
      const day = new Date(date).getDate();
  
      return new Date(year, month - 1, day);
    }
  
    static changeAddressBar(param, value) {
      // Get the current URL and its search params
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
  
      // Set a new value for a specific parameter
      searchParams.set(param, value);
  
      // Update the URL with the modified search params
      url.search = searchParams.toString();
      window.history.pushState({}, '', url);
    }
  
    static getParam(param, clearHash = true) {
      const params = new URLSearchParams(window.location.href);
      console.log(params);
      if (params.has(param)) {
        let paramValue = params.get(param);
        // Decode the URL parameter value
        if (clearHash){
          paramValue = paramValue.replace('#', '');
        }
        console.log('param: ' + paramValue);
        return decodeURIComponent(paramValue);
      }
      return null;
    }
  
    static getSimpleDate(date, realize = false) {
      let relizer = 0;
      if (realize) {
        relizer = 1;
      }
      const month = String(new Date(date).getUTCMonth() + relizer).padStart(2, 0);
      const year = new Date(date).getFullYear();
      const day = String(new Date(date).getUTCDate()).padStart(2, 0);
  
      return (year + "-" + month + "-" + day);
    }
  
    static getFirstDayOfMonth(date, simplify = false, plusmonth = 0) {
      const month = new Date(date).getUTCMonth() + plusmonth;
      const year = new Date(date).getFullYear();
      if (simplify) {
        return (year + "-" + String(month + 1).padStart(2, 0) + "-" + "01");
      }
      return new Date(year, month, 1);
    }
  
    static getLastDayOfMonth(date, simplify = false, plusmonths = 0) {
      const month = new Date(date).getMonth() + plusmonths;
      const year = new Date(date).getFullYear();
      let nd = new Date(year, month + 1, 1); // Set day to 1 for the next month
      nd.setDate(nd.getDate() - 1); // Subtract 1 day to get the last day of the current month
      const day = String(nd.getUTCDate()).padStart(2, '0');
      if (simplify) {
        return year + "-" + String(nd.getMonth() + 1).padStart(2, '0') + "-" + day;
      }
      return nd;
    }
}
