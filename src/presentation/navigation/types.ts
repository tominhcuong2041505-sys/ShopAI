import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Product } from "../../domain/entities/Product";

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetail"
>;