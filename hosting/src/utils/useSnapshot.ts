import { useRef } from "react";

type Snapshot<T> = React.MutableRefObject<T>;

export function useSnapshot<T>(value: T): Snapshot<T> {
  const ref = useRef(value);

  ref.current = value;

  return ref;
}
