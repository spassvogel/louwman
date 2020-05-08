import React from 'react';
import { TextContent } from '../../common/constants';

interface Props {
  content: TextContent;
}

const TextModalContent = (props: Props) => {
  const {content} = props;
  
  return (
    <div> { content.text } </div>
  )
}

export default TextModalContent;

