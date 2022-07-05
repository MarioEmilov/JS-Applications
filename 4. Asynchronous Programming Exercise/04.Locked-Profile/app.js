function lockedProfile() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            main.innerHTML = '';
            Object.values(data).forEach((p, index) => {
                const profile = createProfile(p, index);
                main.appendChild(profile);
            })
        });

    main.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        const profile = e.target.parentElement;
        const [lockedEl] = profile.querySelectorAll('input');

        if (lockedEl.checked) {
            return;
        }

        const hiddenDiv = profile.querySelector('#user1HiddenFields');

        if (hiddenDiv.style.display !== 'block') {
            hiddenDiv.style.display = 'block';
            e.target.textContent = 'Hide it';
        } else {
            hiddenDiv.style.display = 'none';
            e.target.textContent = 'Show more';
        }
    });

    function createProfile(info, index) {
        const div = document.createElement('div');
        div.classList.add('profile');
        div.innerHTML = `
                    <img src="./iconProfile2.png" class="userIcon" />
                    <label>Lock</label>
                    <input type="radio" name="user${index + 1}Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user${index + 1}Locked" value="unlock"><br>
                    <hr>
                    <label>Username</label>
                    <input type="text" name="user1Username" value="${info.username}" disabled readonly />
                    <div id="user1HiddenFields">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user${index + 1}Email" value="${info.email}" />
                        <label>Age:</label>
                        <input type="email" name="user${index + 1}Age" value="${info.age}"  />
                    </div>
                    <button>Show more</button>`
        return div;
    }
}