import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Product } from "@features/product/domain/Product"; // Đảm bảo import đúng đường dẫn Product của bạn
import { Address } from "@features/profile/store/useAddressStore";

// Khai báo danh sách các màn hình và dữ liệu truyền đi kèm
export type RootStackParamList = {
  MainTabs: undefined;
  HomeMain: undefined;
  ProductDetail: { product: Product }; // Quan trọng: Khai báo nhận object product
  Cart: undefined;
  Checkout: undefined;
  Address: undefined;
  EditAddress: { address?: Address };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetail"
>;