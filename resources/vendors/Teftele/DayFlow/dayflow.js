
/*
████████╗███████╗███████╗████████╗███████╗██╗░░░░░███████╗
╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝██║░░░░░██╔════╝
░░░██║░░░█████╗░░█████╗░░░░░██║░░░█████╗░░██║░░░░░█████╗░░
░░░██║░░░██╔══╝░░██╔══╝░░░░░██║░░░██╔══╝░░██║░░░░░██╔══╝░░
░░░██║░░░███████╗██║░░░░░░░░██║░░░███████╗███████╗███████╗
░░░╚═╝░░░╚══════╝╚═╝░░░░░░░░╚═╝░░░╚══════╝╚══════╝╚══════╝

Dayflow Draws a calendar for you
Define an instance of the class and send em container Id to draw calendar





Author: Adaam Janson /Teftele/

░█▀▀▄ ─█▀▀█ ░█──░█ ░█▀▀▀ ░█─── ░█▀▀▀█ ░█──░█ 
░█─░█ ░█▄▄█ ░█▄▄▄█ ░█▀▀▀ ░█─── ░█──░█ ░█░█░█ 
░█▄▄▀ ░█─░█ ──░█── ░█─── ░█▄▄█ ░█▄▄▄█ ░█▄▀▄█
*/
class DayFlow {
    static startParam = 'stm';
    static endParam = 'enm';
    static dateArray = [];
    constructor(poolSelector) {
        this.pool = document.querySelector(poolSelector);
        if (!this.pool){
            throw new Error('There is no calendar pool selected by selector: "' + poolSelector + '"');
        };
        this.pool.classList.add('cl-body');

        // *** define start and end date range
        this.startMonth = "";
        this.endMonth = "";

        // Try to get values from URL, else define AS today
        if (DateUtils.getParam(DayFlow.startParam) != null){
            this.startMonth = new ShortDate(DateUtils.getParam(DayFlow.startParam));
        } else {
            this.startMonth = new ShortDate();
            DateUtils.changeAddressBar(DayFlow.startParam,
                this.startMonth.getShortDate());
        };
        
        if (DateUtils.getParam(DayFlow.endParam) != null){
            this.endMonth = new ShortDate(DateUtils.getParam(DayFlow.endParam));
        } else {
            this.endMonth = new ShortDate();
            DateUtils.changeAddressBar(DayFlow.endParam,
                this.endMonth.getShortDate());
        };

        if (!this.startMonth.isBeforeOrEqual(this.endMonth)){
            let transdate = this.startMonth;
            this.startMonth = this.endMonth;
            this.endMonth = transdate;
            // console.log("Date's flipped.");
            DateUtils.changeAddressBar(DayFlow.startParam,
                this.startMonth.getShortDate());
            DateUtils.changeAddressBar(DayFlow.endParam,
                this.endMonth.getShortDate());
        };

        // this.startMonth.debug = true;
        // this.endMonth.debug = true;
        DayFlow.dateArray = ShortDate.getDateRange(this.startMonth, this.endMonth);

        // *** render calendar rows
        for (let i = 0; i < DayFlow.dateArray.length; i++) {
            const dateElement = DayFlow.dateArray[i];
            this.renderMonth(dateElement);
        };


        // *** handle navigation buttons
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest(".cl-com-nextexpand")){
                e.preventDefault();
                let calledMonth = DayFlow.dateArray[0].clone();
                calledMonth.moveNextMonth();
                DayFlow.dateArray.unshift(calledMonth);
                this.endMonth = calledMonth;
                DateUtils.changeAddressBar(DayFlow.endParam,
                    calledMonth);
                this.renderMonth(calledMonth, true);
                this.triggerMoveEvent();
            };

            if (e.target.closest(".cl-com-prevexpand")){
                e.preventDefault();
                let calledMonth = DayFlow.dateArray[DayFlow.dateArray.length - 1].clone();
                calledMonth.movePreviousMonth();
                DayFlow.dateArray.push(calledMonth);
                this.startMonth = calledMonth;
                DateUtils.changeAddressBar(DayFlow.startParam,
                    calledMonth);
                this.renderMonth(calledMonth, false);
                this.triggerMoveEvent();
            };
            
            if (e.target.closest(".cl-com-next")){
                e.preventDefault();
                let calledMonth = DayFlow.dateArray[0].moveNextMonth();
                DayFlow.dateArray = [];
                this.pool.innerHTML = "";
                this.startMonth = calledMonth;
                this.endMonth = calledMonth;
                DateUtils.changeAddressBar(DayFlow.startParam,
                    this.startMonth.getShortDate());
                DateUtils.changeAddressBar(DayFlow.endParam,
                    this.endMonth.getShortDate());
                    DayFlow.dateArray.push(calledMonth);
                this.renderMonth(calledMonth);
                this.triggerMoveEvent();
            };

            if (e.target.closest(".cl-com-prev")){
                e.preventDefault();
                let calledMonth = DayFlow.dateArray[DayFlow.dateArray.length - 1].movePreviousMonth();
                DayFlow.dateArray = [];
                this.pool.innerHTML = "";
                this.startMonth = calledMonth;
                this.endMonth = calledMonth;
                DateUtils.changeAddressBar(DayFlow.startParam,
                    this.startMonth.getShortDate());
                DateUtils.changeAddressBar(DayFlow.endParam,
                    this.endMonth.getShortDate());
                    DayFlow.dateArray.push(calledMonth);
                this.renderMonth(calledMonth);
                this.triggerMoveEvent();
            };

            if (e.target.closest(".cl-nav")){
                let el = e.target.closest(".cl-nav");
                let trig = el.getAttribute('cl-move-down');
                if (trig != null){
                    var height = document.body.scrollHeight;
                    window.scroll(10 , height);
                }
            };
        });


        document.addEventListener('change', (e) => {
            e.preventDefault();
            if (e.target.closest('.cl-nav-date-flash')){
                e.preventDefault();
                let value = e.target.closest('.cl-nav-date-flash').value;
                console.log('value :>> ', value);
                let calledMonth = new ShortDate(value);
                DayFlow.dateArray = [];
                this.pool.innerHTML = "";
                this.startMonth = calledMonth;
                this.endMonth = calledMonth;
                DateUtils.changeAddressBar(DayFlow.startParam,
                    this.startMonth.getShortDate());
                DateUtils.changeAddressBar(DayFlow.endParam,
                    this.endMonth.getShortDate());
                    DayFlow.dateArray.push(calledMonth);
                this.renderMonth(calledMonth);
                this.triggerMoveEvent();
            }
        });
    }


    /**
    * Trigger the move or expand event.
    */
    triggerMoveEvent() {
        if (typeof this.movedCallback === 'function') {
            this.movedCallback(this);
        }
    }

    /**
     *
     * @param {Function} callback - The callback function to be called when the user changed or expand calendar.
     */
    onMoved(callback) {
        this.movedCallback = callback;
    }



    renderMonth(date, setOnStart = false) {
        const month = date.month;
        const year = date.year;
        let firstDayOfMonth = 1;
        let lastDayOfMonth = date.getLastDayOfMonth(true);
        let realDate = date.getDate();
        let mhdr = CalTemplate.createMonthHeader(realDate);
        if (setOnStart == false) {
            this.pool.appendChild( mhdr);
            // Loop from the first day to the last day of the month
            for (let day = lastDayOfMonth; day >= firstDayOfMonth; day--) {
                let mrow = CalTemplate.calRow(`${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
                this.pool.appendChild( mrow);
            }
        } else {
            for (let day = firstDayOfMonth; day <= lastDayOfMonth; day++) {
                const currentDate = day;
                let mrow = CalTemplate.calRow(`${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
                this.pool.prepend(mrow);
            }
            this.pool.prepend( mhdr);
        }
    }

    reset(date){
        this.pool.innerHTML = '';
        this.startMonth = date; this.endMonth = date;
        this.renderMonth(date);
        DayFlow.dateArray = ShortDate.getDateRange(this.startMonth, this.endMonth);
    }

};













/*
The ShortDate class is designed to simplify date manipulation in JavaScript, offering flexibility and debugging capabilities for developers working with date-related code.
version 1.0
Author: Adaam Janson /Teftele/

░█▀▀▀█ ░█─░█ ░█▀▀▀█ ░█▀▀█ ▀▀█▀▀ ░█▀▀▄ ─█▀▀█ ▀▀█▀▀ ░█▀▀▀ 
─▀▀▀▄▄ ░█▀▀█ ░█──░█ ░█▄▄▀ ─░█── ░█─░█ ░█▄▄█ ─░█── ░█▀▀▀ 
░█▄▄▄█ ░█─░█ ░█▄▄▄█ ░█─░█ ─░█── ░█▄▄▀ ░█─░█ ─░█── ░█▄▄▄
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

    /**
     * Get native date object
     *
     * @returns {Date} - The current date in "YYYY-MM" format as a string.
     */
    getDate(){
        return new Date(this.year, this.month - 1, 1);
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
     * @returns {ShortDate} - The updated date in "YYYY-MM" format as a string.
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
        return this;
    }


    /**
     * Move the current date to the previous month.
     *
     * @returns {ShortDate} - The updated date in "YYYY-MM" format as a string.
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
        return this;
    }


    /**
     * Move the current date to the next year.
     *
     * @returns {ShortDate} - The updated date in "YYYY-MM" format as a string.
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
        return this;
    }


    /**
     * Move the current date to the previous year.
     *
     * @returns {ShortDate} - The updated date in "YYYY-MM" format as a string.
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
        return this;
    }


    /**
     * Get the last day of the current month.
     *
     * @returns {number} - The last day of the current month as a number.
     */
    getLastDayOfMonth(asString = true) {
        // Calculate the last day of the current month
        const lastDay = new Date(this.year, this.month, 0);
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: getLastDayOfMonth',
                this.debugDelimeter,
                'result: ' + lastDay
            );
        }
        if (asString){
            return lastDay.getDate();
        }
        return lastDay;
    }

    
    /**
     * Get the last date of the current month.
     *
     * @param {boolean} asString - If true, returns the result as a formatted string in "YYYY-MM-DD" format; if false, returns a Date object.
     * @param {string} delimiter - The delimiter used in the formatted string (ignored if asString is false).
     * @returns {string|Date} - The last date of the current month, either as a formatted string or a Date object, depending on the 'asString' parameter.
     */
    getLastDate(asString = true) {
        // Calculate the last day of the current month
        const lastDay = new Date(this.year, this.month, 0);
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: getLastDayOfMonth',
                this.debugDelimeter,
                'result: ' + lastDay
            );
        }
        if (asString){
            return this.year + this.delimeter + this.month + this.delimeter + (lastDay.getDate()).toString().padStart(2, '0');
        }
        return lastDay;
    }


    /**
     * Get the first date of the current month.
     *
     * @param {boolean} asString - If true, returns the result as a formatted string in "YYYY-MM-DD" format; if false, returns a Date object.
     * @param {string} delimiter - The delimiter used in the formatted string (ignored if asString is false).
     * @returns {string|Date} - The first date of the current month, either as a formatted string or a Date object, depending on the 'asString' parameter.
     */
    getFirstDate(asString = true) {
        // Calculate the last day of the current month
        const firstday = new Date(this.year, this.month, 1);
        if (this.debug) {
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: getLastDayOfMonth',
                this.debugDelimeter,
                'result: ' + firstday
            );
        }
        if (asString){
            return this.year + this.delimeter + this.month + this.delimeter + '01';
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
        dateRange.reverse();
        return dateRange;
    }


    clone(){
        let clon = new ShortDate(this.year + '-' + this.month);
        clon.debug = this.debug;
        clon.delimeter = this.delimeter;
        clon.debugDelimeter = this.debugDelimeter;
        if (this.debug){
            console.log(
                'object id: ' + this.id,
                this.debugDelimeter,
                'method: clone',
                this.debugDelimeter,
                'params: source.month = ' + this.month,
                this.debugDelimeter,
                'result: clone.month = ' + clon.month
            );
        }
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
}




/**
 * 
░█▀▀▄ ─█▀▀█ ▀▀█▀▀ ░█▀▀▀ 　 ░█─░█ ▀▀█▀▀ ▀█▀ ░█─── ░█▀▀▀█ 
░█─░█ ░█▄▄█ ─░█── ░█▀▀▀ 　 ░█─░█ ─░█── ░█─ ░█─── ─▀▀▀▄▄ 
░█▄▄▀ ░█─░█ ─░█── ░█▄▄▄ 　 ─▀▄▄▀ ─░█── ▄█▄ ░█▄▄█ ░█▄▄▄█
 */
class DateUtils {
    static isDateToday(date) {
      // Get the current date
      const today = new Date();
      const dateIn = new Date(date);
      // Compare year, month, and day of the input date with today's date
      const isToday = (
        dateIn.getFullYear() === today.getFullYear() &&
        dateIn.getMonth() === today.getMonth() &&
        dateIn.getDate() === today.getDate()
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
        const urlSearchParams = new URLSearchParams(window.location.search);
        const paramValue = urlSearchParams.get(param);
    
        if (paramValue !== null) {
            // Check if the 'clearHash' flag is set to true and there is a '#' character in the parameter value
            if (clearHash && paramValue.includes('#')) {
                // Remove the '#' character and everything that follows it
                paramValue = paramValue.slice(0, paramValue.indexOf('#'));
            }
            console.log('param: ' + paramValue);
            return decodeURIComponent(paramValue);
        }
        return null;
    }

    static deleteAddressParam(param) {
        // Get the current URL and its search params
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
    
        // Set a new value for a specific parameter
        searchParams.delete(param);
    
        // Update the URL with the modified search params
        url.search = searchParams.toString();
        window.history.pushState({}, '', url);
      }
}








/*
Custom templates for calendar
version 1.0
Author: Adaam Janson /Teftele/


▀▀█▀▀ ░█▀▀▀ ░█▀▄▀█ ░█▀▀█ ░█─── ─█▀▀█ ▀▀█▀▀ ░█▀▀▀ ░█▀▀▀█ 
─░█── ░█▀▀▀ ░█░█░█ ░█▄▄█ ░█─── ░█▄▄█ ─░█── ░█▀▀▀ ─▀▀▀▄▄ 
─░█── ░█▄▄▄ ░█──░█ ░█─── ░█▄▄█ ░█─░█ ─░█── ░█▄▄▄ ░█▄▄▄█
*/
class CalTemplate
{
    static getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getUTCDay();   
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }

      static getMonthName(date) {
        let month = new Date(date).getMonth();   
        //console.log(month, date); 
        return isNaN(month) ? null : 
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
      }


      static createMonthHeader(date) {
        const month = CalTemplate.getMonthName(date);
        const monum = new Date(date).getMonth();
        const year = new Date(date).getFullYear();
        const color = DateUtils.getMonthColor(monum);
    
        // Create the outer div
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('evt-restrictor','uk-text-center','uk-background-muted');

        outerDiv.style.backgroundColor = color;
        outerDiv.style.boxShadow = 'inset 1px 1px 100px #ffffff6b';
        outerDiv.setAttribute('data-restrictor', `${month}-${year}`);

    
        // Create the card element
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('uk-text-bold');
        cardDiv.textContent = `${month} ${year}`;
    
        outerDiv.appendChild(cardDiv);
    
        return outerDiv;
    }


      static calRow(date, items = []){
        let row = document.createElement('div');
        row.id = 'row_' + date;
        row.classList.add('cl-row');
        row.setAttribute('data-date', date);
        row.classList.add('uk-text-center','uk-grid-collapse','start-collapse','uk-background-muted','event-section','uk-grid');

        let day = CalTemplate.getDayOfWeek(date);
        day = day.slice(0, 3);
        let dnum = new Date(date).getUTCDate();

        let todateId = DateUtils.isDateToday(date) ? "row_today" : "";
        let headdiv = document.createElement('div');
        headdiv.id = todateId;
        headdiv.classList.add('uk-width-auto@m','uk-text-left','th-padding-small','uk-first-column');

        let dnub = document.createElement('div');
        dnub.id = '';
        dnub.classList.add('uk-text-lead');
        dnub.innerHTML = `${day} '${dnum}`;
        
        let dnub2 = document.createElement('div');
        dnub2.id = '';
        dnub2.classList.add('uk-card','uk-text-small');
        dnub2.innerHTML = `${date}`;

        headdiv.appendChild(dnub);
        headdiv.appendChild(dnub2);

        let bodydiv = document.createElement('div');
        bodydiv.id = '';
        bodydiv.classList.add('uk-child-width-1-4@xl','uk-child-width-1-3@l','uk-child-width-1-2@m','uk-child-width-1-2@s','uk-grid-small','uk-grid-match','start-collapse','section-padding','uk-grid','uk-grid-stack','eventor-row-content');

        for (let index = 0; index < items.length; index++) {
          const element = items[index];
          bodydiv.appendChild(element);
        }
        if (items.length == 0){
          row.classList.add('eventor-hiddenrow');
        }

        if (todateId != ''){
          row.classList.add('eventor-today');
        }
        row.appendChild(headdiv);
        row.appendChild(bodydiv);
        
        return row;
      }


      static navButtons(curdate = '', moveDown = false)
      {
        let div = document.createElement('div');
        div.id = '';
        div.classList.add('cl-nav');
        if (moveDown){
          div.setAttribute('cl-move-down', moveDown);
        };
 
        let prevexbutton = document.createElement('div');
        prevexbutton.id = '';
        prevexbutton.classList.add('cl-com-prevexpand');
        prevexbutton.classList.add('cl-nav-button');
        prevexbutton.innerHTML = "<<";
        
        let prevbutton = document.createElement('div');
        prevbutton.id = '';
        prevbutton.classList.add('cl-com-prev');
        prevbutton.classList.add('cl-nav-button');
        prevbutton.innerHTML = "<";

        let calbutton = document.createElement('div');
        calbutton.id = '';
        calbutton.classList.add('cl-nav-button');
        
        let dateIn = document.createElement('input');
        dateIn.id = '';
        dateIn.classList.add('cl-nav-date-flash');
        dateIn.setAttribute('type', 'month');
        dateIn.setAttribute('name', 'flashdate');
        dateIn.setAttribute('value', curdate);
        dateIn.style.width = '22px';
        calbutton.appendChild(dateIn);

        let nextbutton = document.createElement('div');
        nextbutton.id = '';
        nextbutton.classList.add('cl-com-next');
        nextbutton.classList.add('cl-nav-button');
        nextbutton.innerHTML = ">";

        let nextexbutton = document.createElement('div');
        nextexbutton.id = '';
        nextexbutton.classList.add('cl-com-nextexpand');
        nextexbutton.classList.add('cl-nav-button');
        nextexbutton.innerHTML = ">>";

        div.appendChild(prevbutton);
        div.appendChild(prevexbutton);
        div.appendChild(calbutton);
        div.appendChild(nextexbutton);
        div.appendChild(nextbutton);

        return div;
      }

}