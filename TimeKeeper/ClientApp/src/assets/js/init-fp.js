
// A script used for initializing flatpickr calendar inside
// component /src/app/Home/Dashboard/Calendar
function init_fp(fp) {

    let today = new Date();
    
    // Decide how many calendars to show
    let show_months = 1;
    if (window.innerWidth >= 1500) {
        show_months = 4;
    }
    else if (window.innerWidth >= 1100) {
        show_months = 3;
    }
    else if (window.innerWidth >= 750) {
        show_months = 2;
    }

    let fp_inst = flatpickr("#fpWorkday", {
        dateFormat: "Y-m-d",
        inline: true,
        locale: {
            firstDayOfWeek: 1,
        },
        showMonths: show_months,
        // maxDate: new Date(today.getFullYear(), today.getMonth() + 1, 1).fp_incr(-1),
        maxDate: new Date(),

        onChange: function (date, dateStr, fp_inst) {

            if (date[0].getDay() == 0 || date[0].getDay() == 6) {
                // Do not allow opening weekends
            }
            else if (flatpickr.formatDate(date[0], "Y-m-d") == flatpickr.formatDate(today, "Y-m-d")) {
                // Do not allow opening current date
            }
            else {
                // Call modal open function stored in HTML element
                fp_inst._input.open_modal_day(dateStr)
            }
        },

        onDayCreate: function(dateObj, dStr, fp, dayElem){
            // Utilize dayElem.dateObj, which is the corresponding Date
    
            dateObj = dayElem.dateObj;

            console.log(`Generating ${flatpickr.formatDate(dateObj, "Y-m-d")}`)

            if (dateObj.getDay() == 0 || dateObj.getDay() == 6) {
                dayElem.classList.add("weekend");
            }
            else {
                // This is workday

                // DEMO: randomly set dates of current month as editable
                // if (Math.random() < 0.25) {
                if (dateObj.getDay() < 4) {
                    dayElem.classList.add("editable");
                }
            }
        }
    });

    // Change months so that current month is last one
    if (show_months > 1) {
        fp_inst.changeMonth(-show_months + 1);
    }

    // Set function to the HTML element
    document.getElementById("fpWorkday").open_modal_day = async function(date) {

        // Create date from string
        date = new Date(date);

        // Set up modal

        workday_modal_title.innerText = flatpickr.formatDate(date, "Y-m-d");

        // await fetch('...')

        workday_save_b.onclick = function () { // fetch() // POST
        }

        // Open modal
        workdayModalOpen.click();

    }
}
