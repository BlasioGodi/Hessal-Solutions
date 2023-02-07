console.log("HDcomments init");

const HDC_EL = {
    submit: document.getElementById("hdc_submit"),
    comment: document.getElementById("hdc_comment_input"),
    email: document.getElementById("hdc_email_input"),
    user_name: document.getElementById("hdc_name_input"),
    reactions: document.getElementsByClassName("hdc_reaction")
};

function hdc_can_submit() {
    //Check the required fields
    let comment = HDC_EL.comment.value.trim();
    let email = HDC_EL.email.value.trim();
    let name = HDC_EL.user_name.value.trim();
    if (comment.length > 4 && email.length > 4 && name.length > 4) {
        //Email validation first takes place and then validation of other items.
        if (hdc_validate_email(email)) {
            HDC_EL.submit.classList.add("hdc_submit_enabled");
            HDC_EL.submit.disabled = false;
            console.log("Email is valid. good to go");
        } else {
            HDC_EL.submit.classList.remove("hdc_submit_enabled");
            HDC_EL.submit.disabled = true;
            console.log("Email is not valid.");
        }
    } else {
        HDC_EL.submit.classList.remove("hdc_submit_enabled");
        HDC_EL.submit.disabled = true;
    }
}

function hdc_set_event_listeners() {
    HDC_EL.comment.addEventListener("keyup", hdc_can_submit);
    HDC_EL.email.addEventListener("keyup", hdc_can_submit);
    HDC_EL.user_name.addEventListener("keyup", hdc_can_submit);
}

hdc_set_event_listeners();

//Email validation function
function hdc_validate_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

//Email validation check Example
// if (hdc_validate_email(email)) {
//     console.log("Email is valid");
// } else {
//     console.log("Email is not valid");
// };
