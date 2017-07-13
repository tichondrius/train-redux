export function getState(){
  try 
  {
    let currState = localStorage.getItem('state');
    if (currState == null){
      return undefined;
    }
    else return JSON.parse(currState);
  }
  catch(err){
    return undefined;
  }
}
export function setState(state){
  try{
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch(err){

  }
}