let image = document.getElementById('the-gif');
let title = document.getElementById('scenario-title');
let text = document.getElementById('dynamic-text');

let mappings = {
    scenario1: {
        name: "Scenario 1",
        link: "images/prototype/v1/correction.gif",
        title: "Correction",
        description: "The system is in the on state and is waiting to detect the vehicle moving from the lane's center. Once the vehicle moves from the lane, a warning light notifies the user, and the vehicle's LMS system returns the vehicle to the center of the lane.",
        
    },
    scenario2: {
        name: "Scenario 2",
        link: "images/prototype/v1/switching_lanes.gif",
        title: "Switching Lanes",
        description: "The system is in the on state, and the driver uses their turn signal to make a lane change. The turn signal disables the system temporarily and allows the vehicle to perform the lane change. Once the lane change has finished, the vehicle’s LMS system is enabled once again. ",
    },
    scenario3: {
        name: "Scenario 3",
        link: "images/prototype/v1/speed.gif",
        title: "Speed",
        description: "The system is not able to be used when the vehicle is going under 35 miles per hour (MPH). Once the vehicle accelerates to 35 MPH, the system is turned on.",
    }
}

function b1Clicked(){
    title.innerText = mappings.scenario1.name;
    image.src = mappings.scenario1.link;
    text.innerHTML = `<h1>${mappings.scenario1.title}</h1><p1>${mappings.scenario1.description}</p1>`
}

function b2Clicked(){
    title.innerText = mappings.scenario2.name;
    image.src = mappings.scenario2.link;
    text.innerHTML = `<h1>${mappings.scenario2.title}</h1><p1>${mappings.scenario2.description}</p1>`
}

function b3Clicked(){
    title.innerText = mappings.scenario3.name;
    image.src = mappings.scenario3.link;
    text.innerHTML = `<h1>${mappings.scenario3.title}</h1><p1>${mappings.scenario3.description}</p1>`
}

document.addEventListener('DOMContentLoaded', () => {
    b1Clicked(); //go to the first scenario on startup
});