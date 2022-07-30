export type Category = {
  href: string;
  icons: { height: number; url: string; width: number }[];
  id: string;
  name: string;
};

export type Categories = Category[];

export type CategoriesResponse = {
  categories: {
    items: Categories;
  };
};
