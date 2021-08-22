const arr = [];
let count = 0;
document.getElementById("counter1").innerHTML = count;
document.getElementById("counter2").innerHTML = count;
document.getElementById("counter3").innerHTML = count;

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let delay = 2000;

//variables responds for starting and stopping the generator/receiver
let isWorkingGenerator = false;
let isWorkingRecipient = false;

//timers ID
let timeoutIdGenerator;
let timeoutIdRecipient;

// starting setTimeout with a random delay
// the object generator
const startTimer = () => {
    if (!isWorkingGenerator) {
        isWorkingGenerator = true;
        timeoutIdGenerator = setTimeout(generatorStart,  Math.floor(Math.random() * 10000));
        document.getElementById("generatorBtn").style.backgroundColor = "red";
        document.getElementById("generatorBtn").style.borderColor = "red";
    }
    else {
        isWorkingGenerator = false;
        clearTimeout(timeoutIdGenerator);
        document.getElementById("generatorBtn").style.backgroundColor = "green";
        document.getElementById("generatorBtn").style.borderColor = "green";
    }
};

//add received data in array
//restart recursive setTimeout
const generatorStart = () => {
    if (isWorkingGenerator) {
        arr.push({data: Math.floor(Math.random() * 100)});
        isWorkingGenerator = false;
        startTimer()
    }
};

//
const startingScore = () => {
    if (!isWorkingRecipient) {
        isWorkingRecipient = true;
        timeoutIdRecipient = setTimeout(increaseCount, delay);
        document.getElementById("increaseBtn").style.backgroundColor = "red";
        document.getElementById("increaseBtn").style.borderColor = "red";
    }
    else {
        isWorkingRecipient = false;
        clearTimeout(timeoutIdRecipient);
        document.getElementById("increaseBtn").style.backgroundColor = "green";
        document.getElementById("increaseBtn").style.borderColor = "green";
    }
};

//take out the logic that repeats itself
const getFirstElem = (id, counter) => {
    arr.shift();
    document.getElementById(id).innerHTML = counter;
    startingScore();
    delay = 2000;
};

//extracts from the queue first object; increase necessary counter
const increaseCount = () => {
    if (isWorkingRecipient) {
        isWorkingRecipient = false;
        let firstElement = arr?.[0]?.data;
        if(arr.length > 0 && firstElement < 30){
            counter1++;
            getFirstElem("counter1", counter1)
        } else if (arr.length > 0 && firstElement > 30 && firstElement < 70){
            counter2++;
            getFirstElem("counter2", counter2)
        } else if (arr.length > 0 && firstElement > 70) {
            counter3++;
            getFirstElem("counter3", counter3);
        } else {
            delay+=1000;
            startingScore();
        }
    }
};

// reset counters
const resetCounters = () =>{
    counter1 = 0;
    counter2 = 0;
    counter3 = 0;
    document.getElementById("counter1").innerHTML = 0;
    document.getElementById("counter2").innerHTML = 0;
    document.getElementById("counter3").innerHTML = 0;
};
