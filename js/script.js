const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hidden = document.querySelectorAll('.project-fade');
hidden.forEach((el) => observer.observe(el));

function validateForm() {
    let name = document.forms[0].name.value;
    let email = document.forms[0].email.value;
    let comment = document.forms[0].subject.value;
    let message = document.forms[0].message.value;

    if (name === "") {
        alert("Name must not be empty!");
        return false;
    }
    if (email === "") {
        alert("Email must not be empty!");
        return false;
    }
    if (comment === "") {
        alert("Comments must not be empty!");
        return false;
    }
    if (message === "") {
        alert("Message must not be empty!");
        return false;
    }

    return true;
}

const exampleModal = document.getElementById('exampleModal');
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const recipient = button.getAttribute('data-bs-whatever');

        console.log(`Recipient: ${recipient}`);

        const modalTitle = exampleModal.querySelector('.modal-title');
        const modalBodyText = exampleModal.querySelector('#modal-body-text');

        const jsonUrl = `./json/${recipient}.json`;

        console.log(`Fetching JSON from: ${jsonUrl}`);

        $.getJSON(jsonUrl, function(data) {
            console.log('Data fetched:', data);
            modalTitle.textContent = recipient;

            modalBodyText.innerHTML = '';
            modalBodyText.classList.add('modal-stuff');

            const infoSection = document.createElement('div');
            infoSection.classList.add('modal-info');
            modalBodyText.appendChild(infoSection);

            // Add description
            if (data.description && data.description.length > 0) {
                const descTitle = document.createElement('h5');
                descTitle.textContent = 'Description';
                infoSection.appendChild(descTitle);

                const ul = document.createElement('ul');
                descTitle.classList.add('description-title');
                data.description.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });

                const desc = document.createElement('div');
                desc.appendChild(descTitle);
                desc.appendChild(ul);

                infoSection.appendChild(desc);
            }

            // Add demonstrated skills
            if (data.demonstrated_skills && data.demonstrated_skills.length > 0) {
                const skillsTitle = document.createElement('h5');
                skillsTitle.textContent = 'Demonstrated Skills';
                infoSection.appendChild(skillsTitle);

                const ul = document.createElement('ul');
                data.demonstrated_skills.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });

                const skill = document.createElement('div');
                skill.appendChild(skillsTitle);
                skill.appendChild(ul);

                infoSection.appendChild(skill);
            }

            // Add project source
            if (data.project_source && data.project_source.length > 0) {
                const sourceTitle = document.createElement('h5');
                sourceTitle.textContent = 'Project Source';
                infoSection.appendChild(sourceTitle);

                const ul = document.createElement('ul');
                data.project_source.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                
                const src = document.createElement('div');
                src.appendChild(sourceTitle);
                src.appendChild(ul);

                infoSection.appendChild(src);
            }

            // Add image
            if (data.image_url) {
                const img = document.createElement('img');
                img.src = data.image_url;
                img.alt = recipient;
                img.classList.add('img-fluid');
                img.classList.add('modal-image')
                modalBodyText.appendChild(img);
            }

            // Add external link
            if (data.external_link) {
                const link = document.createElement('a');
                link.href = data.external_link;
                link.textContent = "Project's Github";
                link.target = '_blank';
                link.classList.add('modal-link')
                modalBodyText.appendChild(link);
            }
            
        }).fail(function() {
            console.log('Failed to fetch data');
            modalTitle.textContent = recipient;
            modalBodyText.innerHTML = '<p>No data available for this project</p>';
        });
    });
}
