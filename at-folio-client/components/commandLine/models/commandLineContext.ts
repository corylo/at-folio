import { ICommandLineState } from "./commandLineState";

export interface ICommandLineContext {
  state: ICommandLineState;
  setStateTo: (state: ICommandLineState) => void;
}