import type { ImageDTO } from "./ImageDTO";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ImageDTO[];
  is_active: boolean;
  payment_methods: {
    key: string;
    name: string;
  };
  user?: {
    avatar: string;
    name: string;
  };
};