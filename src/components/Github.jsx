import { useEffect, useReducer } from "react"
import axios from "axios";
import { Githubcard } from "./Githubcard";

const init={
    loading:true,
    error:false,
    data:null,
}
const githubaction={
    "fetch":"fetch",
    "success":"success",
    "failure":"failure",
}


const reducer=(state,action)=>{
  switch(action.type){
      case githubaction.fetch:{
          return({
              ...state,
              loading:true,
              error:false,
              data:null
          })
      }
      case githubaction.success:{
        return({
            ...state,
            loading:false,
            error:false,
            data:action.payload
        })
    }
    case githubaction.failure:{
        return({
            ...state,
            loading:false,
            error:true,
        })
    }
    
    default:return state
  }
}
export const Github=()=>{
    const[{loading,error,data,page},dispatch]=useReducer(reducer,init)

    useEffect(()=>{
        dispatch({type:githubaction.fetch})
       loaddata()
       .then((res)=>dispatch({type:githubaction.success,payload:res.data.items}))
       .catch((err)=>dispatch({type:githubaction.failure}))
    },[page])
    const loaddata=async(q="masai")=>{
       return await axios("http://api.github.com/search/users",{
           method:"GET",
           params:{
               q:"masai",
              
           }
       })
    }
   console.log(page)
    return (
        <div>
            {loading && <div>...loading</div>}
            {error && <div>...error</div>}
            {data?.map((user)=>{
                return <Githubcard data={user}/>
            })}
        </div>
    )
}