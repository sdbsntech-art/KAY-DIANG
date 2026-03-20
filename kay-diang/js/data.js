const KD = {

LEVELS: ['debutant','elementaire','intermediaire','avance','expert'],
LEVEL_NAMES: { debutant:'🌱 Débutant', elementaire:'📗 Élémentaire', intermediaire:'📘 Intermédiaire', avance:'📙 Avancé', expert:'⭐ Expert' },
LEVEL_COLORS: { debutant:'#3FB950', elementaire:'#388BFD', intermediaire:'#9E6CF3', avance:'#E8A838', expert:'#D4A843' },
LEVEL_XP: { debutant:100, elementaire:250, intermediaire:500, avance:1000, expert:2000 },

LESSONS: [
  {
    id:'l01', level:'debutant', color:'#3FB950',
    title:"L'Alphabet Arabe — Partie 1",
    arabic:"الحُرُوف العَرَبِيَّة",
    desc:"Apprenez les 10 premières lettres de l'alphabet arabe avec leur forme et prononciation.",
    xp:20, duration:"15 min",
    content:{
      intro:"L'arabe possède 28 lettres toutes consonnes. On écrit de droite à gauche. Chaque lettre a 4 formes selon sa position.",
      words:[
        {ar:"أ", tr:"Alif", fr:"Son 'A' long", forms:{iso:"أ", ini:"أ", med:"ـأ", fin:"ـأ"}},
        {ar:"ب", tr:"Ba", fr:"Son 'B'", forms:{iso:"ب", ini:"بـ", med:"ـبـ", fin:"ـب"}},
        {ar:"ت", tr:"Ta", fr:"Son 'T'", forms:{iso:"ت", ini:"تـ", med:"ـتـ", fin:"ـت"}},
        {ar:"ث", tr:"Tha", fr:"Son 'TH' (Think)", forms:{iso:"ث", ini:"ثـ", med:"ـثـ", fin:"ـث"}},
        {ar:"ج", tr:"Jim", fr:"Son 'DJ'", forms:{iso:"ج", ini:"جـ", med:"ـجـ", fin:"ـج"}},
        {ar:"ح", tr:"Ha", fr:"Son 'H' (soufflé)", forms:{iso:"ح", ini:"حـ", med:"ـحـ", fin:"ـح"}},
        {ar:"خ", tr:"Kha", fr:"Son 'KH' (Rire)", forms:{iso:"خ", ini:"خـ", med:"ـخـ", fin:"ـخ"}},
        {ar:"د", tr:"Dal", fr:"Son 'D'", forms:{iso:"د", ini:"د", med:"ـد", fin:"ـد"}},
        {ar:"ذ", tr:"Dhal", fr:"Son 'DH' (The)", forms:{iso:"ذ", ini:"ذ", med:"ـذ", fin:"ـذ"}},
        {ar:"ر", tr:"Ra", fr:"Son 'R'", forms:{iso:"ر", ini:"ر", med:"ـر", fin:"ـر"}},
      ],
      reading: [
        { word: "أَبٌ", parts: ["أَ", "بٌ"], fr: "Père (A-bun)" },
        { word: "بَابٌ", parts: ["بَا", "بٌ"], fr: "Porte (Baa-bun)" },
        { word: "تَاجٌ", parts: ["تَا", "جٌ"], fr: "Couronne (Taa-jun)" },
        { word: "أَحَبَ", parts: ["أَ", "حَ", "بَ"], fr: "Il a aimé (A-ha-ba)" }
      ],
      examples:[
        {ar:"بَابٌ", fr:"Bab — une porte"},
        {ar:"أَبٌ", fr:"Ab — un père"},
        {ar:"رَبٌّ", fr:"Rabb — Seigneur"},
      ],
      note:"Conseil : La clé pour apprendre l'alphabet est la répétition. Écrivez chaque lettre 10 fois en répétant son nom à voix haute."
    }
  },
  {
    id:'l02', level:'debutant', color:'#3FB950',
    title:"L'Alphabet Arabe — Partie 2",
    arabic:"الحُرُوف العَرَبِيَّة ٢",
    desc:"Les 18 lettres restantes de l'alphabet arabe.",
    xp:20, duration:"15 min",
    content:{
      intro:"Continuons avec les lettres restantes. Ces lettres couvrent des sons spécifiques à l'arabe.",
      words:[
        {ar:"زَ", tr:"Zay", fr:"Son 'Z' comme dans 'Zèbre'"},
        {ar:"سَ", tr:"Sin", fr:"Son 'S' comme dans 'Soleil'"},
        {ar:"شَ", tr:"Shin", fr:"Son 'CH' comme dans 'Chat'"},
        {ar:"صَ", tr:"Sad", fr:"Son 'S' emphatique, plus lourd"},
        {ar:"ضَ", tr:"Dad", fr:"Son 'D' emphatique"},
        {ar:"طَ", tr:"Ta", fr:"Son 'T' emphatique"},
        {ar:"ظَ", tr:"Dha", fr:"Son 'DH' emphatique"},
        {ar:"عَ", tr:"'Ain", fr:"Son guttural unique à l'arabe"},
        {ar:"غَ", tr:"Ghain", fr:"Son 'GH' gras, comme un gargarisme"},
        {ar:"فَ", tr:"Fa", fr:"Son 'F' comme dans 'Fleur'"},
        {ar:"قَ", tr:"Qaf", fr:"Son 'Q' du fond de la gorge"},
        {ar:"كَ", tr:"Kaf", fr:"Son 'K' comme dans 'Café'"},
        {ar:"لَ", tr:"Lam", fr:"Son 'L' comme dans 'Lune'"},
        {ar:"مَ", tr:"Mim", fr:"Son 'M' comme dans 'Mer'"},
        {ar:"نَ", tr:"Nun", fr:"Son 'N' comme dans 'Nuit'"},
        {ar:"هَ", tr:"Ha", fr:"Son 'H' aspiré doux"},
        {ar:"وَ", tr:"Waw", fr:"Son 'W' ou 'OU'"},
        {ar:"يَ", tr:"Ya", fr:"Son 'Y' comme dans 'Yeux'"},
      ],
      examples:[
        {ar:"كِتَابٌ", fr:"Kitaab — un livre"},
        {ar:"قَلَمٌ", fr:"Qalam — un stylo"},
        {ar:"مَاءٌ", fr:"Maa' — de l'eau"},
      ],
      note:"Félicitations ! Vous connaissez maintenant les 28 lettres arabes. C'est une étape majeure !"
    }
  },
  {
    id:'l03', level:'debutant', color:'#3FB950',
    title:"Les Salutations",
    arabic:"التَّحِيَّات",
    desc:"Apprenez à saluer et répondre en arabe comme un natif.",
    xp:15, duration:"10 min",
    content:{
      intro:"Les salutations en arabe sont une partie importante de la culture islamique et arabe. Elles expriment le respect et la bienveillance.",
      words:[
        {ar:"السَّلَامُ عَلَيْكُمْ", tr:"As-Salamu 'Alaykum", fr:"La paix soit sur vous (salutation islamique)"},
        {ar:"وَعَلَيْكُمُ السَّلَام", tr:"Wa 'Alaykum As-Salam", fr:"Et sur vous la paix (réponse)"},
        {ar:"أَهْلاً وَسَهْلاً", tr:"Ahlan wa Sahlan", fr:"Bienvenue"},
        {ar:"مَرْحَبَاً", tr:"Marhaban", fr:"Bonjour / Bienvenue"},
        {ar:"كَيْفَ حَالُكَ؟", tr:"Kayfa Haluk?", fr:"Comment vas-tu? (masc.)"},
        {ar:"بِخَيْرٍ، شُكْرًا", tr:"Bi khayr, shukran", fr:"Bien, merci"},
        {ar:"شُكْرًا", tr:"Shukran", fr:"Merci"},
        {ar:"عَفْوًا", tr:"'Afwan", fr:"De rien / Pardon"},
        {ar:"مَعَ السَّلَامَة", tr:"Ma'a as-salama", fr:"Au revoir (en sécurité)"},
        {ar:"إِلَى اللِّقَاء", tr:"Ila al-liqa'", fr:"À bientôt"},
      ],
      examples:[
        {ar:"السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟", fr:"As-Salamu 'Alaykum, comment vas-tu ?"},
        {ar:"وَعَلَيْكُمُ السَّلَامُ، بِخَيْرٍ شُكْرًا", fr:"Wa 'Alaykum As-Salam, bien merci !"},
      ],
      note:"En Islam, commencer par 'As-Salamu 'Alaykum' est une Sunna. Le Prophète ﷺ a dit : 'Répandez le salam entre vous.'"
    }
  },
  {
    id:'l04', level:'debutant', color:'#3FB950',
    title:"Les Chiffres Arabes",
    arabic:"الأَرْقَام",
    desc:"Comptez de 1 à 20 en arabe facilement.",
    xp:20, duration:"12 min",
    content:{
      intro:"Les chiffres arabes sont à l'origine des nôtres ! Les 'chiffres arabes' que nous utilisons (0,1,2...) viennent bien de l'arabe.",
      words:[
        {ar:"صِفْر", tr:"Sifr", fr:"Zéro (0) — c'est de là que vient 'zéro' !"},{ar:"وَاحِد", tr:"Wahid", fr:"Un (1)"},
        {ar:"اثْنَان", tr:"Ithnan", fr:"Deux (2)"},{ar:"ثَلَاثَة", tr:"Thalatha", fr:"Trois (3)"},
        {ar:"أَرْبَعَة", tr:"Arba'a", fr:"Quatre (4)"},{ar:"خَمْسَة", tr:"Khamsa", fr:"Cinq (5)"},
        {ar:"سِتَّة", tr:"Sitta", fr:"Six (6)"},{ar:"سَبْعَة", tr:"Sab'a", fr:"Sept (7)"},
        {ar:"ثَمَانِيَة", tr:"Thamania", fr:"Huit (8)"},{ar:"تِسْعَة", tr:"Tis'a", fr:"Neuf (9)"},
        {ar:"عَشَرَة", tr:"'Ashara", fr:"Dix (10)"},{ar:"عِشْرُون", tr:"'Ishrun", fr:"Vingt (20)"},
      ],
      examples:[
        {ar:"عِنْدِي ثَلَاثَة كُتُب", fr:"J'ai trois livres"},
        {ar:"أَنَا فِي الصَّفِّ الخَامِس", fr:"Je suis en 5ème classe"},
      ],
      note:"Anecdote : Le mot 'algèbre' vient de l'arabe 'Al-Jabr' (الجبر). L'algèbre a été inventée par le mathématicien arabe Al-Khwarizmi !"
    }
  },
  {
    id:'l05', level:'elementaire', color:'#388BFD',
    title:"La Famille en Arabe",
    arabic:"العَائِلَة",
    desc:"Les membres de la famille et les liens familiaux.",
    xp:25, duration:"15 min",
    content:{
      intro:"En arabe, les liens familiaux sont très précis. L'arabe distingue même le côté maternel et paternel.",
      words:[
        {ar:"أَب / أَبُو", tr:"Ab / Abu", fr:"Père"},{ar:"أُمّ", tr:"Umm", fr:"Mère"},
        {ar:"أَخ", tr:"Akh", fr:"Frère"},{ar:"أُخْت", tr:"Ukht", fr:"Sœur"},
        {ar:"جَدّ", tr:"Jadd", fr:"Grand-père"},{ar:"جَدَّة", tr:"Jadda", fr:"Grand-mère"},
        {ar:"عَمّ", tr:"'Amm", fr:"Oncle paternel"},{ar:"خَال", tr:"Khal", fr:"Oncle maternel"},
        {ar:"عَمَّة", tr:"'Amma", fr:"Tante paternelle"},{ar:"خَالَة", tr:"Khala", fr:"Tante maternelle"},
        {ar:"ابْن", tr:"Ibn", fr:"Fils"},{ar:"بِنْت", tr:"Bint", fr:"Fille"},
        {ar:"زَوْج", tr:"Zawj", fr:"Mari"},{ar:"زَوْجَة", tr:"Zawja", fr:"Femme"},
      ],
      examples:[
        {ar:"أَبِي طَبِيبٌ", fr:"Mon père est médecin"},
        {ar:"أُمِّي مُعَلِّمَة", fr:"Ma mère est enseignante"},
        {ar:"عِنْدِي أَخَانِ وَأُخْتٌ وَاحِدَة", fr:"J'ai deux frères et une sœur"},
      ],
      note:"En Islam, maintenir les liens familiaux (Silat ar-Rahim) est une obligation. Le Prophète ﷺ a dit : 'Quiconque veut que ses provisions soient abondantes, qu'il maintienne les liens familiaux.'"
    }
  },
  {
    id:'l06', level:'elementaire', color:'#388BFD',
    title:"Les Verbes Essentiels",
    arabic:"الأَفْعَال الأَسَاسِيَّة",
    desc:"Les verbes les plus utilisés en arabe quotidien.",
    xp:30, duration:"20 min",
    content:{
      intro:"En arabe, les verbes se conjuguent selon la personne, le genre et le nombre. La racine verbale est généralement 3 lettres.",
      words:[
        {ar:"ذَهَبَ / يَذْهَب", tr:"Dhahaba / Yadhhabu", fr:"Aller (passé/présent)"},
        {ar:"جَاءَ / يَجِيء", tr:"Ja'a / Yaji'u", fr:"Venir"},
        {ar:"أَكَلَ / يَأْكُل", tr:"Akala / Ya'kulu", fr:"Manger"},
        {ar:"شَرِبَ / يَشْرَب", tr:"Shariba / Yashrabu", fr:"Boire"},
        {ar:"قَرَأَ / يَقْرَأ", tr:"Qara'a / Yaqra'u", fr:"Lire"},
        {ar:"كَتَبَ / يَكْتُب", tr:"Kataba / Yaktubu", fr:"Écrire"},
        {ar:"تَكَلَّمَ / يَتَكَلَّم", tr:"Takallama / Yatakallamu", fr:"Parler"},
        {ar:"فَهِمَ / يَفْهَم", tr:"Fahima / Yafhamu", fr:"Comprendre"},
        {ar:"عَرَفَ / يَعْرِف", tr:"'Arafa / Ya'rifu", fr:"Savoir / Connaître"},
        {ar:"أَحَبَّ / يُحِبّ", tr:"Ahabba / Yuhibbu", fr:"Aimer"},
      ],
      examples:[
        {ar:"أَنَا أَقْرَأُ الكِتَابَ", fr:"Je lis le livre"},
        {ar:"هُوَ يَكْتُبُ الدَّرْسَ", fr:"Il écrit la leçon"},
        {ar:"نَحْنُ نَذْهَبُ إِلَى المَسْجِد", fr:"Nous allons à la mosquée"},
      ],
      note:"La racine K-T-B (كتب) donne : Kataba (il a écrit), Kitab (livre), Maktaba (bibliothèque), Maktab (bureau) — l'arabe est une langue très logique !"
    }
  },
  {
    id:'l07', level:'intermediaire', color:'#9E6CF3',
    title:"Le Genre en Arabe",
    arabic:"المُذَكَّر وَالمُؤَنَّث",
    desc:"Masculin et féminin en arabe — règles et exceptions.",
    xp:40, duration:"20 min",
    content:{
      intro:"En arabe, tous les noms ont un genre : masculin (مُذَكَّر) ou féminin (مُؤَنَّث). Le féminin s'obtient généralement en ajoutant la terminaison ة (Ta Marbuta).",
      words:[
        {ar:"مُعَلِّم / مُعَلِّمَة", tr:"Mu'allim / Mu'allima", fr:"Enseignant / Enseignante"},
        {ar:"طَالِب / طَالِبَة", tr:"Talib / Taliba", fr:"Étudiant / Étudiante"},
        {ar:"كَبِير / كَبِيرَة", tr:"Kabir / Kabira", fr:"Grand / Grande"},
        {ar:"صَغِير / صَغِيرَة", tr:"Saghir / Saghira", fr:"Petit / Petite"},
        {ar:"طَوِيل / طَوِيلَة", tr:"Tawil / Tawila", fr:"Grand(e) en hauteur"},
        {ar:"جَمِيل / جَمِيلَة", tr:"Jamil / Jamila", fr:"Beau / Belle"},
      ],
      examples:[
        {ar:"هَذَا كِتَابٌ كَبِير", fr:"C'est un grand livre (masc.)"},
        {ar:"هَذِهِ مَدْرَسَةٌ كَبِيرَة", fr:"C'est une grande école (fém.)"},
      ],
      note:"Les exceptions : certains mots féminins naturels (comme أُمّ = mère, أَرْض = terre) n'ont pas de ة mais sont bien féminins."
    }
  },
  {
    id:'l08', level:'intermediaire', color:'#9E6CF3',
    title:"Les Pronoms Personnels",
    arabic:"الضَّمَائِر",
    desc:"Je, tu, il, nous... en arabe.",
    xp:35, duration:"18 min",
    content:{
      intro:"L'arabe a des pronoms très précis selon le genre et le nombre. Il distingue même le duel (pour 2 personnes) !", 
      words:[
        {ar:"أَنَا", tr:"Ana", fr:"Je / Moi"},
        {ar:"أَنْتَ", tr:"Anta", fr:"Tu (masculin)"},
        {ar:"أَنْتِ", tr:"Anti", fr:"Tu (féminin)"},
        {ar:"هُوَ", tr:"Huwa", fr:"Il / Lui"},
        {ar:"هِيَ", tr:"Hiya", fr:"Elle"},
        {ar:"نَحْنُ", tr:"Nahnu", fr:"Nous"},
        {ar:"أَنْتُمْ", tr:"Antum", fr:"Vous (masculin pluriel)"},
        {ar:"أَنْتُنَّ", tr:"Antunna", fr:"Vous (féminin pluriel)"},
        {ar:"هُمْ", tr:"Hum", fr:"Ils"},
        {ar:"هُنَّ", tr:"Hunna", fr:"Elles"},
      ],
      examples:[
        {ar:"أَنَا مُسْلِمٌ", fr:"Je suis Musulman"},
        {ar:"هُوَ طَالِبٌ", fr:"Il est étudiant"},
        {ar:"نَحْنُ إِخْوَة", fr:"Nous sommes frères"},
      ],
      note:"En arabe, la phrase 'Je suis médecin' se dit أَنَا طَبِيب (Ana Tabib) sans verbe 'être' ! Le présent du verbe être est implicite."
    }
  },
  {
    id:'l09', level:'avance', color:'#E8A838',
    title:"L'Article Défini (ال)",
    arabic:"الحَرْف التَّعْرِيف",
    desc:"Maîtrisez l'article 'AL' et ses transformations phonétiques.",
    xp:50, duration:"25 min",
    content:{
      intro:"En arabe, il n'existe qu'un seul article défini : AL (ال). Cependant, sa prononciation change selon la lettre qui suit, créant les lettres solaires et lunaires.",
      words:[
        {ar:"الشَّمْس", tr:"Ash-shams", fr:"Le soleil — lettre solaire (ش)"},
        {ar:"الْقَمَر", tr:"Al-qamar", fr:"La lune — lettre lunaire (ق)"},
        {ar:"النَّجْم", tr:"An-najm", fr:"L'étoile — lettre solaire (ن)"},
        {ar:"الكِتَاب", tr:"Al-kitab", fr:"Le livre — lettre lunaire (ك)"},
        {ar:"الدِّين", tr:"Ad-din", fr:"La religion — lettre solaire (د)"},
        {ar:"الإِسْلَام", tr:"Al-Islam", fr:"L'Islam — lettre lunaire (ا)"},
      ],
      examples:[
        {ar:"الشَّمْسُ تُشْرِقُ", fr:"Le soleil se lève"},
        {ar:"الكِتَابُ جَمِيل", fr:"Le livre est beau"},
      ],
      note:"Les 14 lettres solaires (حروف شمسية) font assimiler le 'L' de AL : النَّار → 'an-nar' (le feu). Les 14 lettres lunaires gardent le 'L' : القَمَر → 'al-qamar' (la lune)."
    }
  },
  {
    id:'l10', level:'avance', color:'#E8A838',
    title:"Les Temps en Arabe",
    arabic:"الأَزْمِنَة",
    desc:"Passé, présent et futur — conjugaison arabe.",
    xp:60, duration:"30 min",
    content:{
      intro:"L'arabe a deux temps principaux : le passé (الماضي) et le présent/futur (المضارع). Le futur s'exprime avec le préfixe سَـ ou سَوْف.",
      words:[
        {ar:"كَتَبَ", tr:"Kataba", fr:"Il a écrit (passé)"},
        {ar:"يَكْتُبُ", tr:"Yaktubu", fr:"Il écrit / écrira (présent/futur)"},
        {ar:"سَيَكْتُبُ", tr:"Sayaktubu", fr:"Il va écrire (futur proche)"},
        {ar:"سَوْفَ يَكْتُبُ", tr:"Sawfa yaktubu", fr:"Il écrira certainement (futur)"},
        {ar:"كَانَ يَكْتُبُ", tr:"Kana yaktubu", fr:"Il était en train d'écrire (passé continu)"},
      ],
      examples:[
        {ar:"ذَهَبَ إِلَى المَدْرَسَة", fr:"Il est allé à l'école"},
        {ar:"سَأَذْهَبُ غَدًا إِنْ شَاءَ اللهُ", fr:"J'irai demain si Dieu le veut"},
      ],
      note:"'In sha Allah' (إِنْ شَاءَ اللهُ) = 'Si Dieu le veut'. Cette expression est utilisée à chaque fois qu'on parle d'une action future — elle reflète l'humilité face au Décret divin."
    }
  },
  {
    id:'l11', level:'expert', color:'#D4A843',
    title:"La Rhétorique Arabe",
    arabic:"البَلَاغَة العَرَبِيَّة",
    desc:"L'art de l'éloquence dans la langue arabe.",
    xp:100, duration:"45 min",
    content:{
      intro:"La Balaghah (البَلَاغَة) est la science de l'éloquence arabe. Elle étudie comment exprimer les idées de la manière la plus belle et la plus impactante possible. Le Coran est considéré comme le sommet de la rhétorique arabe.",
      words:[
        {ar:"التَّشْبِيه", tr:"At-Tashbih", fr:"La comparaison (comme, tel que)"},
        {ar:"الاسْتِعَارَة", tr:"Al-Isti'ara", fr:"La métaphore"},
        {ar:"الكِنَايَة", tr:"Al-Kinaya", fr:"L'allusion / La métonymie"},
        {ar:"الطِّبَاق", tr:"At-Tibaq", fr:"L'antithèse (opposés)"},
        {ar:"الجِنَاس", tr:"Al-Jinas", fr:"La paronomase (sons similaires)"},
      ],
      examples:[
        {ar:"وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَة", fr:"'Abaisse pour eux l'aile de l'humilité par miséricorde' — Coran 17:24 (métaphore)"},
        {ar:"نُورٌ عَلَى نُور", fr:"'Lumière sur lumière' — Coran 24:35 (gradation)"},
      ],
      note:"Les Arabes de l'époque préislamique excellaient dans la poésie. Quand le Coran fut révélé, ils furent stupéfaits par son niveau littéraire inégalable — c'est le défi du Coran : le i'jaz."
    }
  },
],

VOCABULARY: [
  {ar:"مَرْحَبَاً", tr:"Marhaban", fr:"Bonjour", cat:"Salutations"},
  {ar:"شُكْرًا", tr:"Shukran", fr:"Merci", cat:"Salutations"},
  {ar:"عَفْوًا", tr:"'Afwan", fr:"De rien", cat:"Salutations"},
  {ar:"نَعَم", tr:"Na'am", fr:"Oui", cat:"Salutations"},
  {ar:"لَا", tr:"La", fr:"Non", cat:"Salutations"},
  {ar:"مِنْ فَضْلِك", tr:"Min Fadlik", fr:"S'il vous plaît", cat:"Salutations"},
  {ar:"أَب", tr:"Ab", fr:"Père", cat:"Famille"},
  {ar:"أُمّ", tr:"Umm", fr:"Mère", cat:"Famille"},
  {ar:"أَخ", tr:"Akh", fr:"Frère", cat:"Famille"},
  {ar:"أُخْت", tr:"Ukht", fr:"Sœur", cat:"Famille"},
  {ar:"رَأْس", tr:"Ra's", fr:"Tête", cat:"Corps"},
  {ar:"يَد", tr:"Yad", fr:"Main", cat:"Corps"},
  {ar:"عَيْن", tr:"'Ayn", fr:"Œil", cat:"Corps"},
  {ar:"قَلْب", tr:"Qalb", fr:"Cœur", cat:"Corps"},
  {ar:"خُبْز", tr:"Khubz", fr:"Pain", cat:"Nourriture"},
  {ar:"مَاء", tr:"Ma'", fr:"Eau", cat:"Nourriture"},
  {ar:"لَحْم", tr:"Lahm", fr:"Viande", cat:"Nourriture"},
  {ar:"تَمْر", tr:"Tamr", fr:"Datte", cat:"Nourriture"},
  {ar:"صَلَاة", tr:"Salah", fr:"Prière", cat:"Religion"},
  {ar:"مَسْجِد", tr:"Masjid", fr:"Mosquée", cat:"Religion"},
  {ar:"قُرْآن", tr:"Quran", fr:"Coran", cat:"Religion"},
  {ar:"الله", tr:"Allah", fr:"Dieu", cat:"Religion"},
  {ar:"نَبِيّ", tr:"Nabi", fr:"Prophète", cat:"Religion"},
  {ar:"إِيمَان", tr:"Iman", fr:"Foi", cat:"Religion"},
  {ar:"أَحْمَر", tr:"Ahmar", fr:"Rouge", cat:"Couleurs"},
  {ar:"أَزْرَق", tr:"Azraq", fr:"Bleu", cat:"Couleurs"},
  {ar:"أَخْضَر", tr:"Akhdar", fr:"Vert", cat:"Couleurs"},
  {ar:"أَبْيَض", tr:"Abyad", fr:"Blanc", cat:"Couleurs"},
  {ar:"أَسْوَد", tr:"Aswad", fr:"Noir", cat:"Couleurs"},
  {ar:"ذَهَبِيّ", tr:"Dhahabi", fr:"Doré", cat:"Couleurs"},
  {ar:"وَاحِد", tr:"Wahid", fr:"Un (1)", cat:"Chiffres"},
  {ar:"اثْنَان", tr:"Ithnan", fr:"Deux (2)", cat:"Chiffres"},
  {ar:"ثَلَاثَة", tr:"Thalatha", fr:"Trois (3)", cat:"Chiffres"},
  {ar:"عَشَرَة", tr:"'Ashara", fr:"Dix (10)", cat:"Chiffres"},
  {ar:"مِئَة", tr:"Mi'a", fr:"Cent (100)", cat:"Chiffres"},
  {ar:"شَمْس", tr:"Shams", fr:"Soleil", cat:"Nature"},
  {ar:"قَمَر", tr:"Qamar", fr:"Lune", cat:"Nature"},
  {ar:"نَجْم", tr:"Najm", fr:"Étoile", cat:"Nature"},
  {ar:"بَحْر", tr:"Bahr", fr:"Mer", cat:"Nature"},
  {ar:"جَبَل", tr:"Jabal", fr:"Montagne", cat:"Nature"},
  {ar:"ذَهَبَ", tr:"Dhahaba", fr:"Aller", cat:"Verbes"},
  {ar:"أَكَلَ", tr:"Akala", fr:"Manger", cat:"Verbes"},
  {ar:"قَرَأَ", tr:"Qara'a", fr:"Lire", cat:"Verbes"},
  {ar:"كَتَبَ", tr:"Kataba", fr:"Écrire", cat:"Verbes"},
  {ar:"عَلِمَ", tr:"'Alima", fr:"Savoir", cat:"Verbes"},
  {ar:"كَبِير", tr:"Kabir", fr:"Grand(e)", cat:"Adjectifs"},
  {ar:"صَغِير", tr:"Saghir", fr:"Petit(e)", cat:"Adjectifs"},
  {ar:"جَمِيل", tr:"Jamil", fr:"Beau / Belle", cat:"Adjectifs"},
  {ar:"جَدِيد", tr:"Jadid", fr:"Nouveau / Nouvelle", cat:"Adjectifs"},
  {ar:"قَدِيم", tr:"Qadim", fr:"Ancien(ne)", cat:"Adjectifs"},
],

GRAMMAR: [
  {
    title:"La Phrase Nominale (الجُمْلَة الاسْمِيَّة)",
    desc:"En arabe, une phrase peut exister sans verbe 'être' au présent. Le sujet (مُبْتَدَأ) et le prédicat (خَبَر) forment une phrase complète.",
    example:{ar:"المُحَمَّدُ طَالِبٌ", fr:"Muhammad est étudiant (lit: Muhammad étudiant)"}
  },
  {
    title:"La Phrase Verbale (الجُمْلَة الفِعْلِيَّة)",
    desc:"La phrase verbale commence par un verbe. En arabe classique, le verbe vient avant le sujet.",
    example:{ar:"ذَهَبَ المُعَلِّمُ إِلَى المَدْرَسَة", fr:"L'enseignant est allé à l'école"}
  },
  {
    title:"Le Singulier, Duel et Pluriel",
    desc:"L'arabe distingue : singulier (مُفْرَد), duel (مُثَنَّى — exactement 2) et pluriel (جَمْع — 3 et plus).",
    example:{ar:"كِتَاب / كِتَابَان / كُتُب", fr:"Livre / Deux livres / Livres"}
  },
  {
    title:"Les Cas Grammaticaux (الإِعْرَاب)",
    desc:"L'arabe a 3 cas : nominatif (ضَمَّة ـُ), accusatif (فَتْحَة ـَ) et génitif (كَسْرَة ـِ). Ces voyelles changent selon le rôle dans la phrase.",
    example:{ar:"جَاءَ الرَّجُلُ — رَأَيْتُ الرَّجُلَ — سَلَّمْتُ عَلَى الرَّجُلِ", fr:"L'homme est venu — J'ai vu l'homme — J'ai salué l'homme"}
  },
  {
    title:"Les Racines Trilitères (الجُذُور)",
    desc:"Presque tous les mots arabes dérivent d'une racine de 3 lettres. Ex: K-T-B (écrire) → Kitab, Kataba, Maktab, Maktaba...",
    example:{ar:"كَتَبَ ← كِتَاب ← مَكْتَبَة ← كَاتِب", fr:"Il a écrit ← livre ← bibliothèque ← écrivain"}
  },
  {
    title:"Le Tanwin (التَّنْوِين)",
    desc:"Le tanwin est la marque d'indéfini. On ajoute 'n' à la fin : ـٌ (un), ـً (un, accusatif), ـٍ (un, génitif). Comme le 'un' français.",
    example:{ar:"كِتَابٌ (un livre) / الكِتَابُ (le livre)", fr:"Kitabun = un livre / Al-kitabu = le livre"}
  },
],

HADITHS: [
  {
    narrator:"Abu Darda' (رضي الله عنه)",
    arabic:"تَعَلَّمُوا العِلْمَ قَبْلَ أَنْ يُرْفَعَ، وَرَفْعُهُ ذَهَابُ أَهْلِهِ",
    french:"Apprenez le savoir avant qu'il ne soit enlevé, et son enlèvement c'est la disparition de ses détenteurs.",
    lesson:"L'apprentissage est urgent — chaque jour sans apprendre est une perte.",
    source:"Ibn Majah"
  },
  {
    narrator:"Umar ibn Al-Khattab (رضي الله عنه)",
    arabic:"تَعَلَّمُوا العَرَبِيَّةَ فَإِنَّهَا تُثَبِّتُ العَقْلَ وَتَزِيدُ فِي المُرُوءَة",
    french:"Apprenez l'arabe, car il raffermit l'intellect et augmente la noblesse d'âme.",
    lesson:"L'arabe n'est pas qu'une langue — c'est une formation de l'esprit.",
    source:"Cité par Ibn Kathir"
  },
  {
    narrator:"Ali ibn Abi Talib (رضي الله عنه)",
    arabic:"تَعَلَّمُوا العَرَبِيَّةَ كَمَا تَتَعَلَّمُونَ حِفْظَ الفَرَائِض",
    french:"Apprenez l'arabe comme vous apprenez vos obligations religieuses.",
    lesson:"Ali (ra) plaçait l'apprentissage de l'arabe au même niveau d'importance que les obligations islamiques.",
    source:"Al-Mustadrak d'Al-Hakim"
  },
  {
    narrator:"Ibn Abbas (رضي الله عنه)",
    arabic:"إِذَا أَشْكَلَ عَلَيْكُمْ شَيْءٌ مِنَ القُرْآنِ فَاطْلُبُوهُ مِنَ الشِّعْرِ العَرَبِي",
    french:"Lorsqu'un verset du Coran vous est difficile, cherchez son sens dans la poésie arabe.",
    lesson:"La poésie arabe préislamique est une clé pour comprendre le vocabulaire coranique.",
    source:"Al-Itqan fi 'Ulum al-Quran"
  },
  {
    narrator:"Imam Al-Shafi'i (رحمه الله)",
    arabic:"مَنْ أَرَادَ الدُّنْيَا فَعَلَيْهِ بِالعِلْمِ، وَمَنْ أَرَادَ الآخِرَةَ فَعَلَيْهِ بِالعِلْمِ",
    french:"Quiconque veut ce monde doit posséder le savoir, et quiconque veut l'au-delà doit posséder le savoir.",
    lesson:"Le savoir est la clé du succès ici-bas et dans l'au-delà.",
    source:"Hilyat Al-Awliya'"
  },
  {
    narrator:"Imam Sibawayh (رحمه الله)",
    arabic:"أَصْلُ الكَلَام الاسْمُ وَالفِعْلُ وَالحَرْف",
    french:"La base de la parole [en arabe] est le nom, le verbe et la particule.",
    lesson:"Sibawayh, le père de la grammaire arabe, a résumé toute la langue en 3 catégories fondamentales.",
    source:"Al-Kitab — Sibawayh"
  },
],

TESTS: [
  {
    id:'t01', level:'debutant', title:"Test Débutant",
    desc:"Alphabet, salutations et chiffres de base.",
    minLevel:0, questions:[
      {q:"Comment dit-on 'Merci' en arabe ?", ar:"", opts:["شُكْرًا","مَرْحَبَاً","نَعَم","لَا"], ans:0, exp:"Shukran (شُكْرًا) signifie 'merci' en arabe."},
      {q:"Quelle lettre est-ce ?", ar:"بَ", opts:["Ba (ب)","Ta (ت)","Nun (ن)","Mim (م)"], ans:0, exp:"بَ est la lettre Ba — son 'B' comme dans 'Bateau'."},
      {q:"Que signifie 'Ahlan wa Sahlan' ?", ar:"أَهْلاً وَسَهْلاً", opts:["Au revoir","Bienvenue","Merci","Comment ça va ?"], ans:1, exp:"Ahlan wa Sahlan signifie 'Bienvenue' en arabe."},
      {q:"Comment dit-on 'Trois' en arabe ?", ar:"", opts:["خَمْسَة","اثْنَان","ثَلَاثَة","أَرْبَعَة"], ans:2, exp:"Thalatha (ثَلَاثَة) = Trois."},
      {q:"Quelle est la réponse à 'As-Salamu Alaykum' ?", ar:"السَّلَامُ عَلَيْكُم", opts:["Shukran","Wa Alaykum As-Salam","Marhaban","La"], ans:1, exp:"On répond 'Wa Alaykum As-Salam' — et sur vous la paix."},
      {q:"Que signifie ce mot ?", ar:"مَاء", opts:["Feu","Terre","Eau","Air"], ans:2, exp:"Maa' (مَاء) signifie 'eau' en arabe."},
      {q:"Comment dit-on 'Père' en arabe ?", ar:"", opts:["أُمّ","أَخ","بِنْت","أَب"], ans:3, exp:"Ab (أَب) signifie 'père'."},
      {q:"Quelle lettre est-ce ?", ar:"لَ", opts:["Nun","Lam","Mim","Waw"], ans:1, exp:"لَ est la lettre Lam — son 'L'."},
      {q:"'Afwan' signifie :", ar:"عَفْوًا", opts:["Merci","Bonjour","De rien","Oui"], ans:2, exp:"'Afwan (عَفْوًا) = De rien / Pardon."},
      {q:"Comment dit-on 'Dix' en arabe ?", ar:"", opts:["سَبْعَة","عَشَرَة","ثَمَانِيَة","تِسْعَة"], ans:1, exp:"'Ashara (عَشَرَة) = Dix."},
    ]
  },
  {
    id:'t02', level:'elementaire', title:"Test Élémentaire",
    desc:"Famille, verbes et vocabulaire de base.",
    minLevel:1, questions:[
      {q:"Que signifie 'Umm' ?", ar:"أُمّ", opts:["Sœur","Mère","Tante","Fille"], ans:1, exp:"Umm (أُمّ) = Mère."},
      {q:"Quelle est la racine du mot 'Kitab' (livre) ?", ar:"كِتَاب", opts:["K-T-B","K-T-M","K-R-B","K-B-R"], ans:0, exp:"La racine K-T-B (كتب) signifie 'écrire'."},
      {q:"'Kataba' est au :", ar:"كَتَبَ", opts:["Présent","Futur","Passé","Impératif"], ans:2, exp:"Kataba est le passé de 'écrire' — il a écrit."},
      {q:"Comment dit-on 'Frère' en arabe ?", ar:"", opts:["أَخ","أُخْت","ابْن","عَمّ"], ans:0, exp:"Akh (أَخ) = Frère."},
      {q:"Que signifie 'Yafhamu' ?", ar:"يَفْهَم", opts:["Il écrit","Il mange","Il comprend","Il parle"], ans:2, exp:"Yafhamu vient de Fahima = comprendre."},
      {q:"'Rouge' en arabe :", ar:"", opts:["أَزْرَق","أَخْضَر","أَحْمَر","أَبْيَض"], ans:2, exp:"Ahmar (أَحْمَر) = Rouge."},
      {q:"Que signifie 'Qalb' ?", ar:"قَلْب", opts:["Tête","Main","Cœur","Pied"], ans:2, exp:"Qalb (قَلْب) = Cœur."},
      {q:"Comment dit-on 'Mosquée' ?", ar:"", opts:["مَدْرَسَة","مَسْجِد","بَيْت","مَكْتَبَة"], ans:1, exp:"Masjid (مَسْجِد) = Mosquée."},
    ]
  },
  {
    id:'t03', level:'intermediaire', title:"Test Intermédiaire",
    desc:"Genre, pronoms et grammaire.",
    minLevel:2, questions:[
      {q:"Comment rendre 'Mu'allim' (enseignant) au féminin ?", ar:"مُعَلِّم", opts:["مُعَلِّمُون","مُعَلِّمَة","مُعَلِّمِين","مُعَلِّمَات"], ans:1, exp:"On ajoute ة (Ta Marbuta) : Mu'allima."},
      {q:"Comment dit-on 'Nous' en arabe ?", ar:"", opts:["أَنَا","هُمْ","نَحْنُ","أَنْتَ"], ans:2, exp:"Nahnu (نَحْنُ) = Nous."},
      {q:"Qu'est-ce que le Tanwin ?", ar:"ـٌ / ـً / ـٍ", opts:["L'article défini","La marque du pluriel","La marque d'indéfini","Le féminin"], ans:2, exp:"Le Tanwin est la marque d'indéfini, équivalent de 'un/une'."},
      {q:"Combien de cas grammaticaux a l'arabe ?", ar:"", opts:["2","3","4","5"], ans:1, exp:"L'arabe a 3 cas : nominatif, accusatif et génitif."},
      {q:"Que signifie le duel en arabe ?", ar:"المُثَنَّى", opts:["Plus de 2","Exactement 2","Exactement 3","Indéfini"], ans:1, exp:"Le duel (Muthanna) désigne exactement 2 éléments."},
      {q:"'Hiya' est le pronom pour :", ar:"هِيَ", opts:["Il","Elle","Vous","Ils"], ans:1, exp:"Hiya (هِيَ) = Elle."},
    ]
  },
],

DAILY_HADITHS: [
  {
    arabic:"طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِم",
    text:"La recherche du savoir est une obligation pour tout Musulman.",
    source:"Ibn Majah — Rapporté par Anas ibn Malik (رضي الله عنه)"
  },
  {
    arabic:"خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَه",
    text:"Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.",
    source:"Al-Bukhari"
  },
  {
    arabic:"مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ طَرِيقًا إِلَى الجَنَّة",
    text:"Quiconque emprunte un chemin à la recherche du savoir, Allah lui facilite un chemin vers le Paradis.",
    source:"Muslim"
  },
]

};
