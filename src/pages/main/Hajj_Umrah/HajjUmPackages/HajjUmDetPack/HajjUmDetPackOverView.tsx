interface Props {
  overview: string;
}

const HajjUmDetPackOverView = ({ overview }: Props) => {
  return (
    <div className="px-24">
      <h3 className="text-xl font-semibold mb-5">Package Overview</h3>
      <p className="text-gray-700 leading-relaxed">
        {overview}
      </p>
    </div>
  );
};

export default HajjUmDetPackOverView;