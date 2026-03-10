import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Product } from "../../domain/entities/Product";
import {
  ProductDetailRouteProp,
  RootStackNavigationProp,
} from "../navigation/types";
import { useCartStore } from "../../store/useCartStore";

type Navigation = RootStackNavigationProp;

const SectionContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <View className="mb-3">
    <View className="bg-white px-4 py-3">{children}</View>
  </View>
);

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelect,
}) => {
  if (!colors.length) return null;

  return (
    <View className="mt-2">
      <Text className="text-xs font-semibold text-gray-500 mb-2">
        MÀU SẮC LAPTOP
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {colors.map((color) => {
          const isActive = color === selectedColor;
          return (
            <TouchableOpacity
              key={color}
              className={`px-3 py-1.5 rounded-full border ${
                isActive ? "border-blue-700 bg-blue-50" : "border-gray-300"
              }`}
              onPress={() => onSelect(color)}
            >
              <Text
                className={`text-xs font-medium ${
                  isActive ? "text-blue-700" : "text-gray-700"
                }`}
              >
                {color}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

interface QuickSpecsProps {
  quickSpecs?: Product["quickSpecs"];
}

const QuickSpecsSection: React.FC<QuickSpecsProps> = ({ quickSpecs }) => {
  if (!quickSpecs) return null;

  const rows: { label: string; value?: string }[] = [
    { label: "CPU", value: quickSpecs.cpu },
    { label: "RAM", value: quickSpecs.ram },
    { label: "VGA", value: quickSpecs.vga },
    { label: "Ổ cứng", value: quickSpecs.storage },
    { label: "Màn hình", value: quickSpecs.display },
    { label: "Hệ điều hành", value: quickSpecs.os },
  ].filter((item) => item.value);

  if (!rows.length) return null;

  return (
    <View className="mt-3">
      {rows.map((row) => (
        <Text
          key={row.label}
          className="text-xs text-gray-700 mb-0.5"
          numberOfLines={2}
        >
          <Text className="font-semibold">{row.label}: </Text>
          {row.value}
        </Text>
      ))}
    </View>
  );
};

interface DetailsTableProps {
  details?: Product["details"];
}

const DetailsTable: React.FC<DetailsTableProps> = ({ details }) => {
  if (!details) return null;

  const rows: { label: string; value?: string }[] = [
    { label: "Thương hiệu", value: details.brand },
    { label: "Bảo hành", value: details.warranty },
    { label: "Series", value: details.series },
    { label: "Part-number", value: details.partNumber },
  ].filter((row) => row.value);

  if (!rows.length) return null;

  return (
    <SectionContainer>
      <Text className="text-base font-semibold text-gray-900 mb-3">
        Chi tiết sản phẩm
      </Text>
      <View className="rounded-lg overflow-hidden border border-gray-200">
        {rows.map((row, index) => (
          <View
            key={row.label}
            className={`flex-row px-3 py-2 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <View className="w-32">
              <Text className="text-xs text-gray-500">{row.label}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-800">{row.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </SectionContainer>
  );
};

interface DescriptionProps {
  description?: string;
}

const DescriptionSection: React.FC<DescriptionProps> = ({ description }) => {
  if (!description) return null;

  return (
    <SectionContainer>
      <Text className="text-base font-semibold text-gray-900 mb-2">
        Mô tả sản phẩm
      </Text>
      <Text className="text-xs leading-5 text-gray-700">{description}</Text>
    </SectionContainer>
  );
};

interface RelatedProductsSectionProps {
  products: Product[];
}

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  products,
}) => {
  if (!products.length) return null;

  return (
    <SectionContainer>
      <Text className="text-base font-semibold text-gray-900 mb-3">
        Sản phẩm liên quan
      </Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            className="w-48 bg-white rounded-2xl border border-gray-200 overflow-hidden"
            // navigation được truyền từ màn chính qua render prop bên dưới
          >
            <View className="bg-red-500 px-2 py-1 absolute z-10 left-0 top-2 rounded-tr-md rounded-br-md">
              <Text className="text-white text-[10px] font-bold">GIẢM 10%</Text>
            </View>
            <View className="w-full h-32 bg-white justify-center items-center">
              <Image
                source={{ uri: item.image }}
                resizeMode="contain"
                className="w-11/12 h-11/12"
              />
            </View>
            <View className="px-3 pb-3 pt-1">
              <Text
                className="text-[10px] text-blue-600 font-bold uppercase"
                numberOfLines={1}
              >
                {item.tag}
              </Text>
              <Text
                className="text-xs font-semibold text-gray-900 h-9"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-sm font-bold text-red-500">
                  {item.price}
                </Text>
                {item.oldPrice && (
                  <Text className="text-[11px] text-gray-400 line-through ml-2">
                    {item.oldPrice}
                  </Text>
                )}
              </View>

              {item.quickSpecs?.cpu && (
                <Text
                  className="text-[10px] text-gray-500 mt-1"
                  numberOfLines={2}
                >
                  {item.quickSpecs.cpu} • {item.quickSpecs.ram}
                </Text>
              )}

              <TouchableOpacity className="mt-2 py-1.5 rounded-full border border-blue-700">
                <Text className="text-xs text-center font-semibold text-blue-700">
                  Thêm vào giỏ
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SectionContainer>
  );
};

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<Navigation>();
  const { cart, addToCart } = useCartStore();
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] ?? "Mặc định"
  );

  const relatedProducts: Product[] = [
    {
      ...product,
      id: `${product.id}-rel-1`,
      name: `${product.name} (RAM 16GB)`,
      oldPrice: product.oldPrice ?? product.price,
    },
    {
      ...product,
      id: `${product.id}-rel-2`,
      name: `${product.name} (SSD 1TB)`,
      oldPrice: product.oldPrice ?? product.price,
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 bg-gray-100"
        showsVerticalScrollIndicator={false}
      >
        {/* Header overlay + image */}
        <View className="bg-white">
          <View className="h-12 absolute z-10 left-0 right-0 flex-row items-center justify-between px-4 pt-3">
            <TouchableOpacity
              className="w-9 h-9 rounded-full bg-black/40 justify-center items-center"
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
            <View className="flex-row space-x-2">
              <TouchableOpacity className="w-9 h-9 rounded-full bg-black/40 justify-center items-center">
                <Icon name="share-social-outline" size={19} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-9 h-9 rounded-full bg-black/40 justify-center items-center"
                onPress={() => navigation.navigate("Cart")}
              >
                <Icon name="cart-outline" size={20} color="#fff" />
                {cart.length > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 justify-center items-center">
                    <Text className="text-[9px] text-white font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="pt-10 pb-4 items-center bg-white">
            <View className="w-60 h-60 justify-center items-center">
              <Image
                source={{ uri: product.image }}
                resizeMode="contain"
                className="w-full h-full"
              />
            </View>
          </View>
        </View>

        {/* Basic info + color + quick specs */}
        <SectionContainer>
          <ColorSelector
            colors={product.colors ?? []}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />

          <Text className="mt-3 text-base font-semibold text-gray-900">
            {product.name}
          </Text>
          <View className="flex-row items-baseline mt-1">
            <Text className="text-xl font-extrabold text-blue-700">
              {product.price}
            </Text>
            {product.oldPrice && (
              <Text className="ml-2 text-sm text-gray-400 line-through">
                {product.oldPrice}
              </Text>
            )}
          </View>

          <QuickSpecsSection quickSpecs={product.quickSpecs} />
        </SectionContainer>

        {/* Details table */}
        <DetailsTable details={product.details} />

        {/* Description */}
        <DescriptionSection description={product.description} />

        {/* Related products */}
        <RelatedProductsSection products={relatedProducts} />

        <View className="h-24" />
      </ScrollView>

      {/* Floating call button */}
      <TouchableOpacity className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-blue-700 justify-center items-center shadow-lg">
        <Icon name="call" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Sticky bottom bar */}
      <View className="flex-row bg-white border-t border-gray-200 px-4 py-3">
        <TouchableOpacity
          className="flex-1 mr-3 border border-blue-700 rounded-full py-3 justify-center items-center"
          onPress={() => {
            addToCart(product, selectedColor);
            Alert.alert("Thành công", "Thêm vào giỏ thành công");
          }}
        >
          <Text className="text-sm font-semibold text-blue-700">
            Thêm vào giỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-blue-700 rounded-full py-3 justify-center items-center"
          onPress={() => {
            addToCart(product, selectedColor);
            navigation.navigate("Cart");
          }}
        >
          <Text className="text-sm font-semibold text-white">Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;