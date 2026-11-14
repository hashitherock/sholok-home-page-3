import {
  Home, UserCircle, Search, Users, PenLine, ShoppingBag, Store, MapPin, HelpCircle, BookOpen,
  Library, Tv, Music, Languages, BookA, LineChart, Trophy, CloudSun, Building2, Newspaper, type LucideIcon,
} from "lucide-react";

export type Service = { id: string; name: string; to: string; domain: string; desc: string; icon: LucideIcon };

export const services: Service[] = [
  { id: "main", name: "Portal", to: "/", domain: "sholok.com", desc: "Your daily start page", icon: Home },
  { id: "account", name: "Account", to: "/account", domain: "account.sholok.com", desc: "One login for everything", icon: UserCircle },
  { id: "search", name: "Search", to: "/search", domain: "search.sholok.com", desc: "Find anything, fast", icon: Search },
  { id: "news", name: "News", to: "/news", domain: "news.sholok.com", desc: "Stories that matter", icon: Newspaper },
  { id: "cafe", name: "Cafe", to: "/cafe", domain: "cafe.sholok.com", desc: "Communities you love", icon: Users },
  { id: "blog", name: "Blog", to: "/blog", domain: "blog.sholok.com", desc: "Write and share ideas", icon: PenLine },
  { id: "shopping", name: "Shopping", to: "/shopping", domain: "shopping.sholok.com", desc: "Compare and buy", icon: ShoppingBag },
  { id: "smartstore", name: "Smart Store", to: "/smartstore", domain: "smartstore.sholok.com", desc: "Seller storefronts", icon: Store },
  { id: "map", name: "Map", to: "/map", domain: "map.sholok.com", desc: "Places and directions", icon: MapPin },
  { id: "knowledge", name: "Knowledge", to: "/knowledge", domain: "kin.sholok.com", desc: "Ask and answer", icon: HelpCircle },
  { id: "webtoon", name: "Webtoon", to: "/webtoon", domain: "webtoon.sholok.com", desc: "Daily comics", icon: BookOpen },
  { id: "series", name: "Series", to: "/series", domain: "series.sholok.com", desc: "Novels and comics", icon: Library },
  { id: "tv", name: "TV", to: "/tv", domain: "tv.sholok.com", desc: "Videos and clips", icon: Tv },
  { id: "music", name: "Music", to: "/music", domain: "vibe.sholok.com", desc: "Playlists for every mood", icon: Music },
  { id: "translate", name: "Translator", to: "/translate", domain: "translate.sholok.com", desc: "Words across languages", icon: Languages },
  { id: "dictionary", name: "Dictionary", to: "/dictionary", domain: "dictionary.sholok.com", desc: "Meanings and examples", icon: BookA },
  { id: "finance", name: "Finance", to: "/finance", domain: "finance.sholok.com", desc: "Markets at a glance", icon: LineChart },
  { id: "sports", name: "Sports", to: "/sports", domain: "sports.sholok.com", desc: "Scores and fixtures", icon: Trophy },
  { id: "weather", name: "Weather", to: "/weather", domain: "weather.sholok.com", desc: "Forecasts near you", icon: CloudSun },
  { id: "realestate", name: "Real Estate", to: "/realestate", domain: "realestate.sholok.com", desc: "Homes and offices", icon: Building2 },
];

export const news = [
  { id: 1, cat: "Technology", title: "Dhaka startups raise record funding as fintech adoption doubles", summary: "Mobile payments and digital lending lead a year of rapid growth across Bangladesh's startup scene.", source: "SHOLOK Tech Desk", time: "12 min ago", hue: 305 },
  { id: 2, cat: "World", title: "Climate summit agrees on new coastal resilience fund for South Asia", summary: "Delegates commit fresh financing for flood defences and early warning systems.", source: "Global Wire", time: "38 min ago", hue: 200 },
  { id: 3, cat: "Business", title: "Garment exports climb 14% as new trade routes open", summary: "Manufacturers report strong orders from Europe and East Asia for the coming season.", source: "Market Daily", time: "1 h ago", hue: 30 },
  { id: 4, cat: "Sports", title: "Tigers clinch thrilling final-over win in Chattogram", summary: "A late surge with the bat sealed the series lead in front of a packed stadium.", source: "SHOLOK Sports", time: "2 h ago", hue: 150 },
  { id: 5, cat: "Science", title: "Researchers unveil low-cost water sensor built from rice husk", summary: "The device detects arsenic in minutes and costs less than a cup of tea to produce.", source: "Science Now", time: "3 h ago", hue: 180 },
  { id: 6, cat: "Entertainment", title: "Indie film from Sylhet picks up festival award in Busan", summary: "The quiet family drama won praise for its photography and score.", source: "Culture Pulse", time: "4 h ago", hue: 340 },
  { id: 7, cat: "Technology", title: "New AI tools help farmers predict monsoon crop yields", summary: "A pilot across six districts shows forecast accuracy above 85 percent.", source: "SHOLOK Tech Desk", time: "5 h ago", hue: 120 },
  { id: 8, cat: "Business", title: "Metro rail ridership passes 400,000 daily trips", summary: "Officials plan extended evening hours on weekends from next month.", source: "City Desk", time: "6 h ago", hue: 260 },
];

export const trending = ["Metro rail schedule", "iPhone 17 price", "BPL 2026", "Eid holidays", "Cox's Bazar hotels", "Dollar rate today", "Winter jackets", "HSC results"];

export type Product = { id: string; name: string; price: number; was?: number; rating: number; reviews: number; cat: string; seller: string; hue: number; emoji: string; stock: number };

export const products: Product[] = [
  { id: "p1", name: "Classic Cotton Panjabi", price: 2450, was: 3200, rating: 4.7, reviews: 312, cat: "Fashion", seller: "abc-fashion", hue: 30, emoji: "👘", stock: 42 },
  { id: "p2", name: "Linen Summer Shirt", price: 1650, rating: 4.5, reviews: 128, cat: "Fashion", seller: "abc-fashion", hue: 200, emoji: "👕", stock: 60 },
  { id: "p3", name: "Handloom Silk Saree", price: 8900, was: 10500, rating: 4.9, reviews: 89, cat: "Fashion", seller: "abc-fashion", hue: 340, emoji: "🥻", stock: 12 },
  { id: "p4", name: "Denim Jacket Washed", price: 3400, rating: 4.4, reviews: 76, cat: "Fashion", seller: "abc-fashion", hue: 230, emoji: "🧥", stock: 25 },
  { id: "p5", name: "Air Stride Running Shoe", price: 12500, was: 14900, rating: 4.8, reviews: 1204, cat: "Sports", seller: "nike", hue: 20, emoji: "👟", stock: 80 },
  { id: "p6", name: "Dri-Fit Training Tee", price: 3200, rating: 4.6, reviews: 540, cat: "Sports", seller: "nike", hue: 0, emoji: "🎽", stock: 120 },
  { id: "p7", name: "Court Classic Sneaker", price: 9800, rating: 4.7, reviews: 860, cat: "Sports", seller: "nike", hue: 60, emoji: "👟", stock: 34 },
  { id: "p8", name: "Sport Duffel Bag", price: 4500, rating: 4.5, reviews: 210, cat: "Sports", seller: "nike", hue: 280, emoji: "🎒", stock: 50 },
  { id: "p9", name: "iPhone 17 Pro 256GB", price: 189000, rating: 4.9, reviews: 2310, cat: "Electronics", seller: "apple", hue: 250, emoji: "📱", stock: 18 },
  { id: "p10", name: "MacBook Air M4 13\"", price: 164000, was: 172000, rating: 4.9, reviews: 980, cat: "Electronics", seller: "apple", hue: 210, emoji: "💻", stock: 9 },
  { id: "p11", name: "AirPods Pro 3", price: 32500, rating: 4.8, reviews: 1760, cat: "Electronics", seller: "apple", hue: 180, emoji: "🎧", stock: 64 },
  { id: "p12", name: "Apple Watch Series 11", price: 54900, rating: 4.7, reviews: 640, cat: "Electronics", seller: "apple", hue: 320, emoji: "⌚", stock: 22 },
  { id: "p13", name: "Ceramic Tea Set (6 pcs)", price: 2100, rating: 4.6, reviews: 98, cat: "Home", seller: "abc-fashion", hue: 90, emoji: "🫖", stock: 30 },
  { id: "p14", name: "Smart Home Speaker", price: 11900, was: 13500, rating: 4.5, reviews: 330, cat: "Electronics", seller: "apple", hue: 270, emoji: "🔊", stock: 40 },
];

export type Seller = { slug: string; name: string; tagline: string; desc: string; rating: number; followers: string; cats: string[]; hue: number; since: string; location: string; isNew?: boolean };

export const sellers: Seller[] = [
  { slug: "abc-fashion", name: "ABC Fashion", tagline: "Heritage craft, modern fit", desc: "Handpicked clothing and homeware made with artisans from across Bangladesh.", rating: 4.8, followers: "48.2K", cats: ["Fashion", "Home"], hue: 30, since: "2019", location: "Dhaka" },
  { slug: "nike", name: "Nike", tagline: "Just move", desc: "Performance footwear, apparel and gear for every athlete.", rating: 4.9, followers: "1.2M", cats: ["Sports"], hue: 15, since: "2021", location: "Official brand store" },
  { slug: "apple", name: "Apple", tagline: "Think different", desc: "iPhone, Mac, Watch, AirPods and accessories from the official brand store.", rating: 4.9, followers: "2.4M", cats: ["Electronics"], hue: 250, since: "2022", location: "Official brand store" },
];

export const cafePosts = [
  { id: 1, cafe: "Dhaka Foodies", title: "Best kacchi biryani in Old Dhaka? Ranking my top 5", author: "rifat_eats", comments: 214, likes: 980, time: "1h" },
  { id: 2, cafe: "Code BD", title: "Share your first React project — feedback thread", author: "devnaila", comments: 87, likes: 312, time: "3h" },
  { id: 3, cafe: "Travel Bangladesh", title: "3-day Sajek Valley itinerary on a student budget", author: "hill_walker", comments: 156, likes: 1204, time: "5h" },
  { id: 4, cafe: "Photography Club", title: "Monsoon street photography — this week's challenge", author: "lens_mahi", comments: 63, likes: 450, time: "7h" },
  { id: 5, cafe: "Parents Circle", title: "Good weekend activities for kids in Dhaka?", author: "ammu_tasnim", comments: 98, likes: 260, time: "9h" },
];
export const cafes = [
  { name: "Dhaka Foodies", members: "182K", topic: "Food" }, { name: "Code BD", members: "64K", topic: "Tech" },
  { name: "Travel Bangladesh", members: "240K", topic: "Travel" }, { name: "Photography Club", members: "38K", topic: "Hobby" },
  { name: "Parents Circle", members: "91K", topic: "Family" }, { name: "Cricket Fans", members: "410K", topic: "Sports" },
];

export const blogs = [
  { id: 1, title: "How I built a morning routine that actually stuck", author: "Nusrat Jahan", read: "6 min", cat: "Lifestyle", excerpt: "Small habits, honest tracking and the one rule that changed everything.", hue: 30 },
  { id: 2, title: "A designer's guide to Bangla typography on the web", author: "Arif Hossain", read: "9 min", cat: "Design", excerpt: "Choosing typefaces, line height and fallback stacks for beautiful Bangla text.", hue: 305 },
  { id: 3, title: "Rangamati in the rain: a slow travel diary", author: "Sadia Rahman", read: "7 min", cat: "Travel", excerpt: "Boats, bamboo chicken and the quietest lake mornings I've known.", hue: 170 },
  { id: 4, title: "Saving your first 1 lakh taka: a practical plan", author: "Tanvir Ahmed", read: "5 min", cat: "Finance", excerpt: "A month-by-month approach that works on an entry-level salary.", hue: 120 },
  { id: 5, title: "Home-cooked ilish three ways", author: "Farzana Kabir", read: "8 min", cat: "Food", excerpt: "Shorshe, bhapa and a smoky grilled version for the weekend.", hue: 50 },
];

export const questions = [
  { id: 1, q: "What's the fastest way to renew a passport in Dhaka?", tag: "Government", answers: 12, views: 4300, solved: true },
  { id: 2, q: "Which laptop is best for programming under 80,000 taka?", tag: "Tech", answers: 24, views: 8800, solved: true },
  { id: 3, q: "How do I keep tomato plants healthy during monsoon?", tag: "Gardening", answers: 7, views: 1200, solved: false },
  { id: 4, q: "Is it worth learning Korean for career opportunities?", tag: "Education", answers: 31, views: 9600, solved: true },
  { id: 5, q: "How to calculate income tax for freelancers?", tag: "Finance", answers: 15, views: 6100, solved: false },
];

export const webtoons = [
  { id: 1, title: "Moonlit Rickshaw", genre: "Fantasy", day: "Mon", rating: 9.8, hue: 260 },
  { id: 2, title: "Office Ghost", genre: "Comedy", day: "Tue", rating: 9.6, hue: 180 },
  { id: 3, title: "Delta Blades", genre: "Action", day: "Wed", rating: 9.7, hue: 10 },
  { id: 4, title: "Tea Garden Letters", genre: "Romance", day: "Thu", rating: 9.9, hue: 120 },
  { id: 5, title: "Neon Dhaka 2099", genre: "Sci-Fi", day: "Fri", rating: 9.5, hue: 300 },
  { id: 6, title: "The Last Ferry", genre: "Thriller", day: "Sat", rating: 9.4, hue: 220 },
  { id: 7, title: "Little Chef Ruma", genre: "Slice of life", day: "Sun", rating: 9.7, hue: 40 },
  { id: 8, title: "Storm Spirits", genre: "Fantasy", day: "Mon", rating: 9.3, hue: 200 },
];

export const series = [
  { id: 1, title: "The River Remembers", type: "Novel", author: "M. Karim", eps: 120, hue: 200 },
  { id: 2, title: "Crown of Ashes", type: "Comic", author: "Studio Paddy", eps: 86, hue: 20 },
  { id: 3, title: "Midnight Library Cafe", type: "Novel", author: "R. Sultana", eps: 64, hue: 280 },
  { id: 4, title: "Sky Guardians", type: "Comic", author: "Ink & Bolt", eps: 140, hue: 220 },
  { id: 5, title: "A Monsoon Contract", type: "Novel", author: "T. Ahmed", eps: 92, hue: 330 },
  { id: 6, title: "Iron Lotus", type: "Comic", author: "Studio Paddy", eps: 58, hue: 100 },
];

export const videos = [
  { id: 1, title: "Street food tour: Puran Dhaka at night", channel: "Taste Trails", views: "1.2M", len: "18:24", cat: "Food", hue: 30 },
  { id: 2, title: "Build a portfolio site in 30 minutes", channel: "Code BD", views: "340K", len: "31:02", cat: "Tech", hue: 260 },
  { id: 3, title: "Sundarbans: a week with the rangers", channel: "Wild Bengal", views: "2.8M", len: "42:10", cat: "Travel", hue: 140 },
  { id: 4, title: "Match highlights: Tigers vs Lions", channel: "SHOLOK Sports", views: "890K", len: "09:45", cat: "Sports", hue: 0 },
  { id: 5, title: "Acoustic session: rain songs", channel: "Vibe Live", views: "510K", len: "24:30", cat: "Music", hue: 300 },
  { id: 6, title: "Explained: how mobile banking works", channel: "Money Simple", views: "220K", len: "12:15", cat: "Finance", hue: 180 },
];

export const tracks = [
  { id: 1, title: "Rain on Tin Roofs", artist: "Megh Collective", len: 214 },
  { id: 2, title: "Night Bus to Sylhet", artist: "Arnob Sky", len: 248 },
  { id: 3, title: "Golden Hour Ghat", artist: "Nodi", len: 196 },
  { id: 4, title: "City Lights Bloom", artist: "Lumen Duo", len: 231 },
  { id: 5, title: "Paper Boats", artist: "Shonar Bangla Strings", len: 205 },
  { id: 6, title: "Slow Ferry Dreams", artist: "Megh Collective", len: 262 },
];
export const playlists = [
  { name: "Monsoon Mood", count: 42, hue: 220 }, { name: "Focus Flow", count: 60, hue: 280 },
  { name: "Bangla Indie Now", count: 35, hue: 20 }, { name: "Workout Pulse", count: 50, hue: 0 },
];

export const stocks = [
  { sym: "DSEX", name: "DSE Broad Index", price: 6284.12, chg: 0.84 },
  { sym: "GP", name: "Grameenphone", price: 312.4, chg: 1.6 },
  { sym: "SQURPHARMA", name: "Square Pharma", price: 214.8, chg: -0.7 },
  { sym: "BRACBANK", name: "BRAC Bank", price: 48.9, chg: 2.1 },
  { sym: "BEXIMCO", name: "Beximco Ltd", price: 115.3, chg: -1.2 },
  { sym: "WALTONHIL", name: "Walton Hi-Tech", price: 642.0, chg: 0.3 },
];
export const fx = [
  { pair: "USD/BDT", rate: 121.45, chg: 0.12 }, { pair: "EUR/BDT", rate: 131.2, chg: -0.21 },
  { pair: "GBP/BDT", rate: 154.8, chg: 0.08 }, { pair: "KRW/BDT", rate: 0.088, chg: 0.02 },
];

export const matches = [
  { id: 1, sport: "Cricket", home: "Bangladesh", away: "Sri Lanka", score: "284/6 – 251/9", status: "Final", when: "Yesterday" },
  { id: 2, sport: "Football", home: "Abahani", away: "Mohammedan", score: "2 – 1", status: "Live 74'", when: "Now" },
  { id: 3, sport: "Cricket", home: "Comilla", away: "Rangpur", score: "vs", status: "Upcoming", when: "Sat 18:30" },
  { id: 4, sport: "Football", home: "Bashundhara", away: "Sheikh Jamal", score: "vs", status: "Upcoming", when: "Sun 16:00" },
  { id: 5, sport: "Kabaddi", home: "Dhaka Div.", away: "Khulna Div.", score: "38 – 32", status: "Final", when: "Today" },
];
export const standings = [
  { team: "Bashundhara Kings", p: 12, w: 9, d: 2, l: 1, pts: 29 }, { team: "Abahani Ltd", p: 12, w: 8, d: 2, l: 2, pts: 26 },
  { team: "Mohammedan SC", p: 12, w: 7, d: 3, l: 2, pts: 24 }, { team: "Sheikh Jamal", p: 12, w: 5, d: 3, l: 4, pts: 18 },
  { team: "Rahmatganj MFS", p: 12, w: 3, d: 4, l: 5, pts: 13 },
];

export const cities = [
  { name: "Dhaka", temp: 27, cond: "Partly cloudy", hi: 30, lo: 21, hum: 68, wind: 9, aqi: 142 },
  { name: "Chattogram", temp: 28, cond: "Sunny", hi: 31, lo: 22, hum: 72, wind: 14, aqi: 88 },
  { name: "Sylhet", temp: 24, cond: "Light rain", hi: 26, lo: 19, hum: 85, wind: 7, aqi: 54 },
  { name: "Khulna", temp: 27, cond: "Clear", hi: 30, lo: 20, hum: 66, wind: 11, aqi: 96 },
  { name: "Cox's Bazar", temp: 29, cond: "Breezy", hi: 31, lo: 23, hum: 78, wind: 19, aqi: 40 },
];

export const places = [
  { id: 1, name: "Ahsan Manzil", cat: "Landmark", area: "Old Dhaka", rating: 4.6, x: 38, y: 62 },
  { id: 2, name: "Hatirjheel Lakeside", cat: "Park", area: "Tejgaon", rating: 4.5, x: 55, y: 40 },
  { id: 3, name: "Bashundhara City", cat: "Shopping", area: "Panthapath", rating: 4.3, x: 46, y: 48 },
  { id: 4, name: "Dhanmondi Lake", cat: "Park", area: "Dhanmondi", rating: 4.6, x: 40, y: 50 },
  { id: 5, name: "Star Kabab", cat: "Restaurant", area: "Dhanmondi", rating: 4.4, x: 42, y: 54 },
  { id: 6, name: "National Museum", cat: "Landmark", area: "Shahbag", rating: 4.5, x: 50, y: 56 },
  { id: 7, name: "Gulshan Lake Park", cat: "Park", area: "Gulshan", rating: 4.4, x: 64, y: 28 },
  { id: 8, name: "North End Coffee", cat: "Cafe", area: "Banani", rating: 4.7, x: 60, y: 24 },
];

export const properties = [
  { id: 1, title: "Lake-view 3 bed apartment", area: "Gulshan 2", type: "Apartment", deal: "Sale", price: 32000000, size: 2100, beds: 3, baths: 3, hue: 200 },
  { id: 2, title: "Cozy 2 bed family flat", area: "Dhanmondi", type: "Apartment", deal: "Rent", price: 45000, size: 1250, beds: 2, baths: 2, hue: 30 },
  { id: 3, title: "Modern office floor", area: "Banani", type: "Office", deal: "Rent", price: 280000, size: 4200, beds: 0, baths: 4, hue: 260 },
  { id: 4, title: "Duplex with rooftop garden", area: "Bashundhara R/A", type: "House", deal: "Sale", price: 68000000, size: 3800, beds: 5, baths: 5, hue: 140 },
  { id: 5, title: "Studio near metro station", area: "Mirpur 10", type: "Apartment", deal: "Rent", price: 18000, size: 520, beds: 1, baths: 1, hue: 320 },
  { id: 6, title: "Corner retail space", area: "Uttara Sector 7", type: "Shop", deal: "Sale", price: 15500000, size: 900, beds: 0, baths: 1, hue: 60 },
];

export const dictionary: Record<string, { pos: string; phon: string; bn: string; defs: string[]; ex: string; syn: string[] }> = {
  serendipity: { pos: "noun", phon: "/ˌser.ənˈdɪp.ə.ti/", bn: "সৌভাগ্যক্রমে আবিষ্কার", defs: ["The occurrence of events by chance in a happy or beneficial way."], ex: "Finding that café was pure serendipity.", syn: ["luck", "fortune", "chance"] },
  resilient: { pos: "adjective", phon: "/rɪˈzɪl.i.ənt/", bn: "সহনশীল", defs: ["Able to recover quickly from difficult conditions.", "Able to return to its original shape after bending."], ex: "Coastal communities have proven remarkably resilient.", syn: ["tough", "hardy", "adaptable"] },
  journey: { pos: "noun", phon: "/ˈdʒɜː.ni/", bn: "যাত্রা", defs: ["An act of travelling from one place to another."], ex: "The train journey to Sylhet takes seven hours.", syn: ["trip", "voyage", "expedition"] },
  harmony: { pos: "noun", phon: "/ˈhɑː.mə.ni/", bn: "সম্প্রীতি", defs: ["Agreement or peaceful coexistence.", "Pleasing combination of musical notes."], ex: "The villages lived in harmony for generations.", syn: ["accord", "peace", "unity"] },
  curious: { pos: "adjective", phon: "/ˈkjʊə.ri.əs/", bn: "কৌতূহলী", defs: ["Eager to know or learn something."], ex: "Children are naturally curious about the world.", syn: ["inquisitive", "interested"] },
  knowledge: { pos: "noun", phon: "/ˈnɒl.ɪdʒ/", bn: "জ্ঞান", defs: ["Facts, information and skills acquired through experience or education."], ex: "Sharing knowledge makes communities stronger.", syn: ["understanding", "learning", "wisdom"] },
};

export const phrasebook: Record<string, Record<string, string>> = {
  hello: { bn: "হ্যালো", ko: "안녕하세요", es: "Hola", fr: "Bonjour", ja: "こんにちは", hi: "नमस्ते" },
  "thank you": { bn: "ধন্যবাদ", ko: "감사합니다", es: "Gracias", fr: "Merci", ja: "ありがとう", hi: "धन्यवाद" },
  "good morning": { bn: "শুভ সকাল", ko: "좋은 아침", es: "Buenos días", fr: "Bonjour", ja: "おはようございます", hi: "सुप्रभात" },
  "how are you": { bn: "আপনি কেমন আছেন?", ko: "어떻게 지내세요?", es: "¿Cómo estás?", fr: "Comment ça va ?", ja: "お元気ですか？", hi: "आप कैसे हैं?" },
  "where is the station": { bn: "স্টেশন কোথায়?", ko: "역이 어디에 있어요?", es: "¿Dónde está la estación?", fr: "Où est la gare ?", ja: "駅はどこですか？", hi: "स्टेशन कहाँ है?" },
  goodbye: { bn: "বিদায়", ko: "안녕히 가세요", es: "Adiós", fr: "Au revoir", ja: "さようなら", hi: "अलविदा" },
  "i love you": { bn: "আমি তোমাকে ভালোবাসি", ko: "사랑해요", es: "Te quiero", fr: "Je t'aime", ja: "愛してる", hi: "मैं तुमसे प्यार करता हूँ" },
  water: { bn: "পানি", ko: "물", es: "Agua", fr: "Eau", ja: "水", hi: "पानी" },
};
export const languages = [
  { code: "en", name: "English" }, { code: "bn", name: "Bangla" }, { code: "ko", name: "Korean" },
  { code: "es", name: "Spanish" }, { code: "fr", name: "French" }, { code: "ja", name: "Japanese" }, { code: "hi", name: "Hindi" },
];

export const taka = (n: number) => "৳" + n.toLocaleString("en-IN");
export const tile = (hue: number) => ({
  background: `linear-gradient(135deg, oklch(0.93 0.05 ${hue}), oklch(0.82 0.1 ${hue}))`,
});
export const tileDark = (hue: number) => ({
  background: `linear-gradient(135deg, oklch(0.45 0.14 ${hue}), oklch(0.28 0.1 ${hue}))`,
});
