import NavLink from "../NavBar/NavLink";
import Home from "../Component/Home";
import About from "../Component/About";
import Footer from "../Component/Footer";
import ConstNavLink from "../NavBar/NavLink";

const Landing=()=>{
    return <div className="min-h-[100%] font-['poppins']">
          <ConstNavLink/>
          <Home/>
          <About/>
          <Footer/>
    </div>
}

export default Landing;