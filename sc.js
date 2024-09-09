let run=document.getElementById('run');
let code=document.getElementsByTagName("textarea")[0];
let output=document.getElementById('output');
let language=document.getElementById('language');

function setUp(){
    let v=language.value;
    console.log(v);
    setValue(v);

}
function setValue(language){
    if(language==="C"){
        code.innerText="// Write your code in C language "
    }
    else if(language==="C++"){
        code.innerText="// Write your code in C++ language "
    }
    else if(language==="Java"){
        code.innerText="// Write your code in Java language */"
    }
    else if(language==="Javascript"){
        code.innerText="// Write your code in Javascript language "
    }
    else if(language==="Python"){
        code.innerText="# Write your code in Python language"
    }
}



run.addEventListener("click", () => {
    compileCode(code.value, language.value);
});

function compileCode(code, language) {
    // Assuming codeId is obtained from somewhere in your application
    const codeId = "some_value";

    fetch('https://course.codequotient.com/api/executeCode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, langId: language }),
    })
    .then(response => response.json())
    .then(data => {
        // Assuming compiler service sends back compilation result
        console.log("hello");
        console.log(data)
        if (data.output) {
            output.innerText = data.output; // Display output if available
        } else if (data.errors) {
            output.innerText = data.errors; // Display errors if present
        }
    })
    .catch(error => {
        console.log("error");
        console.error('Error:', error);
    });

    const intervalId = setInterval(() => {
        fetch(`https://course.codequotient.com/api/codeResult/${codeId}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            if (result.data.output) {
                output.innerText = result.data.output; // Display output if available
                clearInterval(intervalId); // Clear interval since result is obtained
            } else if (result.data.errors) {
                output.innerText = result.data.errors; // Display errors if present
                clearInterval(intervalId); // Clear interval since errors occurred
            }
        })
        .catch(error => {
            console.error('Error:', error);
            clearInterval(intervalId); // Clear interval if there's an error
        });
    }, 3000);
}




// function compileCode(code, language) {
//     fetch('https://course.codequotient.com/api/executeCode', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code: code, langId: language }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Assuming compiler service sends back compilation result
//         console.log("hello");
//         console.log(data)
//         output.innerText = data.result;        
//     })
//     .catch(error => {
//         console.log("error");
//         console.error('Error:', error);
//     });

//     const intervalId=setInterval(()=>{
//     fetch(`https://course.codequotient.com/api/codeResult/${codeId}`, {
//         method: 'GET',
        
//     })
//     .then(response => response.json())
//                 .then(result => {
//                     if (result.data.output) {
//                         output.innerText = result.data.output; // Display output if available
//                         clearInterval(intervalId); // Clear interval since result is obtained
//                     } else if (result.data.errors) {
//                         output.innerText = result.data.errors; // Display errors if present
//                         clearInterval(intervalId); // Clear interval since errors occurred
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     clearInterval(intervalId); // Clear interval if there's an error
//                 });
//             },3000)
// }






// function compileCode(code, language) {
//     fetch('https://course.codequotient.com/api/executeCode', { // Corrected URL
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code: code, langId: language }), // Corrected property name to 'langId'
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.error) {
//             output.innerText = data.error; // Display error message if present
//         } else if (data.codeId) {
//             const codeId = data.codeId;
//             clearInterval(intervalId); // Clear interval since code is submitted
//             const intervalId = setInterval(() => {
//                 fetch(`https://codequotient.com/api/codeResult/${codeId}`, { // Use correct codeId in URL
//                     method: 'GET',
//                 })
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.data.output) {
//                         output.innerText = result.data.output; // Display output if available
//                         clearInterval(intervalId); // Clear interval since result is obtained
//                     } else if (result.data.errors) {
//                         output.innerText = result.data.errors; // Display errors if present
//                         clearInterval(intervalId); // Clear interval since errors occurred
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     clearInterval(intervalId); // Clear interval if there's an error
//                 });
//             }, 3000); // Poll every 3 seconds for result
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
