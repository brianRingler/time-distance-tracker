import Trip from "./Trip";
import { useTripContext } from "../contexts/TripContext";
import TripForm from "./TripForm";
//fetch data from all trips for the date this is being used?
// import tripsData from '../tripsData'
//this sould take date as a prop to pull up trips by date

export default function Trips({ tripsData, date }) {
  const { addTripId, handleAddTrip } = useTripContext();

  return (
    <div>
      {tripsData.map((item, index) => {
        return (
          <div key={index} className="w-full border-b-2 bg-white py-7">
            <Trip tripData={item} />
          </div>
        );
      })}

      {addTripId === null && (
        <div className="pt-4">
          <button
            onClick={() => handleAddTrip(date)}
            className="text-primary font-semibold"
          >
            ADD TRIP
          </button>
        </div>
      )}

      {addTripId !== null && addTripId !== date && (
        <div className="pt-4">
          <button
            className="text-primary font-extrabold"
            onClick={() => handleAddTrip(date)}
          >
            ADD TRIP
          </button>
        </div>
      )}

      {addTripId === date ? <TripForm /> : null}
    </div>
  );
}

//when a trip is selected, the div is hidden and replaced with detail component
