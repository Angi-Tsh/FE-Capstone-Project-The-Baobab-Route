import React from 'react';

function TripDetails({ trip }) {
    return (
        <div className="p-4 border-b">
            {/* Trip name and date */}
            <h3 className="font-bold">
                {trip.tripName} - {trip.tripDate}
            </h3>

            {/* Flight details */}
            <h4>Flights</h4>
            {trip.flights.length > 0 ? (
                <ul>
                    {trip.flights.map((flight, index) => (
                        <li key={index}>
                            {flight.airlineName} from {flight.departureAirport} to {flight.arrivalAirport}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No flights added yet.</p>
            )}

            {/* Accommodation details */}
            <h4>Accommodations</h4>
            {trip.accommodations.length > 0 ? (
                <ul>
                    {trip.accommodations.map((acc, index) => (
                        <li key={index}>
                            {acc.accName} : Check-in: {acc.checkinDate} - Checkout: {acc.checkoutDate}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No accommodation added yet.</p>
            )}

            {/* Activities details */}
            <h4>Activities</h4>
            {trip.activities.length > 0 ? (
                <ul>
                    {trip.activities.map((activity, index) => (
                        <li key={index}>
                            {activity.actiName} on {activity.actiDate} at {activity.actiTime}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No activities added yet.</p>
            )}
        </div>
    );
}

export default TripDetails;