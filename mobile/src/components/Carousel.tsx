import { useRef, useState } from "react";
import { View } from "react-native";

import { Image } from "native-base";

import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel"

import { Button } from "./Button";
 
export function CarouselComponent() {
  const [data, setData] = useState([...new Array(6).keys()]);
  const ref = useRef<ICarouselInstance>(null);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        vertical={false}
        width={412}
        height={290}
        loop={false}
        ref={ref}
        style={{ width: "100%" }}
        data={data}
        pagingEnabled
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={({ index }) => (
          <>
          <View style={{ flex: 1}}>
            <Image 
              w="full" 
              h="full"
              source={{ uri: 'https://github.com/diaspd.png'}}
              alt=""
            />
          </View>

            <Button
              title="index"
              onPress={() => {
                ref.current?.scrollTo({ index: index, animated: true });
              }}
            />
          </>
        )}
      />
    </View>
  );
}