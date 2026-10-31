/*
  내용 업데이트 파일: 여기에 새 항목을 추가하고 저장하면 목록이 최신순으로 정렬됩니다.
  논문 50편은 사용자가 제공한 원문을 그대로 입력했습니다. 서지정보/공개 범위는 공개 전 확인하세요.
  날짜는 YYYY-MM-DD, 발행연도는 숫자 2026 형식을 사용합니다.
  Research Areas 수정 안내:
  - title: 01 옆에 표시되는 소제목
  - image: 소제목 아래에 표시되는 이미지 파일 경로
  - paragraphs: 오른쪽 본문 (문단마다 따옴표로 나눠 입력)
  - note: 본문 아래 추가 안내
  - 순서를 바꾸면 01, 02, 03... 번호도 자동 변경됩니다.
  - 새 항목을 배열 끝에 추가하면 다음 번호가 자동으로 붙습니다.
*/
const siteData = {
  // v13: 관리 페이지에서 수정 가능한 공통 콘텐츠
  home: {
    subtitle: 'Advanced functional materials for meaningful energy and environmental solutions.',
    image: 'assets/lab-placeholder.svg',
    en: ['The **Environmental Energy Material Laboratory** focuses on the design and development of advanced functional materials, particularly Metal–Organic Frameworks (MOFs), through precise synthesis and characterization.', 'Our research explores various energy and environmental applications, including **CO₂ and VOC capture, hydrogen storage, heterogeneous catalysis, and resource recovery and recycling.**'],
    ko: ['MOF의 정밀한 합성과 구조적·물리화학적 특성 분석을 바탕으로, 다양한 응용 분야에 최적화된 기능성 소재를 설계하고 개발합니다.', '특히 **이산화탄소(CO₂) 및 휘발성 유기화합물(VOCs)의 포집, 수소 저장, 불균일 촉매 반응, 자원 회수 및 재활용 공정** 등 에너지·환경 분야의 다양한 응용을 목표로 연구를 수행하고 있습니다.']
  },
  researchActivities: [
    { category:'01 / MATERIALS DESIGN', title:'Materials Synthesis & Characterization', description:'소재 합성 및 구조·물성 분석 프로젝트를 소개하는 자리입니다. 실제 연구 프로젝트에 따라 제목과 내용을 수정해 주세요.' },
    { category:'02 / ENVIRONMENT & ENERGY', title:'Adsorption & Catalytic Applications', description:'흡착 및 촉매 응용에 관한 실험 활동을 정리하는 공간입니다. 확정된 사진과 결과가 준비되면 추가할 수 있습니다.' }
  ],
  professor: {
    name:'이유리', englishName:'Prof. Lee, Yu-Ri', affiliation:'Professor, Department of Chemical Engineering\nKunsan National University', research:'Porous Materials · Adsorption · Catalysis', education:[], experience:[], email:'', photo:''
  },
  gallery: [
    { title:'연구실 단체사진', description:'공개 가능한 사진을 추가하세요', image:'' },
    { title:'학회 및 세미나', description:'사진 업데이트 예정', image:'' },
    { title:'실험실 활동', description:'사진 업데이트 예정', image:'' }
  ],
  contact: {
    labName:'환경에너지소재연구실', englishName:'Environmental Energy Material Laboratory', introduction:'연구 협력 및 연구실 관련 문의를 위한 기본 안내입니다.', university:'국립군산대학교 / Kunsan National University', department:'공식 소속 학과명 확인 후 업데이트', location:'건물 및 호실 확인 후 업데이트', email:'공식 이메일 확인 후 업데이트'
  },

  researchAreas: [
    {
        "title": "Metal–Organic Frameworks",
        "image": "assets/research-01.jpg",
        "imageAlt": "Metal–Organic Frameworks 분야의 연구 사진 (임시 이미지)",
        "caption": "연구 이미지 추가 예정 · 이미지를 교체해 주세요",
        "paragraphs": [
            "다공성 금속–유기 골격체(MOF)의 합성, 구조 및 기공 특성에 관한 연구 소개 영역입니다.",
            "MOF 합성 방법, XRD·BET 등 물성 분석 방법, 구조–특성 상관관계를 소개할 수 있습니다. 연구실에서 공식적으로 공개할 세부 프로젝트와 실제 결과를 확인한 후 이 내용을 수정해 주세요."
        ],
        "note": "대표 논문과 성과는 실제 확인 후 이곳에 연결할 수 있습니다."
    },
    {
        "title": "CO₂ Capture & Conversion",
        "image": "assets/research-02.jpg",
        "imageAlt": "CO₂ Capture & Conversion 분야의 연구 사진 (임시 이미지)",
        "caption": "연구 이미지 추가 예정 · 이미지를 교체해 주세요",
        "paragraphs": [
            "이산화탄소 포집 및 전환을 위한 기능성 소재와 촉매 시스템에 관한 연구 소개 영역입니다.",
            "흡착제·촉매의 설계 원리와 반응·분석 방법을 설명할 수 있습니다. 실험 데이터와 성능 수치는 검증 및 공개 허가 후 게시하는 것을 권장합니다."
        ],
        "note": "대표 논문과 성과는 실제 확인 후 이곳에 연결할 수 있습니다."
    },
    {
        "title": "Water Adsorption",
        "image": "assets/research-03.jpg",
        "imageAlt": "Water Adsorption 분야의 연구 사진 (임시 이미지)",
        "caption": "연구 이미지 추가 예정 · 이미지를 교체해 주세요",
        "paragraphs": [
            "다공성 소재의 수분 흡착 거동과 소재 구조 사이의 연관성에 관한 연구 소개 영역입니다.",
            "수분 흡착 등온선, 상대습도 조건, 기공 크기·부피와 물 흡착량 간의 관계를 설명할 수 있습니다. 세부 연구 범위는 연구실에서 최종 확인해야 합니다."
        ],
        "note": "대표 논문과 성과는 실제 확인 후 이곳에 연결할 수 있습니다."
    }
],

  // 팀 구성원: 실제 정보만 추가하세요. group = postdoctoral / graduate / undergraduate
  // 아래는 형식 설명용이며 실제 회원으로 등록하지 않았습니다.
  // members: [
  //   { group:'graduate', name:'이름', role:'M.S. Student',
  //     education:['B.S. Chemical Engineering, University, 2025'],
  //     email:'name@example.edu', photo:'assets/members/name.jpg', research:'MOF Synthesis' },
  // ],
  members: [],
  // 졸업생: group = graduate / undergraduate. graduationYear가 큰 순서대로 정렬합니다.
  // alumni: [
  //   { group:'graduate', name:'이름', degree:'M.S.', graduationYear:2025,
  //     currentPosition:'현재 소속 (공개 동의 시)', photo:'assets/alumni/name.jpg' },
  // ],
  alumni: [],

  news: [
    // { date: '2026-10-31', title: '연구실 소식 제목', description: '설명', url: '' },
  ],
  // Journal: year(제공된 분류 연도), number(원문 번호), title, authors, source, url(선택).
  // 새 논문은 배열 위쪽에 추가하고 year / number 를 지정하면 연도 내 번호 최신순으로 자동 정렬됩니다.
  journals: [
    {"number": 50, "year": 2026, "title": "Shaping spherical porous carbon beads impregnated with K₂CO₃ for CO2 capture in humid flue gases and indoor air with low pressure drop", "authors": "A Ra Cho, Yooseob Won, Hyungseok Nam, Jaehyeon Park, Sung-Ho Jo, Jae-Young Kim, Young Cheol Park, Youn-Sang Bae, Yu-Ri Lee*", "source": "Separation and Purification Technology, 2026, 389, 9, 136930.", "url": ""},
    {"number": 49, "year": 2025, "title": "Quaternarized chitosan nanofiber and ZIF aerogel composites for synergetic CO2 cycloaddition catalysis", "authors": "Dan Bee Jung, Younghan Song, Yu-Ri Lee, Min Jun Cha, Keunhong Jeong, Jungkyu Choi*, Jongbeom Na*, Jin Young Seo*, Kyung-Youl Baek,", "source": "Carbohydrate polymer, 2025, 347, 122685", "url": ""},
    {"number": 48, "year": 2025, "title": "Catalytic wet peroxide oxidation of methyl orange over bifunctional Pd/Fe-MOF catalysts with in-situ generated H2O2", "authors": "Viet Le Nam Vo, Yu-Ri Lee*, Young-Min Chung", "source": "Molecular Catalysis, 2026, 115297, 584.", "url": ""},
    {"number": 47, "year": 2024, "title": "Multifunctional and Hierarchical Porous ZIF-8: Amine and Thiol Tagged via Mixed Multivariate Ligand Strategies for Enhanced CO2 and Iodine Adsorption", "authors": "Que Thi Nguyen, Jun Young Lee, Yejin Bae, Yu-Ri Lee, Younghan Song, Sang Hoon Kim*, Kyung-Youl Baek, Jongbeom Na*", "source": "ChemSusChem, 2024, 18(4)", "url": ""},
    {"number": 46, "year": 2024, "title": "Boosting catalytic performance for CO2 cycloaddition under mild condition via amine grafting on MIL-101-SO3H catalyst,", "authors": "Que Thi Nguyen, Jongbeom Na, Yu-Ri Lee*, Kyung-Youl Baek*", "source": "Journal of Environmental Chemical Engineering, 2024, 12, 11852.", "url": ""},
    {"number": 45, "year": 2024, "title": "Performance evaluation and sensitivity analysis of polyethyleneimine-based sorbent in a circulating fluidized bed carbon dioxide capture unit", "authors": "Yooseob Won, Jae-Young Kim, Young Cheol Park, Yu-Ri Lee, Sung-Ho Jo, Hyungseok Nam, Minkee Choi, Dong-Ho Lee", "source": "Chemical Engineering Journal, 2024, 498, 155482", "url": ""},
    {"number": 44, "year": 2024, "title": "Synthesis of Hierarchical Mesoporous ZIF-8 Functionalized with 1,2,4-Triazole by Mixed-Ligand Strategy for Enhanced CO2 Fixation Under Atmospheric Pressure", "authors": "Que Thi Nguyen, Yejin Bae, Xuan Huy Do, Sang Hoon Kim, Jongbeom Na, Kyung-Youl Baek*, Yu-Ri Lee*", "source": "Energy & Fuels, 2024, 38, 7097-7107", "url": ""},
    {"number": 43, "year": 2023, "title": "Loop-seal flow characteristics of a circulating fluidized bed for 3 MWth scale chemical looping", "authors": "Daewook Kim, Yooseob Won, Byung Wook Hwang, Jae Young Kim, Hana Kim, Yujin Choi, Yu-Ri Lee, Seung Yong Lee, Sung-Ho Jo, Young Cheol Park, Jeom-In Baek, Hyungseok Nam, Doyeon Lee, Ho Jung, Ryu, Jeong Hoo Choi,", "source": "combustion system, 2023, 1, 127271", "url": ""},
    {"number": 42, "year": 2023, "title": "Utilizing waste carbon residue from spent lithium-ion batteries as an adsorbent for CO2 capture: A recycling perspective", "authors": "Yu-Ri Lee, A. Ra Cho, Seongmin Kim, Rina Kim, Shuang Wang, Yosep Han*, Hyungseok Nam*, Doyeon Lee*", "source": "Chemical Engineering Journal, 2023, 470, 144232", "url": ""},
    {"number": 41, "year": 2023, "title": "Structural design of core-shell zeolitic imidazolate frameworks as an efficient catalyst for CO2 cycloaddition to epoxides", "authors": "Que Thi Nguyen, Keunhong Jeong, Yu-Ri Lee*, Kyung-Youl Baek*", "source": "Journal of CO2 utilization, 2023, 61, 102451", "url": ""},
    {"number": 40, "year": 2022, "title": "Development of high-performance adsorbent using KOH-impregnated rice husk-based activated carbon for indoor CO2 adsorption", "authors": "Shuang Wang, Yu-Ri Lee, Yooseob Won, Hana Kim, Se-Eun Jeong, Byung Wook Hwang, A Ra Cho, Jae, Young Kim, Young Cheol Park, Hyungseok Nam*, Dong-Ho Lee, Hyunuk Kim, Sung-Ho Jo", "source": "Chemical Engineering Journal, 2022, 437, 1, 135378", "url": ""},
    {"number": 39, "year": 2022, "title": "Epoxide functionalization of a pentaethylenehexamine adsorbent supported on macroporous silica for post-combustion CO2 capture", "authors": "A Ra Cho, Hana Kim, Yooseob Won, Yu-Ri Lee, Jae-Young Kim, Hyungseok Nam, Sung-Ho Jo, Young Cheol Park, Dong-Ho Lee", "source": "Fuel, 2022, 325, 124938", "url": ""},
    {"number": 38, "year": 2022, "title": "Highly Tunable Metal-Free Ring Opening Polymerization of Glycidol into Various Controlled Topologies Catalyzed by Frustrated Lewis Pairs", "authors": "Si Eun Kim, Yu-Ri Lee, Minseong Kim, Eunyong Seo, Hyun-Jong Paik, Jin Chul Kim, Ji-Eun Jeong, Young Il Park,* Byeong-Su Kim,* and Sang-Ho Lee", "source": "Polymer Chemistry 2022, 13 ,(9), 1243-1252", "url": ""},
    {"number": 37, "year": 2022, "title": "Experimental investigation of plastic waste pyrolysis fuel and diesel blends combustion and its flue gas emission analysis in a 5 kW heater", "authors": "Shuang Wang, David Aaron Rodriguez Alejandro, Hana Kim, Jae-Young Kim, Yu-Ri Lee, Walid Nabgan, Byung Wook Hwang, Doyeon Lee, Hyungseok Nam*, Ho-Jung Ryu", "source": "Energy, 2022, 247, 123408", "url": ""},
    {"number": 36, "year": 2021, "title": "Dual-functionalized ZIF-8 as an efficient acid-base bifunctional catalyst for the one-pot tandem reaction", "authors": "Yu-Ri Lee, Xuan Huy Do, Seung Sang Hwang, Kyung-Youl Baek", "source": "Catalysis Today, 2021, 359, 124-132", "url": ""},
    {"number": 35, "year": 2021, "title": "Sonochemical synthesis of Zr-based porphyrinic MOF-525 and MOF-545: Enhancement in catalytic and adsorption properties", "authors": "Kwangsun Yu, Yu-Ri Lee, Jin Young Seo, Kyung-Youl Baek, Young-Min Chung, Wha-Seung Ahn", "source": "Catalysis Today, 2021, 359, 124-132.", "url": ""},
    {"number": 34, "year": 2021, "title": "Electrocatalytic Oxygen Reduction over Co@Co3O4/N-doped Porous Carbon Derived from Pyrolysis of ZIF-8/67 on Cellulose Nanofibers", "authors": "Yu-Ri Lee, Hyeonseok Yoo, Jin sub Choi, Wha-Seung Ahn", "source": "Cellulose, 2020, 27, 2723–2735", "url": ""},
    {"number": 33, "year": 2020, "title": "Amine-functionalized bimetallic Co/Zn-zeolitic imidazolate frameworks as an efficient catalyst for the CO2 cycloaddition to epoxides under mild conditions", "authors": "Que Thi Nguyen, Xuan Huy Do, Kie Yong Cho, Yu-Ri Lee*, Kyung-Youl Baek*", "source": "Journal of CO2 utilization, 2022, 61, 102061", "url": ""},
    {"number": 32, "year": 2020, "title": "Amine-Functionalized Zeolitic Imidazolate Framework-8 (ZIF-8) Nanocrystals for Adsorption of Radioactive Iodine", "authors": "Yu-Ri Lee, Xuan Huy Do, Kie Yong Cho, Keunhong Jeong, Kyung-Youl Baek*", "source": "ACS Appl. Nano Mater. 2020, 3, 10, 9852–9861.", "url": ""},
    {"number": 31, "year": 2019, "title": "Poly(amidoamine) dendrimer immobilized on mesoporous silica foam (MSF) and fibrous nano-silica KCC-1 for Gd3+ adsorption in water", "authors": "Yu-Ri Lee, Siqian Zhang, Kwangsun Yu, Jin sub Choi, Wha-Seung Ahn", "source": "Chemical Engineering Journal, 2019, 378, 122133.", "url": ""},
    {"number": 30, "year": 2019, "title": "Ionic liquid entrapped UiO-66: Efficient adsorbent for Gd3+ capture from water", "authors": "Imteaz Ahmed, Keshab Kumar Adhikary, Yu-Ri Lee, Kyung Ho Row, Kyoung-Ku Kang, Wha-Seung Ahn*", "source": "Chemical Engineering Journal, 2019, 370, 792-799", "url": ""},
    {"number": 29, "year": 2019, "title": "Gd3+ adsorption over carboxylic- and amino-group dual-functionalized UiO-66", "authors": "Imteaz Ahmed, Yu-Ri Lee, Kwangsun Yu, Samiran Bhattacharjee, Wha-Seung Ahn*", "source": "Industrial & Engineering Chemistry Research, 2019,58, 2324-2332.", "url": ""},
    {"number": 28, "year": 2019, "title": "Fly-ash derived mesoporous silica foams for CO2 capture and aqueous Nd3+ adsorption", "authors": "Siqian Zhang, Seenu Ravi, Yu-Ri Lee, Ji-Whan, Ahn, Wha-Seung Ahn*", "source": "Journal of Industrial and Engineering Chemistry, 2019, 72, 241-249.", "url": ""},
    {"number": 27, "year": 2018, "title": "Adsorption of volatile organic compounds over MIL-125-NH2", "authors": "Bo-mi Kim, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Polyhedron, 2018, 154, 343-349.", "url": ""},
    {"number": 26, "year": 2018, "title": "Selective adsorption of rare earth elements over functionalized Cr-MIL-101", "authors": "Yu-Ri Lee, Kwangsun Yu, Seenu Ravi, Wha-Seung Ahn*", "source": "ACS Applied Materials & Interfaces, 2018, 10 (28), 23918-23927.", "url": ""},
    {"number": 25, "year": 2018, "title": "Effects of polydimethylsiloxane coating of Ni-MOF-74 on CH4 storage", "authors": "Yu-Ri Lee, Sung min Cho, Wha-Seung Ahn*", "source": "Korean J. Chem. Eng., 2018, 35(7), 1542-1546.", "url": ""},
    {"number": 24, "year": 2018, "title": "EDTA-functionalized KCC-1 and KIT-6 mesoporous silicas for Nd3+ ion recovery from aqueous solutions", "authors": "Seenu Ravi, Siqian Zhang, Yu-Ri Lee, Kyoung-Ku Kang, Ji-Man Kim, Ji-Whan Ahn, Wha-Seung Ahn*", "source": "J. Ind. Eng. Chem.2018, 67, 210-218", "url": ""},
    {"number": 23, "year": 2018, "title": "Sodium silicate insulating foam reinforced with acid-treated fly ash", "authors": "Siqian Zhang, Yu-Ri Lee, Ji-Whan Ahn, Wha-Seung Ahn*", "source": "Materials letters, 2018, 216, 56-59", "url": ""},
    {"number": 22, "year": 2018, "title": "Pd nanoparticles on a microporous covalent triazine polymer for H2 production via formic acid decomposition", "authors": "Siqian Zhang, Yu-Ri Lee, Young-Min Chung, Wha-Seung Ahn*", "source": "Materials letters, 2018, 215, 211-213", "url": ""},
    {"number": 21, "year": 2017, "title": "Transfer hydrogenation of nitrobenzene to aniline in water using Pd nanoparticles immobilized on amine-functionalized UiO-66", "authors": "Chinna Krishna Prasad Neeli, Pillaiyar Puthiaraj, Yu-Ri Lee, Young-Min Chung , Sung-Hyeon Baeck, Wha Seung Ahn*", "source": "Catalysis Today, 2017, 9, 4570-4579.", "url": ""},
    {"number": 20, "year": 2017, "title": "Benzene triamido-tetraphosphonic acid immobilized on mesoporous silica for adsorption of Nd3+ ions in aqueous solution", "authors": "Seenu Ravi, Yu-Ri Lee, Kwangsun Yu, Ji-Whan Ahn, Wha-Seung Ahn*", "source": "Miropor. Mesopor. Mater., 2017, 258, 62-71.", "url": ""},
    {"number": 19, "year": 2017, "title": "Oxidation of tetralin to 1-tetralone over CrAPO-5", "authors": "S. Bhattacharjee, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Korean J. Chem. Eng., 2017, 34, 701.", "url": ""},
    {"number": 18, "year": 2017, "title": "Synthesis of nanoporous materials via recycling coal fly ash and other solid wastes: A mini review", "authors": "Yu-Ri Lee, June Thet Soe, Siqian Zhang, Ji-Whan Ahn, Min Bum Park, Wha-Seung Ahn*", "source": "Chemical Engineering Journal, 2017, 317, 821–843.", "url": ""},
    {"number": 17, "year": 2017, "title": "Microporous amine-functionalized aromatic polymers and their carbonized products for CO2 adsorption", "authors": "Pillaiyar Puthiaraj, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Chemical Engineering Journal, 2017, 319, 65-74.", "url": ""},
    {"number": 16, "year": 2017, "title": "Extrapolation of the Clausius-Clapeyron plot for estimating the CO2 adsorption capacities of zeolites at moderate temperature conditions", "authors": "Yu-Ri Lee, Seung-Hwan Hong, Wha-Seung Ahn*", "source": "Korean J. Chem. Eng., 2017, 34(1), 37-40.", "url": ""},
    {"number": 15, "year": 2016, "title": "Triazine-based covalent organic polymers: design, synthesis and applications in heterogeneous catalysis", "authors": "Pillaiyar Puthiaraj, Yu-Ri Lee, Siqian Zhang, Wha-Seung Ahn*", "source": "J. Mater. Chem. A, 2016, 4, 16288-16311.", "url": ""},
    {"number": 14, "year": 2016, "title": "Ti-MIL-125-NH2 membrane grown on a TiO2 disc by combined microwave/ultrasonic heating: facile synthesis for catalytic application", "authors": "Yu-Ri Lee, Sung-Min Cho, Sung-Hyeon Baeck, Wha-Seung Ahn*,Won-Seung Cho", "source": "RSC Adv., 2016, 6, 63286-63290.", "url": ""},
    {"number": 13, "year": 2016, "title": "CO2 Capture and Ca2+ Exchange Using Zeolite A and 13X Prepared from Power Plant Fly Ash", "authors": "June Thet Soe, Su-Sung Kim, Yu-Ri Lee, Ji-Whan Ahn, Wha-Seung Ahn*", "source": "Bull. Korean Chem. Soc. 2016, Vol. 37, 490–493.", "url": ""},
    {"number": 12, "year": 2016, "title": "CO2 Adsorption Over Metal-Organic Frameworks: A Mini Review", "authors": "Chao Chen, Yu-Ri Lee, Wha-Seung Ahn*", "source": "J. Nanosci. Nanotechnol., 2016, Vol. 16, No. 5, 4291-4301.", "url": ""},
    {"number": 11, "year": 2015, "title": "Metal–Organic Frameworks for Catalysis", "authors": "Samiran Bhattacharjee, Yu-Ri Lee, Pillaiyar Puthiaraj, Sung-Min Cho, Wha-Seung Ahn*", "source": "Catal. Surv. Asia, 2015, 19(4), 203-222.", "url": ""},
    {"number": 10, "year": 2015, "title": "Facile synthesis of an IRMOF-3 membrane on porous Al2O3 substrate via a sonochemical route", "authors": "Yu-Ri Lee, Sung-Min Cho, Wha-Seung Ahn*, Chi-Hoon Lee, Kyu-Ho Lee, Won-Seung Cho*", "source": "Micropor. Mesopor. Mater., 2015, 213, 161-168.", "url": ""},
    {"number": 9, "year": 2015, "title": "ZIF-8: A comparison of synthesis methods", "authors": "Yu-Ri Lee, Min-Seok Jang, Hye-Young Cho, Hee-Jin Kwon, Sangho Kim, Wha-Seung Ahn*", "source": "Chemical Engineering Journal, 2015, 271, 276–280.", "url": ""},
    {"number": 8, "year": 2015, "title": "Pilot-scale synthesis of a zirconium-benzenedicarboxylate UiO-66 for CO2 adsorption and catalysis", "authors": "Se-Na Kim, Yu-Ri Lee, Seung-Hwan Hong, Min-Seok Jang, Wha-Seung Ahn*", "source": "Catalysis Today, 2015, 245, 54–60.", "url": ""},
    {"number": 7, "year": 2015, "title": "Microporous covalent triazine polymers: efficient Friedel-Crafts synthesis and adsorption/storage of CO2 and CH4", "authors": "Pillaiyar Puthiaraj, Sung-Min Cho, Yu-Ri Lee, Wha-Seung Ahn*", "source": "J. Mater. Chem. A, 2015, 3, 6792-6797.", "url": ""},
    {"number": 6, "year": 2015, "title": "Direct Synthesis of Hydrogen Peroxide from Hydrogen and Oxygen over Pd-supported Metal-Organic Framework Catalysts", "authors": "Young-Min Chung, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Bull. Korean Chem. Soc., 2015, Vol. 36, 1378–1383.", "url": ""},
    {"number": 5, "year": 2015, "title": "Post-synthesis functionalization of a zeolitic imidazolate structure ZIF-90: a study on removal of Hg(II) from water and epoxidation of alkenes", "authors": "Samiran Bhattacharjee, Yu-Ri Lee, Wha-Seung Ahn*", "source": "CrystEngComm, 2015, 17, 2575-2582.", "url": ""},
    {"number": 4, "year": 2015, "title": "CO2 Cycloaddition of Epichlorohydrin over NH2 Functionalized MIL-101", "authors": "Min-Seok Jang, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Bull. Korean Chem. Soc, 2015, 36, 363-366.", "url": ""},
    {"number": 3, "year": 2014, "title": "A new site-isolated acid–base bifunctional metal–organic framework for one-pot tandem reaction", "authors": "Yu-Ri Lee, Young-Min Chung*, Wha-Seung Ahn*", "source": "RSC Adv., 2014, 4, 23064-23067.", "url": ""},
    {"number": 2, "year": 2013, "title": "Dry-gel conversion synthesis of Cr-MIL-101 aided by grinding: high surface area and high yield synthesis with minimum purification", "authors": "Jun Kim, Yu-Ri Lee, Wha-Seung Ahn*", "source": "Chem. Commun., 2013, 49, 7647-7649.", "url": ""},
    {"number": 1, "year": 2013, "title": "Synthesis of metal-organic frameworks: A mini review", "authors": "Yu-Ri Lee, Jun Kim, Wha-Seung Ahn*", "source": "Korean J. Chem. Eng., 2013, 30(9), 1667-1680.", "url": ""},
  ],
  patents: [
    // { year: 2026, title: '특허 제목', meta: '출원번호 또는 등록번호', url: '' },
  ],
};
