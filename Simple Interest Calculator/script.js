function updateRate() {
    let displayed_span = document.getElementById('rate_val');
    let updated_value = document.getElementById('rate');
    displayed_span.innerHTML = updated_value.value;
}

function compute() {
    principal = document.getElementById('principal');
    rate = document.getElementById('rate');
    years = document.getElementById('years');

    if (principal.value == '' || years.value == '') {

        button = document.getElementsByTagName('button')[0];
        error_messages = document.getElementsByClassName('error_message');

        if (principal.value == '') {
            error_messages[0].innerHTML = "Please enter a value.";
            error_messages[0].style.visibility = "visible";

        }
        if (years.value == '') {
            error_messages[1].innerHTML = "Please enter a value.";
            error_messages[1].style.visibility = "visible";
        }
        button.disabled = true;
        button.style.backgroundColor = '#7c7c7c';
        button.style.color = '#616161ff';
    }
    else
    {
        principal_value = parseFloat(principal.value);
        rate_value = parseFloat(rate.value);
        years_value = Number(years.value);

        interest_display = document.getElementById('interest_value');
        years_display = document.getElementById("expected_year");
        total_display = document.getElementById('result');

        interest = principal_value*rate_value*years_value/100;
        total = principal_value + interest;

        total_display.innerText = total;
        interest_display.innerText = interest;

        const today = new Date();
        const expected_date = new Date(today);
        expected_date.setFullYear(today.getFullYear()+years_value);
        formatted_date = expected_date.toLocaleDateString('en-GB',{ day: '2-digit', month: 'long', year: 'numeric' });

        years_display.innerText = formatted_date;
    }
}

function checkInput(input_value, node) {
    const error_messages = document.getElementsByClassName('error_message');
    const button = document.getElementsByTagName('button')[0];
    
    if (node == "principal") node_index = 0;
    else if (node == "years") node_index = 1;

    if (input_value <= 0) {
        error_messages[node_index].innerHTML = "Please enter a positive number.";
        error_messages[node_index].style.visibility = "visible";
        button.disabled = true;
        button.style.backgroundColor = '#7c7c7c';
        button.style.color = '#616161ff';
    }
    else{
        error_messages[node_index].style.visibility = "hidden";
        button.disabled = false;
        button.style.backgroundColor = '#323232';
        button.style.color = 'azure';
    }
}