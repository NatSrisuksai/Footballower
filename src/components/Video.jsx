/* eslint-disable no-unused-vars */
import React from "react";
import videoBG from "../assets/videoplayback.mp4"
const  showvideoBG =()=>{
    return (
        <div className="vod">
            <video src={videoBG} autoPlay loop muted />
        </div>
    );
}

export default showvideoBG;