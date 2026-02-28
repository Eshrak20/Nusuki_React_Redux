const EduTitle = ({ name }: { name: string }) => {
  return (
    <h2 className="text-2xl lg:text-4xl font-bold text-center text-primary mb-16">
      {name}
    </h2>
  );
};

export default EduTitle;
