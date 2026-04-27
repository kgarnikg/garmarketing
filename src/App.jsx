import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion'
import './App.css'

// ─── Your email for Formspree ─────────────────────────────
// Go to formspree.io → New Form → copy the ID and replace below
const FORMSPREE_ID = 'xgorjoag'
const WA_NUMBER = '34648291565'

// ─── Auto-detect language ─────────────────────────────────
function detectLang() {
  const supported = ['es','en','ru','zh','ar','hy','de','pl','nl','it']
  const nav = navigator.language || navigator.userLanguage || 'es'
  const code = nav.toLowerCase().split('-')[0]
  const map = { 'zh':'zh','ar':'ar','hy':'hy','de':'de','pl':'pl','nl':'nl','it':'it','ru':'ru','en':'en','es':'es' }
  return map[code] || (supported.includes(code) ? code : 'es')
}

// ─── Translations ─────────────────────────────────────────
const T = {
  es: {
    nav:['Servicios','Resultados','Sobre mí','Contacto'], navCta:'Obtener clientes',
    heroBadge:'España · Multilingüe · Resultados en 30 días', hero1:'Clientes,', hero2:'no clics',
    heroSub:'Marketing digital multilingüe en España. Webs, Google Ads, Redes Sociales, YouTube, Video.',
    heroGuarantee:'✓ Sin resultados en 30 días — trabajamos gratis',
    heroCta:'Obtener clientes', heroCtaSub:'Análisis gratuito',
    statsLabels:['Clientes','Publicidad','Negocios','ROI medio'],
    servicesLabel:'Servicios', servicesTitle:['Todo lo que necesita','tu negocio'],
    services:[
      {title:'Webs Multilingües',desc:'Landing pages y webs de alta conversión en hasta 10 idiomas. Diseño premium, SEO técnico, entrega en 7 días.',tags:['10 idiomas','CRO','SEO','7 días']},
      {title:'Google Ads',desc:'Campañas de alto ROI. Segmentación ultra-precisa, optimización semanal. Solo pagas por resultados reales.',tags:['ROI máximo','Segmentación','Informes semanales']},
      {title:'Google Maps',desc:'Posiciona tu negocio en el top de Google Maps. Optimización GMB, estrategia de reseñas, SEO local.',tags:['GMB','SEO local','Reseñas']},
      {title:'Redes Sociales',desc:'Instagram, TikTok, Facebook. Plan de contenido mensual, reels profesionales, gestión completa.',tags:['Instagram','TikTok','Reels','Gestión']},
      {title:'Video Production',desc:'Producción de vídeo profesional para redes y campañas. Desde guión hasta edición final en alta calidad.',tags:['Guión','Rodaje','Edición','Reels']},
      {title:'YouTube Marketing',desc:'Canal de YouTube gestionado end-to-end: estrategia de marca, guiones optimizados para retención, producción profesional, SEO de vídeo y plan de contenido mensual para convertir suscriptores en clientes.',tags:['Estrategia','Guiones','SEO Vídeo','Producción']},
    ],
    resultsLabel:'Resultados', resultsTitle:['Números que','importan'],
    resultsItems:[
      {label:'Clientes conseguidos en España',desc:'Negocios que crecieron con nuestras estrategias'},
      {label:'Gestionados en publicidad',desc:'Presupuesto optimizado para máximo ROI'},
      {label:'Negocios en España',desc:'De norte a sur, en toda España'},
      {label:'ROI medio por cliente',desc:'Retorno real sobre la inversión'},
    ],
    stepsTitle:'Proceso en 3 pasos',
    steps:[{title:'Análisis',desc:'Estudiamos tu negocio, competencia y cliente ideal'},{title:'Lanzamiento',desc:'Web + anuncios + presencia online activa en < 7 días'},{title:'Clientes',desc:'Primeros resultados reales en 30 días garantizados'}],
    aboutLabel:'Sobre mí', aboutBio1:'Especialista en marketing digital con base en Alicante, España. Llevo negocios locales al siguiente nivel con estrategias probadas y ejecución ultra-rápida.',
    aboutBio2:'Lo que me diferencia: hablo 10 idiomas, conozco el mercado español desde dentro, y trabajo directamente contigo — sin agencias, sin intermediarios.',
    timeline:[{years:'2008–2015',role:'Ventas & Negociación',company:'Formación internacional'},{years:'2015–2022',role:'Director de Marketing',company:'Empresa manufacturera internacional · Europa, Rusia, Asia'},{years:'2022–hoy',role:'Fundador',company:'Gar Marketing · España'}],
    skillsTitle:'Expertise',
    advantages:['Primeros resultados en 30 días','10 idiomas — acceso a todos los mercados','Trato directo 1:1, sin intermediarios','Garantía: sin resultados = trabajamos gratis'],
    contactLabel:'Contacto', contactTitle:['¿Listo para conseguir','clientes reales?'],
    contactSub:'Solo 3 plazas disponibles este mes. Análisis gratuito de tu negocio.',
    formName:'Nombre *', formPhone:'Teléfono *', formBusiness:'Tipo de negocio', formMessage:'¿Qué necesitas? (opcional)',
    formSubmit:'Enviar consulta', formWhatsapp:'WhatsApp directo',
    formSuccess:'¡Mensaje enviado! Te contactaré en menos de 5 horas.',
    formGuarantee:'✓ Sin resultados en 30 días → trabajamos gratis',
    footerLinks:['Servicios','Resultados','Sobre mí','Contacto'],
    cookieText:'Usamos cookies para mejorar tu experiencia.',
    cookieAccept:'Aceptar', cookieDecline:'Rechazar',
  },
  en: {
    nav:['Services','Results','About','Contact'], navCta:'Get clients',
    heroBadge:'Spain · Multilingual · Results in 30 days', hero1:'Clients,', hero2:'not clicks',
    heroSub:'Multilingual digital marketing in Spain. Websites, Google Ads, Social Media, YouTube, Video.',
    heroGuarantee:'✓ No results in 30 days — we work for free',
    heroCta:'Get clients', heroCtaSub:'Free analysis',
    statsLabels:['Clients','Ad spend','Businesses','Avg ROI'],
    servicesLabel:'Services', servicesTitle:['Everything your','business needs'],
    services:[
      {title:'Multilingual Websites',desc:'High-conversion landing pages in up to 10 languages. Premium design, technical SEO, delivery in 7 days.',tags:['10 languages','CRO','SEO','7 days']},
      {title:'Google Ads',desc:'High ROI campaigns. Ultra-precise targeting, weekly optimization. You only pay for real results.',tags:['Max ROI','Targeting','Weekly reports']},
      {title:'Google Maps',desc:'Position your business at the top of Google Maps. GMB optimization, review strategy, local SEO.',tags:['GMB','Local SEO','Reviews']},
      {title:'Social Media',desc:'Instagram, TikTok, Facebook. Monthly content plan, professional reels, full management.',tags:['Instagram','TikTok','Reels','Management']},
      {title:'Video Production',desc:'Professional video production for social media and campaigns. From script to final edit.',tags:['Script','Shooting','Editing','Reels']},
      {title:'YouTube Marketing',desc:'End-to-end YouTube channel management: brand strategy, retention-optimized scripts, professional production, video SEO and monthly content plan to turn subscribers into paying clients.',tags:['Strategy','Scripts','Video SEO','Production']},
    ],
    resultsLabel:'Results', resultsTitle:['Numbers that','matter'],
    resultsItems:[
      {label:'Clients acquired in Spain',desc:'Businesses that grew with our strategies'},
      {label:'Managed in advertising',desc:'Budget optimized for maximum ROI'},
      {label:'Businesses in Spain',desc:'Across all of Spain'},
      {label:'Average ROI per client',desc:'Real return on investment'},
    ],
    stepsTitle:'3-step process',
    steps:[{title:'Analysis',desc:'We study your business, competition and ideal client'},{title:'Launch',desc:'Website + ads + online presence active in < 7 days'},{title:'Clients',desc:'First real results in 30 days — guaranteed'}],
    aboutLabel:'About me', aboutBio1:'Digital marketing specialist based in Alicante, Spain. I take local businesses to the next level with proven strategies and ultra-fast execution.',
    aboutBio2:'What sets me apart: I speak 10 languages, know the Spanish market from the inside, and work directly with you — no agencies, no middlemen.',
    timeline:[{years:'2008–2015',role:'Sales & Negotiation',company:'International training'},{years:'2015–2022',role:'Marketing Director',company:'International manufacturing company · Europe, Russia, Asia'},{years:'2022–now',role:'Founder',company:'Gar Marketing · Spain'}],
    skillsTitle:'Expertise',
    advantages:['First results in 30 days','10 languages — access to all markets','Direct 1:1 contact, no middlemen','Guarantee: no results = we work for free'],
    contactLabel:'Contact', contactTitle:['Ready to get','real clients?'],
    contactSub:'Only 3 spots available this month. Free business analysis.',
    formName:'Name *', formPhone:'Phone *', formBusiness:'Business type', formMessage:'What do you need? (optional)',
    formSubmit:'Send inquiry', formWhatsapp:'Direct WhatsApp',
    formSuccess:'Message sent! I will contact you within 5 hours.',
    formGuarantee:'✓ No results in 30 days → we work for free',
    footerLinks:['Services','Results','About','Contact'],
    cookieText:'We use cookies to improve your experience.',
    cookieAccept:'Accept', cookieDecline:'Decline',
  },
  ru: {
    nav:['Услуги','Результаты','Обо мне','Контакт'], navCta:'Получить клиентов',
    heroBadge:'Испания · Многоязычный · Результат за 30 дней', hero1:'Клиенты,', hero2:'не клики',
    heroSub:'Многоязычный digital-маркетинг в Испании. Сайты, Google Ads, соцсети, YouTube, видео.',
    heroGuarantee:'✓ Нет результатов за 30 дней — работаем бесплатно',
    heroCta:'Получить клиентов', heroCtaSub:'Бесплатный анализ',
    statsLabels:['Клиентов','Реклама','Бизнесов','Ср. ROI'],
    servicesLabel:'Услуги', servicesTitle:['Всё что нужно','вашему бизнесу'],
    services:[
      {title:'Многоязычные сайты',desc:'Лендинги и сайты с высокой конверсией до 10 языков. Премиум дизайн, технический SEO, сдача за 7 дней.',tags:['10 языков','CRO','SEO','7 дней']},
      {title:'Google Ads',desc:'Кампании с высоким ROI. Ультра-точный таргетинг, еженедельная оптимизация. Платишь только за реальные результаты.',tags:['Макс ROI','Таргетинг','Еженед. отчёты']},
      {title:'Google Maps',desc:'Вывести бизнес в топ Google Maps. Оптимизация GMB, стратегия отзывов, локальный SEO.',tags:['GMB','Локальный SEO','Отзывы']},
      {title:'Соцсети',desc:'Instagram, TikTok, Facebook. Ежемесячный контент-план, профессиональные рилсы, полное ведение.',tags:['Instagram','TikTok','Reels','Ведение']},
      {title:'Видеопродакшн',desc:'Профессиональное видео для соцсетей и кампаний. От сценария до финального монтажа в высоком качестве.',tags:['Сценарий','Съёмка','Монтаж','Reels']},
      {title:'YouTube Маркетинг',desc:'Полное ведение YouTube-канала под ключ: бренд-стратегия, сценарии с высоким retention, профессиональная съёмка и монтаж, SEO видео и ежемесячный контент-план для конвертации подписчиков в клиентов.',tags:['Стратегия','Сценарии','SEO Видео','Продакшн']},
    ],
    resultsLabel:'Результаты', resultsTitle:['Цифры которые','говорят сами'],
    resultsItems:[
      {label:'Клиентов в Испании',desc:'Бизнесов, которые выросли с нашими стратегиями'},
      {label:'Управляли рекламой',desc:'Бюджет оптимизирован для максимального ROI'},
      {label:'Бизнесов в Испании',desc:'По всей Испании'},
      {label:'Средний ROI на клиента',desc:'Реальный возврат инвестиций'},
    ],
    stepsTitle:'3 шага к результату',
    steps:[{title:'Анализ',desc:'Изучаем ваш бизнес, конкурентов и идеального клиента'},{title:'Запуск',desc:'Сайт + реклама + онлайн-присутствие активно за < 7 дней'},{title:'Клиенты',desc:'Первые реальные результаты за 30 дней — гарантировано'}],
    aboutLabel:'Обо мне', aboutBio1:'Специалист по digital-маркетингу с офисом в Аликанте, Испания. Вывожу локальные бизнесы на следующий уровень с проверенными стратегиями и ультра-быстрой реализацией.',
    aboutBio2:'Моё отличие: говорю на 10 языках, знаю испанский рынок изнутри и работаю напрямую с вами — без агентств, без посредников.',
    timeline:[{years:'2008–2015',role:'Продажи и переговоры',company:'Международное обучение'},{years:'2015–2022',role:'Директор по маркетингу',company:'Международная производственная компания · Европа, Россия, Азия'},{years:'2022–сейчас',role:'Основатель',company:'Gar Marketing · Испания'}],
    skillsTitle:'Экспертиза',
    advantages:['Первые результаты за 30 дней','10 языков — доступ ко всем рынкам','Прямое общение 1:1, без посредников','Гарантия: нет результатов = работаем бесплатно'],
    contactLabel:'Контакт', contactTitle:['Готовы получать','реальных клиентов?'],
    contactSub:'Только 3 места в этом месяце. Бесплатный анализ вашего бизнеса.',
    formName:'Имя *', formPhone:'Телефон *', formBusiness:'Тип бизнеса', formMessage:'Что нужно? (необязательно)',
    formSubmit:'Отправить заявку', formWhatsapp:'WhatsApp напрямую',
    formSuccess:'Заявка отправлена! Свяжусь с вами в течение 5 часов.',
    formGuarantee:'✓ Нет результатов за 30 дней → работаем бесплатно',
    footerLinks:['Услуги','Результаты','Обо мне','Контакт'],
    cookieText:'Мы используем файлы cookie для улучшения работы сайта.',
    cookieAccept:'Принять', cookieDecline:'Отказать',
  },
  zh: {
    nav:['服务','成果','关于我','联系'], navCta:'获取客户',
    heroBadge:'西班牙 · 多语言 · 30天见效', hero1:'获得客户，', hero2:'而非点击',
    heroSub:'西班牙多语言数字营销。网站、谷歌广告、社交媒体、YouTube、视频制作。',
    heroGuarantee:'✓ 30天内无效果 — 免费继续服务',
    heroCta:'获取客户', heroCtaSub:'免费分析',
    statsLabels:['客户数','广告预算','企业数','平均ROI'],
    servicesLabel:'服务', servicesTitle:['您的企业所需','一切服务'],
    services:[
      {title:'多语言网站',desc:'高转化率落地页，支持多达10种语言。高端设计，技术SEO，7天交付。',tags:['10种语言','CRO','SEO','7天']},
      {title:'谷歌广告',desc:'高ROI广告活动。超精准定向，每周优化，只为真实效果付费。',tags:['最大ROI','精准定向','每周报告']},
      {title:'谷歌地图',desc:'让您的企业排名谷歌地图前列。GMB优化，评论策略，本地SEO。',tags:['GMB','本地SEO','评论']},
      {title:'社交媒体',desc:'Instagram、TikTok、Facebook。月度内容计划，专业短视频，全面管理。',tags:['Instagram','TikTok','短视频','管理']},
      {title:'视频制作',desc:'专业视频制作，用于社交媒体和广告活动。从脚本到最终剪辑。',tags:['脚本','拍摄','剪辑','短视频']},
      {title:'YouTube营销',desc:'YouTube频道全程托管：品牌战略、高留存脚本、专业制作、视频SEO和月度内容计划，将订阅者转化为付费客户。',tags:['战略','脚本','视频SEO','制作']},
    ],
    resultsLabel:'成果', resultsTitle:['重要的','数字'],
    resultsItems:[
      {label:'在西班牙获得的客户',desc:'与我们策略共同成长的企业'},
      {label:'广告管理预算',desc:'为最大ROI优化的预算'},
      {label:'西班牙企业',desc:'遍布西班牙各地'},
      {label:'每客户平均ROI',desc:'真实的投资回报'},
    ],
    stepsTitle:'3步流程',
    steps:[{title:'分析',desc:'研究您的业务、竞争对手和理想客户'},{title:'启动',desc:'网站+广告+在线存在，7天内激活'},{title:'客户',desc:'30天内保证首批真实成果'}],
    aboutLabel:'关于我', aboutBio1:'总部位于阿利坎特、西班牙的数字营销专家。我用经过验证的策略和超快执行，将本地企业带到新高度。',
    aboutBio2:'我的优势：会说10种语言，深谙西班牙市场，与您直接合作 — 无代理，无中间商。',
    timeline:[{years:'2008–2015',role:'销售与谈判',company:'国际培训'},{years:'2015–2022',role:'营销总监',company:'国际制造企业 · 欧洲、俄罗斯、亚洲'},{years:'2022–至今',role:'创始人',company:'Gar Marketing · 西班牙'}],
    skillsTitle:'专业技能',
    advantages:['30天内首批成果','10种语言 — 进入所有市场','直接1对1沟通，无中间商','保证：无成果 = 免费继续服务'],
    contactLabel:'联系', contactTitle:['准备好获得','真实客户了吗？'],
    contactSub:'本月仅剩3个名额。免费业务分析。',
    formName:'姓名 *', formPhone:'电话 *', formBusiness:'业务类型', formMessage:'您需要什么？（可选）',
    formSubmit:'发送咨询', formWhatsapp:'直接WhatsApp',
    formSuccess:'消息已发送！我将在5小时内与您联系。',
    formGuarantee:'✓ 30天内无效果 → 免费继续服务',
    footerLinks:['服务','成果','关于我','联系'],
    cookieText:'我们使用Cookie来改善您的体验。',
    cookieAccept:'接受', cookieDecline:'拒绝',
  },
  ar: {
    nav:['الخدمات','النتائج','عني','اتصل'], navCta:'احصل على عملاء',
    heroBadge:'إسبانيا · متعدد اللغات · نتائج في 30 يوماً', hero1:'عملاء،', hero2:'لا نقرات',
    heroSub:'تسويق رقمي متعدد اللغات في إسبانيا. مواقع، إعلانات جوجل، وسائل التواصل، يوتيوب، فيديو.',
    heroGuarantee:'✓ لا نتائج خلال 30 يوماً — نعمل مجاناً',
    heroCta:'احصل على عملاء', heroCtaSub:'تحليل مجاني',
    statsLabels:['عملاء','إعلانات','أعمال','متوسط ROI'],
    servicesLabel:'الخدمات', servicesTitle:['كل ما يحتاجه','عملك'],
    services:[
      {title:'مواقع متعددة اللغات',desc:'صفحات هبوط عالية التحويل بـ10 لغات. تصميم احترافي، SEO تقني، تسليم في 7 أيام.',tags:['10 لغات','CRO','SEO','7 أيام']},
      {title:'إعلانات جوجل',desc:'حملات عالية العائد. استهداف دقيق، تحسين أسبوعي. تدفع فقط مقابل نتائج حقيقية.',tags:['أقصى ROI','استهداف','تقارير أسبوعية']},
      {title:'خرائط جوجل',desc:'ضع عملك في صدارة خرائط جوجل. تحسين GMB، استراتيجية المراجعات، SEO المحلي.',tags:['GMB','SEO محلي','مراجعات']},
      {title:'وسائل التواصل',desc:'إنستغرام، تيك توك، فيسبوك. خطة محتوى شهرية، ريلز احترافية، إدارة كاملة.',tags:['إنستغرام','تيك توك','ريلز','إدارة']},
      {title:'إنتاج الفيديو',desc:'إنتاج فيديو احترافي للشبكات والحملات. من السيناريو إلى المونتاج النهائي.',tags:['سيناريو','تصوير','مونتاج','ريلز']},
      {title:'تسويق يوتيوب',desc:'إدارة قناة يوتيوب من الألف إلى الياء: استراتيجية العلامة، سيناريوهات بمعدل احتفاظ عالٍ، إنتاج احترافي، SEO الفيديو وخطة محتوى شهرية لتحويل المشتركين إلى عملاء.',tags:['استراتيجية','سيناريو','SEO فيديو','إنتاج']},
    ],
    resultsLabel:'النتائج', resultsTitle:['أرقام','تتحدث'],
    resultsItems:[
      {label:'عملاء في إسبانيا',desc:'أعمال نمت مع استراتيجياتنا'},
      {label:'مُدار في الإعلانات',desc:'ميزانية محسّنة لأقصى عائد'},
      {label:'أعمال في إسبانيا',desc:'في جميع أنحاء إسبانيا'},
      {label:'متوسط ROI لكل عميل',desc:'عائد حقيقي على الاستثمار'},
    ],
    stepsTitle:'العملية في 3 خطوات',
    steps:[{title:'تحليل',desc:'ندرس عملك والمنافسة والعميل المثالي'},{title:'إطلاق',desc:'موقع + إعلانات + حضور رقمي في أقل من 7 أيام'},{title:'عملاء',desc:'أولى النتائج الحقيقية في 30 يوماً مضمونة'}],
    aboutLabel:'عني', aboutBio1:'متخصص في التسويق الرقمي مقيم في أليكانتي، إسبانيا. أنقل الأعمال المحلية إلى المستوى التالي باستراتيجيات مجربة وتنفيذ فائق السرعة.',
    aboutBio2:'ما يميزني: أتحدث 10 لغات، أعرف السوق الإسبانية من الداخل، وأعمل مباشرة معك — دون وكالات أو وسطاء.',
    timeline:[{years:'2008–2015',role:'المبيعات والتفاوض',company:'تدريب دولي'},{years:'2015–2022',role:'مدير التسويق',company:'شركة تصنيع دولية · أوروبا، روسيا، آسيا'},{years:'2022–الآن',role:'المؤسس',company:'Gar Marketing · إسبانيا'}],
    skillsTitle:'الخبرة',
    advantages:['أولى النتائج في 30 يوماً','10 لغات — الوصول لجميع الأسواق','تواصل مباشر 1:1، بلا وسطاء','ضمان: لا نتائج = نعمل مجاناً'],
    contactLabel:'اتصل', contactTitle:['مستعد للحصول على','عملاء حقيقيين؟'],
    contactSub:'3 أماكن فقط هذا الشهر. تحليل مجاني لعملك.',
    formName:'الاسم *', formPhone:'الهاتف *', formBusiness:'نوع العمل', formMessage:'ماذا تحتاج؟ (اختياري)',
    formSubmit:'إرسال استفسار', formWhatsapp:'واتساب مباشر',
    formSuccess:'تم إرسال الرسالة! سأتواصل معك خلال 5 ساعات.',
    formGuarantee:'✓ لا نتائج في 30 يوماً → نعمل مجاناً',
    footerLinks:['الخدمات','النتائج','عني','اتصل'],
    cookieText:'نستخدم ملفات تعريف الارتباط لتحسين تجربتك.',
    cookieAccept:'قبول', cookieDecline:'رفض',
  },
  hy: {
    nav:['Ծառայ.','Արդ.','Իմ մ.','Կ-կ'], navCta:'Ստ. հաճ.',
    heroBadge:'Իսպ. · Բազմ. · 30 օ. արդ.', hero1:'Հաճ.,', hero2:'ոչ սեղ.',
    heroSub:'Բ-լ. մ-ինգ Իսպ-ում. Կայք, G.Ads, Սոց., YouTube, Վիդ.',
    heroGuarantee:'✓ 30 օ. արդ. չ — անվ.',
    heroCta:'Ստ. հաճ.', heroCtaSub:'Անվ. վ-ծ.',
    statsLabels:['Հաճ.','Գ-ծ','Բ-ս','ROI'],
    servicesLabel:'Ծառ.', servicesTitle:['Ձ. բ-ի','ամ. կ-ն'],
    services:[
      {title:'Բ-լ. կայք',desc:'L-pages 10 լ-վ. SEO, 7 օ.',tags:['10 լ.','CRO','SEO','7 օ.']},
      {title:'Google Ads',desc:'ROI կ-ներ. Ճ-ռ թ-վ, շ-կ. օ-ց.',tags:['ROI','Թ-վ','Հ-տ.']},
      {title:'Google Maps',desc:'Վ-ն G.Maps. GMB, կ-ք, SEO.',tags:['GMB','SEO','Կ-ք']},
      {title:'Սոց. ց.',desc:'Insta, TikTok, FB. Ամ. կ-nt, Reels.',tags:['Inst.','TikTok','Reels','Կ-ր.']},
      {title:'Վ. արտ.',desc:'Պ. վ-ո, սց., ն-կ., մ-ժ.',tags:['Սց.','Նկ.','Մ-ժ','Reels']},
      {title:'YouTube',desc:'Կ-լ enda-end. Ռ-gio, Սց., SEO, Կ-nt.',tags:['Ռ-gio','Սց.','SEO','Պ-ն']},
    ],
    resultsLabel:'Արդ.', resultsTitle:['Թ-ր,','կ-ր'],
    resultsItems:[{label:'Հ. Իսպ.',desc:'Բ. ն-ռ'},{label:'Կ. գ-ծ',desc:'ROI'},{label:'Բ. Իսպ.',desc:'Ամ.'},{label:'ROI',desc:'Վ-ց'}],
    stepsTitle:'3 քայլ',
    steps:[{title:'Վ-ծ',desc:'Ուս. բ-ն'},{title:'Գ-ռ',desc:'< 7 օ.'},{title:'Հ-ներ',desc:'30 օ.'}],
    aboutLabel:'Ի. մ.', aboutBio1:'Թ. մ. մ-ն Ալ., Իսպ. Տ. բ. հ. մ-կ.',
    aboutBio2:'10 լ., Իսպ. շ., 1:1.',
    timeline:[{years:'08-15',role:'Վ.',company:'Ու.'},{years:'15-22',role:'Մ-ր.',company:'Ա. ըն.'},{years:'22-հ.',role:'Հ-դ.',company:'GarMkt'}],
    skillsTitle:'Փ-ձ',
    advantages:['30 օ.','10 լ.','1:1','Երաշ.'],
    contactLabel:'Կ-կ', contactTitle:['Պ-ե՞','հ-ն.'],
    contactSub:'3 տ.',
    formName:'Ան. *', formPhone:'Հ-ռ. *', formBusiness:'Բ. տ.', formMessage:'Ի՞նչ',
    formSubmit:'Ուղ.', formWhatsapp:'WA',
    formSuccess:'Ու. 5 ժ.',
    formGuarantee:'✓ Անվ.',
    footerLinks:['Ծ.','Ա.','Ի.','Կ.'],
    cookieText:'Cookie-ներ.',
    cookieAccept:'Ընդ.', cookieDecline:'Մ-ն.',
  },
  de: {
    nav:['Leistungen','Ergebnisse','Über mich','Kontakt'], navCta:'Kunden gewinnen',
    heroBadge:'Spanien · Mehrsprachig · Ergebnisse in 30 Tagen', hero1:'Kunden,', hero2:'keine Klicks',
    heroSub:'Mehrsprachiges digitales Marketing in Spanien. Websites, Google Ads, Social Media, YouTube, Video.',
    heroGuarantee:'✓ Keine Ergebnisse in 30 Tagen — wir arbeiten kostenlos',
    heroCta:'Kunden gewinnen', heroCtaSub:'Kostenlose Analyse',
    statsLabels:['Kunden','Werbebudget','Unternehmen','Ø ROI'],
    servicesLabel:'Leistungen', servicesTitle:['Alles was Ihr','Unternehmen braucht'],
    services:[
      {title:'Mehrsprachige Websites',desc:'Hochkonvertierende Landing Pages in bis zu 10 Sprachen. Premium-Design, technisches SEO, Lieferung in 7 Tagen.',tags:['10 Sprachen','CRO','SEO','7 Tage']},
      {title:'Google Ads',desc:'Hochwertige ROI-Kampagnen. Ultrapräzises Targeting, wöchentliche Optimierung.',tags:['Max ROI','Targeting','Wöch. Berichte']},
      {title:'Google Maps',desc:'Ihr Unternehmen an der Spitze von Google Maps. GMB-Optimierung, Bewertungsstrategie.',tags:['GMB','Lokales SEO','Bewertungen']},
      {title:'Social Media',desc:'Instagram, TikTok, Facebook. Monatlicher Inhaltsplan, professionelle Reels.',tags:['Instagram','TikTok','Reels','Management']},
      {title:'Videoproduktion',desc:'Professionelle Videoproduktion für Social Media und Kampagnen.',tags:['Skript','Dreh','Schnitt','Reels']},
      {title:'YouTube Marketing',desc:'End-to-End YouTube-Kanalmanagement: Markenstrategie, retentionsoptimierte Skripte, professionelle Produktion, Video-SEO und monatlicher Inhaltsplan zur Umwandlung von Abonnenten in Kunden.',tags:['Strategie','Skripte','Video-SEO','Produktion']},
    ],
    resultsLabel:'Ergebnisse', resultsTitle:['Zahlen die','zählen'],
    resultsItems:[{label:'Kunden in Spanien',desc:'Unternehmen die mit uns wuchsen'},{label:'Verwaltetes Werbebudget',desc:'Budget für max. ROI'},{label:'Unternehmen in Spanien',desc:'In ganz Spanien'},{label:'Durchschn. ROI',desc:'Echter Return on Investment'}],
    stepsTitle:'Prozess in 3 Schritten',
    steps:[{title:'Analyse',desc:'Wir studieren Ihr Unternehmen und Wettbewerber'},{title:'Launch',desc:'Website + Anzeigen + Präsenz in < 7 Tagen'},{title:'Kunden',desc:'Erste echte Ergebnisse in 30 Tagen — garantiert'}],
    aboutLabel:'Über mich', aboutBio1:'Digitaler Marketing-Spezialist mit Sitz in Alicante, Spanien. Ich bringe lokale Unternehmen auf die nächste Stufe.',
    aboutBio2:'Was mich auszeichnet: Ich spreche 10 Sprachen, kenne den spanischen Markt von innen und arbeite direkt mit Ihnen.',
    timeline:[{years:'2008–2015',role:'Vertrieb & Verhandlung',company:'Internationale Ausbildung'},{years:'2015–2022',role:'Marketingleiter',company:'Internationales Produktionsunternehmen'},{years:'2022–heute',role:'Gründer',company:'Gar Marketing · Spanien'}],
    skillsTitle:'Expertise',
    advantages:['Erste Ergebnisse in 30 Tagen','10 Sprachen — Zugang zu allen Märkten','Direkter 1:1-Kontakt','Garantie: keine Ergebnisse = kostenlos'],
    contactLabel:'Kontakt', contactTitle:['Bereit für echte','Kunden?'],
    contactSub:'Nur 3 Plätze diesen Monat.',
    formName:'Name *', formPhone:'Telefon *', formBusiness:'Unternehmenstyp', formMessage:'Was benötigen Sie? (optional)',
    formSubmit:'Anfrage senden', formWhatsapp:'WhatsApp direkt',
    formSuccess:'Nachricht gesendet! Ich melde mich innerhalb von 5 Stunden.',
    formGuarantee:'✓ Keine Ergebnisse in 30 Tagen → kostenlos',
    footerLinks:['Leistungen','Ergebnisse','Über mich','Kontakt'],
    cookieText:'Wir verwenden Cookies für eine bessere Erfahrung.',
    cookieAccept:'Akzeptieren', cookieDecline:'Ablehnen',
  },
  pl: {
    nav:['Usługi','Wyniki','O mnie','Kontakt'], navCta:'Pozyskaj klientów',
    heroBadge:'Hiszpania · Wielojęzyczny · Wyniki w 30 dniach', hero1:'Klienci,', hero2:'nie kliknięcia',
    heroSub:'Wielojęzyczny marketing cyfrowy w Hiszpanii. Strony, Google Ads, Social Media, YouTube, Wideo.',
    heroGuarantee:'✓ Brak wyników w 30 dniach — pracujemy za darmo',
    heroCta:'Pozyskaj klientów', heroCtaSub:'Darmowa analiza',
    statsLabels:['Klientów','Budżet rekl.','Firm','Śr. ROI'],
    servicesLabel:'Usługi', servicesTitle:['Wszystko czego','potrzebuje Twój biznes'],
    services:[
      {title:'Wielojęzyczne strony',desc:'Strony o wysokiej konwersji w do 10 językach. Projekt premium, SEO techniczne, dostawa w 7 dni.',tags:['10 języków','CRO','SEO','7 dni']},
      {title:'Google Ads',desc:'Kampanie o wysokim ROI. Ultraprecyzyjne targetowanie, optymalizacja tygodniowa.',tags:['Maks. ROI','Targetowanie','Tyg. raporty']},
      {title:'Google Maps',desc:'Pozycjonuj firmę na szczycie Google Maps. Optymalizacja GMB, strategia opinii.',tags:['GMB','Lok. SEO','Opinie']},
      {title:'Media społecznościowe',desc:'Instagram, TikTok, Facebook. Miesięczny plan treści, profesjonalne reelsy.',tags:['Instagram','TikTok','Reels','Zarządzanie']},
      {title:'Produkcja wideo',desc:'Profesjonalna produkcja wideo dla social media i kampanii.',tags:['Scenariusz','Kręcenie','Montaż','Reels']},
      {title:'YouTube Marketing',desc:'Kompleksowe zarządzanie kanałem YouTube: strategia marki, scenariusze optymalizowane pod retencję, profesjonalna produkcja, SEO wideo i miesięczny plan treści.',tags:['Strategia','Scenariusze','SEO Wideo','Produkcja']},
    ],
    resultsLabel:'Wyniki', resultsTitle:['Liczby które','mówią same'],
    resultsItems:[{label:'Klientów w Hiszpanii',desc:'Firmy które rosły z nami'},{label:'Zarządzane w reklamie',desc:'Budżet pod maks. ROI'},{label:'Firm w Hiszpanii',desc:'W całej Hiszpanii'},{label:'Śr. ROI',desc:'Realny zwrot z inwestycji'}],
    stepsTitle:'Proces w 3 krokach',
    steps:[{title:'Analiza',desc:'Badamy Twój biznes i konkurencję'},{title:'Start',desc:'Strona + reklamy w < 7 dni'},{title:'Klienci',desc:'Pierwsze wyniki w 30 dniach — gwarantowane'}],
    aboutLabel:'O mnie', aboutBio1:'Specjalista ds. marketingu cyfrowego z siedzibą w Alicante, Hiszpania.',
    aboutBio2:'Co mnie wyróżnia: mówię w 10 językach, znam rynek hiszpański od środka i pracuję bezpośrednio z Tobą.',
    timeline:[{years:'2008–2015',role:'Sprzedaż i negocjacje',company:'Szkolenia międzynarodowe'},{years:'2015–2022',role:'Dyrektor marketingu',company:'Międzyn. firma produkcyjna'},{years:'2022–teraz',role:'Założyciel',company:'Gar Marketing · Hiszpania'}],
    skillsTitle:'Ekspertyza',
    advantages:['Pierwsze wyniki w 30 dniach','10 języków','Bezpośredni kontakt 1:1','Gwarancja: brak wyników = za darmo'],
    contactLabel:'Kontakt', contactTitle:['Gotowy na','prawdziwych klientów?'],
    contactSub:'Tylko 3 miejsca w tym miesiącu.',
    formName:'Imię *', formPhone:'Telefon *', formBusiness:'Typ działalności', formMessage:'Czego potrzebujesz? (opcjonalnie)',
    formSubmit:'Wyślij zapytanie', formWhatsapp:'WhatsApp bezpośrednio',
    formSuccess:'Wiadomość wysłana! Skontaktuję się w ciągu 5 godzin.',
    formGuarantee:'✓ Brak wyników w 30 dniach → za darmo',
    footerLinks:['Usługi','Wyniki','O mnie','Kontakt'],
    cookieText:'Używamy plików cookie dla lepszego doświadczenia.',
    cookieAccept:'Akceptuj', cookieDecline:'Odmów',
  },
  nl: {
    nav:['Diensten','Resultaten','Over mij','Contact'], navCta:'Klanten werven',
    heroBadge:'Spanje · Meertalig · Resultaten in 30 dagen', hero1:'Klanten,', hero2:'geen klikken',
    heroSub:'Meertalige digitale marketing in Spanje. Websites, Google Ads, Social Media, YouTube, Video.',
    heroGuarantee:'✓ Geen resultaten in 30 dagen — we werken gratis',
    heroCta:'Klanten werven', heroCtaSub:'Gratis analyse',
    statsLabels:['Klanten','Advertentiebudget','Bedrijven','Gem. ROI'],
    servicesLabel:'Diensten', servicesTitle:['Alles wat uw','bedrijf nodig heeft'],
    services:[
      {title:'Meertalige websites',desc:'Hoog-converterende landingspagina\'s in maximaal 10 talen. Premium ontwerp, technische SEO, levering in 7 dagen.',tags:['10 talen','CRO','SEO','7 dagen']},
      {title:'Google Ads',desc:'Hoog-ROI campagnes. Ultraprecies targeting, wekelijkse optimalisatie.',tags:['Max ROI','Targeting','Wekelijkse rapporten']},
      {title:'Google Maps',desc:'Positioneer uw bedrijf bovenaan Google Maps. GMB-optimalisatie, reviewstrategie.',tags:['GMB','Lokale SEO','Reviews']},
      {title:'Social Media',desc:'Instagram, TikTok, Facebook. Maandelijks inhoudsplan, professionele reels.',tags:['Instagram','TikTok','Reels','Beheer']},
      {title:'Videoproductie',desc:'Professionele videoproductie voor social en campagnes.',tags:['Script','Opname','Montage','Reels']},
      {title:'YouTube Marketing',desc:'End-to-end YouTube-kanaalbeheer: merkstrategie, retentie-geoptimaliseerde scripts, professionele productie, video-SEO en maandelijks inhoudsplan.',tags:['Strategie','Scripts','Video-SEO','Productie']},
    ],
    resultsLabel:'Resultaten', resultsTitle:['Cijfers die','tellen'],
    resultsItems:[{label:'Klanten in Spanje',desc:'Bedrijven die met ons groeiden'},{label:'Beheerd in advertenties',desc:'Budget voor max. ROI'},{label:'Bedrijven in Spanje',desc:'Door heel Spanje'},{label:'Gem. ROI',desc:'Echte return on investment'}],
    stepsTitle:'Proces in 3 stappen',
    steps:[{title:'Analyse',desc:'We bestuderen uw bedrijf en concurrentie'},{title:'Launch',desc:'Website + advertenties in < 7 dagen'},{title:'Klanten',desc:'Eerste echte resultaten in 30 dagen — gegarandeerd'}],
    aboutLabel:'Over mij', aboutBio1:'Digitale marketingspecialist gevestigd in Alicante, Spanje.',
    aboutBio2:'Wat mij onderscheidt: ik spreek 10 talen, ken de Spaanse markt en werk rechtstreeks met u.',
    timeline:[{years:'2008–2015',role:'Verkoop & Onderhandeling',company:'Internationale opleiding'},{years:'2015–2022',role:'Marketingdirecteur',company:'Internationaal productiebedrijf'},{years:'2022–nu',role:'Oprichter',company:'Gar Marketing · Spanje'}],
    skillsTitle:'Expertise',
    advantages:['Eerste resultaten in 30 dagen','10 talen','Direct 1:1-contact','Garantie: geen resultaten = gratis'],
    contactLabel:'Contact', contactTitle:['Klaar voor echte','klanten?'],
    contactSub:'Slechts 3 plekken deze maand.',
    formName:'Naam *', formPhone:'Telefoon *', formBusiness:'Type bedrijf', formMessage:'Wat heeft u nodig? (optioneel)',
    formSubmit:'Aanvraag versturen', formWhatsapp:'WhatsApp direct',
    formSuccess:'Bericht verzonden! Ik neem binnen 5 uur contact op.',
    formGuarantee:'✓ Geen resultaten in 30 dagen → gratis',
    footerLinks:['Diensten','Resultaten','Over mij','Contact'],
    cookieText:'We gebruiken cookies voor een betere ervaring.',
    cookieAccept:'Accepteren', cookieDecline:'Weigeren',
  },
  it: {
    nav:['Servizi','Risultati','Chi sono','Contatto'], navCta:'Ottieni clienti',
    heroBadge:'Spagna · Multilingue · Risultati in 30 giorni', hero1:'Clienti,', hero2:'non clic',
    heroSub:'Marketing digitale multilingue in Spagna. Siti web, Google Ads, Social Media, YouTube, Video.',
    heroGuarantee:'✓ Nessun risultato in 30 giorni — lavoriamo gratis',
    heroCta:'Ottieni clienti', heroCtaSub:'Analisi gratuita',
    statsLabels:['Clienti','Budget pub.','Aziende','ROI medio'],
    servicesLabel:'Servizi', servicesTitle:['Tutto ciò di cui','hai bisogno'],
    services:[
      {title:'Siti multilingue',desc:'Landing page ad alta conversione in fino a 10 lingue. Design premium, SEO tecnico, consegna in 7 giorni.',tags:['10 lingue','CRO','SEO','7 giorni']},
      {title:'Google Ads',desc:'Campagne ad alto ROI. Targeting ultrapreciso, ottimizzazione settimanale.',tags:['ROI massimo','Targeting','Report sett.']},
      {title:'Google Maps',desc:'Posiziona la tua attività in cima a Google Maps. Ottimizzazione GMB, recensioni, SEO locale.',tags:['GMB','SEO locale','Recensioni']},
      {title:'Social Media',desc:'Instagram, TikTok, Facebook. Piano contenuti mensile, reel professionali.',tags:['Instagram','TikTok','Reels','Gestione']},
      {title:'Produzione Video',desc:'Produzione video professionale per social e campagne.',tags:['Sceneggiatura','Riprese','Montaggio','Reels']},
      {title:'YouTube Marketing',desc:'Gestione end-to-end del canale YouTube: strategia di brand, script ottimizzati per la retention, produzione professionale, SEO video e piano contenuti mensile per convertire gli iscritti in clienti.',tags:['Strategia','Script','SEO Video','Produzione']},
    ],
    resultsLabel:'Risultati', resultsTitle:['Numeri che','contano'],
    resultsItems:[{label:'Clienti in Spagna',desc:'Aziende cresciute con noi'},{label:'Gestiti in pubblicità',desc:'Budget per ROI massimo'},{label:'Aziende in Spagna',desc:'In tutta la Spagna'},{label:'ROI medio',desc:'Ritorno reale sull\'investimento'}],
    stepsTitle:'Processo in 3 passi',
    steps:[{title:'Analisi',desc:'Studiamo il tuo business e la concorrenza'},{title:'Lancio',desc:'Sito + annunci in < 7 giorni'},{title:'Clienti',desc:'Primi risultati in 30 giorni — garantiti'}],
    aboutLabel:'Chi sono', aboutBio1:'Specialista di marketing digitale con sede ad Alicante, Spagna.',
    aboutBio2:'Cosa mi distingue: parlo 10 lingue, conosco il mercato spagnolo dall\'interno e lavoro direttamente con te.',
    timeline:[{years:'2008–2015',role:'Vendite & Negoziazione',company:'Formazione internazionale'},{years:'2015–2022',role:'Direttore Marketing',company:'Azienda manifatturiera internazionale'},{years:'2022–oggi',role:'Fondatore',company:'Gar Marketing · Spagna'}],
    skillsTitle:'Expertise',
    advantages:['Primi risultati in 30 giorni','10 lingue','Contatto diretto 1:1','Garanzia: nessun risultato = gratis'],
    contactLabel:'Contatto', contactTitle:['Pronto per ottenere','clienti reali?'],
    contactSub:'Solo 3 posti disponibili questo mese.',
    formName:'Nome *', formPhone:'Telefono *', formBusiness:'Tipo di attività', formMessage:'Di cosa hai bisogno? (opzionale)',
    formSubmit:'Invia richiesta', formWhatsapp:'WhatsApp diretto',
    formSuccess:'Messaggio inviato! Ti contatterò entro 5 ore.',
    formGuarantee:'✓ Nessun risultato in 30 giorni → gratis',
    footerLinks:['Servizi','Risultati','Chi sono','Contatto'],
    cookieText:'Usiamo i cookie per migliorare la tua esperienza.',
    cookieAccept:'Accetta', cookieDecline:'Rifiuta',
  },
}

const LANG_LABELS = {es:'ES 🇪🇸',en:'EN 🇬🇧',ru:'RU 🇷🇺',zh:'ZH 🇨🇳',ar:'AR 🇸🇦',hy:'HY 🇦🇲',de:'DE 🇩🇪',pl:'PL 🇵🇱',nl:'NL 🇳🇱',it:'IT 🇮🇹'}
const SERVICE_ICONS = ['⬡','◎','◈','▣','◉','▶']
const SERVICE_COLORS = ['#c8a96e','#e8c547','#7eb8a4','#b07db8','#e87a5a','#e84545']

// ─── Cookie Banner ────────────────────────────────────────
function CookieBanner({ lang }) {
  const t = T[lang]
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])
  const accept = () => { localStorage.setItem('cookie_consent', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('cookie_consent', 'declined'); setVisible(false) }
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}>
          <p className="cookie-text">{t.cookieText}</p>
          <div className="cookie-btns">
            <button className="cookie-accept" onClick={accept}>{t.cookieAccept}</button>
            <button className="cookie-decline" onClick={decline}>{t.cookieDecline}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── WhatsApp Float Button ────────────────────────────────
function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}`}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.112 1.528 5.837L.057 23.803a.75.75 0 00.927.927l5.966-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.498-5.201-1.368l-.373-.214-3.882.957.973-3.766-.234-.389A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span className="wa-pulse" />
    </motion.a>
  )
}

// ─── Custom Cursor (desktop only) ────────────────────────
function Cursor() {
  const [pos,setPos]=useState({x:-100,y:-100})
  const [hovered,setHovered]=useState(false)
  const [clicked,setClicked]=useState(false)
  const [isMobile] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  useEffect(()=>{
    if (isMobile) return
    const move=e=>setPos({x:e.clientX,y:e.clientY})
    const over=e=>{if(e.target.closest('a,button,[data-hover]'))setHovered(true)}
    const out=e=>{if(e.target.closest('a,button,[data-hover]'))setHovered(false)}
    const down=()=>setClicked(true)
    const up=()=>setClicked(false)
    window.addEventListener('mousemove',move)
    window.addEventListener('mouseover',over)
    window.addEventListener('mouseout',out)
    window.addEventListener('mousedown',down)
    window.addEventListener('mouseup',up)
    return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseover',over);window.removeEventListener('mouseout',out);window.removeEventListener('mousedown',down);window.removeEventListener('mouseup',up)}
  },[isMobile])
  if (isMobile) return null
  const sc={damping:25,stiffness:300,mass:0.5}
  const x=useSpring(pos.x,sc)
  const y=useSpring(pos.y,sc)
  return(<><motion.div className="cursor-dot" style={{x:pos.x-4,y:pos.y-4}}/><motion.div className={`cursor-ring ${hovered?'hovered':''} ${clicked?'clicked':''}`} style={{x,y,translateX:'-50%',translateY:'-50%'}}/></>)
}

function Noise(){return<div className="noise" aria-hidden="true"/>}

function ScrollProgress(){
  const{scrollYProgress}=useScroll()
  const scaleX=useSpring(scrollYProgress,{damping:30,stiffness:200})
  return<motion.div className="scroll-progress" style={{scaleX}}/>
}

// ─── Nav ──────────────────────────────────────────────────
function Nav({lang,setLang}){
  const[open,setOpen]=useState(false)
  const[scrolled,setScrolled]=useState(false)
  const[menuOpen,setMenuOpen]=useState(false)
  const t=T[lang]
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn)},[])
  const sections=['services','results','about','contact']
  return(
    <motion.nav className={`nav ${scrolled?'nav--scrolled':''}`} initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,ease:[0.16,1,0.3,1]}}>
      <a href="#hero" className="nav-logo"><span className="nav-logo-mark">G</span><span>ar Marketing</span></a>
      <div className="nav-links">{t.nav.map((l,i)=><a key={i} href={`#${sections[i]}`} className="nav-link">{l}</a>)}</div>
      <div className="nav-right">
        <div className="lang-switcher" data-hover>
          <button className="lang-btn" onClick={()=>setOpen(!open)}>{LANG_LABELS[lang]} <span className="lang-arrow">{open?'↑':'↓'}</span></button>
          <AnimatePresence>{open&&(<motion.div className="lang-dropdown" initial={{opacity:0,y:-8,scale:0.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:0.96}} transition={{duration:0.2}}>
            {Object.entries(LANG_LABELS).map(([k,v])=>(<button key={k} className={`lang-option ${lang===k?'active':''}`} onClick={()=>{setLang(k);setOpen(false)}}>{v}</button>))}
          </motion.div>)}</AnimatePresence>
        </div>
        <a href={`https://wa.me/${WA_NUMBER}`} className="nav-cta" data-hover>{t.navCta}</a>
        <button className="nav-burger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen?'open':''}/>
          <span className={menuOpen?'open':''}/>
          <span className={menuOpen?'open':''}/>
        </button>
      </div>
      <AnimatePresence>{menuOpen&&(
        <motion.div className="mobile-menu" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.25}}>
          {t.nav.map((l,i)=><a key={i} href={`#${sections[i]}`} className="mobile-link" onClick={()=>setMenuOpen(false)}>{l}</a>)}
          <a href={`https://wa.me/${WA_NUMBER}`} className="mobile-cta" onClick={()=>setMenuOpen(false)}>{t.navCta}</a>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────
function Hero({lang}){
  const t=T[lang]
  const{scrollY}=useScroll()
  const y=useTransform(scrollY,[0,600],[0,120])
  const opacity=useTransform(scrollY,[0,400],[1,0])
  const services=['Webs','Google Ads','Google Maps','Instagram','TikTok','YouTube','Video','SEO']
  return(
    <section id="hero" className="hero">
      <div className="hero-grid" aria-hidden="true"/>
      <motion.div className="orb orb1" animate={{y:[-20,20,-20],x:[-10,10,-10]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}/>
      <motion.div className="orb orb2" animate={{y:[15,-15,15],x:[10,-10,10]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut'}}/>
      <motion.div className="orb orb3" animate={{y:[-25,10,-25]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}/>
      <motion.div className="hero-content" style={{y,opacity}}>
        <motion.div className="hero-badge" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}><span className="badge-dot"/>{t.heroBadge}</motion.div>
        <motion.h1 className="hero-title" initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.3,ease:[0.16,1,0.3,1]}}>
          <span className="hero-line1">{t.hero1}</span>
          <span className="hero-line2"><span className="text-accent">{t.hero2}</span></span>
        </motion.h1>
        <motion.p className="hero-sub" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.5}}>{t.heroSub}</motion.p>
        <motion.div className="hero-guarantee" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.65}}>{t.heroGuarantee}</motion.div>
        <motion.div className="hero-ctas" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.75}}>
          <a href={`https://wa.me/${WA_NUMBER}`} className="btn-primary" data-hover><span>{t.heroCta}</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          <a href="#contact" className="btn-secondary" data-hover>{t.heroCtaSub}</a>
        </motion.div>
        <motion.div className="hero-stats" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.9}}>
          {['+500','+2M€','+80','3×'].map((num,i)=>(
            <motion.div key={i} className="stat-item" whileHover={{y:-4}} transition={{type:'spring',stiffness:400}}>
              <span className="stat-num">{num}</span><span className="stat-label">{t.statsLabels[i]}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="hero-ticker"><div className="ticker-track">{[...services,...services,...services].map((s,i)=><span key={i} className="ticker-item">✦ {s}</span>)}</div></div>
      <motion.div className="hero-langs" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
        {Object.values(LANG_LABELS).map((fl,i)=>(<motion.span key={i} className="flag" initial={{scale:0}} animate={{scale:1}} transition={{delay:1.2+i*0.05,type:'spring'}}>{fl.slice(-2)}</motion.span>))}
      </motion.div>
    </section>
  )
}

// ─── Service Card ─────────────────────────────────────────
function ServiceCard({service,index,icon,color}){
  const ref=useRef(null)
  const inView=useInView(ref,{once:true,margin:'-60px'})
  const[hovered,setHovered]=useState(false)
  return(
    <motion.div ref={ref} className="service-card" initial={{opacity:0,y:60}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:index*0.08,ease:[0.16,1,0.3,1]}} onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)} whileHover={{y:-6}} data-hover>
      <motion.div className="card-glow" animate={{opacity:hovered?1:0}} style={{background:`radial-gradient(circle at 50% 0%, ${color}22, transparent 70%)`}}/>
      <div className="card-icon" style={{color}}>{icon}</div>
      <h3 className="card-title">{service.title}</h3>
      <p className="card-desc">{service.desc}</p>
      <div className="card-tags">{service.tags.map((tag,i)=><span key={i} className="tag" style={{borderColor:color+'55',color}}>{tag}</span>)}</div>
      <motion.div className="card-arrow" animate={{x:hovered?6:0}}>→</motion.div>
    </motion.div>
  )
}

function Services({lang}){
  const t=T[lang]
  const ref=useRef(null)
  const inView=useInView(ref,{once:true})
  return(
    <section id="services" className="section">
      <div className="section-inner">
        <motion.div ref={ref} className="section-header" initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <span className="section-label">{t.servicesLabel}</span>
          <h2 className="section-title">{t.servicesTitle[0]}<br/><span className="text-accent">{t.servicesTitle[1]}</span></h2>
        </motion.div>
        <div className="services-grid">{t.services.map((s,i)=><ServiceCard key={i} service={s} index={i} icon={SERVICE_ICONS[i]} color={SERVICE_COLORS[i]}/>)}</div>
      </div>
    </section>
  )
}

// ─── CountUp ──────────────────────────────────────────────
function CountUp({target,suffix='',duration=2}){
  const[count,setCount]=useState(0)
  const ref=useRef(null)
  const inView=useInView(ref,{once:true})
  useEffect(()=>{
    if(!inView)return
    let start=0
    const increment=target/(duration*60)
    const timer=setInterval(()=>{start+=increment;if(start>=target){setCount(target);clearInterval(timer)}else setCount(Math.floor(start))},1000/60)
    return()=>clearInterval(timer)
  },[inView,target,duration])
  return<span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function Results({lang}){
  const t=T[lang]
  const ref=useRef(null)
  const inView=useInView(ref,{once:true})
  const nums=[{n:500,s:'+'},{n:2000000,s:'€+'},{n:80,s:'+'},{n:3,s:'×'}]
  return(
    <section id="results" className="section section--dark">
      <div className="section-inner">
        <motion.div ref={ref} className="section-header" initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <span className="section-label">{t.resultsLabel}</span>
          <h2 className="section-title">{t.resultsTitle[0]} <span className="text-accent">{t.resultsTitle[1]}</span></h2>
        </motion.div>
        <div className="results-grid">
          {t.resultsItems.map((item,i)=>(
            <motion.div key={i} className="result-card" initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:0.6,delay:i*0.12}} whileHover={{scale:1.03}}>
              <div className="result-num"><CountUp target={nums[i].n} suffix={nums[i].s}/></div>
              <div className="result-label">{item.label}</div>
              <div className="result-desc">{item.desc}</div>
            </motion.div>
          ))}
        </div>
        <motion.div className="timeline" initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.8,delay:0.5}}>
          <div className="timeline-title">{t.stepsTitle}</div>
          <div className="timeline-steps">
            {t.steps.map((s,i)=>(
              <motion.div key={i} className="timeline-step" initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:0.7+i*0.15}}>
                <div className="step-num">0{i+1}</div>
                <div className="step-content"><div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div></div>
                {i<2&&<div className="step-arrow">→</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About({lang}){
  const t=T[lang]
  const ref=useRef(null)
  const inView=useInView(ref,{once:true,margin:'-80px'})
  const skills=[{label:'Marketing Digital',pct:97},{label:'Google Ads',pct:95},{label:'Web Design & CRO',pct:92},{label:'YouTube & Video',pct:90},{label:'Social Media',pct:93}]
  return(
    <section id="about" className="section">
      <div className="section-inner">
        <div className="about-grid">
          <motion.div className="about-left" ref={ref} initial={{opacity:0,x:-60}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}>
            <span className="section-label">{t.aboutLabel}</span>
            <h2 className="section-title">Garik <span className="text-accent">Katanian</span></h2>
            <p className="about-bio">{t.aboutBio1}</p>
            <p className="about-bio">{t.aboutBio2}</p>
            <div className="about-langs">
              {Object.values(LANG_LABELS).map((fl,i)=>(<motion.span key={i} className="lang-flag" initial={{opacity:0,scale:0}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.3+i*0.06,type:'spring'}} whileHover={{scale:1.3,y:-4}}>{fl}</motion.span>))}
            </div>
            <div className="timeline-mini">
              {t.timeline.map((item,i)=>(<motion.div key={i} className="mini-item" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5+i*0.15}}><span className="mini-years">{item.years}</span><span className="mini-role">{item.role}</span><span className="mini-company">{item.company}</span></motion.div>))}
            </div>
          </motion.div>
          <motion.div className="about-right" initial={{opacity:0,x:60}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2,ease:[0.16,1,0.3,1]}}>
            <div className="skills-block">
              <div className="skills-title">{t.skillsTitle}</div>
              {skills.map((skill,i)=>(
                <div key={i} className="skill-row">
                  <div className="skill-meta"><span className="skill-label">{skill.label}</span><span className="skill-pct">{skill.pct}%</span></div>
                  <div className="skill-track"><motion.div className="skill-fill" initial={{width:0}} animate={inView?{width:`${skill.pct}%`}:{}} transition={{duration:1.2,delay:0.4+i*0.12,ease:[0.16,1,0.3,1]}}/></div>
                </div>
              ))}
            </div>
            <div className="advantages">
              {t.advantages.map((a,i)=>(<motion.div key={i} className="advantage" initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.6+i*0.1}} whileHover={{x:6}}><span className="adv-icon">{['⚡','🌍','🤝','✓'][i]}</span><span>{a}</span></motion.div>))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────
function Contact({lang}){
  const t=T[lang]
  const ref=useRef(null)
  const inView=useInView(ref,{once:true})
  const[form,setForm]=useState({name:'',phone:'',business:'',message:''})
  const[errors,setErrors]=useState({})
  const[submitted,setSubmitted]=useState(false)
  const[loading,setLoading]=useState(false)

  const validate=()=>{const e={};if(!form.name.trim())e.name=true;if(!form.phone.trim())e.phone=true;return e}

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const e2=validate()
    if(Object.keys(e2).length){setErrors(e2);return}
    setLoading(true)
    try{
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`,{
        method:'POST',
        headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({name:form.name,phone:form.phone,business:form.business,message:form.message,_language:lang,_subject:`New lead from garmarketing.es — ${form.name}`})
      })
    }catch{}
    setLoading(false)
    setSubmitted(true)
  }

  return(
    <section id="contact" className="section section--cta">
      <div className="section-inner">
        <motion.div ref={ref} className="cta-block" initial={{opacity:0,y:60}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}>
          <motion.div className="cta-orb" animate={{scale:[1,1.2,1],opacity:[0.3,0.6,0.3]}} transition={{duration:4,repeat:Infinity}}/>
          <span className="section-label">{t.contactLabel}</span>
          <h2 className="cta-title">{t.contactTitle[0]} <span className="text-accent">{t.contactTitle[1]}</span></h2>
          <p className="cta-sub">{t.contactSub}</p>
          <div className="contact-layout">
            <AnimatePresence mode="wait">
              {submitted?(
                <motion.div className="form-success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{type:'spring'}}>
                  <div className="success-icon">✓</div><p>{t.formSuccess}</p>
                </motion.div>
              ):(
                <motion.form className="contact-form" onSubmit={handleSubmit} initial={{opacity:1}} exit={{opacity:0}}>
                  <div className="form-row">
                    <div className={`form-field ${errors.name?'error':''}`}>
                      <input type="text" placeholder={t.formName} value={form.name} onChange={e=>{setForm({...form,name:e.target.value});setErrors({...errors,name:false})}}/>
                    </div>
                    <div className={`form-field ${errors.phone?'error':''}`}>
                      <input type="tel" placeholder={t.formPhone} value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value});setErrors({...errors,phone:false})}}/>
                    </div>
                  </div>
                  <div className="form-field">
                    <input type="text" placeholder={t.formBusiness} value={form.business} onChange={e=>setForm({...form,business:e.target.value})}/>
                  </div>
                  <div className="form-field">
                    <textarea placeholder={t.formMessage} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={3}/>
                  </div>
                  <div className="form-actions">
                    <motion.button type="submit" className="btn-primary btn-large" whileHover={{scale:1.03}} whileTap={{scale:0.97}} disabled={loading} data-hover>
                      {loading?'…':t.formSubmit}
                    </motion.button>
                    <motion.a href={`https://wa.me/${WA_NUMBER}`} className="btn-secondary" whileHover={{scale:1.03}} whileTap={{scale:0.97}} data-hover>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.112 1.528 5.837L.057 23.803a.75.75 0 00.927.927l5.966-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.498-5.201-1.368l-.373-.214-3.882.957.973-3.766-.234-.389A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                      {t.formWhatsapp}
                    </motion.a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          <div className="cta-guarantee">{t.formGuarantee}</div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer({lang}){
  const t=T[lang]
  const sections=['services','results','about','contact']
  return(
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo"><span className="nav-logo-mark">G</span>ar Marketing</div>
        <div className="footer-links">{t.footerLinks.map((l,i)=><a key={i} href={`#${sections[i]}`} className="footer-link">{l}</a>)}</div>
        <div className="footer-copy">© 2025 Gar Marketing · España</div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────
export default function App(){
  const[lang,setLang]=useState(detectLang)
  return(
    <>
      <Cursor/><Noise/><ScrollProgress/>
      <Nav lang={lang} setLang={setLang}/>
      <main>
        <Hero lang={lang}/>
        <Services lang={lang}/>
        <Results lang={lang}/>
        <About lang={lang}/>
        <Contact lang={lang}/>
      </main>
      <Footer lang={lang}/>
      <WhatsAppButton/>
      <CookieBanner lang={lang}/>
    </>
  )
}
