import { useRef, useState } from "react";
import { View } from "react-native";

import { Box, Image, useTheme, VStack } from "native-base";

import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel"
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
 
export function CarouselComponent() {
  const [data, setData] = useState([...new Array(3).keys()]);
  const ref = useRef<ICarouselInstance>(null);

  const { colors, opacity } = useTheme();

  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <VStack>
          <Carousel
            vertical={false}
            width={412}
            height={290}
            loop={false}
            ref={ref}
            style={{ width: "100%" }}
            data={data}
            onProgressChange={progress}
            pagingEnabled
            renderItem={({ index }) => (
              <View style={{ flex: 1}}>
                <Image 
                  w="full" 
                  h="full"
                  source={{ uri: 'https://github.com/diaspd.png'}}
                  alt=""
                />
              </View>
            )}
          />

          <Pagination.Basic
              progress={progress}
              data={data}
              activeDotStyle={{ backgroundColor: colors.gray[700], opacity: opacity[100]}}
              dotStyle={{ backgroundColor: colors.gray[500], borderRadius: 50, opacity: opacity[80], width: 120, height: 4 }}
              containerStyle={{ gap: 5, marginTop: 280 }}
              onPress={onPressPagination}
            />
        </VStack>
      </GestureHandlerRootView>
  );
}