export default function Stars() {

  const stars = () =>{
     let str = ""
     for(let i=0;i<40000;i++){
      const selection = Math.round(Math.random()*400)
      if(selection == 1){str+="."} 
      else if(selection == 2){ str+="*" } 
      else if(selection == 3){ str+="+" } 
      else if(selection == 4){ str+="`" } 
      else if(selection == 5){ str+="o" } 
      else{ str+=" " }
      if(str.length % 300 ==0){
        str+="\n"
      }
     }
     return str
  }
  return (
    <div className="background-ascii">
      <pre>
        {stars()}
      </pre>
    </div>
  );
}