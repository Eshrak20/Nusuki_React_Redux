import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  limit?: number; // Optional: defaults to 200
  className?: string; // Optional: to pass custom tailwind classes
}

const ExpandableText = ({ text, limit = 450 }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If text is shorter than limit, just show the text
  if (text.length <= limit) {
    return <p className="text-muted-foreground leading-relaxed" >{text}</p>;
  }

  const displayText = isExpanded ? text : `${text.slice(0, limit)}...`;

  return (
    <div className="text-muted-foreground leading-relaxed" >
      <p>
        {displayText}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-hajj font-semibold hover:underline focus:outline-none transition-all"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </p>
    </div>
  );
};

export default ExpandableText;