import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import _debounce from "lodash.debounce";

import { AdminPageContext } from "../../adminPageWrapper";
import { AppContext } from "../../../../components/app/appWrapper";

import { ProfileAdminService } from "../../../../services/profileAdminService";

import { ProfileTutorialUtility } from "./utilities/profileTutorialUtility";

import { IconButton } from "../../../../components/button/iconButton/iconButton";

import { IPosition } from "../../../../models/position";
import { defaultProfileTutorialState, IProfileTutorialState } from "./models/profileTutorialState";
import { ISize } from "../../../../models/size";

export const ProfileTutorialComponent: React.FC = () => {  
  const { profile, setProfileAdminTo } = useContext(AppContext),
    { state: adminPageState, setStateTo: setAdminPageStateTo } = useContext(AdminPageContext);

  const [state, setStateTo] = useState<IProfileTutorialState>(defaultProfileTutorialState());

  const setWindowTo = (window: ISize): void => {
    setStateTo({ ...state, window });
  }

  useEffect(() => {
    setWindowTo({ height: window.innerHeight, width: window.innerWidth });
  }, []);

  useEffect(() => {
    const handleOnResize = (): void => {
      setWindowTo({ height: window.innerHeight, width: window.innerWidth });
    }

    const debouncedResize = _debounce(handleOnResize, 100);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    }
  }, [state.position]);

  const getPosition = (rect: DOMRect): IPosition => {
    const position: IPosition = {
      x: rect.left + 5,
      y: rect.bottom + 10
    }

    if(state.window.width < 400) {
      position.x = 10;
    }

    return position;
  }

  const handleOnStepChange = (step: number): void => {
    const elementID: string = ProfileTutorialUtility.getElementIDByStep(step),
      element: HTMLElement | null  = document.getElementById(elementID);

    if(element) {
      const rect: DOMRect = element.getBoundingClientRect();

      setStateTo({ ...state, position: getPosition(rect), step });
    }
  }

  useEffect(() => {
    if(state.window.height > 0) {
      handleOnStepChange(state.step);
    }
  }, [state.window]);

  const handleOnDone = async (): Promise<void> => {
    if(!profile.admin.tutorialComplete) {
      ProfileAdminService.update(profile.uid, { tutorialComplete: true });

      setProfileAdminTo({ tutorialComplete: true });
    } else {
      setAdminPageStateTo({ ...adminPageState, tutorialToggled: false });
    }
  }

  const getTitle = (): string => {
    switch(state.step) {
      case 1:
        return "Your profile";
      case 2:
        return "Your links";
    }
  }

  const getDescription = (): string => {
    switch(state.step) {
      case 1:
        return "Choose your profile photo and background.";
      case 2:
        return "Add up to 10 links.";
    }
  }

  if(state.position.x !== 0) {
    return ReactDOM.createPortal(
      <div 
        id="profile-tutorial" 
        className={`step-${state.step}`}
        style={{ left: `${state.position.x}px`, top: `${state.position.y}px` }}
      >
        <div id="profile-tutorial-content">
          <div id="profile-tutorial-header">
            <h1 id="profile-tutorial-step-title" className="rubik-font">{getTitle()}</h1>
            <h1 id="profile-tutorial-steps-label" className="rubik-font">{state.step} / {state.steps}</h1>
          </div>
          <h1 id="profile-tutorial-step-description" className="rubik-font">{getDescription()}</h1>
          <div id="profile-tutorial-steps-nav">
            <IconButton 
              className="step-nav-button"
              disabled={state.step === 1}
              icon="fa-regular fa-arrow-left" 
              handleOnClick={() => handleOnStepChange(Math.max(state.step - 1, 1))} 
            />
            <IconButton 
              className="step-nav-button"
              disabled={state.step === state.steps}
              icon="fa-regular fa-arrow-right" 
              handleOnClick={() => handleOnStepChange(Math.min(state.step + 1, 2))} 
            />
          </div>
          <button 
            id="profile-tutorial-done-button"
            type="button" 
            className="button rubik-font" 
            onClick={handleOnDone}
          >
            Done
          </button>
        </div>
      </div>,
      document.body
    );
  }

  return null;
}