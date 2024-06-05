const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    })
})

const hidden = document.querySelectorAll('.project-fade');
hidden.forEach((el) => observer.observe(el));

function validateForm(){
    let name = document.forms[0].name.value;
    let email = document.forms[0].email.value;
    let comment = document.forms[0].subject.value;
    let message = document.forms[0].message.value;

    if (name == "") {
        alert("Name must not be empty!");
        return false;
    }
    if (email == "") {
        alert("Email must not be empty!");
        return false;
    }
    if (comment == "") {
        alert("Comments must not be empty!");
        return false;
    }
    if (message == "") {
        alert("Message must not be empty!");
        return false;
    }

    return true;
}