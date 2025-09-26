import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      //   action();
      const callBack = (e) => {
        if (e.code === key) action();
      };
      document.addEventListener("keydown", callBack);

      return () => document.removeEventListener("keydown", callBack);
    },
    [key, action]
  );
}
