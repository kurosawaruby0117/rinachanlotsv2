const fileUpload=document.querySelector(".fileUPPP");
const inputForm=document.querySelector(".input__contents");
const input=document.querySelector("input");
const button=document.getElementsByClassName("submit")[0];
const WhatYouGot=document.getElementsByClassName("value")[0];
const list=document.getElementsByClassName("arrayList")[0];
const anonymous=document.getElementsByClassName("anonymous")[0];
const rinaPic=document.getElementsByClassName("rinaLocation")[0];
const downloadButton=document.getElementsByClassName("download")[0];
const uploadFile=document.getElementsByClassName("fileUpload")[0];

let inputArray=[];
let files;
let fileArray;
checkBoolean=false;

function saveFile(){
    const whatyouget=document.getElementsByClassName("arrayList")[0].querySelectorAll("span");
    if(whatyouget.length<=0){
        alert("please insert more than 1.");
    }else{
       var listOfArray=[];
       for(var i=0;i<inputArray.length;i++){
        console.log(whatyouget[i].innerText)
        listOfArray.push(whatyouget[i].innerText);
       }
        var textDownload=document.createElement('a');
       textDownload.href='data:attachment/text,'+encodeURI(listOfArray.join('\n'));
       textDownload.target='_blank';
       textDownload.download='lots.txt';
       textDownload.click();
       
    }
   
    
}
function handleAnonymous(event){
    console.log(1);
}
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    const cleanToDos = inputArray.filter(function(contents) {
      return contents.id !== li.id;
    });
    inputArray = cleanToDos;

}

function handleCheckButton(){
    checking=anonymous.checked;
    console.log(checking);
    if(checking){
        input.type="password";
        input.style="ime-mode:auto";
        checkBoolean=true;
    }else{
        input.type="text";
        checkBoolean=false;
    }
}
function handleInput(event){
    event.preventDefault();
    const potato=document.createElement("li");
    const delBtn=document.createElement("button");
    delBtn.innerText="X";
    delBtn.addEventListener("click",deleteToDo);
    const span=document.createElement("span");
    const newId=inputArray.length+1;
    if(checkBoolean){
        span.innerText="*****";
    }else{
        span.innerText=input.value;
    }
    potato.appendChild(span);
    potato.appendChild(delBtn);
    list.appendChild(potato);
    potato.id=newId;
    const toDoObj={
        text:input.value,
        id:potato.id,
    };
    inputArray.push(toDoObj);
    inputForm.reset();
}

function handleButton(event){
    const whatyouget=document.getElementsByClassName("arrayList")[0].querySelectorAll("span");
    console.log(whatyouget);
    if(inputArray.length>1){
        console.log(inputArray.length);
        const ranNumber=Math.floor(Math.random()*(inputArray.length-1+1));
        WhatYouGot.innerText=whatyouget[ranNumber].innerText;
    }else{
        alert("please insert more than 1.");
    }
}
function readFile1(e) { 
    var file = e.target.files[0];
 
    if (!file) {
           return;
    }
    var reader = new FileReader();
    
    reader.onload = function(e) {
        files=reader.result.split('\n');
        for(var i=0;i<files.length;i++){
            const potato=document.createElement("li");
            const delBtn=document.createElement("button");
            delBtn.innerText="X";
            delBtn.addEventListener("click",function(event) {
                const btn = event.target;
                const li = btn.parentNode;
                list.removeChild(li);
                const cleanToDos = inputArray.filter(function(contents) {
                  return contents.id !== li.id;
                });
                inputArray = cleanToDos;
            
              })
            const span=document.createElement("span");
            const newId=inputArray.length+1;
            span.innerText=files[i];
        
            potato.appendChild(span);
            potato.appendChild(delBtn);
            list.appendChild(potato);
            potato.id=newId;
            const toDoObj={
                text:input.value,
                id:potato.id,
            };
            inputArray.push(toDoObj);
        }
        
        //file데이터를 읽어서 처리할 로직.
    };
    console.log(files);
    reader.readAsText(file, 'euc-kr');
}


uploadFile.addEventListener("change",readFile1);


if(button){
    button.addEventListener("click",handleButton);
}
inputForm.addEventListener("submit",handleInput);
anonymous.addEventListener("click",handleCheckButton);

downloadButton.addEventListener("click",saveFile)

console.log(window.innerHeight,window.innerWidth);

window.addEventListener("resize",handleWebSize);
