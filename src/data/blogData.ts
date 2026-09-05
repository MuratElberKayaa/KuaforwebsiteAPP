import { BlogPost } from '../types';

export const blogPostsData: BlogPost[] = [
  {
    id: 'post-1',
    slug: '2026-balayage-trendleri',
    title: '2026 Balayage Trendleri: Sıcak Şampanya ve Kum Sarısı Işıltılar',
    subtitle: 'Doğallığın ve sofistike zarafetin yeniden tanımlandığı yeni sezon renk mimarisi.',
    category: 'sac-trendleri',
    categoryLabel: 'Saç Trendleri',
    readTimeMinutes: 5,
    publishedDate: '1 Eylül 2026',
    authorName: 'Selin Varol',
    authorRole: 'Master Colorist & Balayage Director',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'selin-varol',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    summary: 'Sert kontrastların yerini yumuşak geçişlere, donuk tonların ise ışıkla dans eden sıcak şampanya yansımalarına bıraktığı 2026 balayage vizyonunu inceliyoruz.',
    pullQuote: {
      text: "L'ÉLIXIR Atelier'de renk tasarımına başlamadan önce danışanımızın cilt alt tonunu ve göz rengini trikoloji ışığı altında analiz ediyoruz. Şampanya tonu her kadında farklı bir pigment formülasyonuyla hayat bulur.",
      author: 'Selin Varol, Master Colorist',
    },
    keyTakeaways: [
      'Doğal saç kökü gölgelemesi sayesinde 6 ay dip boyası gerektirmez.',
      'Biyoteknolojik peptid bağ koruyucular ile saç teli elastikiyetini korur.',
      'Sıcak şampanya tonları ten rengine anında ışıltı ve canlılık kazandırır.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  2026 yılı saç modasında artık yapay, aşırı işlenmiş ve keskin hatlı sarıların dönemi tamamen geride kaldı. Paris ve Milano podyumlarından ilham alan <strong>"Quiet Luxury"</strong> estetiği, saç renginde de kendini gösteriyor: Doğal saç zeminini koruyan, güneşte kendiliğinden açılmış gibi duran ve saçın her hareketinde ışığı farklı bir tonda yansıtan <strong>Artisanal Şampanya Balayage</strong>.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Bebek Sarısı ve Krem Tonlarının Kusursuz Dengesi</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Geleneksel folyo açma tekniklerinin aksine, serbest el (free-hand clay painting) yöntemiyle uygulanan bu teknikte, saç dipleri tamamen doğal bırakılır. Böylece 4-6 ay boyunca dip boyası gerektirmeyen, uzadıkça daha da estetik bir görünüme kavuşan bir renk derinliği elde edilir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Saç Sağlığını Koruyan Molecular Bond Koruması</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Açma işlemi sırasında saçın disülfit bağlarını güçlendiren biyoteknolojik peptid kompleksleri (K18 ve Olaplex protokolleri) standart olarak uygulanmalıdır. Bu sayede saç teli parlaklığını ve elastikiyetini korur, matlaşma veya kırılma yaşanmaz.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Evde Bakım & Renk Kalıcılığı İpuçları</h2>
<ul class="list-disc list-inside space-y-2 text-foreground/80 mb-6">
  <li><strong>Sülfatsız Şampuan:</strong> Saç renginin pigmentlerini soymayan pH dengeli profesyonel şampuanlar tercih edilmelidir.</li>
  <li><strong>Haftalık Mor Maske:</strong> Turunculaşmayı önlemek için haftada 1 kez soğuk cila maskesi uygulanmalıdır.</li>
  <li><strong>Isı Koruyucu Serum:</strong> Fön ve maşa öncesinde 230°C'ye kadar koruma sağlayan keratin içerikli termal spreyler kullanılmalıdır.</li>
</ul>
    `,
    relatedServiceSlug: 'artisanal-balayage',
    relatedServiceId: 'srv-balayage',
    relatedPortfolioIds: ['port-1', 'port-4'],
    tags: ['Balayage', 'Saç Trendleri', '2026 Saç Modası', 'Şampanya Sarısı'],
  },
  {
    id: 'post-2',
    slug: 'boyali-saclar-bakim-rehberi',
    title: 'Saç Açma ve Boya Sonrası Evde Profesyonel Bakım Rehberi',
    subtitle: 'Salondan yeni çıkmış parlaklığı ve ipeksi yumuşaklığı aylarca korumanın bilimsel yolları.',
    category: 'sac-bakimi',
    categoryLabel: 'Saç Bakımı',
    readTimeMinutes: 4,
    publishedDate: '24 Ağustos 2026',
    authorName: 'Derin Kaya',
    authorRole: 'Trikoloji & Saç Bakım Direktörü',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'derin-kaya',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    summary: 'İşlem görmüş saçların nem dengesini geri kazandıran, keratin kaybını önleyen ve rengin matlaşmasını engelleyen uzman tavsiyeleri.',
    pullQuote: {
      text: "Salonda uygulanan lüks bir balayage işleminin kalıcılığı %70 oranında evdeki doğru bakım ritüellerine bağlıdır.",
      author: 'Derin Kaya, Trikoloji Direktörü',
    },
    keyTakeaways: [
      'Ilık su ile yıkama kütikül pullarının kapanmasını ve parlaklığı sağlar.',
      'Haftalık derin nem maskeleri saç elastikiyetini %85 geri kazandırır.',
      'Yüksek ısılı aletler öncesinde mutlaka termal koruyucu kullanılmalıdır.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Salonda uygulanan lüks bir balayage veya renk işlemi sonrası elde edilen o ipeksi dokuyu korumak, %70 oranında evdeki bakım disiplinine bağlıdır. Kimyasal açma işlemleri saçın kütikül tabakasını açtığı için doğru nemlendirme ve protein yüklemesi yapılmadığında saç kuruyabilir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Ilık Su ile Yıkama Kuralı</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Çok sıcak su, saç kütiküllerini genişleterek hem boya pigmentlerinin hızla akmasına hem de saçın doğal lipid tabakasının kaybolmasına neden olur. Saçınızı daima ılık suyla yıkamalı ve son durulamayı soğuk suyla yaparak kütikülleri mühürlemelisiniz.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Moleküler Keratin ve Amino Asit Maskeleri</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Geleneksel saç kremleri saçın sadece dış yüzeyini kayganlaştırırken, hidrolize ipek proteini ve seramid içeren derin bakım maskeleri saç telinin korteksine nüfuz eder. Haftada 2 kez uygulanan yoğun maskeler saç elastikiyetini korur.
</p>
    `,
    relatedServiceSlug: 'tokyo-care',
    relatedServiceId: 'srv-tokyo-care',
    relatedPortfolioIds: ['port-5'],
    tags: ['Saç Bakımı', 'Tokyo Inkarami', 'Evde Bakım', 'Keratin'],
  },
  {
    id: 'post-3',
    slug: 'french-sombre-ve-face-framing',
    title: 'French Sombre & Face Framing: Yüz Hatlarını Aydınlatan Renk Mimarisi',
    subtitle: 'Kontür makyajının saç sanatındaki karşılığı: Ten rengini ısıtan sıcak karamel ve bal ışıltıları.',
    category: 'sac-renkleri',
    categoryLabel: 'Saç Renkleri',
    readTimeMinutes: 5,
    publishedDate: '18 Ağustos 2026',
    authorName: 'Selin Varol',
    authorRole: 'Master Colorist & Balayage Director',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'selin-varol',
    coverImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85',
    summary: 'Yüzü çevreleyen ön tutamlara uygulanan mikro ışıltılar (Money Piece) ile saç boylarına yedirilen yumuşak sombre geçişlerinin incelikleri.',
    pullQuote: {
      text: "Face-framing tekniği, elmacık kemiklerini ve çene kontürünü doğal bir ışık hüzmesiyle aydınlatarak yüz ifadesine anında gençlik ve canlılık katar.",
      author: 'Selin Varol, Master Colorist',
    },
    keyTakeaways: [
      'Yüzü çerçeveleyen açık tonlar elmacık kemiklerini belirginleştirir.',
      'Doğal taban rengiyle eriyen mikro geçişler dip kontrastını minimize eder.',
      'Sıcak karamel ve bal tonları buğday ve esmer tenlerde kusursuz durur.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Kontür makyajının elmacık kemiklerini belirginleştiren sihirli etkisini saçınıza taşımak mümkün. <strong>French Sombre ve Face Framing (Money Piece)</strong>, yüzü çevreleyen ön saç tutamlarını 1-2 ton daha açık işleyerek yüze doğrudan ışık odaklar.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Mikro Kontürleme ile Doğal Aydınlık</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Yüzün iki yanından dökülen ince saç tutamlarına uygulanan mikro gölgelendirmeler, gözleri ve kemik yapısını ön plana çıkarır. Saçın arka ve alt katmanlarında ise daha yumuşak sombre geçişleri tercih edilir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Hangi Ten Rengine Hangi Ton Yakışır?</h2>
<ul class="list-disc list-inside space-y-2 text-foreground/80 mb-6">
  <li><strong>Açık ve Pembe Alt Ton:</strong> Bej, kum sarısı ve inci yansımalar.</li>
  <li><strong>Buğday ve Nötr Alt Ton:</strong> Sıcak bal, şampanya ve altın karamel.</li>
  <li><strong>Esmer ve Sıcak Alt Ton:</strong> Fındık kabuğu, bakır ışıltı ve bronz kakao tonları.</li>
</ul>
    `,
    relatedServiceSlug: 'luxury-ombre',
    relatedServiceId: 'srv-ombre',
    relatedPortfolioIds: ['port-4', 'port-1'],
    tags: ['Saç Renkleri', 'Sombre', 'Face Framing', 'Money Piece'],
  },
  {
    id: 'post-4',
    slug: 'gelin-saci-provasi-rehberi',
    title: 'Gelin Saçı Provasında Dikkat Edilmesi Gereken 5 Altın Kural',
    subtitle: 'Düğün gününüzde sıfır sürpriz ve kusursuz bir zarafet için prova rehberi.',
    category: 'gelin',
    categoryLabel: 'Gelin',
    readTimeMinutes: 5,
    publishedDate: '10 Ağustos 2026',
    authorName: 'Melisa Kaya',
    authorRole: 'Bridal & Editorial Styling Director',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'melisa-kaya',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    summary: 'Duvak yerleşimi, gelinlik yaka formu, prova zamanlaması ve saç aksesuarlarının uyumu üzerine kapsamlı bir hazırlık rehberi.',
    pullQuote: {
      text: "Gelin saçı tasarımı bir elbisenin en asil tamamlayıcısıdır; duvağın iniş açısı ile gelinliğin sırt dekoltesi arasında kusursuz bir geometri kurulmalıdır.",
      author: 'Melisa Kaya, Bridal Styling Direktörü',
    },
    keyTakeaways: [
      'Prova randevusu düğünden 3-4 hafta öncesinde planlanmalıdır.',
      'Duvak, taç ve küpeler provaya mutlaka getirilmelidir.',
      'Saç tasarımı gelinliğin yaka ve sırt dekoltesine göre heykelsi şekilde kurgulanır.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Düğün günü saçınız, sadece bir gün değil, ömür boyu saklayacağınız fotoğraflarda sonsuza kadar yaşayacak bir sanat eseridir. Bu nedenle gelin saçı provası, düğün hazırlıklarının en kritik aşamalarından biridir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Prova Zamanlaması: 3-4 Hafta Öncesi İdealdir</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Saç provanızı düğünden çok erken yapmayın; saç boyunuz ve renginiz değişebilir. Düğünden 3-4 hafta öncesi, renk tazeleme ve kesim formunun tam oturduğu en ideal zaman dilimidir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Duvak ve Saç Aksesuarlarınızı Yanınızda Getirin</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Duvağın takılacağı tepe veya ense noktası, saç modelinizin silüetini doğrudan belirler. Tacınızı, incili tokalarınızı veya canlı çiçeklerinizi mutlaka provaya getirmelisiniz.
</p>
    `,
    relatedServiceSlug: 'bridal-couture',
    relatedServiceId: 'srv-bridal',
    relatedPortfolioIds: ['port-3'],
    tags: ['Gelin Saçı', 'Gelin', 'Düğün Hazırlığı', 'Gelin Provası'],
  },
  {
    id: 'post-5',
    slug: 'yuz-tipine-gore-sac-kesimi',
    title: 'Yüz Tipine Göre Katlı Saç Kesimi ve 90\'lar Butterfly Blowout',
    subtitle: 'Yüz hatlarınızı doğal bir kontür gibi çerçeveleyen haute-coiffure kesim teknikleri.',
    category: 'styling',
    categoryLabel: 'Styling',
    readTimeMinutes: 6,
    publishedDate: '5 Ağustos 2026',
    authorName: 'Kerem Akyol',
    authorRole: 'Head Stylist & Creative Director',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'kerem-akyol',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    summary: 'Oval, yuvarlak, kare ve kalp yüz tipleri için elmacık kemiklerini ve çene hattını kusursuz gösteren editorial saç kesim ve şekillendirme mimarisi.',
    pullQuote: {
      text: "Mükemmel bir saç kesimi boydan kısaltmak değil; kemik yapınızı ve boyun uzunluğunuzu hesaba katarak yüzünüzde heykelsi bir denge yaratmaktır.",
      author: 'Kerem Akyol, Head Stylist',
    },
    keyTakeaways: [
      'Katlı kesimler saçın hacmini ve hareket kabiliyetini 3 katına çıkarır.',
      'Curtain bangs (perde kakül) elmacık kemiklerini belirginleştirir.',
      'Geniş çaplı seramik fırçalarla yapılan 90lar fönü gün boyu kalıcılık sunar.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Mükemmel bir saç kesimi, sadece boydan kısaltmak değil; kemik yapınızı, boyun uzunluğunuzu ve saçınızın doğal dalga yönünü hesaba katarak yüzünüzde adeta heykelsi bir denge yaratmaktır.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Oval Yüzler: Katman Özgürlüğü</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  En dengeli yüz formu olan oval yüzlerde hemen hemen her uzunluk ve kat uyum sağlar. 2026'da öne çıkan trend, köprücük kemiğinde biten akıcı katlar ve göz hizasından başlayan hafif perçemlerdir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Yuvarlak Yüzler: Yüzü Uzatan Dikey Hatlar</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Yanak genişliğini dengelemek için çene altından başlayan uzun katlar ve ortadan ikiye ayrılan uzun <strong>Curtain Bangs</strong> tercih edilmelidir. Yüzü optik olarak daha ince ve uzun gösterir.
</p>
    `,
    relatedServiceSlug: 'signature-cut',
    relatedServiceId: 'srv-cut',
    relatedPortfolioIds: ['port-2'],
    tags: ['Styling', 'Saç Kesimi', 'Curtain Bangs', 'Butterfly Cut'],
  },
  {
    id: 'post-6',
    slug: 'executive-erkek-sac-ve-sakal-mimarisi',
    title: 'Executive Erkek Bakımı: Modern Fade Kesim ve Sakal Mimarisi',
    subtitle: 'İş dünyasından özel davetlere uzanan, karizmatik ve keskin hatlara sahip erkek saç tasarım kodları.',
    category: 'erkek',
    categoryLabel: 'Erkek',
    readTimeMinutes: 4,
    publishedDate: '28 Temmuz 2026',
    authorName: 'Kerem Akyol',
    authorRole: 'Head Stylist & Creative Director',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'kerem-akyol',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',
    summary: 'Degrade geçişli saç kesimleri, sıcak havlu sakal ritüelleri ve saç derisini canlandıran trikolojik erkek bakım protokolleri.',
    pullQuote: {
      text: "Modern erkek kuaförlüğü sadece makas kullanmak değil; yüz simetrisi, saç ayrım yönü ve çene kemiği hattını heykeltıraş hassasiyetiyle işlemektir.",
      author: 'Kerem Akyol, Head Stylist',
    },
    keyTakeaways: [
      'Taper fade geçişleri ense ve favori bölgesinde kusursuz temizlik sunar.',
      'Sıcak havlu sakal ritüeli batık oluşumunu ve tahrişi engeller.',
      'Mat pomad ve deniz tuzu spreyi doğal doku ve gün boyu tutuş sağlar.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Modern erkeğin bakım vizyonu, artık standart berber tıraşlarının çok ötesine geçti. Yüz kemik yapısına göre dizayn edilen <strong>Precision Taper Fade</strong> kesimleri ve sıcak buharlı sakal tasarımları, iş dünyasında güçlü bir ilk izlenimin anahtarıdır.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Low Fade ve Mid Fade Arasındaki Fark</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Klasik takım elbise giyen beyefendiler için kulak arkasından yumuşakça başlayan Low Fade geçişleri sofistike bir duruş sağlarken; daha dinamik bir silüet isteyenler için şakak hizasından açılan Mid Fade idealdir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Sakal Hatlarının Çene Kemiğine Göre Çizilmesi</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Sakal alt çizgisinin adem elmasının 2 parmak üzerinden geçmesi ve yanak hatlarının ustura ile netleştirilmesi boyun bölgesini daha atletik gösterir.
</p>
    `,
    relatedServiceSlug: 'mens-grooming',
    relatedServiceId: 'srv-mens',
    relatedPortfolioIds: ['port-6'],
    tags: ['Erkek', 'Erkek Saç Kesimi', 'Sakal Tasarımı', 'Fade'],
  },
  {
    id: 'post-7',
    slug: 'kuafor-randevusuna-hazirlik-rehberi',
    title: 'Lüks Bir Saç Konsültasyonundan En Yüksek Verimi Almanın Yolları',
    subtitle: 'Stilistinizle aynı vizyonda buluşmak ve hayalinizdeki saça kavuşmak için 6 pratik öneri.',
    category: 'salon-rehberi',
    categoryLabel: 'Salon Rehberi',
    readTimeMinutes: 5,
    publishedDate: '20 Temmuz 2026',
    authorName: 'Caner Demir',
    authorRole: 'Salon Müdürü & VIP Concierge',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'caner-demir',
    coverImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
    summary: 'İlham fotoğraflarını nasıl seçmelisiniz, saç geçmişinizi stilistinize aktarırken nelere dikkat etmelisiniz ve seans süresini nasıl planlamalısınız?',
    pullQuote: {
      text: "En başarılı saç dönüşümleri, doğru konsültasyon ile başlar. Ne istediğiniz kadar, günlük yaşamınızda saçınıza ne kadar vakit ayırabileceğiniz de tasarımın temelidir.",
      author: 'Caner Demir, VIP Concierge',
    },
    keyTakeaways: [
      'Sevdiğiniz 3 ve kesinlikle istemediğiniz 2 fotoğrafı yanınızda getirin.',
      'Son 2 yılda yaptırdığınız tüm kına, organik boya veya açma işlemlerini stilistinize dürüstçe aktarın.',
      'Büyük renk değişimlerinde seans için 3-4 saatlik konforlu bir zaman ayırın.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  L'ÉLIXIR Atelier kapısından içeri adım attığınızda başlayan konsültasyon ritüeli, seansın en önemli 15 dakikasıdır. Stilistinizle kuracağınız şeffaf iletişim, beklentinizin tam olarak gerçeğe dönüşmesini sağlar.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Hem Beğendiğiniz Hem Beğenmediğiniz Örnekleri Gösterin</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Bazen "kesinlikle istemediğiniz" bir sarı tonunu veya kat boyunu belirtmek, stilistinizin rotasını belirlemede beğendiğiniz fotoğraflardan daha aydınlatıcı olabilir.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Saç Geçmişinizi Şeffaflıkla Paylaşın</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Evde yapılan geçici boyalar, kına uygulamaları veya dip koyulaştırmaları saç korteksinde gizli pigmentler bırakır. Açıcı formülasyonunun doğru ayarlanması için geçmiş işlemleri eksiksiz aktarmak saç sağlığınızı korur.
</p>
    `,
    relatedServiceSlug: 'artisanal-balayage',
    relatedServiceId: 'srv-balayage',
    relatedPortfolioIds: ['port-1', 'port-5'],
    tags: ['Salon Rehberi', 'Konsültasyon', 'Randevu', 'Saç Bakımı'],
  },
  {
    id: 'post-8',
    slug: 'havyar-terapisi-ile-sac-botoxu',
    title: 'Havyar Terapisi ve Moleküler Bağ Onarımı: Yıpranmış Saçlara Yeniden Can',
    subtitle: 'Yüksek ısıyla yıpranmış ve nemsiz kalmış saç tellerini moleküler düzeyde onaran salon spa protokolü.',
    category: 'sac-bakimi',
    categoryLabel: 'Saç Bakımı',
    readTimeMinutes: 4,
    publishedDate: '12 Temmuz 2026',
    authorName: 'Derin Kaya',
    authorRole: 'Trikoloji & Saç Bakım Direktörü',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    authorSlug: 'derin-kaya',
    coverImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
    summary: 'Fransız havyar özü, hyalüronik asit ve bitkisel keratin ile saç tellerine cam parlaklığı (Glass Hair) kazandıran derin ritüel.',
    pullQuote: {
      text: "Havyar özü, saçın ihtiyaç duyduğu esansiyel omega yağ asitleri ve fosfolipitleri hücresel düzeyde saça mühürler.",
      author: 'Derin Kaya, Trikoloji Direktörü',
    },
    keyTakeaways: [
      'Elektriklenme ve kabarmayı tek seansta sıfırlar.',
      'Ayna parlaklığında pürüzsüz doku ve ipeksi yumuşaklık sunar.',
      'Etkisi doğru ev devam ürünleriyle 2-3 ay boyunca devam eder.',
    ],
    contentHtml: `
<p class="lead text-lg text-foreground/90 font-serif leading-relaxed mb-6">
  Şehir hayatının kirliliği, klorlu su ve sık fön uygulamaları saç tellerinin dış kalkanını zayıflatır. L'ÉLIXIR Atelier Hair Spa bünyesinde sunulan <strong>Caviar Glass Hair Ritüeli</strong>, saç telinin içi boşalan korteksini hyalüronik asit ve havyar özüyle doldurur.
</p>

<h2 class="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Ultrasonik Soğuk Buhar Terapisi</h2>
<p class="mb-4 text-foreground/80 leading-relaxed">
  Uygulanan havyar ampulleri, mikro buhar jeneratörleri sayesinde saça ısı uygulamadan derinlemesine nüfuz eder. Bu sayede saç yapısı zedelenmeden protein zincirleri birbirine bağlanır.
</p>
    `,
    relatedServiceSlug: 'tokyo-care',
    relatedServiceId: 'srv-tokyo-care',
    relatedPortfolioIds: ['port-5'],
    tags: ['Saç Bakımı', 'Saç Botoxu', 'Havyar Bakımı', 'Glass Hair'],
  },
];


