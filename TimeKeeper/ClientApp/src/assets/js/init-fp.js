
// A script used for initializing flatpickr calendar inside
// component /src/app/Home/Dashboard/Calendar
function init_fp(fp) {

    let today = new Date();

    flatpickr("#fpWorkday", {
        dateFormat: "Y-m-d",
        inline: true,
        showMonths: 4,
        locale: {
            firstDayOfWeek: 1,
        },
        // showMonths: 4,

        onChange: function (selectedDates, dateStr) {
            open_modal_day(dateStr)
        },

        onDayCreate: function(dateObj, dStr, fp, dayElem){
            // Utilize dayElem.dateObj, which is the corresponding Date
    
            dateObj = dayElem.dateObj;

            if (dateObj.getDay() == 0 || dateObj.getDay() == 6) {
                dayElem.classList.add("weekend");
            }
            else {
                // This is workday

                // DEMO: randomly set dates of current month as editable
                if (dateObj.getMonth() == today.getMonth() && Math.random() < 0.25) {
                    dayElem.classList.add("editable");
                }
            }
        }
    });

    async function open_modal_day(date) {

        // Set up modal

        workday_modal_title.innerText = date;

        // await fetch('...')

        workday_save_b.onclick = function () { // fetch() // POST
        }

        // Open modal
        workdayModalOpen.click();

    }
}
