import { Link } from "react-router-dom";

function Navigation () {
        return (
            <nav className="flex inset-x-0 top-0 items-right justify-between p-4 bg-white border-b border-gray-200">
                <div>
                    <Link to="/">
                            <img src="/public/The Baobab Route logo.jpg" 
                            className="rounded-full h-10"/>
                    </Link>
                </div>
                <ul className="flex items-center space-between space-x-8 list-none">
                    <li>
                        <Link to="/flights"
                        className="inline-block text-gray-600 hover:text-orange-600 transition-colors">
                        Flights
                        </Link>
                        
                    </li>
                    <li>
                        <Link to ="/destinations"
                        className="inline-block text-gray-600 hover:text-orange-600 transition-colors"
                        >Destinations
                        </Link>
                    </li>
                    <li>
                        <Link to="/Accommodation"
                        className="inline-block text-gray-600 hover:text-orange-600 transition-colors">
                            Accommodation</Link>
                    </li>
                    <li>
                        <Link to="/itinerary"
                        className="inline-block text-gray-600 hover:text-orange-600 transition-colors">
                            Itinerary</Link>
                    </li>
                </ul>
            </nav>
        )
};
export default Navigation;