import React, { useState } from "react";
import "./Expander.scss";

interface ExpanderProps {
  src: string;
  alt: string;
}

const Expander: React.FC<ExpanderProps> = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="image-expander">
      <img className="thumbnail" src={src} alt={alt} onClick={handleExpand} />
      {isExpanded && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img className="expanded" src={src} alt={alt} />
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expander;
