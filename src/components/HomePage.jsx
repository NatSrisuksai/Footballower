import Header from "./Header";
import LoginForm from "./body/Body";
import videoBG from "../assets/videoplayback.mp4";
function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div>
        <Header />
      </div>
      <div className="absolute inset-0 -z-10">
        <video
          src={videoBG}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default HomePage;
