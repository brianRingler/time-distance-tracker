"use client";
import { useEffect, useState } from "react";
import DateRow from "./DateRow";
import { TripContextProvider } from "../contexts/TripContext";

/* This function takes an integer value between 1 - 12 monthNumber 
  and a year integer value and returns an array of days */
function getDaysForMonth(monthNumber, year) {
  if (
    typeof monthNumber !== "number" ||
    !Number.isInteger(monthNumber) ||
    monthNumber < 1 ||
    monthNumber > 12 ||
    typeof year !== "number" ||
    !Number.isInteger(year) ||
    year < 2000 ||
    year > 2100
  ) {
    throw new Error("Invalid monthNumber or year provided to Month component");
  }
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const datesArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    datesArray.push(day);
  }
  return datesArray;
}

export default function Month() {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("api/get-trips", { cache: "no-store" });
        const userTrips = await res.json();
        console.log('user trips: ', userTrips);
        setTrips(userTrips);
        console.log(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    }

    fetchTrips();
  }, []);

  const days = getDaysForMonth(8, 2023);

  function extractDayOfMonth(obj) {
    if (obj && obj.start_date) {
      // Split the date string by '-' to get the year, month, and day parts
      const dateParts = obj.start_date.split("-");

      if (dateParts.length === 3) {
        // Parse the day part and return it as an integer
        const dayOfMonth = parseInt(dateParts[2], 10);
        return dayOfMonth;
      }
    }
    // Return null if the date format is invalid or if the object is null/undefined
    return null;
  }

  return (
    <TripContextProvider>
      <div className="container">

        {trips !== null &&
          days.map((day, index) => {
            const currentTrips = trips.filter((trip) => {
              const tripDay = extractDayOfMonth(trip);
              return tripDay === day;
            });

            return (
              <div
              className=" w-full py-4"
                key={index}
              >
                <DateRow date={day} tripsData={currentTrips} />
              </div>
            );
          })}
      </div>
    </TripContextProvider>
  );
}
