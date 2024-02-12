window.onload=()=>{
    const backButton = document.querySelector("img");
    const loginButton = document.querySelector("button.register-btn");
    const form=document.querySelector(`form`);
    const pass1=document.querySelector(`input.register-password`);
    const pass2=document.querySelector(`input.repeat-password`);
    const email=document.querySelector(`input.register-email`);
    const error=document.querySelector(`span.register-error`);
    backButton.addEventListener("click",()=>{
        window.location.href="/index.html"
    })
    pass2.addEventListener("input",()=>{
        if(pass1.value!=pass2.value){
            pass2.classList.add("invalid-field");
            error.innerHTML="Passwords must match"
            return;
        }
    })
    form.onsubmit=(event)=>{
        event.preventDefault();
    }
    loginButton.addEventListener("click", () => {
        if(!email.value.includes('@')){
            email.classList.add("invalid-field");
            error.innerHTML="Invalid email format"
            return;
        }
        fetch("accounts.json")
        .then(data=>data.json())
        .then(accounts=>{
            if(accounts.find(acc=>acc.email==email.value)){
                email.classList.add("invalid-field");
                error.innerHTML="Already registered email"
                return;
            }
            if(!ValidatePass(pass1.value)){
                pass1.classList.add("invalid-field");
                error.innerHTML="Invalid password format"
                return;
            }
            window.location.href="/home.html";
        })
    })
}

function ValidatePass(pass){
    let lowerCase=false,upperCase=false, digit=false,symbol=false;
    pass.split("").forEach(s=>{
        if(s>='a'&& s<='z')
            lowerCase=true;
        else if(s>='A'&& s<='Z')
            upperCase=true;
        else if(s>='0'&& s<='9')
            digit=true;
        else symbol=true;
    })
    return lowerCase && upperCase && digit && symbol && pass.length()>=8;

}
