import { useState, useCallback, useEffect } from "react";

const atoms = {};

export const atom = ({ key, default: defaultValue }) => {
  const atomDescriptor = { key };
  if (atoms[key]) {
    return atomDescriptor;
  }
  atoms[key] = {
    key,
    defaultValue,
    subscribers: [],
  };
  return atomDescriptor;
};

export const useAtom = ({ key }) => {
  if (!atoms[key]) {
    throw new Error(`Atom "${key}" does not exist.`);
  }
  const [value, setValue] = useState(atoms[key].defaultValue);

  useEffect(() => {
    atoms[key].subscribers.push(setValue);
    return () => {
      const subscriberIndex = atoms[key].subscribers.findIndex(
        (subscriber) => subscriber === setValue
      );
      if (subscriberIndex < 0) {
        return;
      }
      atoms[key].subscribers.splice(subscriberIndex, 1);
    };
  }, []);

  const setAtomValue = useCallback(
    (value) => {
      atoms[key].subscribers.forEach((subscriber) => {
        subscriber(value);
      });
    },
    [key]
  );

  return [value, setAtomValue];
};
