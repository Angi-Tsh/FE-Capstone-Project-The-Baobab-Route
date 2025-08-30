import { Link } from "react-router-dom";

function Navigation () {
        return (
            <nav className="bg-white-100 p-8 max-w-sm mx-auto">
                <ul className="flex justify-center space-x-4 list-none ">
                    <li> {/*li is link items so each item has a tag*/}
                        <Link to="/">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link to ="/destinations"
                        className="text-white hover:bg-gray-700 transition-colors duration-200 p-2 rounded-md"
                        >Destinations</Link>
                    </li>
                    <li>
                        <Link to="/itinerary">Itinerary</Link>
                    </li>
                    <li>
                        <Link to="/flights">Flights</Link>
                    </li>
                </ul>
            </nav>
        )
};
export default Navigation;