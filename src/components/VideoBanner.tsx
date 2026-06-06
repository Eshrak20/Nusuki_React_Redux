import bannerVideo from "../../src/assets/reactAssets/Education/PlaneVideo.mp4";

interface VideoBannerProps {
  title: string;
  subtitle: string;
  videoSrc?: string;
}

const VideoBanner = ({ title, subtitle, videoSrc }: VideoBannerProps) => {
  return (
    <section className="relative mt-20 h-75 w-full overflow-hidden md:h-78.75">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={videoSrc || bannerVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-20 text-white">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 border-white/60 pb-2 text-sm font-semibold md:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default VideoBanner;