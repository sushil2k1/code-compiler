let run=document.getElementById('run');
let code=document.getElementsByTagName("textarea")[0];
let output=document.getElementById('output');
let language=document.getElementById('language');

function setUp(){
    let v=language.value;
    console.log(v);
    setValue(v);

}
code.innerHTML="";
function setValue(language){
    if(language=="7"){
        code.placeholder="// Write your code in C language "
    }
    else if(language=="77"){
        code.placeholder="// Write your code in C++ language "
    }
    else if(language=="8"){
        code.placeholder="// Write your code in Java language */"
    }
    else if(language=="4"){
        code.placeholder="// Write your code in Javascript language "
    }
    else if(language=="0"){
        code.placeholder="# Write your code in Python language"
    }
}
run.addEventListener("click", () => {
    compileCode(code.value, language.value);
});
function compileCode(code, language) {
    fetch('https://course.codequotient.com/api/executeCode', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, langId: language }), 
    })
    .then(response => response.json())
    .then(data => {
        if (data?.error) {
            output.innerText = data.error; 
        } else if (data.codeId) {
            const codeId = data.codeId;
            const intervalId = setInterval(() => {
                fetch(`https://course.codequotient.com/api/codeResult/${codeId}`)
                .then(response =>{ 
                    console.log(response)
                    return response.json();
                    })
                .then(result => {
                    

                    console.log(result);
                    const data=JSON.parse(result.data)
                    console.log(data);

                    if (data.output) {
                        output.innerText = data.output; // Display output
                        clearInterval(intervalId);
                    } else if (data.errors) {
                        clearInterval(intervalId);
                        output.innerText = data.errors; // Display errors 
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    clearInterval(intervalId); 
                });
            }, 3000); 
        }
    })
    .catch(error => {
        console.error("it is error",'Error:', error);
    });
}
