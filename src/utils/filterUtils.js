export const filterTrips = (trips, filters) => {
    return trips.filter(trip => {
      const fareInRange = (!filters.minFare || trip.fare_amount >= filters.minFare) &&
                         (!filters.maxFare || trip.fare_amount <= filters.maxFare);
  
      const distanceInRange = (!filters.minDistance || trip.trip_distance >= filters.minDistance) &&
                             (!filters.maxDistance || trip.trip_distance <= filters.maxDistance);
  
      const paymentTypeMatch = !filters.paymentType ||
                              filters.paymentType === 'all' ||
                              trip.payment_type === filters.paymentType;
  
      return fareInRange && distanceInRange && paymentTypeMatch;
    });
  };