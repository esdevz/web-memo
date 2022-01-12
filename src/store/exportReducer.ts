export interface ProgressState {
  completed: boolean;
  error: boolean;
  message?: string;
  loading: boolean;
}

export interface ProgressAction {
  type: "LOADING" | "SUCCESS" | "ERROR";
  payload?: string;
}

export const initialProgressState: ProgressState = {
  completed: false,
  error: false,
  message: "",
  loading: false,
};

export const progressReducer = (
  state: ProgressState,
  action: ProgressAction
): ProgressState => {
  switch (action.type) {
    case "LOADING":
      return {
        completed: false,
        error: false,
        message: "",
        loading: true,
      };
    case "SUCCESS":
      return {
        completed: true,
        error: false,
        message: "done!",
        loading: false,
      };
    case "ERROR":
      return {
        completed: false,
        error: true,
        message: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
