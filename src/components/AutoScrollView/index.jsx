import React, { useRef, useEffect } from "react";
import { ScrollView, DeviceEventEmitter } from "react-native";

const AutoScrollView = ({ children, ...props }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener("SCREEN_CHANGED", () => {
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    });
    return () => subscription.remove();
  }, []);

  return (
    <ScrollView ref={scrollRef} {...props}>
      {children}
    </ScrollView>
  );
};

export default AutoScrollView;
