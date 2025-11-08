import { useState } from 'react'
import './App.css'

function App() {
  
  const [longUrl,setLongUrl] = useState("");
  const [shortUrl,setShortUrl] = useState("");
  const [loading,setLoading] = useState(false);

  return (
    <>
      <div class="card border border-light-subtle shadow-sm">
        <div class="card-body ">
          <h1>TINY URL</h1>
          <div class="input-group mb-3">
            {/* <label for="exampleFormControlInput1" class="form-label">Shorten a long url</label> */}
            <input  type = "text" class="form-control" id="exampleFormControlInput1" placeholder='Enter long URL here' aria-describedby="button-addon2"
              value={longUrl}
              onChange={(e)=>{
                setLongUrl(e.target.value)
                console.log(longUrl);
              }}
            ></input>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2"
              disabled={loading}
            >Shorten url</button>
          </div>
          <div>
            
          </div>
          <div class="input-group mb-3">
            <input  type = "text" class="form-control" id="exampleFormControlInput2"  aria-describedby="button-addon1"></input>
            <button class="btn btn-outline-secondary" type="button" id="button-addon1">Copy url</button>
            <button class="btn btn-outline-secondary" type="button">Another URL</button>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default App
