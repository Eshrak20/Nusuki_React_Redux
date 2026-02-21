const HomeInstitutionCard = ({ universities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {universities.map((uni) => (
        <div key={uni.id} className="border rounded p-4 shadow hover:shadow-lg transition">
          <img src={uni.uni_logo} alt={uni.name} className="h-24 w-24 object-contain mb-2" />
          <h3 className="font-semibold">{uni.name}</h3>
          <p className="text-sm text-gray-600">{uni.country}</p>
          {uni.location && <p className="text-sm text-gray-500">{uni.location}</p>}
          <a href={`https://${uni.universityUrl}`} target="_blank" className="text-blue-500 underline">
            Visit Website
          </a>
        </div>
      ))}
    </div>
  );
};

export default HomeInstitutionCard;