
import Header from "./Header"
import LoginForm from "./body/Body"
import videoBG from "../assets/videoplayback.mp4"
function HomePage() {

  return (
    <div className='main'>
      <div>
        <Header />
      </div>
      <div className = "videoBackground">
          <video src={videoBG} autoPlay loop muted style={{objectFit:'cover'}}/>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}

export default HomePage;
