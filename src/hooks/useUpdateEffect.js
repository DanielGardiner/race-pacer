import { useRef, useEffect } from "react";

function useUpdateEffect(callback, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    return callback();
  }, dependencies);
}

export default useUpdateEffect;
