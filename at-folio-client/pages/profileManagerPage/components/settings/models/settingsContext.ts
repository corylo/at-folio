import { SettingsPanelOption } from "../enums/settingsPanelOption";

export interface ISettingsContext {
  option: SettingsPanelOption;
  setOptionTo: (option: SettingsPanelOption) => void;
}