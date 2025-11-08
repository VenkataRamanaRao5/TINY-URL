import { useState } from 'react'
import './App.css'

function App() {
  
  const [longUrl,setLongUrl] = useState("");
  const [shortUrl,setShortUrl] = useState("");
  const [loading,setLoading] = useState(false);
  const BASE_URL = 'http://localhost:3000';
  const shortenURL = async () => {

    if(longUrl.trim().length===0){
      alert('Enter a valid URL');
      return;
    }

    setLoading(true);
    try{
      const res = await fetch(BASE_URL+'/shorten',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({long_url:longUrl})
      })

      const data = await res.json();
      if(data.shortend_url){
        setShortUrl(data.shortend_url)
      }else{
        alert('Something went wrong with fetch!');
      }
    }catch(e){  
      console.error(e.message);
      alert('something went wrong')
    }finally{
      setLoading(false)
    }
  };

  function handleAnother(){
    setLongUrl("")
    setShortUrl("")
  }

  function handleCopy(){
    try{
      navigator.clipboard.writeText(shortUrl);
    }catch(e){
      console.log(e.message);
    }
  }

  return (
    <>
      <div className="card border border-light-subtle shadow-sm">
        <div className="card-body ">
          <h1>TINY URL</h1>
          <div className="input-group mb-3">
            {/* <label for="exampleFormControlInput1" class="form-label">Shorten a long url</label> */}
            <input  type = "text" className="form-control" id="exampleFormControlInput1" placeholder='Enter long URL here' aria-describedby="button-addon2"
              value={longUrl}
              onChange={(e)=>{
                setLongUrl(e.target.value)
                // console.log(longUrl);
              }}
            ></input>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2"
              disabled={loading}
              onClick={shortenURL}
            >Shorten url</button>
          </div>
          
          {shortUrl && (
            <div className="input-group mb-3">
              <input  type = "text" className="form-control" id="exampleFormControlInput2"  aria-describedby="button-addon1"
                readOnly value={shortUrl}
                ></input>
              <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={handleCopy}>Copy url</button>
              <button className="btn btn-outline-secondary" type="button" onClick={handleAnother}>Another URL</button>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </>
  )
}

export default App
