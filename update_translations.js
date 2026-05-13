const fs = require('fs');
const path = require('path');

const NEW_KEYS_EN = {
  products_page: {
    title: "Industrial Solutions",
    subtitle: "From premium steel supply to electrical infrastructure and sustainable scrap management."
  },
  product_card: {
    add_to_enquiry: "Add to Enquiry",
    added_to_enquiry: "Added to Enquiry",
    whatsapp: "WhatsApp",
    view_details: "View Details →"
  },
  product_tabs: {
    steel_products: "Steel Products",
    wires_cables: "Wires & Cables",
    sell_scrap: "Sell Scrap",
    no_steel: "No steel products found",
    adjust_filters: "Try adjusting your filters.",
    load_more_steel: "Load More Steel Products",
    remaining: "remaining",
    no_wires: "No wires & cables found matching your selection.",
    load_more_wires: "Load More Wires"
  },
  scrap_form: {
    title: "Sell Your Scrap",
    subtitle: "Fill out the form below and we'll provide you with the best market rates for your scrap materials.",
    name: "Company / Individual Name",
    category: "Scrap Category",
    select_category: "Select Category",
    quantity: "Estimated Quantity (KG)",
    phone: "Phone Number",
    email: "Email Address (Optional)",
    pickup_location: "Pickup Location",
    state: "State",
    city: "City",
    pincode: "Pincode",
    submit: "Submit Scrap Sale Request",
    processing: "Processing...",
    success: "Request Submitted!",
    success_desc: "Thank you for reaching out. Our team will contact you shortly to discuss your scrap sale.",
    submit_another: "Submit Another Request"
  },
  product_detail: {
    home: "Home",
    products: "Products",
    description: "Description",
    category: "Category",
    sub_category: "Sub-Category",
    type: "Type",
    dimension: "Dimension",
    enquire_whatsapp: "Enquire on WhatsApp",
    related_products: "Related Products",
    product_not_found: "Product Not Found"
  }
};

const DUMMY_TRANSLATIONS = {
  ja: {
    products_page: { title: "産業用ソリューション", subtitle: "高品質な鉄鋼供給から電気インフラ、持続可能なスクラップ管理まで。" },
    product_card: { add_to_enquiry: "問い合わせに追加", added_to_enquiry: "追加済み", whatsapp: "WhatsApp", view_details: "詳細を見る →" },
    product_tabs: { steel_products: "鉄鋼製品", wires_cables: "電線・ケーブル", sell_scrap: "スクラップを売る", no_steel: "鉄鋼製品が見つかりません", adjust_filters: "フィルターを調整してください。", load_more_steel: "さらに鉄鋼製品を読み込む", remaining: "残り", no_wires: "条件に一致する電線・ケーブルが見つかりません。", load_more_wires: "さらに電線を読み込む" },
    scrap_form: { title: "スクラップを売る", subtitle: "以下のフォームにご記入ください。スクラップ材の最適な市場価格をご提案します。", name: "会社名 / 個人名", category: "スクラップのカテゴリ", select_category: "カテゴリを選択", quantity: "推定数量 (KG)", phone: "電話番号", email: "メールアドレス（任意）", pickup_location: "集荷場所", state: "州 / 都道府県", city: "市区町村", pincode: "郵便番号", submit: "スクラップ売却リクエストを送信", processing: "処理中...", success: "リクエスト送信完了！", success_desc: "ご連絡ありがとうございます。スクラップ売却についてご相談するため、担当チームからすぐにご連絡いたします。", submit_another: "別のリクエストを送信する" },
    product_detail: { home: "ホーム", products: "製品", description: "説明", category: "カテゴリ", sub_category: "サブカテゴリ", type: "タイプ", dimension: "寸法", enquire_whatsapp: "WhatsAppで問い合わせる", related_products: "関連製品", product_not_found: "製品が見つかりません" }
  },
  es: {
    products_page: { title: "Soluciones Industriales", subtitle: "Desde suministro de acero premium hasta infraestructura eléctrica y gestión sostenible de chatarra." },
    product_card: { add_to_enquiry: "Añadir a Consulta", added_to_enquiry: "Añadido", whatsapp: "WhatsApp", view_details: "Ver Detalles →" },
    product_tabs: { steel_products: "Productos de Acero", wires_cables: "Cables y Alambres", sell_scrap: "Vender Chatarra", no_steel: "No se encontraron productos", adjust_filters: "Intenta ajustar tus filtros.", load_more_steel: "Cargar más productos", remaining: "restantes", no_wires: "No se encontraron cables.", load_more_wires: "Cargar más cables" },
    scrap_form: { title: "Vende tu Chatarra", subtitle: "Completa el formulario y te daremos las mejores tarifas del mercado.", name: "Empresa / Nombre", category: "Categoría de Chatarra", select_category: "Seleccionar Categoría", quantity: "Cantidad Estimada (KG)", phone: "Teléfono", email: "Email (Opcional)", pickup_location: "Lugar de Recogida", state: "Estado", city: "Ciudad", pincode: "Código Postal", submit: "Enviar Solicitud", processing: "Procesando...", success: "¡Solicitud Enviada!", success_desc: "Gracias por contactarnos. Nuestro equipo te llamará pronto.", submit_another: "Enviar Otra Solicitud" },
    product_detail: { home: "Inicio", products: "Productos", description: "Descripción", category: "Categoría", sub_category: "Subcategoría", type: "Tipo", dimension: "Dimensión", enquire_whatsapp: "Consultar por WhatsApp", related_products: "Productos Relacionados", product_not_found: "Producto no encontrado" }
  },
  ar: {
    products_page: { title: "حلول صناعية", subtitle: "من توريد الفولاذ الممتاز إلى البنية التحتية الكهربائية وإدارة الخردة المستدامة." },
    product_card: { add_to_enquiry: "أضف للاستفسار", added_to_enquiry: "تمت الإضافة", whatsapp: "واتساب", view_details: "عرض التفاصيل ←" },
    product_tabs: { steel_products: "منتجات الصلب", wires_cables: "أسلاك وكابلات", sell_scrap: "بيع الخردة", no_steel: "لم يتم العثور على منتجات", adjust_filters: "حاول تعديل الفلاتر.", load_more_steel: "تحميل المزيد", remaining: "متبقي", no_wires: "لم يتم العثور على كابلات.", load_more_wires: "تحميل المزيد" },
    scrap_form: { title: "بع الخردة الخاصة بك", subtitle: "املأ النموذج وسنقدم لك أفضل أسعار السوق.", name: "الشركة / الاسم", category: "فئة الخردة", select_category: "اختر الفئة", quantity: "الكمية المقدرة (كجم)", phone: "رقم الهاتف", email: "البريد (اختياري)", pickup_location: "موقع الاستلام", state: "الولاية/المقاطعة", city: "المدينة", pincode: "الرمز البريدي", submit: "إرسال طلب البيع", processing: "جاري المعالجة...", success: "تم إرسال الطلب!", success_desc: "شكراً لتواصلك. سيتصل بك فريقنا قريباً.", submit_another: "إرسال طلب آخر" },
    product_detail: { home: "الرئيسية", products: "المنتجات", description: "الوصف", category: "الفئة", sub_category: "الفئة الفرعية", type: "النوع", dimension: "البعد", enquire_whatsapp: "استفسر عبر واتساب", related_products: "منتجات ذات صلة", product_not_found: "المنتج غير موجود" }
  },
  fr: {
    products_page: { title: "Solutions Industrielles", subtitle: "De l'approvisionnement en acier haut de gamme à l'infrastructure électrique et à la gestion durable de la ferraille." },
    product_card: { add_to_enquiry: "Ajouter à la demande", added_to_enquiry: "Ajouté", whatsapp: "WhatsApp", view_details: "Voir les détails →" },
    product_tabs: { steel_products: "Produits en Acier", wires_cables: "Fils et Câbles", sell_scrap: "Vendre de la Ferraille", no_steel: "Aucun produit trouvé", adjust_filters: "Essayez d'ajuster vos filtres.", load_more_steel: "Charger plus de produits", remaining: "restants", no_wires: "Aucun câble trouvé.", load_more_wires: "Charger plus de câbles" },
    scrap_form: { title: "Vendez votre Ferraille", subtitle: "Remplissez le formulaire et nous vous donnerons les meilleurs prix du marché.", name: "Entreprise / Nom", category: "Catégorie de Ferraille", select_category: "Sélectionner la Catégorie", quantity: "Quantité Estimée (KG)", phone: "Téléphone", email: "Email (Optionnel)", pickup_location: "Lieu de Ramassage", state: "État / Région", city: "Ville", pincode: "Code Postal", submit: "Envoyer la Demande", processing: "Traitement...", success: "Demande Envoyée !", success_desc: "Merci de nous avoir contactés. Notre équipe vous appellera bientôt.", submit_another: "Envoyer une autre demande" },
    product_detail: { home: "Accueil", products: "Produits", description: "Description", category: "Catégorie", sub_category: "Sous-catégorie", type: "Type", dimension: "Dimension", enquire_whatsapp: "Se renseigner sur WhatsApp", related_products: "Produits Connexes", product_not_found: "Produit Introuvable" }
  },
  de: {
    products_page: { title: "Industrielösungen", subtitle: "Von erstklassiger Stahlversorgung bis hin zu elektrischer Infrastruktur und nachhaltigem Schrottmanagement." },
    product_card: { add_to_enquiry: "Zur Anfrage hinzufügen", added_to_enquiry: "Hinzugefügt", whatsapp: "WhatsApp", view_details: "Details ansehen →" },
    product_tabs: { steel_products: "Stahlprodukte", wires_cables: "Drähte & Kabel", sell_scrap: "Schrott verkaufen", no_steel: "Keine Produkte gefunden", adjust_filters: "Versuchen Sie, Ihre Filter anzupassen.", load_more_steel: "Mehr Produkte laden", remaining: "verbleibend", no_wires: "Keine Kabel gefunden.", load_more_wires: "Mehr Kabel laden" },
    scrap_form: { title: "Verkaufen Sie Ihren Schrott", subtitle: "Füllen Sie das Formular aus und wir bieten Ihnen die besten Marktpreise.", name: "Unternehmen / Name", category: "Schrottkategorie", select_category: "Kategorie auswählen", quantity: "Geschätzte Menge (KG)", phone: "Telefon", email: "E-Mail (Optional)", pickup_location: "Abholort", state: "Bundesland", city: "Stadt", pincode: "Postleitzahl", submit: "Anfrage Senden", processing: "Verarbeitung...", success: "Anfrage Gesendet!", success_desc: "Danke für Ihre Kontaktaufnahme. Unser Team wird sich bald melden.", submit_another: "Weitere Anfrage senden" },
    product_detail: { home: "Startseite", products: "Produkte", description: "Beschreibung", category: "Kategorie", sub_category: "Unterkategorie", type: "Typ", dimension: "Abmessung", enquire_whatsapp: "Über WhatsApp anfragen", related_products: "Ähnliche Produkte", product_not_found: "Produkt nicht gefunden" }
  },
  hi: {
    products_page: { title: "औद्योगिक समाधान", subtitle: "प्रीमियम स्टील आपूर्ति से लेकर विद्युत बुनियादी ढांचे और टिकाऊ स्क्रैप प्रबंधन तक।" },
    product_card: { add_to_enquiry: "पूछताछ में जोड़ें", added_to_enquiry: "जोड़ दिया गया", whatsapp: "व्हाट्सएप", view_details: "विवरण देखें →" },
    product_tabs: { steel_products: "स्टील उत्पाद", wires_cables: "तार और केबल", sell_scrap: "स्क्रैप बेचें", no_steel: "कोई उत्पाद नहीं मिला", adjust_filters: "अपने फ़िल्टर समायोजित करने का प्रयास करें।", load_more_steel: "और उत्पाद लोड करें", remaining: "शेष", no_wires: "कोई केबल नहीं मिला।", load_more_wires: "और केबल लोड करें" },
    scrap_form: { title: "अपना स्क्रैप बेचें", subtitle: "फॉर्म भरें और हम आपको बाजार के सर्वोत्तम रेट देंगे।", name: "कंपनी / नाम", category: "स्क्रैप श्रेणी", select_category: "श्रेणी चुनें", quantity: "अनुमानित मात्रा (KG)", phone: "फोन नंबर", email: "ईमेल (वैकल्पिक)", pickup_location: "पिकअप स्थान", state: "राज्य", city: "शहर", pincode: "पिनकोड", submit: "अनुरोध सबमिट करें", processing: "प्रोसेसिंग...", success: "अनुरोध सबमिट किया गया!", success_desc: "संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही कॉल करेगी।", submit_another: "दूसरा अनुरोध सबमिट करें" },
    product_detail: { home: "होम", products: "उत्पाद", description: "विवरण", category: "श्रेणी", sub_category: "उप-श्रेणी", type: "प्रकार", dimension: "आयाम", enquire_whatsapp: "व्हाट्सएप पर पूछताछ करें", related_products: "संबंधित उत्पाद", product_not_found: "उत्पाद नहीं मिला" }
  },
  zh: {
    products_page: { title: "工业解决方案", subtitle: "从优质钢铁供应到电力基础设施和可持续废料管理。" },
    product_card: { add_to_enquiry: "加入询价", added_to_enquiry: "已加入", whatsapp: "WhatsApp", view_details: "查看详情 →" },
    product_tabs: { steel_products: "钢铁产品", wires_cables: "电线电缆", sell_scrap: "出售废料", no_steel: "未找到产品", adjust_filters: "请尝试调整您的过滤器。", load_more_steel: "加载更多产品", remaining: "剩余", no_wires: "未找到电缆。", load_more_wires: "加载更多电缆" },
    scrap_form: { title: "出售您的废料", subtitle: "填写表格，我们将为您提供最佳市场价格。", name: "公司 / 姓名", category: "废料类别", select_category: "选择类别", quantity: "估计数量 (KG)", phone: "电话号码", email: "电子邮件 (可选)", pickup_location: "提货地点", state: "省 / 州", city: "城市", pincode: "邮政编码", submit: "提交请求", processing: "处理中...", success: "请求已提交！", success_desc: "感谢您联系我们。我们的团队将很快与您联系。", submit_another: "提交另一个请求" },
    product_detail: { home: "首页", products: "产品", description: "描述", category: "类别", sub_category: "子类别", type: "类型", dimension: "尺寸", enquire_whatsapp: "在WhatsApp上询价", related_products: "相关产品", product_not_found: "未找到产品" }
  }
};

const msgDir = path.join(__dirname, 'messages');
const files = fs.readdirSync(msgDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const lang = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(path.join(msgDir, file), 'utf8'));
  
  if (lang === 'en') {
    Object.assign(data, NEW_KEYS_EN);
  } else {
    Object.assign(data, DUMMY_TRANSLATIONS[lang] || NEW_KEYS_EN);
  }
  
  fs.writeFileSync(path.join(msgDir, file), JSON.stringify(data, null, 2));
}
console.log('Translations updated successfully!');
