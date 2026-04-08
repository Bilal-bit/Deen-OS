export interface Zikr {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  reference: string;
}

export const morningAzkar: Zikr[] = [
  { id: 1, arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', transliteration: "Asbahna wa asbahal-mulku lillah", translation: 'We have reached the morning and sovereignty belongs to Allah.', count: 1, reference: 'Muslim' },
  { id: 2, arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namut wa ilaykan-nushur", translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.', count: 1, reference: 'Tirmidhi' },
  { id: 3, arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory be to Allah and His is the praise.', count: 100, reference: 'Muslim' },
  { id: 4, arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ala kulli shayin qadir', translation: 'There is no god but Allah alone with no partner. His is the dominion and His is the praise, and He is Able to do all things.', count: 10, reference: 'Bukhari & Muslim' },
  { id: 5, arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', transliteration: 'Astaghfirullaha wa atubu ilayh', translation: 'I seek the forgiveness of Allah and repent to Him.', count: 100, reference: 'Bukhari & Muslim' },
  { id: 6, arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي', transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari", translation: "O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight.", count: 3, reference: 'Abu Dawud' },
  { id: 7, arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim", translation: 'In the Name of Allah, with whose Name nothing can harm on earth or in heaven. He is the All-Hearing, All-Knowing.', count: 3, reference: 'Abu Dawud & Tirmidhi' },
  { id: 8, arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa Rabbul-'Arshil-'Azim", translation: 'Allah is sufficient for me. There is no god but He. In Him I put my trust, and He is the Lord of the Mighty Throne.', count: 7, reference: 'Abu Dawud' },
];

export const eveningAzkar: Zikr[] = [
  { id: 1, arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', transliteration: "Amsayna wa amsal-mulku lillah", translation: 'We have reached the evening and sovereignty belongs to Allah.', count: 1, reference: 'Muslim' },
  { id: 2, arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namut wa ilaykal-masir", translation: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.', count: 1, reference: 'Tirmidhi' },
  { id: 3, arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory be to Allah and His is the praise.', count: 100, reference: 'Muslim' },
  { id: 4, arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', transliteration: "A'udhu bi kalimatillahit-tammati min sharri ma khalaq", translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.', count: 3, reference: 'Muslim' },
  { id: 5, arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ', transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah", translation: 'O Allah, I ask You for pardon and well-being in this life and the hereafter.', count: 3, reference: 'Abu Dawud & Tirmidhi' },
  { id: 6, arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', transliteration: 'Astaghfirullaha wa atubu ilayh', translation: 'I seek the forgiveness of Allah and repent to Him.', count: 100, reference: 'Bukhari & Muslim' },
  { id: 7, arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ', transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan", translation: 'O Allah, I seek refuge in You from worry and grief.', count: 1, reference: 'Bukhari' },
  { id: 8, arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ', transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa Rabbul-'Arshil-'Azim", translation: 'Allah is sufficient for me. There is no god but He. In Him I put my trust, and He is the Lord of the Mighty Throne.', count: 7, reference: 'Abu Dawud' },
];
