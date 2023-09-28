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