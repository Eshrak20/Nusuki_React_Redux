import bannerVideo from "../../../assets/reactAssets/Education/32975-394513987.mp4";

const EduBanner = () => {
  return (
    <div className="relative h-75 mt-22 w-full overflow-hidden flex flex-col justify-center px-8 md:px-20">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>

      <div className="relative z-20 text-white mb-12">
        <h1 className="text-5xl font-extrabold mb-3">Welcome to Nusuki !</h1>
        <p className="text-xl opacity-90">Book flights, Visa & holiday packages at the best prices</p>
      </div>
    </div>
  );
};

export default EduBanner;
