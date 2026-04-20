{
  // For One Way
  "trip_type": "one_way", // can be one_way, round_way, multiway
  "origin": "DAC",
  "destination": "KUL",
  "departure_date": "2026-04-20",

  // For Round way
//   "trip_type": "round_way",
//   "origin": "DAC",
//   "destination": "KUL",
//   "departure_date": "2026-04-14",
//   "return_date": "2026-04-16",

// For Multiway

// "trip_type": "multi_way",
// "segments": [
//     {
//         "origin": "DAC",
//         "destination": "CGP",
//         "departure_date": "2026-04-20"
//     },
//     {
//         "origin": "CGP",
//         "destination": "ZYL",
//         "departure_date": "2026-04-22"
//     },
//     {
//         "origin": "ZYL",
//         "destination": "DAC",
//         "departure_date": "2026-04-25"
//     }
// ],

  "fare_type": "regular", // student, umrah ( jokhn student dibo tokhn child and infants 0 hobe )
  "adults": 1,
  "children": 2,
  "infants": 1,
  "child_ages": [3,2],
  "cabin": "Y",
  "max_stops": 0,
//   "limit": 20
  "page" : 1,
  "size" : 20,

  "sort_by": "price", // price, duration, departure_at
  "sort_order": "asc", // desc, asc
  "refundability": [], // Ex : ["refundable"], ["non_refundable"]
  "stops": [], // Ex: [1, 2]
  "airlines": [], // ["BS", "AI"]
  "layover_cities": [], // Ex : ["DEL", "SIN"]
  "flight_schedule_departure": [], // Ex: ["06-12", "12-18"]
  "flight_schedule_arrival": [],  // Ex: ["06-12", "12-18"]
  "aircraft": [], // ex: ["320", "321", "7M8"]
  "price_min": null, // Ex: 25000
  "price_max": null, // Ex: 50000
  "layover_duration_min": null, // Ex: 0 
  "layover_duration_max": null // Ex: 360


}