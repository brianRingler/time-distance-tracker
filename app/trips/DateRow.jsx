import TripsList from "./TripsList";

export default function DateRow({ date, tripsData }) {
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row gap-20 pb-10 ">
        <div className="text-center mb-6 md:mb-0 pt-4 font-bold">
          {date} <span>Aug</span>
        </div>
        <div className="w-full mb-6">
          <TripsList date={date} tripsData={tripsData} />
        </div>
      </div>
    </>
  );
}
