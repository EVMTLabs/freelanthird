import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    yourDetails: {
      firstname: string;
      lastname: string;
    };
  }
}
