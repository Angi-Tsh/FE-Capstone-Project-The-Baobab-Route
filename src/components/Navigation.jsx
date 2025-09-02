import { Link } from "react-router-dom";

function Navigation () {
        return (
            <nav className="container mx-auto flex flex-wrap p-5 flex-col items-center">
                <a className="flex items-center md:mb-0"> {/*use <a> tag as a hyperlink, leading user elsewhere when clicked*/}
                    <Link to="/">
                            <img src="/public/The Baobab Route logo.jpg" 
                            alt="The Baobab Route logo brand logo and home button"
                            className="h-4 w-4 md:h-20 md:w-20 object-cover"/>
                    </Link>
                </a>
                <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center list-none">
                    <a>
                        <Link to="/flights"
                        className="text-orange-600 hover:text-orange-600 transition-colors">
                        Flights
                        </Link>
                        
                    </a>
                    <a>
                        <Link to ="/destinations"
                        className="text-gray-600 hover:text-orange-600 transition-colors"
                        >Destinations
                        </Link>
                    <a>
                    </a>
                        <Link to="/Accommodation"
                        className="text-gray-600 hover:text-orange-600 transition-colors">
                            Accommodation</Link>
                    </a>
                    <a>
                        <Link to="/itinerary"
                        className="text-gray-600 hover:text-orange-600 transition-colors">
                            Itinerary</Link>
                    </a>
                </div>
            </nav>
        )
};
export default Navigation;