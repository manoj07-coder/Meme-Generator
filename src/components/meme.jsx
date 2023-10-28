import { useState, useEffect } from "react";



export default function Meme(){

    const [meme, setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : "http://i.imgflip.com/1bij.jpg"
    
    })

    const [allMemes, setAllMemes] = useState([])

    function handleChange(){
        const {name , value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }


    useEffect(  () => {
        fetch("https://api.imgflip.com/get_memes")
         .then(res => res.json())
         .then(data => setAllMemes(data.data.memes))
    }, [] )

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage : url
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                type="text"
                placeholder="Enter first text"
                className="form--input"
                onChange={handleChange}
                name = "topText"
                value = {meme.topText}
                />
                <input 
                type="text"
                placeholder="Enter second text"
                className="form--input"
                onChange={handleChange}
                name = "bottomText"
                value = {meme.bottomText}
                />
                <button onClick={getMemeImage} className="form--btn">Get new meme image 🖼️</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-img" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}