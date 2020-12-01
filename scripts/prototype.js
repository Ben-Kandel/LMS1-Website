let fieldset = document.getElementById('the-fieldset');
let description = document.getElementById('description-text');

let descriptions = {
    off: "This scenario shows when LMS is completely turned off by the user. No corrections will be made to the vehicle, as the system is not on.",
    signal38: "This scenario shows the vehicle using turn signals to change lanes to tell the system to disengage temporarily. When the driver activates the turn signals, the system goes into an idle state which is seen by the orange indicator light on the dash. Once the user has finished their lane change and the turn signal is disengaged, the system goes back into an on and active state. Here, LMS is active before and after the lane change is made since the speed is over 35 mph.",
    signal33: "This scenario shows the vehicle using turn signals to change lanes to tell the system to disengage temporarily. Here, LMS is inactive before, during, and after the lane change is made since the speed is under 35 mph.",
    torque38: "In this scenario, the driver doesn’t use the turn signals and initiates a lane change. Because there is force on the wheel, the system determines this is intentional and switches into an idle state. Once the lane change is complete and there is no longer force on the steering wheel, the system re-engages.",
    torque33: "In this scenario, the driver doesn’t use the turn signals and initiates a lane change. The system is idle since the speed is below 35 mph. After the lane change and there is no longer force on the wheel, the system remains idle because the speed is too slow.",
    drift38: "This scenario is of the system running under ideal conditions. The light indicates that the system is active since the driver is driving over 35 mph. The car drifts toward the lane marker to the left until the warning light is displayed. After the warning light is displayed and the car continues to drift, the LMS takes corrective action and steers the vehicle back into the middle of the lane.",
    drift33: "In this scenario, the vehicle is drifting out of its lane. Since the speed is below 35 mph, the system is idle and therefore does not make any corrections or notify the driver that they are leaving their lane.",
    obstacleSwerve33: "This scenario depicts an obstacle in the road which should be avoided. The system is currently idle since the vehicle is under 35 mph so no actions are made. However, the driver was paying attention and they swerved out of the way just in time to avoid the pothole.",
    obstacleSwerve38: "This scenario depicts an obstacle in the road which should be avoided. The system is on and functioning however the system does not detect the obstacle so it does nothing to avoid the pothole. Luckily, the driver was paying attention and they swerved out of the way just in time to avoid the pothole. When they swerved, they put force on the steering wheel so the system went idle and did not warn the driver that they were leaving their lane.",
    error38: "This scenario depicts how an error in the LMS is managed when the system is on. When an error occurs while the system is on, the driver is notified in the center of the dash and the system turns off.",
    error33: "This scenario depicts how an error in the LMS is managed when the system is idle. When an error occurs while the system is idle, the driver is notified in the center of the dash and the system turns off.",
    obstacleHit33: "This scenario depicts an obstacle in the road which should be avoided. The system is currently idle since the vehicle is under 35 mph so no actions are made. Here, the driver was not paying attention and the pothole was not avoided.",
    obstacleHit38: "This scenario depicts an obstacle in the road which should be avoided. The system is on and functioning however the system does not detect the obstacle so it does nothing to avoid the pothole. Unfortunately, the driver was not paying attention and the pothole was hit.",
    curvy33: "In this scenario, the road is very curvy. Since the speed is below 35 mph, the system is idle and makes no warnings or corrections. Here, the driver is not paying attention to the road, and continues in a straight line.",
    curvy38: "In this scenario, the road is very curvy. LMS is on and able to navigate through curves in the road. The system continues to remain on and in the center of the lane as the car moves along the curvy road.",
};


document.getElementById('the-form').addEventListener('change', () => {
    updateForm();
    updateGif();
});

document.addEventListener('DOMContentLoaded', () => {
    // we want there to be a gif when the page loads, so lets do these things:
    updateForm(); 
    updateGif();
    fieldset.disabled = true; //disable the inputs by default (because the system is off)
});


let onSwitch = document.getElementById('system-status');
onSwitch.addEventListener('click', () => {    
    if(onSwitch.checked){
        fieldset.disabled = false;
    }else{
        fieldset.disabled = true;
    }
});

let image = document.getElementById('the-gif');


function updateForm(){

    let hideOption = (elementName) => {
        document.getElementById(elementName).style.visibility = 'hidden';
        document.getElementById(elementName + 'label').style.visibility = 'hidden';
    };

    let showOption = (elementName) => {
        document.getElementById(elementName).style.visibility = 'visible';
        document.getElementById(elementName + 'label').style.visibility = 'visible';
    };

    let enableOption = (elementName) => {
        document.getElementById(elementName).checked = true;
    };

    let renameToDrift = () => {
        document.getElementById('dynamic-title').innerText = 'Drift';
        document.getElementById('drift1label').innerText = 'Left Drift';
    };

    let renameToSwerve = () => {
        document.getElementById('dynamic-title').innerText = 'Swerve';
        document.getElementById('drift1label').innerText = 'Left Swerve';
    };

    
    
    // if there is an obstacle
    if(document.getElementById('obstacle1').checked){
        showOption('drift2');
        // we need to change some text
        renameToSwerve();
    }else{
        hideOption('drift2');
        enableOption('drift1');
        renameToDrift();
    }

    // if no lane change option is selected
    if(document.getElementById('lane1').checked){
        showOption('obstacle1');
        showOption('drift1');
        showOption('road2');
        showOption('error2');
    }else if(document.getElementById('lane2').checked){
        // turn signal checked
        hideOption('obstacle1');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');

        hideOption('road2');
        enableOption('road1');
        
        hideOption('error2');
        enableOption('error1');
        return;
    }else{
        // torque on wheel checked
        hideOption('obstacle1');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');

        hideOption('road2');
        enableOption('road1');
        
        hideOption('error2');
        enableOption('error1');
        return;
    }

    // if straight road is checked
    if(document.getElementById('road1').checked){
        console.log('apparently straight road is checked');
        // show the stuff we did
        showOption('obstacle1');
        showOption('drift1');
        showOption('lane2');
        showOption('lane3');
        showOption('error2');
    }else{
        // curvy road is checked
        // hide obstacle, lane drift, lane changing, and error
        hideOption('obstacle1');
        showOption('obstacle2');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');

        console.log('forcing lane1 selection');
        enableOption('lane1');
        hideOption('lane2');
        hideOption('lane3');

        enableOption('error1');
        hideOption('error2');
        return;
    }

    if(document.getElementById('error1').checked){
        // show the stuff we hid
        showOption('obstacle1');
        showOption('drift1');
        showOption('lane2');
        showOption('lane3');
        showOption('road2');
    }else{
        // obstacle off, lane drift off, lane changing none, road type straight
        hideOption('obstacle1');
        showOption('obstacle2');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');

        enableOption('lane1');
        hideOption('lane2');
        hideOption('lane3');
        
        enableOption('road1');
        hideOption('road2');
    }
}

function updateGif(){
    // lets get some values
    let obstacle = (document.getElementById('obstacle1').checked) ? true : false;
    let above35 = (document.getElementById('speed1').checked) ? false : true;
    let leftDrift = (document.getElementById('drift1').checked) ? true : false;
    let systemOff = (document.getElementById('system-status').checked) ? false : true;
    let curved = (document.getElementById('road1').checked) ? false : true;
    let error = (document.getElementById('error2').checked) ? true : false;
    let turnMode = "none";
    if(document.getElementById('lane2').checked) turnMode = "signal";
    if(document.getElementById('lane3').checked) turnMode = "torque";

    let basePath = "images/prototype/v2/";

    let updateStuff = (imagePath, textDesc) => {
        image.src = basePath + imagePath;
        description.innerText = textDesc;
    }
    
    if(systemOff){
        //if we're supposed to be off right now, show the image of the system being off
        updateStuff("off.png", descriptions.off);
        return;
    }
    
    if(above35){
        if(leftDrift){
            if(obstacle){
                updateStuff("obstacleyesdrift38.gif", descriptions.obstacleSwerve38);
            }else{
                updateStuff("drift38.gif", descriptions.drift38);
            }
        }else{
            if(error){
                updateStuff("error38.gif", descriptions.error38);
            }else{
                if(curved){
                    updateStuff("curvy38.gif", descriptions.curvy38);
                }else{
                    if(obstacle){
                        updateStuff("obstaclenodrift38.gif", descriptions.obstacleHit38);
                    }else{
                        if(turnMode == "none"){
                            //nothing
                        }else if(turnMode == "signal"){
                            
                            updateStuff("lanechangesignal38.gif", descriptions.signal38);
                        }else{
                            //it must be torque mode
                            updateStuff("lanechangeforce38.gif", descriptions.torque38);
                        }
                    }
                }
            }
        }

    }else{
        if(leftDrift){
            if(obstacle){
                updateStuff("obstacleyesdrift33.gif", descriptions.obstacleSwerve33);
            }else{
                updateStuff("drift33.gif", descriptions.drift33);
            }
        }else{
            if(error){
                updateStuff("error33.gif", descriptions.error33);
            }else{
                if(curved){
                    updateStuff("curvy33.gif", descriptions.curvy33);
                }else{
                    if(obstacle){
                        updateStuff("obstaclenodrift33.gif", descriptions.obstacleHit33);
                    }else{
                        if(turnMode == "none"){
                            //nothing
                        }else if(turnMode == "signal"){
                            updateStuff("lanechangesignal33.gif", descriptions.signal33);
                        }else{
                            //must be torque mode
                            updateStuff("lanechangeforce33.gif", descriptions.torque33);
                        }
                    }
                }
            }
        }
    }
    
}