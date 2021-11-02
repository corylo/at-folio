import { IProfileSearchResult } from "../../../../at-folio-models/profileSearchResult";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ICommandLineState {
  activeQuery: string;
  focused: boolean;  
  query: string;
  results: IProfileSearchResult[];
  status: RequestStatus;
}

export const defaultCommandLineState = (): ICommandLineState => ({
  activeQuery: "",
  focused: false,
  query: "",
  results: [],
  status: RequestStatus.Idle
});