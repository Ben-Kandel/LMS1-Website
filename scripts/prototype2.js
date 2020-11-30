let fieldset = document.getElementById('the-fieldset');

document.getElementById('the-form').addEventListener('change', () => {
    updateForm();
    updateGif();
});

document.addEventListener('DOMContentLoaded', () => {
    // we want there to be a gif when the page loads, so lets do these things:
    updateForm(); 
    updateGif();
    fieldset.disabled = true;
});


let onSwitch = document.getElementById('system-status');
onSwitch.addEventListener('click', () => {
    // console.log(`the input is now ${onSwitch.checked}`);
    if(onSwitch.checked){
        fieldset.disabled = false;
    }else{
        fieldset.disabled = true;
    }
});

let image = document.getElementById('the-gif');


function updateForm(){

    let hideOption = (elementName) => {
        document.getElementById(elementName).style.visibility = "hidden";
        document.getElementById(elementName + 'label').style.visibility = "hidden";
    }

    let showOption = (elementName) => {
        document.getElementById(elementName).style.visibility = "visible";
        document.getElementById(elementName + 'label').style.visibility = "visible";
    }

    let enableOption = (elementName) => {
        document.getElementById(elementName).checked = true;
    };
    
    
    if(document.getElementById('obstacle1').checked){
        showOption('drift2');
    }else{
        hideOption('drift2');
        enableOption('drift1');
    }

    if(document.getElementById('lane1').checked){
        // console.log('no lane change selected');
        showOption('obstacle1');

        showOption('drift1');
    }else if(document.getElementById('lane2').checked){
        // console.log('turn signal checked');
        hideOption('obstacle1');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');
    }else{
        // console.log('torque on wheel checked');
        hideOption('obstacle1');
        enableOption('obstacle2');

        hideOption('drift1');
        showOption('drift2');
        enableOption('drift2');
    }



}

function updateGif(){
    // lets get some values
    let obstacle = (document.getElementById('obstacle1').checked) ? true : false;
    let above35 = (document.getElementById('speed1').checked) ? false : true;
    let leftDrift = (document.getElementById('drift1').checked) ? true : false;
    let systemOff = (document.getElementById('system-status').checked) ? false : true;
    let turnMode = "none";
    if(document.getElementById('lane2').checked) turnMode = "signal";
    if(document.getElementById('lane3').checked) turnMode = "torque";

    let imagePath = "images/prototype/v2/";

    if(systemOff){
        //if we're supposed to be off right now, show the image of the system being off
        console.log('system is off!');
        image.src = imagePath + "off.png";
        return;
    }else{
        console.log('good to go!');
    }
    
    if(above35){
        if(leftDrift){
            if(obstacle){
                image.src = imagePath + "obstacleyesdrift38.gif";
            }else{
                image.src = imagePath + "drift38.gif";
            }
        }else{
            if(obstacle){
                image.src = imagePath + "obstaclenodrift38.gif";
            }else{
                if(turnMode == "none"){
                    //nothing
                }else if(turnMode == "signal"){
                    image.src = imagePath + "lanechangesignal38.gif";
                }else{
                    //it must be torque mode
                    image.src = imagePath + "lanechangeforce38.gif";
                }
            }
        }

    }else{
        if(leftDrift){
            if(obstacle){
                image.src = imagePath + "obstacleyesdrift33.gif";
            }else{
                image.src = imagePath + "drift33.gif";
            }
        }else{
            if(obstacle){
                image.src = imagePath + "obstaclenodrift33.gif";
            }else{
                if(turnMode == "none"){
                    //nothing
                }else if(turnMode == "signal"){
                    image.src = imagePath + "lanechangesignal33.gif";
                }else{
                    //must be torque mode
                    image.src = imagePath + "lanechangeforce33.gif";
                }
            }
        }
    }
    
}