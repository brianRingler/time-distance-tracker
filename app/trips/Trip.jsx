import { useTripContext } from "../contexts/TripContext";
import TripForm from "./TripForm";

export default function Trip({ tripData }) {
  const { openTrip, handleSetOpenTrip } = useTripContext();

  const tripCollapsed = () => {
    return (
      <div
        onClick={() => handleSetOpenTrip(tripData.id)}
        className="grid gap-10 grid-cols-3 w-full  h-10 items-center px-3 cursor-pointer"
        >
        <p>{tripData.id}</p>
        <p>{tripData.origin_location.location_name}</p>
        <p>{tripData.destination_location.location_name}</p>
      </div>
    );
  };

  const tripExpanded = () => {
    return (
      <div>
        <TripForm />
      </div>
    );
  };

  return (
    <div className="">
      {openTrip === tripData.id ? tripExpanded() : tripCollapsed()}
    </div>
  );
}
