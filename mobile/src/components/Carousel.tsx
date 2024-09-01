import { useRef } from "react";

import { Text, Image, useTheme, VStack, Box } from "native-base";

import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel"
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { api } from "@services/api";
 
type Carousel = {
  isAdDisabled: boolean;
  images: any[];
}

export function CarouselComponent({isAdDisabled, images}: Carousel) {
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
      <GestureHandlerRootView style={{ marginBottom: 24 }}>
        <VStack>
         {images ? (
            <Carousel
              vertical={false}
              width={412}
              height={290}
              loop={true}
              ref={ref}
              style={{ width: "100%" }}
              data={images}
              onProgressChange={progress}
              pagingEnabled
              renderItem={({ item }) => (
              <Box flex={1}>
                <Image 
                  w="full" 
                  h="full"
                  source={{
                    uri: item.uri
                      ? item.uri
                      : `${api.defaults.baseURL}/images/${item.path}`,
                  }}
                  alt=""
                  opacity={isAdDisabled ? '95' : '100'}
                  blurRadius={isAdDisabled ? 2 : 0}
                  bgColor="black"
                />

                {isAdDisabled &&  <Text mt="-150" color="gray.700" textAlign="center" fontSize="sm" fontFamily="heading">ANÚNCIO DESATIVADO</Text>}
              </Box>
              )}
            />
         ):  <Text alignSelf="center" position="absolute" bottom="32"fontFamily="body" color="gray.100">Não foi possivel carregar as imagens desse produto!</Text>}

          <Pagination.Basic
              progress={progress}
              data={images}
              activeDotStyle={{ backgroundColor: colors.gray[700], opacity: opacity[100]}}
              dotStyle={{ backgroundColor: colors.gray[500], borderRadius: 50, opacity: opacity[80], width: 120, height: 4 }}
              containerStyle={{ gap: 5, marginTop: 280 }}
              onPress={onPressPagination}
            />
        </VStack>
      </GestureHandlerRootView>
  );
}