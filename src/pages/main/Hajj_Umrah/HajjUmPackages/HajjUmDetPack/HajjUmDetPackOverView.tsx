interface Props {
  overview: string;
}

const HajjUmDetPackOverView = ({ overview }: Props) => {
  return (
    <div className="px-6 lg:px-24 mb-17">
      {/* text-hajj now switches between dark teal (light mode) and light teal (dark mode) */}
      <h3 className="text-2xl font-semibold mb-5 text-hajj">Package Overview</h3>
      
      {/* text-muted-foreground switches between dark gray (light mode) and light gray (dark mode) */}
      <p className="text-muted-foreground leading-relaxed">
        {overview}
      </p>
    </div>
  );
};

export default HajjUmDetPackOverView;