interface IProfileTutorialUtility {
  getElementIDByStep: (step: number) => string;
}

export const ProfileTutorialUtility: IProfileTutorialUtility = {
  getElementIDByStep: (step: number): string => {
    switch(step) {
      case 1:
        return "settings-toolbar-profile-option";
      case 2:
        return "settings-toolbar-links-option";
      default:
        throw new Error(`Invalid step number: ${step}`);
    }
  }
}