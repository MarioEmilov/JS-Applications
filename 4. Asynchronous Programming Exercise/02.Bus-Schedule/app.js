function solve() {
    const label = document.querySelector('#info span')
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    let stop = {
        next: 'depot'

    }
    async function depart() {
        // get information about next stop
        //display name og next stop
        // activate another button
        
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`

        const res = await fetch(url)
        stop = await res.json()

        label.textContent = `Nex stop: ${stop.name}`

        departBtn.disabled = true
        arriveBtn.disabled = false
        
    }

    function arrive() {
        // display name og current stop
        //activate other button

        label.textContent = `Arriving at: ${stop.name}`

        departBtn.disabled = false
        arriveBtn.disabled = true
        
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();