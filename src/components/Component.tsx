import React from "react";
import { nextFrame } from "../utils";
import { CSSwitchProp } from "../types";

const useWaitRender: any = () => {
  const refCallback = React.useRef<any>(null);
  const [state, setState] = React.useState<any>(null);

  const registryCallback = (cb: any) => {
    refCallback.current = cb;
    setState(Math.random());
  };

  React.useEffect(() => {
    if (state !== null) {
      nextFrame(() => {
        refCallback.current();
      });
    }
  }, [state]);

  return registryCallback;
};

const CSSwitch: React.FC<CSSwitchProp> = ({
  as: Component,
  children: dirtyChildren,
  switchKey,
  ...props
}) => {
  const ref = React.useRef<any>(null);
  const waitRender = useWaitRender();

  const data = React.useMemo(
    () => ({
      prevStateType: null,
      prevTransitionKey: switchKey,
      isMount: false,
    }),
    []
  );

  const children = React.Children.toArray(dirtyChildren)[0];
  const [currChildren, setCurrChildren] = React.useState<any>(children);

  const handleStartEnd = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!/\b(init|enter|exit)\b/i.test(e.target.className)) {
      return;
    }

    ref.current.removeEventListener("transitionend", handleStartEnd);

    ref.current.classList.remove("init");
    ref.current.classList.remove("enter");
  };

  const handleExitEnd = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!/\b(init|enter|exit)\b/i.test(e.target.className)) {
      return;
    }

    data.prevTransitionKey = switchKey;
    ref.current.removeEventListener("transitionend", handleExitEnd);
    setCurrChildren(children);
  };

  React.useEffect(() => {
    if (!currChildren && children) {
      data.prevTransitionKey = switchKey;
      return setCurrChildren(children);
    }

    if (currChildren && data.prevTransitionKey === switchKey) {
      ref.current.removeEventListener("transitionend", handleExitEnd);

      ref.current.classList.remove("exit");

      return;
    }

    if (currChildren && data.prevTransitionKey !== switchKey) {
      ref.current.addEventListener("transitionend", handleExitEnd, false);

      ref.current.classList.remove("init");
      ref.current.classList.remove("enter");
      ref.current.classList.add("exit");
    }

    data.isMount = true;
  }, [switchKey]);

  React.useEffect(() => {
    if (!currChildren) return;
    if (!data.isMount) return;

    ref.current.classList.add("init");

    waitRender(() => {
      nextFrame(() => {
        ref.current.classList.add("enter");
      });
    });

    ref.current.addEventListener("transitionend", handleStartEnd, false);
  }, [currChildren]);

  const Element = React.useCallback(() => {
    return React.cloneElement(currChildren, { ref });
  }, [currChildren]);

  if (!currChildren) {
    return <Component {...props} />;
  }

  return (
    <Component {...props}>
      <Element />
    </Component>
  );
};

export default React.memo(CSSwitch);
