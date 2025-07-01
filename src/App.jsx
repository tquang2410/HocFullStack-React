import { useEffect} from 'react'
import axios from "./util/axios.customize.js";


function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
        const res = await axios.get(`/v1/api`);
        console.log(res)
    }
    fetchHelloWorld()
  }, [])

  return (
   <>
       Hello World
   </>
  )
}

export default App
