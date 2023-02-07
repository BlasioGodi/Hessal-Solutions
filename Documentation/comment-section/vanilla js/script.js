console.log("HDcomments init");

const HDC_EL = {
    submit: document.getElementById("hdc_submit"),
    comment: document.getElementById("hdc_comment_input"),
    email: document.getElementById("hdc_email_input"),
    user_name: document.getElementById("hdc_name_input"),
    reactions: document.getElementsByClassName("hdc_reaction")
};

function hdc_canSubmit() {
    //Check the required fields
    let comment = HDC_EL.comment.nodeValue.trim();
    let email = HDC_EL.email.nodeValue.trim();
    let name = HDC_EL.user_name.nodeValue.trim();
    if (comment.length > 4 && email.length > 4 && name.length > 4) {
        HDC_EL.submit.classList.add("hdc_submit_enabled");
        HDC_EL.submit.disabled = false;
        console.log("good to go");
    } else {
        HDC_EL.submit.classList.remove("hdc_submit_enabled");
    }
}

function hdc_set_event_listeners() {
    HDC_EL.comment.addEventListener("keyup", "hdc_canSubmit");
    HDC_EL.email.addEventListener("keyup", "hdc_canSubmit");
    HDC_EL.user_name.addEventListener("keyup", "hdc_canSubmit");
}

hdc_set_event_listeners();