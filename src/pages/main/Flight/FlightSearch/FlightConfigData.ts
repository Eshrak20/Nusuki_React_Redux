
type TravelerType = "adults" | "kids" | "children" | "infants";

export const travelerConfig: {
    key: TravelerType;
    label: string;
    sub: string;
    min: number;
    max?: number;
}[] = [
        { key: "adults", label: "Adults", sub: "(12+ Years)", min: 1 },
        { key: "children", label: "Children", sub: "(5–12 Years)", min: 0 },
        { key: "kids", label: "Kids", sub: "(2–5 Years)", min: 0 },
        { key: "infants", label: "Infants", sub: "(0–2 Years)", min: 0 },
    ];

export const flightClasses = [
    "Economy",
    "Premium Economy",
    "Business Class",
    "First Class",
];


export const fares = [
  { label: "Regular Fare", value: "regular" },
  { label: "Student Fare", value: "student" },
  { label: "Umrah Fare", value: "umrah" },
];
