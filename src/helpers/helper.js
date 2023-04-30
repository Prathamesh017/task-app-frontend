export const checkisEmpty=(name,value,showErrorMessage)=>{
    
    if(value.length<=3){
      showErrorMessage((errorMessage)=>({...errorMessage,[name]: value.length===0?`please enter ${name==="cpassword"?"password":name}`:`please enter valid ${name}`}));
      return;
    }else{
      showErrorMessage((errorMessage)=>({...errorMessage,[name]: null}));
      return;
    }
    
  }
export const validateEmail=(email,showErrorMessage)=>{
  let  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   if (!(email.match(validRegex))) {
    showErrorMessage((errorMessage)=>({...errorMessage,email: "please enter valid email"}));
  } 
  }

  export const removeErrors=(error,errorRemover,data)=>{
    errorRemover((errorMessage)=>({...errorMessage,[error]: ""}));
    
  }