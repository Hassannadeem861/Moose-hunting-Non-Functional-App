import { useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useScrollToTop = () => {
  const scrollRef = useRef(null);

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  });

  return scrollRef;
};

export default useScrollToTop;
