import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserProgress = {
    steps : [Step];
    badges : [Badge];
  };

  type Step = {
    moduleId : Nat;
    stepNumber : Nat;
    completed : Bool;
  };

  type Badge = {
    name : Text;
    description : Text;
    earned : Bool;
  };

  type OldActor = {};
  type NewActor = {
    userProgressMap : Map.Map<Principal, UserProgress>;
  };

  public func run(_old : OldActor) : NewActor {
    { userProgressMap = Map.empty<Principal, UserProgress>() };
  };
};
