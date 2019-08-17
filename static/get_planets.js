function getPlanets(url) {
    let table = document.getElementById('mainTable');
    while (table.hasChildNodes()){
        table.removeChild(table.firstChild)
    }
    fetch(url)
        .then(planets => planets.json())
        .then(planets => {
            let planetsArrLength = planets.results.length;
            for (let i = 0; i < planetsArrLength; i++) {
                populatePlanetsTable(planets.results[i])

            }
        })
}


function populatePlanetsTable(planet) {
    let table = document.getElementById('mainTable');
    let row = document.createElement('tr');
    let names = document.createElement('td');
    let diameter = document.createElement('td');
    let climate = document.createElement('td');
    let terrain = document.createElement('td');
    let surfaceWater = document.createElement('td');
    let population = document.createElement('td');
    let residents = document.createElement('td');
    let vote = document.createElement('td');
    names.innerHTML = planet.name;
    diameter.innerHTML = planet.diameter;
    climate.innerHTML = planet.climate;
    terrain.innerHTML = planet.terrain;
    surfaceWater.innerHTML = planet.surface_water + '%';
    if (planet.population === 'unknown') {
        population.innerHTML = planet.population;
    } else {
        population.innerHTML = planet.population + ' people';
    }
    if (planet.residents.length === 0) {
        residents.innerHTML = 'No known residents';
    } else {
        let numberOfResidents = planet.residents.length + ' resident(s)';
        residents.innerHTML = '<button type="button" class="btn btn-primary residentsModalButton" data-toggle="modal" data-target="#residentsModal">' + numberOfResidents + '</button>';
        residents.addEventListener('click', function () {
            getResidents(planet.residents)
        })
    }
    vote.innerHTML = '<button class="btn btn-primary">Vote</button>';
    table.appendChild(row);
    row.appendChild(names);
    row.appendChild(diameter);
    row.appendChild(climate);
    row.appendChild(terrain);
    row.appendChild(surfaceWater);
    row.appendChild(population);
    row.appendChild(residents);
    row.appendChild(vote);
}


function getResidents(residents) {
    let residentTable = document.getElementById('residentsModalTable');
    while (residentTable.hasChildNodes()) {
        residentTable.removeChild(residentTable.firstChild)
    }

    for (let i = 0; i < residents.length; i++) {
        fetch(residents[i])
            .then(person => person.json())
            .then(person => {
                populateResidentsTable(person)
            })
    }
}


function populateResidentsTable(resident) {
    let residentTable = document.getElementById('residentsModalTable');

    let residentRow = document.createElement('tr');
    let _name = document.createElement('td');
    let _height = document.createElement('td');
    let _mass = document.createElement('td');
    let hairColor = document.createElement('td');
    let skinColor = document.createElement('td');
    let eyeColor = document.createElement('td');
    let birthYear = document.createElement('td');
    let _gender = document.createElement('td');
    _name.innerHTML = resident.name;
    _height.innerHTML = resident.height;
    _mass.innerHTML = resident.mass;
    hairColor.innerHTML = resident.hair_color;
    skinColor.innerHTML = resident.skin_color;
    eyeColor.innerHTML = resident.eye_color;
    birthYear.innerHTML = resident.birth_year;
    _gender.innerHTML = resident.gender;
    residentTable.appendChild(residentRow);
    residentRow.appendChild(_name);
    residentRow.appendChild(_height);
    residentRow.appendChild(_mass);
    residentRow.appendChild(hairColor);
    residentRow.appendChild(skinColor);
    residentRow.appendChild(eyeColor);
    residentRow.appendChild(birthYear);
    residentRow.appendChild(_gender);
}

// 'https://swapi.co/api/planets/'


function buttonAssigment(url) {

    fetch(url)
        .then(planets => planets.json())
        .then(planets => {
            let nextButton = document.getElementById('nextButton');
            let previousButton = document.getElementById('previousButton');
            previousButton.dataset.url = planets.previous;
            nextButton.addEventListener("click", function () {
                let urlNext = planets.next;
                previousButton.classList.remove('btn-secondary');
                previousButton.setAttribute('class', 'btn btn-primary');
                nextButton.dataset.url = urlNext;


            });
            if (planets.previous === "null"){
               previousButton.classList.remove('btn-primary');
               previousButton.setAttribute('class', 'btn btn-secondary');
               previousButton.dataset.url = url;

            }
            else{
                let previousUrl = document.getElementById('previousButton').dataset.url;
                previousButton.addEventListener("click", function () {
                // let urlPrevious = planets.previous;
                nextButton.dataset.url = previousUrl;



            })
            }

        })
}


function updateUrl() {
    return document.getElementById('nextButton').dataset.url;
}

// getPlanets('https://swapi.co/api/planets/');
// TODO find a way to switch url on buttons on reload
// buttonAssigment('https://swapi.co/api/planets/');


function main() {
    let url = updateUrl();
    getPlanets(url);
    buttonAssigment(url);
}

main()