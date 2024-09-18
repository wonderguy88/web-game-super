import { useStateValue } from "./index";

import { setState as setStateAction } from "./actions";

const useHook = () => {
  const [state, dispatch] = useStateValue();
  const setState = (payload) => {
    dispatch(setStateAction(payload));
  };

  return { state, setState };
};

export default useHook;
