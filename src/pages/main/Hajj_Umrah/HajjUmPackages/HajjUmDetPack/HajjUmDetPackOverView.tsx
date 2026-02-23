interface Props {
  overview: string;
}

const HajjUmDetPackOverView = ({ overview }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Overview</h3>
      <p className="text-gray-700 leading-relaxed">
        {overview}
      </p>
    </div>
  );
};

export default HajjUmDetPackOverView;