// 확장용 성장 콘텐츠. 효과는 조사·설득·행동과 이력에 누적된다.
const families=[
{id:'university',name:'대학 관계자의 집',text:'책과 방문객이 많은 집. 가족은 당신이 학업을 이어가길 바란다.',bonus:[8,0,0],hook:'가족의 연구 노트'},
{id:'worker',name:'공장 노동자의 집',text:'넉넉하지 않지만 이웃들이 서로 돕는다. 일찍부터 손으로 일하는 법을 배웠다.',bonus:[0,0,8],hook:'강변 노동자들의 증언'},
{id:'merchant',name:'골동품상의 집',text:'낯선 물건과 거래처 사이에서 자랐다. 장부에는 설명되지 않는 빚이 있다.',bonus:[3,5,0],hook:'출처 불명의 유품'},
{id:'medical',name:'의료인의 집',text:'집에서도 환자의 소식을 들었다. 가족이 끝내 말하지 않은 환자가 있다.',bonus:[5,3,0],hook:'봉투에 숨긴 진료 기록'},
{id:'fallen',name:'몰락한 명문가',text:'큰 집에 남은 것은 오래된 이름과 닫힌 방이다. 집을 유지할 돈은 부족하다.',bonus:[0,5,3],hook:'닫힌 방의 유산'}
];
const growthStages=[
{year:1906,title:'어린 날의 관심',text:'1900년에 태어난 당신은 이제 여섯 살이다. 오래 기억할 하루를 고른다.',choices:[
{text:'사서가 읽어주는 이야기에 귀를 기울인다',bonus:[7,0,0],trait:'사서에게 배운 아이'},
{text:'이웃 아이들과 골목을 누빈다',bonus:[0,4,3],trait:'골목의 친구들'},
{text:'강가에서 받은 녹슨 열쇠를 간직한다',bonus:[3,0,4],trait:'녹슨 열쇠'}]},
{year:1912,title:'배움과 집안일',text:'열두 살. 학교 밖에서도 배울 것은 많다. 당신의 시간을 어디에 쓸까?',choices:[
{text:'장학금 시험을 준비한다',bonus:[8,0,0],trait:'장학금으로 공부했다'},
{text:'집안일을 도우며 손님과 이야기한다',bonus:[0,8,0],trait:'집안의 일을 도왔다'},
{text:'수리공에게 도구 쓰는 법을 배운다',bonus:[2,0,6],trait:'손으로 익힌 기술'}]},
{year:1916,title:'첫 진로',text:'열여섯 살. 앞으로의 삶을 준비한다. 지금 고른 길은 최종 직업을 정할 때 도움이 된다.',choices:[
{text:'대학 진학을 준비한다',bonus:[10,0,0],trait:'대학 진학 준비',routes:['대학 연구원','의사']},
{text:'신문사에서 심부름을 시작한다',bonus:[4,6,0],trait:'신문사 견습',routes:['신문 기자']},
{text:'탐정 사무소의 조수가 된다',bonus:[4,0,6],trait:'탐정 사무소 조수',routes:['사립탐정']},
{text:'골동품 가게에서 도제로 일한다',bonus:[4,6,0],trait:'골동품상 도제',routes:['골동품상']}]} 
];

// 수치와 조건은 콘텐츠 내부에만 두고, 선택 화면에는 지문만 노출한다.
const careers=[
{id:'researcher',name:'대학 연구원',bonus:[18,0,0],description:'자료와 오래된 언어를 다루며 대학에서 일한다.'},
{id:'reporter',name:'신문 기자',bonus:[8,14,0],description:'제보와 사람들의 이야기를 기사로 옮긴다.'},
{id:'detective',name:'사립탐정',bonus:[10,0,14],description:'실종과 비밀을 의뢰받아 발로 뛰며 조사한다.'},
{id:'doctor',name:'의사',bonus:[12,8,0],description:'환자를 돌보며 병원과 검시 기록을 접한다.'},
{id:'dealer',name:'골동품상',bonus:[8,12,0],description:'물건의 출처를 읽고 수집가들과 거래한다.'},
{id:'librarian',name:'사서',bonus:[16,4,0],description:'책과 기록을 정리하며 사라진 자료를 추적한다.'},
{id:'police',name:'경찰관',bonus:[0,8,16],description:'거리의 질서를 지키며 신고와 수사에 참여한다.'},
{id:'mechanic',name:'수리공',bonus:[6,0,18],description:'기계와 구조물을 살피며 현장의 사람들과 일한다.'}
];
const evidenceNames={diary:'미래 날짜의 일기',ledger:'강변 화물 장부',chant:'낡은 찬송가',star:'천문대 관측 기록',map:'숨은 방의 지도'};
const ordinaryNotes={child:['학교와 집을 오가는 평범한 날들이 이어졌다.','이웃의 안부와 계절의 변화를 작은 수첩에 적었다.','책과 놀이 사이에서 한 해가 지나갔다.'],adult:['생업을 이어가며 익숙한 얼굴들과 안부를 나누었다.','특별한 사건 없이 계절이 바뀌었다.','밀린 일을 마치고 오래된 편지를 정리했다.'],later:['젊은 이들에게 예전 아캄의 이야기를 들려주었다.','익숙한 길을 천천히 걷고 집으로 돌아왔다.','옛 인연의 편지를 다시 읽으며 한 해를 보냈다.']};
const caseEvents=[
{id:'inheritance',title:'이름 없는 유산',text:'숙부가 남긴 일기의 마지막 기록은 내일 날짜다. 잉크는 아직 마르지 않았다.',choices:[
{text:'흐려진 글씨를 밤새 비교해 내일의 장소를 찾아낸다.',skill:'조사',difficulty:1,evidence:'diary',san:-4,success:'기록 속 주소를 찾아냈다.',failure:'주소는 드러났지만 글씨가 눈앞에서 움직였다.'},
{text:'옛 인연을 찾아 일기의 출처를 함께 확인한다.',skill:'설득',difficulty:1,evidence:'diary',san:-2,bond:1,success:'함께 읽은 기록이 당신을 현실에 붙들었다.',failure:'상대는 도움을 주었지만 다시 이 이야기를 꺼내지 말라고 했다.'},
{text:'일기를 서랍에 넣고 당분간 평범한 일상에 머문다.',san:4,hp:2,success:'기록은 숨겼지만 날짜에 적힌 주소는 기억에 남았다.',evidence:'diary'}]},
{id:'river',title:'강변의 실종',text:'일기에 적힌 사람이 사라졌다. 강변 창고의 관리인은 장부를 숨기고 당신을 경계한다.',choices:[
{text:'작업자들과 천천히 이야기를 나누며 화물의 행방을 묻는다.',skill:'설득',difficulty:1,evidence:'ledger',san:-2,success:'작업자가 창고의 장부를 건넸다.',failure:'장부는 얻었지만 당신의 이름이 관리인에게 알려졌다.'},
{text:'단 한 번의 순찰 공백에 좁은 창문을 넘어 장부를 가져온다.',skill:'행동',difficulty:2,evidence:'ledger',hp:-2,success:'아무도 눈치채지 못한 채 장부를 가지고 나왔다.',failure:'장부를 움켜쥐었지만 떨어지며 다쳤다.'},
{text:'실종자의 가족과 함께 공개 수색을 요청한다.',evidence:'ledger',bond:1,risk:1,success:'수색 중 장부의 사본을 찾았다. 창고의 주인도 수색을 지켜보았다.'}]},
{id:'library',title:'닫힌 서가',text:'화물 목록에 적힌 책이 폐쇄 서가에 있다. 여백의 노래는 강변에서 들린 것과 닮았다.',choices:[
{text:'서로 모순되는 주석에서 단 하나의 원문을 복원한다.',skill:'조사',difficulty:2,evidence:'chant',san:-3,success:'흩어진 구절에서 의식의 노래를 복원했다.',failure:'노래는 옮겨 적었지만 반복되는 구절이 머릿속에 남았다.'},
{text:'사서에게 옛 대출 기록을 보여주고 책을 함께 읽어 달라고 한다.',skill:'설득',difficulty:1,evidence:'chant',san:-1,success:'사서가 잘못된 구절을 바로잡아 주었다.',failure:'필요한 페이지는 얻었지만 사서의 신뢰를 잃었다.'},
{text:'필요한 페이지를 복사한 뒤 책을 다시 잠근다.',evidence:'chant',risk:1,success:'구절을 확보했다. 해석하지 않은 부분은 여전히 수수께끼다.'}]},
{id:'observatory',title:'언덕 위의 천문대',text:'의식에 쓰인 날짜는 별들의 배열과 맞물린다. 망원경은 하늘이 아닌 강변을 향하고 있다.',choices:[
{text:'오차가 가득한 수십 년의 관측에서 정확한 밤을 계산한다.',skill:'조사',difficulty:2,evidence:'star',san:-3,success:'다음 의식의 날짜와 봉인의 자리를 계산했다.',failure:'날짜는 알아냈지만 관측자의 악몽을 함께 읽어버렸다.'},
{text:'관리인의 기억을 차분히 되짚으며 마지막 관측지를 찾는다.',skill:'설득',difficulty:1,evidence:'star',success:'관리인은 숨겨두었던 관측 일지를 건넸다.',failure:'일지는 얻었지만 관리인은 다시 만나기를 거부했다.'},
{text:'어린 시절 간직한 열쇠로 지하 관측실을 연다.',requiresTrait:'녹슨 열쇠',evidence:'star',san:-1,success:'열쇠가 맞았다. 어린 시절의 만남은 우연이 아니었다.'}]},
{id:'ritual',title:'기록이 가리킨 밤',text:'일기는 미래를 예측하는 것이 아니라 적힌 일을 불러오는 듯하다. 마지막 페이지에는 당신과 가까운 사람의 이름이 있다.',choices:[
{text:'모아 온 노래와 관측 기록을 맞춰, 틀림없는 순서로 봉인을 완성한다.',skill:'조사',difficulty:2,requiresEvidence:['chant','star'],san:-5,resolution:'sealed',success:'마지막 구절이 사라졌다. 아침이 찾아왔다.',failure:'의식은 끊었지만 봉인을 닫지는 못했다. 다시 준비할 시간이 필요하다.'},
{text:'사람들을 대피시키고 일기와 창고를 함께 불태운다.',skill:'행동',difficulty:1,hp:-3,resolution:'destroyed',success:'일기는 재가 되었다. 살아남은 사람들의 이름을 기록했다.',failure:'사람들은 빠져나왔지만 일기는 불길 속에서 사라졌다.'},
{text:'일기가 요구하는 새로운 이름을 적고 거래를 받아들인다.',san:-8,resolution:'bargain',success:'당신의 사람은 돌아왔다. 대신 일기에 낯선 이름이 생겼다.'},
{text:'가까운 사람과 아캄을 떠나 기록에서 멀어진다.',bond:1,resolution:'escaped',success:'짐을 꾸렸다. 아캄은 멀어졌지만 그 밤을 잊지는 못했다.'}]}
];
const ambientEvents=[
{id:'wall',title:'벽 너머의 두드림',text:'빈방에서 세 번의 두드림이 들린다. 집주인은 그 방이 존재하지 않는다고 한다.',choices:[{text:'옛 도면을 찾아 사라진 방의 위치를 비교한다.',skill:'조사',difficulty:1,evidence:'map',san:-2,success:'도면에 강변으로 이어지는 통로가 있었다.',failure:'도면을 찾았지만 밤새 두드림을 들었다.'},{text:'두드림이 멎는 짧은 순간에 벽 뒤를 살핀다.',skill:'행동',difficulty:2,hp:-2,success:'차가운 통로의 입구를 닫았다.',failure:'벽 뒤의 어둠에 손을 다쳤다.'},{text:'며칠 다른 곳에서 지내며 잠을 보충한다.',hp:3,san:4,success:'새 거처에서는 편히 잠들었다.'}]},
{id:'club',before:1934,title:'벨벳 커튼의 클럽',text:'금주법 아래 숨은 술집에서 가수가 당신만 아는 기억을 노래한다.',choices:[{text:'노래 사이에 자연스럽게 끼어들어 가수의 이야기를 묻는다.',skill:'설득',difficulty:1,san:-2,success:'가수는 오래된 후원자의 이름을 알려주었다.',failure:'가수는 말을 멈췄다. 손님들이 당신을 바라보았다.'},{text:'아무도 보지 못하도록 가수를 따라 복잡한 뒷길을 통과한다.',skill:'행동',difficulty:2,san:-3,success:'뒷문에 붙은 의식의 표식을 지웠다.',failure:'뒷길에서 한 시간이 사라졌다.'},{text:'밖으로 나와 친구와 시간을 보낸다.',san:4,bond:1,success:'익숙한 목소리가 당신을 현실에 붙들었다.'}]},
{id:'practice',title:'몸에 남는 습관',text:'규칙적인 산책과 가벼운 훈련을 함께하자는 제안이 왔다.',choices:[{text:'계절이 바뀌어도 꾸준히 훈련을 이어간다.',hpMax:3,hp:4,longevity:1,success:'숨이 덜 차고 몸이 한결 튼튼해졌다.'},{text:'짧은 산책만 하고 남은 시간은 일에 쓴다.',hp:3,success:'익숙한 생활의 리듬을 되찾았다.'}]},
{id:'anchor',title:'마음을 붙드는 시간',text:'오래된 친구가 정기적으로 편지를 주고받자고 한다.',choices:[{text:'괴로운 기억도 조금씩 글로 나누며 관계를 이어간다.',sanMax:4,san:5,bond:1,success:'혼자 감당할 필요가 없다는 사실이 마음의 자리를 넓혔다.'},{text:'가벼운 안부를 전하고 직접 만나 차를 마신다.',san:4,bond:1,success:'친숙한 대화 속에서 마음을 쉬었다.'}]},
{id:'work',title:'직장에서의 부탁',text:'동료가 설명하기 어려운 누락 기록을 함께 확인해 달라고 한다.',choices:[{text:'작은 불일치들을 차례로 모아 기록을 다시 정리한다.',skill:'조사',difficulty:1,success:'빠진 기록을 되찾고 동료의 신뢰를 얻었다.',failure:'기록은 정리했지만 밤을 새워 지쳤다.',bond:1},{text:'서로 입장이 다른 사람들을 한자리에 불러 합의를 이끈다.',skill:'설득',difficulty:2,success:'불편했던 관계에 대화가 시작됐다.',failure:'논쟁은 끝났지만 뒷말이 남았다.'},{text:'당장 필요한 실무를 맡아 동료의 짐을 덜어준다.',hp:-1,bond:1,success:'함께 일을 마치고 늦은 저녁을 먹었다.'}]},
{id:'legacy',minAge:55,title:'다음 사람에게',text:'젊은 동료가 당신의 오래된 수첩에 관심을 보인다.',choices:[{text:'위험했던 선택까지 솔직히 설명하며 수첩을 물려준다.',sanMax:2,san:3,bond:1,success:'당신의 경험이 누군가의 길잡이가 되었다.'},{text:'평범한 삶의 기록만 골라 이야기를 들려준다.',san:4,success:'어떤 기억은 당신만 간직하기로 했다.'}]}
];
// 재산과 수입은 게임 균형용 수치이며 역사적 가계 소득의 재현이 아니다.
const familyEconomy={university:{wealth:300,annual:18},worker:{wealth:60,annual:6},merchant:{wealth:240,annual:14},medical:{wealth:360,annual:20},fallen:{wealth:120,annual:-3}};
const careerEconomy={researcher:120,reporter:96,detective:110,doctor:180,dealer:130,librarian:90,police:100,mechanic:105};
const ANNUAL_LIVING_COST=72;
const treatments={hospital:{name:'병원 진료',cost:20,hp:12,text:'진료와 휴식으로 몸을 회복했다.'},sanatorium:{name:'정신병원 요양',cost:30,san:18,text:'안정된 환경에서 치료를 받고 마음을 추슬렀다.'}};
// 기존 관심·교육·진로 사건과 별개로 찾아오는 몸과 마음의 성장.
growthStages.push(
{year:1908,title:'자라는 몸의 바탕',text:'여덟 살. 오래 걷고 나면 숨이 차고, 식탁에서는 더 잘 먹어야 한다는 이야기가 나온다. 앞으로 어떤 습관을 들일까?',choices:[
{text:'이웃 아이들과 매일 달리고 밖에서 놀며 체력을 기른다',bonus:[0,0,3],hpMax:5,trait:'바깥에서 기른 체력'},
{text:'가족과 식사와 수면을 챙기며 건강한 생활을 익힌다',bonus:[0,1,0],hpMax:7,wealth:-8,trait:'규칙적인 식사와 잠'},
{text:'몸에 무리가 없는 산책부터 천천히 시작한다',bonus:[1,0,1],hpMax:3,trait:'천천히 걷는 습관'}]},
{year:1914,title:'마음을 붙드는 법',text:'열네 살. 어른들의 걱정과 낯선 꿈이 마음에 쌓인다. 학교 밖에도 마음을 돌볼 방법이 있다는 것을 알게 된다.',choices:[
{text:'믿을 사람에게 걱정을 이야기하고 함께 정리한다',bonus:[0,3,0],sanMax:6,bond:1,trait:'걱정을 나누는 법'},
{text:'책과 일기를 통해 감정을 돌아보는 시간을 갖는다',bonus:[3,0,0],sanMax:5,trait:'마음을 적는 일기'},
{text:'가족과 상담을 찾아가 마음을 돌보는 습관을 배운다',bonus:[1,1,0],sanMax:8,wealth:-8,trait:'도움을 구하는 용기'}]}
);
const parentJobs={
university:[['professor','대학 교수'],['libraryworker','도서관 직원'],['universityclerk','대학 사무원']],
worker:[['factoryworker','공장 노동자'],['dockworker','부두 노동자'],['repairer','기계 수리공']],
merchant:[['antiquarian','골동품상'],['shopkeeper','잡화점 상인'],['bookkeeper','장부 담당자']],
medical:[['physician','의사'],['nurse','간호사'],['pharmacist','약사']],
fallen:[['teacher','개인 교사'],['lawyer','변호사'],['estatekeeper','저택 관리인']]
};
const childhoodEvents=[
{id:'family_books',family:'university',title:'책상 위의 초대장',text:'집에 대학의 손님이 찾아왔다. 식탁 위에는 공개 강연 초대장과 읽다 만 책이 놓여 있다.',choices:[{text:'가족과 강연을 들으러 간다.',bonus:[3,0,0],trait:'어린 날의 대학 강연',success:'이해하지 못한 말도 있었지만 배움의 세계가 가까워졌다.'},{text:'손님에게 도시의 이야기를 물어본다.',bonus:[0,3,0],bond:1,success:'손님은 당신을 다음에도 기억하겠다고 했다.'}]},
{id:'family_shift',family:'worker',title:'늦은 교대',text:'가족이 늦은 교대 근무를 마치고 돌아왔다. 어린 당신이 도울 수 있는 일도 있다.',choices:[{text:'집안일을 나누고 함께 쉬는 시간을 만든다.',bonus:[0,2,1],bond:1,success:'작은 도움으로 저녁에 웃음이 돌아왔다.'},{text:'이웃의 심부름을 맡아 살림에 보탠다.',bonus:[0,0,2],wealth:5,success:'품삯을 받아 집안의 생활비에 보탰다.'}]},
{id:'family_customer',family:'merchant',title:'가게의 첫 손님',text:'가게를 잠깐 맡아 달라는 부탁을 받았다. 손님은 오래된 물건의 값을 묻는다.',choices:[{text:'물건을 살펴보고 아는 만큼 솔직하게 설명한다.',bonus:[3,0,0],success:'어른은 모르는 것을 인정한 당신을 칭찬했다.'},{text:'손님이 물건을 찾는 이유부터 들어본다.',bonus:[0,3,0],wealth:4,success:'손님은 다음에도 이 가게를 찾겠다고 했다.'}]},
{id:'family_patient',family:'medical',title:'문 앞의 방문객',text:'늦은 밤 도움이 필요한 사람이 집을 찾아왔다. 가족은 당신에게 물과 담요를 부탁했다.',choices:[{text:'침착하게 필요한 물건을 가져온다.',bonus:[1,0,2],trait:'돌봄의 첫 기억',success:'당황한 순간에도 도움이 될 수 있다는 것을 배웠다.'},{text:'방문객 곁에 앉아 이야기를 들어준다.',bonus:[0,3,0],bond:1,success:'익숙하지 않은 사람에게도 따뜻한 말을 건넬 수 있었다.'}]},
{id:'family_sale',family:'fallen',title:'팔려 나가는 가구',text:'생활비를 마련하려 오래된 가구를 팔기로 했다. 그 서랍에는 가족의 사진이 남아 있다.',choices:[{text:'사진과 편지를 골라 가족의 기록을 보관한다.',bonus:[3,0,0],trait:'가족의 사진첩',success:'물건은 떠났지만 가족의 기억은 남겼다.'},{text:'가구를 정리하고 운반을 도와 비용을 아낀다.',bonus:[0,0,3],wealth:6,success:'집은 조금 비었지만 당장의 살림을 도왔다.'}]}
];
const parentScenes=[
['professor','연구실의 오후','부모의 연구실에 들렀다. 수정으로 가득한 원고와 비교 자료가 책상 위에 펼쳐져 있다.','차이가 나는 문장을 함께 찾아본다.','조사'],
['libraryworker','반납된 책들','부모가 책의 반납을 정리한다. 뒤섞인 대출 카드가 당신 앞에 놓인다.','카드를 날짜 순서로 정리한다.','조사'],
['universityclerk','사무실의 봉투','부모가 대학 사무실의 편지를 분류한다. 받는 사람을 찾지 못한 봉투가 있다.','이름과 주소를 비교해 받는 사람을 찾는다.','조사'],
['factoryworker','작업장의 점심','부모와 점심을 먹으며 공장 동료들의 이야기를 듣는다.','서로 다른 동료들의 이야기를 차분히 들어본다.','설득'],
['dockworker','부두의 밧줄','부모가 부두에서 짐을 안전하게 묶는 법을 보여준다.','작은 짐으로 매듭을 연습한다.','행동'],
['repairer','멈춘 시계','부모가 고장 난 시계를 분해했다. 톱니바퀴 하나가 바닥에 떨어졌다.','부품을 찾아 조립 순서를 배운다.','행동'],
['antiquarian','물건에 남은 흔적','부모가 가져온 오래된 상자에는 지워진 이름과 낡은 봉인이 있다.','상자를 손상시키지 않고 흔적을 살핀다.','조사'],
['shopkeeper','가게의 외상 장부','부모의 가게에 외상을 부탁하는 이웃이 왔다.','상대의 사정을 듣고 부모에게 전한다.','설득'],
['bookkeeper','맞지 않는 합계','부모가 장부의 합계를 다시 계산하고 있다.','영수증을 날짜별로 나누어 확인한다.','조사'],
['physician','진료 가방','부모가 왕진 가방의 도구를 정리한다. 위험한 물건은 손대지 말라고 했다.','깨끗한 천과 필요한 물품을 챙긴다.','조사'],
['nurse','병실의 안부','부모가 환자에게 전할 작은 편지를 써 달라고 한다.','상대가 안심할 수 있는 말을 골라 쓴다.','설득'],
['pharmacist','약국의 선반','부모가 약국 선반의 이름표를 새로 붙인다.','서로 비슷한 이름표를 주의 깊게 구분한다.','조사'],
['teacher','늦은 수업','부모가 개인 수업을 준비한다. 어린 학생이 배우기를 두려워한다.','학생과 함께 쉬운 문제부터 풀어본다.','설득'],
['lawyer','서로 다른 주장','부모가 이름을 지운 사건 기록을 예시로 두 사람의 주장을 설명해 준다.','양쪽의 말을 비교하며 빠진 사실을 찾는다.','조사'],
['estatekeeper','저택의 열쇠꾸러미','부모가 저택의 창문과 문을 점검한다. 무거운 열쇠꾸러미가 따라 움직인다.','낡은 문을 안전하게 여닫는 법을 배운다.','행동']
];
for(const [parent,title,text,action,skill] of parentScenes){const bonus=['조사','설득','행동'].map(k=>k===skill?3:0);childhoodEvents.push({id:'parent_'+parent,parent,title,text,choices:[{text:action,bonus,trait:'부모에게 배운 '+title,success:'부모의 일을 가까이에서 배우며 작은 경험을 쌓았다.'},{text:'일을 마친 뒤 부모와 함께 시간을 보낸다.',bonus:[0,1,0],bond:1,san:2,success:'일 이야기보다 서로의 안부를 오래 나누었다.'}]})}
const professionScenes=[
['researcher','발표를 앞둔 연구','새로 발견한 자료를 발표할 기회가 생겼다. 공동 연구자는 아직 결론이 불확실하다고 말한다.','불일치하는 자료까지 검토해 논문을 완성한다.','조사'],
['reporter','기사의 마지막 문단','중요한 제보를 받았지만 제보자는 자신의 이름이 기사에 실리는 것을 두려워한다.','제보자를 보호하며 사실을 확인할 추가 증언을 얻는다.','설득'],
['detective','의뢰인의 두 번째 이야기','의뢰인의 설명과 현장 흔적이 서로 맞지 않는다. 일은 간단한 실종 조사처럼 보였다.','흔적을 되짚어 의뢰인이 감춘 사실을 찾는다.','조사'],
['doctor','밤의 진료','급한 환자가 찾아왔다. 충분한 기록이 없어 판단에 신중해야 한다.','흩어진 증상을 비교해 필요한 치료를 준비한다.','조사'],
['dealer','경매 전의 감정','값비싼 유물의 감정을 의뢰받았다. 표면의 흔적과 판매자의 설명이 다르다.','미세한 흔적을 비교해 물건의 출처를 밝혀낸다.','조사'],
['librarian','누락된 대출 카드','반납된 책에 대출 카드가 없다. 같은 책을 찾는 사람이 두 명이나 왔다.','옛 목록과 새 기록을 대조해 책의 행방을 정리한다.','조사'],
['police','순찰 중의 신고','거리에서 다툼이 벌어졌다. 목격자들의 주장은 서로 다르다.','사람들을 진정시키고 각자의 증언을 듣는다.','설득'],
['mechanic','멈춰 선 기계','작업장의 기계가 멈췄다. 고용주는 서둘러 다시 돌려 달라고 하지만 안전장치가 손상돼 있다.','압력을 완전히 차단한 뒤 위험한 부품을 교체한다.','행동']
];
const professionEvents=professionScenes.map(([job,title,text,action,skill])=>({id:'profession_'+job,job,title,text,choices:[
{text:action,skill,difficulty:2,wealth:8,success:'까다로운 일을 마무리하고 추가 보수를 받았다.',failure:'결론은 내지 못했다. 일부 작업비만 받고 다음 기회를 준비했다.'},
{text:'동료에게 도움을 요청하고 책임을 함께 나눈다.',bond:1,wealth:3,success:'함께 일을 마쳤다. 보수는 나누었지만 믿을 동료를 얻었다.'},
{text:'추가 보수보다 안전과 원칙을 우선해 충분한 시간을 들인다.',san:2,success:'서두르지 않고 일을 마쳤다. 자신의 기준을 지켰다는 안도감이 남았다.'}
]}));
// 같은 주요 사건에서도 자신의 직업으로 접근할 수 있다.
for(const job of careers){const skill=job.id==='mechanic'||job.id==='police'?'행동':job.id==='reporter'||job.id==='dealer'?'설득':'조사';caseEvents[1].choices.push({requiresJob:job.id,text:{researcher:'대학의 조사 요청서를 통해 강변 자료를 대조한다.',reporter:'취재원에게 창고 장부의 사본을 부탁한다.',detective:'의뢰 조사의 경험으로 화물 이동 경로를 추적한다.',doctor:'검시 기록과 실종자의 마지막 행적을 함께 살핀다.',dealer:'거래처의 운송 장부에서 수상한 화물을 찾는다.',librarian:'지역 기록실의 물류 자료를 대조한다.',police:'경찰의 협조를 구해 창고 수색 절차를 밟는다.',mechanic:'창고의 기계와 운반 흔적으로 화물 경로를 확인한다.'}[job.id],skill,difficulty:1,evidence:'ledger',success:'직업에서 쌓은 경험으로 장부의 단서를 확보했다.',failure:'자료는 확보했지만 관계자들에게 불편한 질문을 남겼다.'})}
for(const event of professionEvents)event.choices[0].failureWealth=4;
