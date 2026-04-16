export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  stripePriceId?: string;
  image?: {
    asset: { _ref: string };
    alt?: string;
  };
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  price?: number;
  duration?: string;
  icon?: string;
}
