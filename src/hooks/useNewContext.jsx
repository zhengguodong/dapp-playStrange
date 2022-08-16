
import {createContext, useContext} from "react"
const mainContext=createContext(null)
// 
export const MainContextProvider=({children})=>{
    // const [transitions,setTransitions]=useState([])
    return(
        <mainContext.Provider value={{}}>
            {children}
        </mainContext.Provider>
    )
}
export const useMainContext=()=>{
    return useContext(mainContext)
}