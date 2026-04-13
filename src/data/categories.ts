export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  items: {
    id: string;
    name: string;
    nameAr?: string;
    image: string;
    audioText: string;
    audioTextAr?: string;
  }[];
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function makeItems(prefix: string, names: string[]) {
  return names.map((rawName) => {
    const safeName = rawName?.trim() || "Unknown";
    const safeSlug = slugify(safeName);
    return {
      id: `${prefix}-${slugify(safeName)}`,
      name: safeName,
      image: `/images/${prefix}/${safeSlug}.png`,
      audioText: safeName,
    };
  });
}

function withArabic(
  items: CategoryItem["items"],
  arabicByEnglish: Record<string, { nameAr: string; audioTextAr?: string }>,
) {
  return items.map((item) => {
    const arabic = arabicByEnglish[item.name];
    if (!arabic) return item;

    return {
      ...item,
      nameAr: arabic.nameAr,
      audioTextAr: arabic.audioTextAr ?? arabic.nameAr,
    };
  });
}

export const categories: CategoryItem[] = [
  {
    id: "animals",
    name: "الحيوانات",
    image: "/images/animals/cover.png",
    items: withArabic(
      makeItems("animals", [
        "Cat",
        "Dog",
        "Lion",
        "Tiger",
        "Elephant",
        "Giraffe",
        "Horse",
        "Zebra",
        "Bear",
      ]),
      {
        Cat: { nameAr: "قطة" },
        Dog: { nameAr: "كلب" },
        Lion: { nameAr: "أسد" },
        Tiger: { nameAr: "نمر" },
        Elephant: { nameAr: "فيل" },
        Giraffe: { nameAr: "زرافة" },
        Horse: { nameAr: "حصان" },
        Zebra: { nameAr: "حمار وحشي" },
        Bear: { nameAr: "دب" },
      },
    ),
  },
  {
    id: "fruits",
    name: "الفواكه",
    image: "/images/fruits/cover.png",
    items: withArabic(
      makeItems("fruits", [
        "Apple",
        "Banana",
        "Orange",
        "Grapes",
        "Mango",
        "Strawberry",
        "Pineapple",
        "Watermelon",
      ]),
      {
        Apple: { nameAr: "تفاح" },
        Banana: { nameAr: "موز" },
        Orange: { nameAr: "برتقال" },
        Grapes: { nameAr: "عنب" },
        Mango: { nameAr: "مانجو" },
        Strawberry: { nameAr: "فراولة" },
        Pineapple: { nameAr: "أناناس" },
        Watermelon: { nameAr: "بطيخ" },
      },
    ),
  },
  {
    id: "vegetables",
    name: "الخضروات",
    image: "/images/vegetables/cover.png",
    items: withArabic(
      makeItems("vegetables", [
        "Carrot",
        "Tomato",
        "Broccoli",
        "Cucumber",
        "Potato",
        "Corn",
        "Onion",
      ]),
      {
        Carrot: { nameAr: "جزر" },
        Tomato: { nameAr: "طماطم" },
        Broccoli: { nameAr: "بروكلي" },
        Cucumber: { nameAr: "خيار" },
        Potato: { nameAr: "بطاطس" },
        Corn: { nameAr: "ذرة" },
        Onion: { nameAr: "بصل" },
      },
    ),
  },
  {
    id: "school-tools",
    name: "أدوات المدرسة",
    image: "/images/school-tools/cover.png",
    items: withArabic(
      makeItems("school-tools", [
        "Pencil",
        "Book",
        "Ruler",
        "Eraser",
        "Notebook",
        "Scissors",
        "Pen",
      ]),
      {
        Pencil: { nameAr: "قلم رصاص" },
        Book: { nameAr: "كتاب" },
        Ruler: { nameAr: "مسطرة" },
        Eraser: { nameAr: "ممحاة" },
        Notebook: { nameAr: "دفتر" },
        Scissors: { nameAr: "مقص" },
        Pen: { nameAr: "قلم" },
      },
    ),
  },
  {
    id: "body-parts",
    name: "أجزاء الجسم",
    image: "/images/body-parts/cover.png",
    items: withArabic(
      makeItems("body-parts", [
        "Eye",
        "Hand",
        "Foot",
        "Nose",
        "Ear",
        "Mouth",
        "Head",
      ]),
      {
        Eye: { nameAr: "عين" },
        Hand: { nameAr: "يد" },
        Foot: { nameAr: "قدم" },
        Nose: { nameAr: "أنف" },
        Ear: { nameAr: "أذن" },
        Mouth: { nameAr: "فم" },
        Head: { nameAr: "رأس" },
      },
    ),
  },
  {
    id: "clothes",
    name: "الملابس",
    image: "/images/clothes/cover.png",
    items: withArabic(
      makeItems("clothes", [
        "Shirt",
        "Hat",
        "Shoes",
        "Jacket",
        "Dress",
        "Socks",
      ]),
      {
        Shirt: { nameAr: "تيشرت" },
        Hat: { nameAr: "قبعه" },
        Shoes: { nameAr: "حزاء" },
        Jacket: { nameAr: "جاكت" },
        Dress: { nameAr: "فستان" },
        Socks: { nameAr: "شراب" },
      },
    ),
  },
  {
    id: "buildings",
    name: "المباني",
    image: "/images/buildings/cover.png",
    items: withArabic(
      makeItems("buildings", [
        "House",
        "School",
        "Hospital",
        "Library",
        "Mall",
        "Hotel",
      ]),
      {
        House: { nameAr: "منزل" },
        School: { nameAr: "مدرسه" },
        Hospital: { nameAr: "مستشفي" },
        Library: { nameAr: "مكتبه" },
        Mall: { nameAr: "مجمع تجاري" },
        Hotel: { nameAr: "فندق" },
      },
    ),
  },
  {
    id: "vehicles",
    name: "المركبات",
    image: "/images/vehicles/cover.png",
    items: withArabic(
      makeItems("vehicles", [
        "Car",
        "Bus",
        "Bike",
        "Train",
        "Plane",
        "Boat",
        "Truck",
      ]),
      {
        Car: { nameAr: "سياره" },
        Bus: { nameAr: "اتوبيس" },
        Bike: { nameAr: "عجله" },
        Train: { nameAr: "قطار" },
        Plane: { nameAr: "طائره" },
        Boat: { nameAr: "قارب" },
        Truck: { nameAr: "شاحنه" },
      },
    ),
  },
  {
    id: "colors",
    name: "الألوان",
    image: "/images/colors/cover.png",
    items: withArabic(
      makeItems("colors", [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Purple",
        "Orange",
      ]),
      {
        Red: { nameAr: "أحمر" },
        Blue: { nameAr: "أزرق" },
        Green: { nameAr: "أخضر" },
        Yellow: { nameAr: "أصفر" },
        Purple: { nameAr: "بنفسجي" },
        Orange: { nameAr: "برتقالي" },
      },
    ),
  },
  {
    id: "numbers",
    name: "الأرقام",
    image: "/images/numbers/cover.png",
    items: withArabic(
      makeItems("numbers", [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
      ]),
      {
        One: { nameAr: "واحد" },
        Two: { nameAr: "اثنان" },
        Three: { nameAr: "ثلاثة" },
        Four: { nameAr: "أربعة" },
        Five: { nameAr: "خمسة" },
        Six: { nameAr: "ستة" },
        Seven: { nameAr: "سبعة" },
        Eight: { nameAr: "ثمانية" },
        Nine: { nameAr: "تسعة" },
        Ten: { nameAr: "عشرة" },
      },
    ),
  },
  {
    id: "sea-creatures",
    name: "كائنات البحر",
    image: "/images/sea-creatures/cover.png",
    items: withArabic(
      makeItems("sea-creatures", [
        "Fish",
        "Shark",
        "Dolphin",
        "Octopus",
        "Turtle",
        "Whale",
        "Starfish",
      ]),
      {
        Fish: { nameAr: "سمك" },
        Shark: { nameAr: "ฉلعة" },
        Dolphin: { nameAr: "دلفين" },
        Octopus: { nameAr: "أخطبوط" },
        Turtle: { nameAr: "سلحفاة" },
        Whale: { nameAr: "حوت" },
        Starfish: { nameAr: "نجوم البحر" },
      },
    ),
  },
  {
    id: "food",
    name: "الطعام",
    image: "/images/food/cover.png",
    items: withArabic(
      makeItems("food", [
        "Pizza",
        "Burger",
        "Pasta",
        "Soup",
        "Salad",
        "Sandwich",
      ]),
      {
        Pizza: { nameAr: "بيتزا" },
        Burger: { nameAr: "برجر" },
        Pasta: { nameAr: "باتا" },
        Soup: { nameAr: "حساء" },
        Salad: { nameAr: "سلطة" },
        Sandwich: { nameAr: "ساندويتش" },
      },
    ),
  },
  {
    id: "kitchen-items",
    name: "أدوات المطبخ",
    image: "/images/kitchen-items/cover.png",
    items: withArabic(
      makeItems("kitchen-items", [
        "Spoon",
        "Fork",
        "Knife",
        "Plate",
        "Cup",
        "Pan",
      ]),
      {
        Spoon: { nameAr: "ملعقة" },
        Fork: { nameAr: "شوكة" },
        Knife: { nameAr: "سكين" },
        Plate: { nameAr: "طبق" },
        Cup: { nameAr: "كوب" },
        Pan: { nameAr: "مقلاة" },
      },
    ),
  },
  {
    id: "nature",
    name: "الطبيعة",
    image: "/images/nature/cover.png",
    items: withArabic(
      makeItems("nature", [
        "Tree",
        "Flower",
        "Sun",
        "Rain",
        "River",
        "Mountain",
      ]),
      {
        Tree: { nameAr: "شجرة" },
        Flower: { nameAr: "زهرة" },
        Sun: { nameAr: "شمس" },
        Rain: { nameAr: "مطر" },
        River: { nameAr: "نهر" },
        Mountain: { nameAr: "جبل" },
      },
    ),
  },
  {
    id: "toys",
    name: "الألعاب",
    image: "/images/toys/cover.png",
    items: withArabic(
      makeItems("toys", ["Ball", "Doll", "Puzzle", "Blocks", "Kite", "Robot"]),
      {
        Ball: { nameAr: "كرة" },
        Doll: { nameAr: "دمية" },
        Puzzle: { nameAr: " голов puzzle" },
        Blocks: { nameAr: "قطع" },
        Kite: { nameAr: "طائرة ورقية" },
        Robot: { nameAr: "روبوت" },
      },
    ),
  },
  {
    id: "jobs",
    name: "المهن",
    image: "/images/jobs/cover.png",
    items: withArabic(
      makeItems("jobs", [
        "Doctor",
        "Teacher",
        "Firefighter",
        "Pilot",
        "Chef",
        "Police",
      ]),
      {
        Doctor: { nameAr: "طبيب" },
        Teacher: { nameAr: "مدرس" },
        Firefighter: { nameAr: "رجل إطفاء" },
        Pilot: { nameAr: " pilot" },
        Chef: { nameAr: "طباخ" },
        Police: { nameAr: "شرطة" },
      },
    ),
  },
  {
    id: "transportation-advanced",
    name: "مواصلات متقدمة",
    image: "/images/transportation-advanced/cover.png",
    items: withArabic(
      makeItems("transportation-advanced", [
        "Airplane",
        "Boat",
        "Train",
        "Helicopter",
        "Subway",
        "Truck",
      ]),
      {
        Airplane: { nameAr: "طائرة" },
        Boat: { nameAr: "قارب" },
        Train: { nameAr: "قطار" },
        Helicopter: { nameAr: "直升机" },
        Subway: { nameAr: "مترو" },
        Truck: { nameAr: "شاحنة" },
      },
    ),
  },
  {
    id: "weather",
    name: "الطقس",
    image: "/images/weather/cover.png",
    items: withArabic(
      makeItems("weather", [
        "Sunny",
        "Rainy",
        "Cloudy",
        "Windy",
        "Snowy",
        "Stormy",
      ]),
      {
        Sunny: { nameAr: "مشمس" },
        Rainy: { nameAr: "مطر" },
        Cloudy: { nameAr: "غائم" },
        Windy: { nameAr: "رياح" },
        Snowy: { nameAr: "ثلج" },
        Stormy: { nameAr: "عاصف" },
      },
    ),
  },
  {
    id: "emotions",
    name: "المشاعر",
    image: "/images/emotions/cover.png",
    items: withArabic(
      makeItems("emotions", [
        "Happy",
        "Sad",
        "Angry",
        "Surprised",
        "Excited",
        "Calm",
      ]),
      {
        Happy: { nameAr: "سعيد" },
        Sad: { nameAr: "حزين" },
        Angry: { nameAr: "غاضب" },
        Surprised: { nameAr: "متفاجئ" },
        Excited: { nameAr: "متحمس" },
        Calm: { nameAr: "هادئ" },
      },
    ),
  },
];
