//get data
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

//Load all element func
document.addEventListener('DOMContentLoaded', function() {
  // Your code here, which will run after the DOM is ready
  let ansArr = findElement()
  console.log(ansArr)
});


let ans = []
let submitAns = []

//find Element
function findElement(){
    
    const submitBtn = document.querySelector('.submitAnsBtn'); 
    const clearBtn = document.querySelector('.clearAns'); 
    for ( let i = 1; i<=10 ; i++){
        ans[i] = document.querySelectorAll(`#q${i}`)

        addOnChangeListeners(ans[i],handleChange)
    }
    

    submitBtn.addEventListener('click', submitFunc)
}


//logical 
function submitFunc(){
    alert("Hello")
}

function addOnChangeListeners(nodeList, callback) {
    if (!nodeList || nodeList.length === 0) {
        console.warn("NodeList is empty or undefined.");
        
    }

    nodeList.forEach(function(element) {
        if (element) {
            console.log(element)
            element.addEventListener('change', callback);
        }
    });
}
function answerInfo(id, value, type) {
  this.id = id;
  this.value = value;
  this.type = type
}




function handleChange(event) {
    var obj = {};
    if(submitAns.length < 10){

        //console.log('Value changed:', event.target.value);
        // Add your desired logic here
        if(event.target.type === 'radio' && event.target.checked) {
            console.log("--- Radio Area ---")
            console.log(event.target.value)
            const radioAns = new answerInfo(event.target.id.slice(1, ),event.target.value,event.target.type)
            submitAns.push(radioAns)
            console.log(submitAns)
        }
        else if(event.target.tagNane === 'SELECT') {
            console.log("--- Select Area ---")
            console.log(event.target.value)
            const selectAns = new answerInfo(event.target.id.slice(1, ),event.target.value,event.target.type)
            submitAns.push(selectAns)
            console.log(submitAns)
    
        }
        else if(event.target.type === 'checkbox' && event.target.checked) {
            console.log("--- Checkbox Area ---")
            console.log(event.target.value)
            const checkBoxAns = new answerInfo(event.target.id.slice(1, ),event.target.value,event.target.type)
            submitAns.push(checkBoxAns)
            console.log(submitAns)
        }
        else{
            console.log("--- Another Area ---")
            console.log(event.target.value)
            const otherAns = new answerInfo(event.target.id.slice(1, ),event.target.value,event.target.type)
            submitAns.push(otherAns)
            console.log(submitAns)
        }
    }else{
        console.log(submitAns)
        const sortedSubmitAns = submitAns.sort((a, b) => a.id - b.id);
        console.log(sortedSubmitAns)
        
    }
}
 

fetchData();
