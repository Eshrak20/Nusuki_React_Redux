import ExpandableText from '../../../../../components/ExpandableText';

interface Props {
  overview: string;
}

const HajjUmDetPackOverView = ({ overview }: Props) => {
  return (
    <div className="px-6 lg:px-24 mb-14 lg:mb-17">
      <h3 className="text-2xl font-semibold mb-5 text-hajj">Package Overview</h3>

      {/* Mobile: Truncated at 150 chars */}
      <div className="block lg:hidden">
        <ExpandableText
          text={overview}
        />
      </div>

      {/* Desktop: Full text */}
      <div className="hidden lg:block">
        <p className="text-muted-foreground leading-relaxed">{overview}</p>
      </div>
    </div>
  );
};

export default HajjUmDetPackOverView;