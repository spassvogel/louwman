import React, { useState } from 'react';
import { OptionsContent } from '../../common/constants';
import { ReactComponent as CheckSvg } from './../../images/ui/check.svg';

interface Props {
  content: OptionsContent;
}

const OptionsModalContent = (props: Props) => {
  const {content} = props;
  const [selectedOption, selectOption] = useState<number | null>(null);

  return (
    <div className="modal-content modal-options">
      <p>
        {content.description}
      </p>
      <div className="banner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${content.bannerImg})`}}></div>
      <ul className="options">
        {content.options.map((option, index) => (
          <li key={option} className={index === selectedOption ? "active" : ""} onClick={() => selectOption(index)} >
            <div className="checkbox">
              <CheckSvg className="check" />
            </div>
            <div className="text">
              {option}
            </div>
          </li>
        ))}
      </ul>
      <button disabled={selectedOption === null} >
        <b>Okay</b>
      </button>
    </div>
  )
}

export default OptionsModalContent;

