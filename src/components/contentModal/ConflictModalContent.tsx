import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ConflictContent } from '../../common/constants';
import { ReactComponent as CheckSvg } from './../../images/ui/check.svg';
import { gsap, Linear } from 'gsap'
import { TextPlugin } from 'gsap/all';
import "./conflictModal.css";
import sound from 'pixi-sound';

gsap.registerPlugin(TextPlugin);

interface Props {
  content: ConflictContent;
  setCorrectAnswer: (index: number) => void;
  selectedAnswer?: number; // When answer has been set correctly before
}

const ConflictModalContent = (props: Props) => {
  const {content, selectedAnswer = null} = props;
  const [selectedOption, selectOption] = useState<number | null>(selectedAnswer);
  const balloonTextRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedOption === null) {
      gsap.to(balloonTextRef.current, {
        delay: 1,
        duration: 2,
        text: {
          value: content.situationSpeech, 
          oldClass: "hidden",
          newClass: "visible"
        },
        ease: Linear.easeNone,
      });
    }
  }, [content.situationSpeech, selectedOption]);

  const handleOptionClick = (element: HTMLLIElement, index: number) => {
    element.className = "animating";
    //selectOption(index);
    if (!ref.current) return;

    // Fade out the non selected options
    const otherOptions = ref.current!.querySelectorAll(".options .normal");
    gsap.to(otherOptions, {
      duration: 0.5,
      opacity: 0,
      ease: Linear.easeNone,
    });

    // Move current option to top
    var parentTop = ref.current!.querySelector(".options")!.getBoundingClientRect().top; // Initial parent's top distance from the top of the viewport;
    var childTop = element.getBoundingClientRect().top;
    var distance = Math.abs(parentTop - childTop);
    gsap.to(element, {
      duration: 0.5,
      top: -distance,
      ease: Linear.easeNone,
      onComplete: () => {
        setTimeout(() => {
          element.className = "";
          selectOption(index);
        }, 250);
      }
    });
    if ( props.content.reactions[index].correct) {
      sound.play('correct');
      props.setCorrectAnswer(index);
    } else {
      sound.play('wrong');
    }

  };

  useEffect(() => {
    sound.add('correct', `${process.env.PUBLIC_URL}/sound/correct.mp3`);    
    sound.add('wrong', `${process.env.PUBLIC_URL}/sound/wrong.mp3`);
  }, [])


  const handleReplay = () => {
    selectOption(null);
  }

  // Reaction based on current selection
  const reaction = useMemo(() => {
    if (selectedOption === null) return null;
    return props.content.reactions[selectedOption];
  }, [props.content.reactions, selectedOption])

  const renderOption = (option: string, index: number) => {
    if (selectedOption === null) {
      // Nothing selected, render all
      return (
        <li key={option} className="normal" onClick={(e) => handleOptionClick(e.currentTarget, index)} >
          <div className="checkbox"/>
          <div className="text">
            {option}
          </div>
        </li>
      );
    }
    if (selectedOption === index) {
      // Render only selected option
      const className = reaction?.correct ? "correct" : "wrong";
      return (
        <li key={option} className={className} >
          <div className="checkbox">
            <CheckSvg className="check" />
          </div>
          <div className="text">
            {option}
          </div>
        </li>
      );
    }
  }

  const renderRightside = () => {
    if (!reaction) {
      return (
        <>
          <div className={`balloon ${content.situationBalloonClass}`} >
            <span ref={balloonTextRef}>{content.situationSpeech}</span>
          </div>
          <div className="situation" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${content.situationImg})`}} />
        </>
      )  
    }
    return (
      <div className="situation" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${reaction.image})`}} />
    )
  }

  return (
    <div className="modal-content modal-conflict" ref={ref}>
      <div className="left">
        <p>
          {content.description}
        </p>
        <ul className="options">
          {content.options.map((option, index) => renderOption(option, index))}
        </ul>
        { reaction && (
          <>
          <div className="reaction-text">
            {reaction.text}
          </div>
          { (!reaction?.correct) && (
            <button onClick={handleReplay} className="replay">
               Replay
            </button>
          )}
          </>
        )}
      </div>
      <div className="right">
        {renderRightside()}
      </div>
    </div>
  )
}

export default ConflictModalContent;

