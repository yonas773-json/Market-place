insert into categories (slug, name, name_am, tint, sort) values
('cleaning','Cleaning','ጽዳት','mint',1),
('it','IT Solutions','አይቲ','sky',2),
('plumbing','Plumber','ቧንቧ','peach',3),
('food','Food','ምግብ','butter',4),
('fashion','Fashion','ልብስ','blush',5),
('electronics','Electronics','ኤሌክትሮኒክስ','lilac',6),
('beauty','Beauty','ውበት','blush',7),
('grocery','Grocery','ግሮሰሪ','butter',8),
('home','Home','ቤት','peach',9),
('auto','Auto','መኪና','sky',10),
('hardware','Hardware','ሃርድዌር','peach',11),
('learning','Learning','ትምህርት','lilac',12),
('pros','Pros','ሙያ','mint',13),
('wellness','Wellness','ጤና','sky',14)
on conflict (slug) do nothing;

insert into platform_settings (id, commission_bps, featured_price_etb)
values (1, 800, 1499)
on conflict (id) do nothing;

insert into businesses (name, slug, category_slug, city, area, phone, hours, about, logo, verified, plan, rating_tenths)
select * from (values
  ('Selam Home Care','selam-home-care','cleaning','Addis Ababa','Bole','+251911200010','7:00–20:00','Home cleaning crews across Addis, with same-week deep cleans.','/media/quick.jpg', true, 'featured', 49),
  ('Rift Plumbing Co.','rift-plumbing','plumbing','Addis Ababa','Kazanchis','+251911200011','8:00–18:00','Leaks, taps, and blocked drains. Call before noon for a same-day visit.','/media/marcus.jpg', true, 'growth', 46),
  ('Blue Nile Tech','blue-nile-tech','it','Addis Ababa','CMC','+251911200012','9:00–19:00','Laptop setup, Wi-Fi, and phone help at your door.','/media/marcus-face.jpg', true, 'free', 47),
  ('Abyssinia Bites','abyssinia-bites','food','Addis Ababa','Piassa','+251911200013','11:00–21:00','Fasting platters and family injera, cooked the morning you order.','/media/food.jpg', true, 'featured', 50),
  ('Sheger Stitch','sheger-stitch','fashion','Addis Ababa','Sarbet','+251911200015','10:00–19:00','Handwoven cotton and ready habesha sets.','/media/fashion.jpg', true, 'growth', 48),
  ('Merkato Gadgets','merkato-gadgets','electronics','Addis Ababa','Merkato','+251911200016','9:00–18:00','Phone setup, screen checks, and small repairs.','/media/marcus-face.jpg', true, 'free', 44),
  ('Luna Beauty Room','luna-beauty','beauty','Addis Ababa','Bole','+251911200017','9:00–20:00','Bridal glow and at-home makeup.','/media/quick.jpg', true, 'growth', 49),
  ('Merkato Fresh','merkato-fresh','grocery','Addis Ababa','Merkato','+251911200018','7:00–16:00','Weekly vegetable boxes from Atikilt Tera.','/media/food.jpg', true, 'free', 47),
  ('Jemo Living','jemo-living','home','Addis Ababa','Jemo','+251911200019','9:00–18:00','Sofas and coffee tables made to order.','/media/sofa.jpg', true, 'free', 45),
  ('Kidus Auto Care','kidus-auto','auto','Addis Ababa','Megenagna','+251911200020','8:00–18:00','Exterior wash and interior vacuum.','/media/marcus.jpg', true, 'free', 46),
  ('Habesha Hardware','habesha-hardware','hardware','Addis Ababa','Kality','+251911200021','8:00–17:00','Cement, tools, and small site bundles.','/media/floor.jpg', true, 'free', 43),
  ('Addis Learn Hub','addis-learn','learning','Addis Ababa','4 Kilo','+251911200022','16:00–20:00','Evening English in groups of eight.','/media/marcus-face.jpg', true, 'free', 48),
  ('Hillside Desk','hillside-desk','pros','Addis Ababa','Kazanchis','+251911200023','9:00–17:00','Tax filing and simple business papers.','/media/marcus-face.jpg', true, 'growth', 47),
  ('Entoto Wellness','entoto-wellness','wellness','Addis Ababa','Entoto','+251911200024','10:00–19:00','One-hour home massage.','/media/quick.jpg', true, 'free', 49),
  ('Rosa Flowers','rosa-flowers','grocery','Hawassa','Haile Selassie','+251911200025','8:00–18:00','New flower stall waiting on a platform check.','/media/food.jpg', false, 'free', 0)
) as v(name, slug, category_slug, city, area, phone, hours, about, logo, verified, plan, rating_tenths)
where not exists (select 1 from businesses b where b.slug = v.slug);

insert into services (
  business_id, category_slug, kind, title, title_am, blurb, blurb_am, description, description_am,
  image, hero_image, price, compare_at, price_premium, price_platinum, badge, perk, support, tint,
  home_hero, spotlight, featured, stock, rating_tenths, review_count
)
select b.id, v.category_slug, v.kind, v.title, v.title_am, v.blurb, v.blurb_am, v.description, v.description_am,
  v.image, v.hero_image, v.price, v.compare_at, v.price_premium, v.price_platinum, v.badge, v.perk, v.support, v.tint,
  v.home_hero, v.spotlight, v.featured, v.stock, 0, 0
from (values
  ('selam-home-care','cleaning','service','Quick Home Cleaning Service','ፈጣን የቤት ጽዳት','Fresh, fast cleaning','ትኩስና ፈጣን ጽዳት','A two-hour tidy of kitchen, bath, and floors. Supplies included.','ኩሽና፣ መታጠቢያና ወለል በሁለት ሰዓት። እቃው ከእኛ ነው።','/media/quick.jpg','/media/quick.jpg',1800,3000,null,null,'40% Off','Fresh, Fast Cleaning','24/7 Support','mint', true, false, true, null),
  ('selam-home-care','cleaning','service','Home Cleaning','የቤት ጽዳት','Get 20% off our best services today','ዛሬ በምርጥ አገልግሎታችን 20% ቅናሽ','Regular home cleaning with a trusted Selam crew.','የተለመደ የቤት ጽዳት ከሰላም ቡድን ጋር።','/media/supplies.jpg','/media/supplies.jpg',1600,2000,null,null,'20% Off','Best services today','','mint', false, true, true, null),
  ('selam-home-care','cleaning','service','Bathroom Cleaning','የመታጠቢያ ጽዳት','Sparkling clean, fresh bathroom.','ንጹህና ትኩስ መታጠቢያ።','Sink, tile, and glass, finished in about ninety minutes.','መታጠቢያ በዘጠና ደቂቃ አካባቢ።','/media/bath.jpg','/media/bath.jpg',900,null,null,null,'','','','blush', false, false, false, null),
  ('selam-home-care','cleaning','service','Home Deep Cleaning','ጥልቅ የቤት ጽዳት','thorough care, spotless home.','ጥልቅ እንክብካቤ፣ ንጹህ ቤት።','Our Home Deep Cleaning service delivers a thorough, spotless clean for every corner of your house. Enjoy a fresh, hygienic, and comfortable living space.','ጥልቅ ጽዳት ለቤትዎ እያንዳንዱ ማዕዘን። ትኩስና ምቹ ቦታ ያገኛሉ።','/media/floor.jpg','/media/marcus.jpg',2499,2799,2899,3099,'Up to 30% Off','thorough care, spotless home.','','peach', false, false, true, null),
  ('selam-home-care','cleaning','service','Sofa Carpet Clean','የሶፋና ምንጣፍ ጽዳት','Fresh look, spotless comfort.','አዲስ መልክ፣ ንጹህ መፅናናት።','Shampoo for one sofa and the rug in front of it.','ለአንድ ሶፋና ፊትለፊቱ ምንጣፍ።','/media/sofa.jpg','/media/sofa.jpg',1400,null,null,null,'','','','lilac', false, false, false, null),
  ('selam-home-care','cleaning','service','Bungalow Clean Pro','የቤት ውጭ ጽዳት','Expert care, spotless spaces.','ባለሙያ እንክብካቤ።','Outside walls, entry, and a light inside tidy.','የውጭ ግድግዳ፣ መግቢያና ቀላል የውስጥ ጽዳት።','/media/marcus.jpg','/media/marcus.jpg',3200,null,null,null,'','','','sky', false, false, false, null),
  ('selam-home-care','cleaning','service','Kitchen Cleaning','የኩሽና ጽዳት','Shiny surfaces, fresh kitchen.','የሚያበሩ ቦታዎች፣ ትኩስ ኩሽና።','Counters, hob, and sink. Oven interior is extra.','ጠረጴዛ፣ ምድጃና መታጠቢያ።','/media/kitchen.jpg','/media/kitchen.jpg',1100,null,null,null,'','','','butter', false, false, false, null),
  ('rift-plumbing','plumbing','service','Pipe & Leak Visit','የቧንቧ ጉብኝት','Leaks, taps, and blocked drains.','የውሃ መፍሰስና የታፕ ጥገና።','A one-hour visit. Parts are priced before we fit them.','የአንድ ሰዓት ጉብኝት። እቃ ከመገጣጠሙ በፊት ዋጋ ይነገራል።','/media/marcus.jpg','/media/marcus.jpg',850,null,null,null,'','','','peach', false, false, false, null),
  ('blue-nile-tech','it','service','Laptop Setup at Home','የላፕቶፕ ዝግጅት','Wi-Fi, updates, and a tidy desktop.','ዋይፋይ፣ ማዘመንና ዴስክቶፕ።','We set up one laptop and the home Wi-Fi name you choose.','አንድ ላፕቶፕና የቤት ዋይፋይ እናዘጋጃለን።','/media/marcus-face.jpg','/media/marcus-face.jpg',1800,null,null,null,'','','','sky', false, false, true, null),
  ('abyssinia-bites','food','product','Fasting Platter for 4','የጾም ጣፋጭ ለ4','Injera, greens, and lentils for four.','እንጀራ፣ ጎመንና ምስር ለአራት።','Cooked the morning of delivery. Tell us if you want it milder.','በማድረሻው ጠዋት የተዘጋጀ።','/media/food.jpg','/media/food.jpg',680,null,null,null,'','','','butter', false, false, true, 24),
  ('sheger-stitch','fashion','product','Cotton Habesha Set','የጥጥ ሀበሻ ስብስብ','Handwoven cotton, ready to hem.','የእጅ ጥጥ፣ ለመስፋት ዝግጁ።','One set. Pickup in Sarbet or delivery in Addis.','አንድ ስብስብ። በሳርቤት መውሰድ ወይም በአዲስ ማድረስ።','/media/fashion.jpg','/media/fashion.jpg',4200,4800,null,null,'','','','blush', false, false, true, 8),
  ('merkato-gadgets','electronics','service','Phone Setup & Check','የስልክ ምርመራ','Backup, screen check, and setup.','መጠባበቂያና የማያ ገጽ ምርመራ።','Bring the phone to Merkato or we come to you in Addis.','ስልኩን ወደ መርካቶ ያምጡ ወይም ወደ እርስዎ እንመጣለን።','/media/marcus-face.jpg','/media/marcus-face.jpg',1500,null,null,null,'','','','lilac', false, false, false, null),
  ('luna-beauty','beauty','service','Bridal Glow Package','የሙሽራ ውበት','Makeup and hair at your house.','ሜካፕና ጸጉር በቤትዎ።','Two hours. A trial visit can be booked first.','ሁለት ሰዓት።','/media/quick.jpg','/media/quick.jpg',2200,null,2800,null,'','','','blush', false, false, true, null),
  ('merkato-fresh','grocery','product','Weekly Veg Box','ሳምንታዊ አትክልት','Greens, onion, tomato, and potato.','ጎመን፣ ሽንኩርት፣ ቲማቲምና ድንች።','Packed the evening before delivery.','ከማድረሻው በፊት ማታ ይታሸጋል።','/media/food.jpg','/media/food.jpg',480,null,null,null,'','','','butter', false, false, false, 30),
  ('jemo-living','home','product','Sofa + Coffee Table','ሶፋና ጠረጴዛ','A two-seat sofa and a low table.','የሁለት መቀመጫ ሶፋና ዝቅተኛ ጠረጴዛ።','Made to order in about three weeks.','በሦስት ሳምንት አካባቢ ይዘጋጃል።','/media/sofa.jpg','/media/sofa.jpg',14500,null,null,null,'','','','peach', false, false, false, 3),
  ('kidus-auto','auto','service','Full Car Wash','የመኪና እጥበት','Exterior wash and a quick vacuum.','የውጭ እጥበትና ፈጣን ማጽዳት።','At the Megenagna bay. No appointment after 4pm on Friday.','በመገናኛ። አርብ ከሰዓት በኋላ ቀጠሮ የለም።','/media/marcus.jpg','/media/marcus.jpg',450,null,null,null,'','','','sky', false, false, false, null),
  ('habesha-hardware','hardware','product','Cement & Tool Bundle','ሲሚንቶና መሣሪያ','Two cement bags and a hand-tool set.','ሁለት ሲሚንቶና የእጅ መሣሪያ።','Pickup in Kality. Delivery inside Addis is extra.','በቃሊቲ ይወሰዳል።','/media/floor.jpg','/media/floor.jpg',2700,null,null,null,'','','','peach', false, false, false, 15),
  ('addis-learn','learning','service','Evening English Class','የማታ እንግሊዝኛ','Small group, four evenings.','ትንሽ ቡድን፣ አራት ማታ።','A two-week starter. Materials included.','የሁለት ሳምንት ጅምር።','/media/marcus-face.jpg','/media/marcus-face.jpg',600,null,null,null,'','','','lilac', false, false, false, null),
  ('hillside-desk','pros','service','Tax Filing Help','የግብር ድጋፍ','Annual papers for a small shop.','ለትንሽ ሱቅ ዓመታዊ ወረቀት።','Bring last year''s receipts. We file with you.','ያለፈው ዓመት ደረሰኞችን ያምጡ።','/media/marcus-face.jpg','/media/marcus-face.jpg',2000,null,null,null,'','','','mint', false, false, false, null),
  ('entoto-wellness','wellness','service','Home Massage Hour','የቤት መታሸት','One hour, at your home.','አንድ ሰዓት በቤትዎ።','Tell us about injuries when you book.','ሲያዙ ጉዳት ካለ ይንገሩን።','/media/quick.jpg','/media/quick.jpg',900,null,null,null,'','','','sky', false, false, false, null)
) as v(
  slug, category_slug, kind, title, title_am, blurb, blurb_am, description, description_am,
  image, hero_image, price, compare_at, price_premium, price_platinum, badge, perk, support, tint,
  home_hero, spotlight, featured, stock
)
join businesses b on b.slug = v.slug
where not exists (select 1 from services s where s.title = v.title);

insert into staff (service_id, name, title, photo, phone)
select s.id, 'Marcus Mane', 'Service man', '/media/marcus-face.jpg', '+251911200014'
from services s
where s.title = 'Home Deep Cleaning'
and not exists (select 1 from staff st where st.service_id = s.id);

insert into reviews (service_id, author, stars, body)
select s.id, v.author, v.stars, v.body
from (values
  ('Quick Home Cleaning Service','Hanna B.',5,'They were on time in Bole and the kitchen actually shines.'),
  ('Quick Home Cleaning Service','Dawit T.',4,'Fast and polite. I booked them again for my mother.'),
  ('Home Cleaning','Meron A.',5,'Fair price and they brought their own supplies.'),
  ('Bathroom Cleaning','Sara M.',5,'The glass and tile look new.'),
  ('Home Deep Cleaning','Yonas H.',5,'Every corner. Worth the classic price.'),
  ('Home Deep Cleaning','Lidya K.',4,'Marcus was careful with the wood floor.'),
  ('Sofa Carpet Clean','Abel G.',5,'The sofa smells clean, not like chemicals.'),
  ('Kitchen Cleaning','Frehiwot N.',5,'Hob and sink done properly.'),
  ('Fasting Platter for 4','Hanna B.',5,'Hot injera, arrived when they said.'),
  ('Cotton Habesha Set','Meron A.',4,'Beautiful weave. Hem took two days.')
) as v(title, author, stars, body)
join services s on s.title = v.title
where not exists (
  select 1 from reviews r where r.service_id = s.id and r.author = v.author and r.user_id is null
);

update services s set
  review_count = (select count(*)::int from reviews r where r.service_id = s.id),
  rating_tenths = coalesce((select round(avg(stars) * 10)::int from reviews r where r.service_id = s.id), 0);

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Hanna Bekele', b.id, 'done', 'telebirr', 'recorded', 'Bole, around Edna Mall', 'Addis Ababa', 2499, 200, true, now() - interval '1 day'
from businesses b where b.slug = 'selam-home-care'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Hanna Bekele');

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Dawit Tesfaye', b.id, 'done', 'cash', 'recorded', 'CMC, apartment 12', 'Addis Ababa', 1800, 144, true, now() - interval '2 days'
from businesses b where b.slug = 'blue-nile-tech'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Dawit Tesfaye');

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Meron Alemu', b.id, 'accepted', 'cbe', 'unpaid', 'Piassa, near the cathedral', 'Addis Ababa', 680, 54, true, now() - interval '3 days'
from businesses b where b.slug = 'abyssinia-bites'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Meron Alemu');

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Yonas Hailu', b.id, 'placed', 'telebirr', 'unpaid', 'Sarbet, house 8', 'Addis Ababa', 4200, 336, true, now() - interval '4 days'
from businesses b where b.slug = 'sheger-stitch'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Yonas Hailu');

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Sara Mekonnen', b.id, 'done', 'cash', 'recorded', 'Kazanchis, office 3', 'Addis Ababa', 850, 68, true, now() - interval '5 days'
from businesses b where b.slug = 'rift-plumbing'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Sara Mekonnen');

insert into orders (customer_name, business_id, status, payment_method, payment_status, address, city, subtotal, commission_etb, sample, created_at)
select 'Lidya Kebede', b.id, 'preparing', 'telebirr', 'recorded', 'Jemo 1', 'Addis Ababa', 1100, 88, true, now() - interval '6 days'
from businesses b where b.slug = 'selam-home-care'
and not exists (select 1 from orders o where o.sample = true and o.customer_name = 'Lidya Kebede');

insert into order_items (order_id, service_id, title, tier, qty, unit_price)
select o.id, s.id, s.title, 'classic', 1, o.subtotal
from orders o
join services s on (
  (o.customer_name = 'Hanna Bekele' and s.title = 'Home Deep Cleaning') or
  (o.customer_name = 'Dawit Tesfaye' and s.title = 'Laptop Setup at Home') or
  (o.customer_name = 'Meron Alemu' and s.title = 'Fasting Platter for 4') or
  (o.customer_name = 'Yonas Hailu' and s.title = 'Cotton Habesha Set') or
  (o.customer_name = 'Sara Mekonnen' and s.title = 'Pipe & Leak Visit') or
  (o.customer_name = 'Lidya Kebede' and s.title = 'Kitchen Cleaning')
)
where o.sample = true
and not exists (select 1 from order_items i where i.order_id = o.id);

insert into reports (business_id, body, status)
select b.id, 'The cement bundle price on the page did not match the yard.', 'open'
from businesses b
where b.slug = 'habesha-hardware'
and not exists (select 1 from reports r where r.body like 'The cement bundle%');
