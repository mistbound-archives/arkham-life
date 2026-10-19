'use strict';
// Each case leaves a different ordinary problem; keeping a record is a deliberate, separate act.
const AFTERLIFE_STORIES={
nora:[
 ['봉투 모서리를 접는 버릇','노라가 편지를 보내 왔다. 새 일터에서 첫 급여를 받았고 점심을 먹을 식당도 찾았다고 한다. 마지막 줄에는 이번에는 당신의 근황을 듣고 싶다고 적혀 있다.','노라의 가족이 아직 반송되지 않은 편지들을 가지고 왔다. 새 주소가 생겼다는 소식은 없다. 집 앞 식당에 같이 앉아 잠깐 쉬어 가자고 한다.',[
 ['점심을 함께 먹으며 요즘의 일을 이야기한다.','listen','사건 이야기를 꺼내지 않고 한 끼를 함께 먹었다. 다음에는 새로 찾은 식당에 가 보기로 했다.',{bond:2}],
 ['아는 일터를 소개하고 필요한 인사를 함께 다닌다.','work','소개한 일터에서 짧은 일을 함께 마쳤다. 작은 보수와 다음에 연락할 이유가 생겼다.',{skill:'설득',wealth:8,failureWealth:0,failure:'소개한 자리에 빈자리가 없었다. 다른 곳이 생기면 알려 주기로 했다.'}],
 ['답장을 보내되 당분간은 각자의 생활을 이어간다.','distance','짧게 안부를 적어 보냈다. 더 가까운 약속은 하지 않았다.',{}]]],
 ['창고를 떠나는 수레','창고 짐꾼들이 새 운송 계약을 앞두고 옛 작업대와 기구를 정리한다. 노라는 창고 일을 계속하지 않겠다고 했다. 이사를 거들 사람이 부족하다.','창고에 남은 짐을 치울 날이 잡혔다. 가족은 주인을 찾지 못한 물건을 버리지 말아 달라고 한다. 관리인은 따로 둘 보관함과 운반 인력을 구한다.',[
 ['운반 인력을 보태 사람과 개인 물건부터 안전하게 옮긴다.','rebuild','개인 물건을 먼저 빼고 작업대를 비웠다. 이사를 마친 사람들이 새 일터를 오가기 시작했다.',{wealth:-22,bond:1,economy:{income:2,cost:0}}],
 ['짐꾼들과 작업을 나눠 맡고 운반 일당을 받는다.','contract','수레를 몰고 짐을 옮겼다. 보수는 받았지만 사람들과 오래 이야기할 시간은 없었다.',{skill:'운동',wealth:16,failureWealth:0,failure:'작업이 늦어져 약속한 물량을 다 옮기지 못했다.',economy:{income:3,cost:1}}],
 ['새 창고의 일은 맡지 않고 연락할 사람만 알려 준다.','leave','운반을 맡을 사람을 소개하고 물러났다. 보관함의 물건들은 다른 이들이 챙겼다.',{economy:{income:0,cost:1}}]]],
 ['새 주소의 초대장','노라가 새 주소와 함께 작은 저녁 초대를 보냈다. 식탁을 놓았는데 의자가 하나 남는다고 한다. 봉투 안에는 사건에 대한 질문이 없다.','가족에게서 편지가 왔다. 오래 기다리던 집을 정리하고 다른 동네로 옮긴다고 한다. 떠나기 전 식탁에 한 번 앉아 달라는 부탁이다.',[
 ['초대를 받아 식탁에 앉는다.','ordinary','음식을 나누고 새 동네 이야기를 들었다. 헤어질 때는 다음 식사의 날짜를 정했다.',{bond:2}],
 ['기차역이나 이삿짐 곁에서 잠깐 배웅한다.','ordinary','떠나는 길을 잠깐 함께했다. 다음 소식은 새 주소로 보내기로 했다.',{bond:1}],
 ['앞날을 바라는 답장을 보내고 작별한다.','farewell','새 주소에 안부를 보냈다. 서로의 생활에 깊이 들어가지는 않았다.',{}]]]
],
factory:[
 ['새 급여 봉투','루이스가 메이의 새 급여 봉투를 보여 준다. 다른 작업장에서 일을 시작했지만 손에 맞는 장갑이 없어 장비를 자꾸 놓친다고 한다.','야간조를 잃은 작업자들이 일자리를 알아본다. 루이스는 돌아오지 않은 동료의 가족에게 밀린 임금이라도 전하려고 공장 앞을 오간다.',[
 ['밀린 임금과 새 고용 조건을 작업자들과 따져 본다.','listen','작업자들이 자기 조건을 말할 자리를 마련했다. 서로 다른 요구를 서두르지 않고 들었다.',{skill:'설득',bond:1,failure:'감독과 작업자들의 말이 맞서 대화가 끊겼다. 오늘은 합의하지 못했다.'}],
 ['손에 맞는 장갑과 안전 도구를 마련한다.','help','장갑과 도구를 전달했다. 작업자들은 다음 교대에서 직접 써 보고 고칠 곳을 알려 주었다.',{wealth:-15,bond:2}],
 ['구직 안내를 전하고 깊이 관여하지 않는다.','distance','구인처를 알려 주었다. 작업자들은 각자 조건을 확인하러 떠났다.',{}]]],
 ['다시 울리는 교대 종','새 운영자가 공장을 열려 한다. 작업자들은 일자리가 필요하지만 같은 지하 설비를 쓰겠다는 말에 선뜻 서명하지 못한다.','공장 구역에 재개장 공고가 붙었다. 남은 가족들은 장례와 치료 비용도 정산하지 못했는데 책임자가 바뀌었다는 말부터 듣는다.',[
 ['안전장치 교체와 밀린 정산을 재개장 조건으로 협상한다.','rebuild','운영자가 조건을 받아들였다. 작업자들은 새 장치를 확인한 뒤 교대에 들어갔다.',{skill:'설득',wealth:-18,bond:1,failure:'운영자가 조건을 거절해 재개장이 미뤄졌다.',economy:{income:3,cost:0}}],
 ['철거와 안전 정비 일을 맡는다.','contract','위험 설비를 걷어 내고 새 통로를 냈다. 정비 보수를 받아 살림을 메웠다.',{skill:'손재주',wealth:18,failureWealth:0,failure:'예상보다 손상이 커서 맡은 구간을 마치지 못했다.',economy:{income:4,cost:1}}],
 ['작업자들의 판단을 존중하고 계약에서 빠진다.','leave','조건을 전한 뒤 서명은 작업자들에게 맡겼다. 이후 소식은 가끔 들었다.',{economy:{income:0,cost:2}}]]],
 ['다른 작업복의 주머니','메이가 쉬는 날 루이스와 함께 찾아왔다. 새 작업복 주머니에는 예전 장갑 대신 도시락이 들어 있다. 쉬는 날만큼은 공장 이야기를 하지 않겠다고 한다.','루이스가 예전 동료 가족에게 보낼 생활비를 들고 왔다. 새 작업복의 주머니에서 봉투를 꺼낸 뒤, 다른 일을 하게 된 사람들의 근황을 전한다.',[
 ['쉬는 날의 산책과 식사에 함께한다.','ordinary','작업복과 도시락 이야기를 하며 걸었다. 일터 밖에서 만날 약속이 생겼다.',{bond:2}],
 ['후배 작업자에게 안전한 작업 요령을 함께 보여 준다.','ordinary','손을 둘 위치와 멈출 때의 신호를 후배와 연습했다. 서류보다 몸에 익힐 시간이 필요했다.',{training:{손재주:1},bond:1}],
 ['일터에서는 더 만나지 않고 안부만 전한다.','farewell','새 일터가 잘되길 바랐다. 더 맡을 역할은 만들지 않았다.',{}]]]
],
debt:[
 ['문패를 다시 다는 날','가족이 되찾은 이름으로 문패를 달고 있다. 사진은 돌아왔지만 은행과 학교에서는 서류의 이름이 다르다며 확인을 요구한다.','이웃집이 비어 있다. 가족들은 빈자리에 앉을 사람을 기억하지만 창구에서는 명부에 없다는 말만 돌아온다.',[
 ['가족과 창구를 다니며 본인 확인을 돕는다.','listen','가족이 자기 이름을 직접 말할 때 곁에서 증인이 되어 주었다. 몇 곳의 문이 다시 열렸다.',{skill:'설득',bond:1,failure:'창구마다 다른 증빙을 요구했다. 오늘은 필요한 절차만 확인했다.'}],
 ['재발급 비용과 당장의 식비를 보탠다.','help','도장과 서류를 다시 만들고 식탁을 채울 비용을 보탰다.',{wealth:-12,bond:2}],
 ['가족의 부탁을 전해 듣고 자기 일로 돌아간다.','distance','연락할 창구를 알려 주었다. 끝까지 동행하지는 않았다.',{}]]],
 ['열쇠를 돌려주는 사무실','피해 가족들이 옛 대부 사무실의 담보 물건을 돌려받는다. 같은 이니셜이 적힌 상자들이 섞여 잘못 가져갈 사람이 생겼다.','사무실의 담보 상자들이 주인을 기다린다. 돌아오지 않은 사람의 물건을 누가 맡을지 남은 가족들이 다투고 있다.',[
 ['차용증과 상자의 각인을 대조해 주인을 확인한다.','protect','물건을 잘못 넘기지 않도록 출처와 인수자를 확인했다. 이름을 가린 확인 사본은 따로 보관했다.',{skill:'박학',bond:1,failure:'같은 각인의 물건을 끝내 구별하지 못해 인도를 미뤘다.',economy:{income:1,cost:0}}],
 ['보관함과 반환 운송 비용을 함께 부담한다.','rebuild','주인이 확인된 물건부터 돌려주고 남은 것은 잠금함에 보관했다.',{wealth:-24,bond:1,economy:{income:2,cost:0}}],
 ['인도 절차는 가족들과 법률가에게 맡긴다.','leave','열쇠를 담당자에게 돌려주었다. 확인하지 못한 물건은 그대로 남았다.',{economy:{income:0,cost:2}}]]],
 ['가족사진 옆의 빈 의자','식사 초대가 왔다. 이번 사진에는 가족들이 모두 자기 자리를 골라 섰다. 예전 사진과 똑같이 찍을 필요는 없다며 누군가 의자를 옮긴다.','가족이 빈 의자를 식탁 곁에 둔 채 식사를 준비한다. 오늘은 누가 그 자리에 앉았는지 캐묻지 말고 함께 먹자고 한다.',[
 ['함께 식사하고 새 사진을 찍는 일을 돕는다.','ordinary','서로 자리를 고르도록 기다렸다. 사진을 찍은 뒤에도 식탁의 이야기가 이어졌다.',{bond:2}],
 ['자기 집안의 오래된 사진 한 장을 가져와 나눈다.','ordinary','각자의 가족 이야기를 나눴다. 잃은 이름을 모두 되찾지 못해도 함께 앉을 수 있었다.',{bond:1}],
 ['초대에 감사하고 각자의 가족 곁으로 돌아간다.','farewell','가족의 앞날을 바라고 인사를 마쳤다.',{}]]]
],
patient:[
 ['동생이 고른 아침','앨런의 동생이 아침 식사를 직접 골랐다. 앨런은 예전에는 먹지 않던 음식이라며 걱정하지만 동생은 지금은 이것이 좋다고 말한다.','앨런이 동생의 행방을 확인하러 진료처를 오간다. 다른 보호자들도 치료 공백과 생계 때문에 지쳐 있다. 오늘은 돌아오지 않은 사람의 회복을 단정하지 않고 남은 가족들의 끼니부터 챙긴다.',[
 ['환자에게 원하는 생활과 도움의 범위를 직접 묻는다.','listen','보호자 대신 환자의 말을 기다렸다. 식사와 외출을 스스로 정할 작은 약속부터 시작했다.',{skill:'심리학',bond:1,failure:'대답을 재촉해 대화가 끊겼다. 오늘은 더 묻지 않기로 했다.'}],
 ['의학 지식으로 생활에 무리가 없는 돌봄을 함께 살핀다.','help','의료진과 무리한 훈련을 줄였다. 가족도 잠시 쉴 시간을 얻었다.',{skill:'의학',bond:1,failure:'증상을 확신할 수 없어 담당 의료진에게 다시 의뢰했다.'}],
 ['가족이 적응할 시간을 주고 안부만 남긴다.','distance','잦은 방문을 멈추고 필요할 때 연락해 달라고 했다.',{}]]],
 ['잠긴 병동의 열쇠','폐쇄 병동을 다시 쓰자는 제안이 왔다. 환자들은 옛 실험실로 돌아가기 싫다고 하고 지역에는 진료실이 부족하다.','병동 문은 닫혔지만 보호자들은 다른 진료처를 찾지 못했다. 건물 소유주는 간판만 바꿔 다시 열겠다고 한다.',[
 ['옛 병동 밖에 돌봄 진료실을 마련하는 데 보탠다.','rebuild','환자들이 원하지 않는 방에 돌아가지 않고 진료받을 자리를 마련했다.',{wealth:-28,bond:1,economy:{income:1,cost:0}}],
 ['의료진과 돌봄 순번을 나누고 치료 공백을 줄인다.','contract','진료와 휴식 시간을 나눠 맡았다. 정해진 돌봄 보수를 받았다.',{skill:'의학',wealth:12,failureWealth:0,failure:'필요한 인력을 충분히 구하지 못해 진료 시간이 줄었다.',economy:{income:2,cost:1}}],
 ['운영에는 참여하지 않고 환자에게 다른 진료처를 알린다.','leave','연락할 진료처를 전하고 운영 결정에서는 물러났다.',{economy:{income:0,cost:2}}]]],
 ['혼자 다녀온 외출','앨런의 동생이 혼자 산책을 다녀왔다. 어디를 갔는지 모두 설명하지 않아도 되느냐고 묻는다. 앨런은 대답하려다 동생의 말을 기다린다.','보호자들이 짧은 외출 시간을 번갈아 맡는다. 혼자 나갈 수 없는 환자도 창가 대신 바깥 공기를 마실 날을 기다린다.',[
 ['원하는 만큼만 듣고 함께 걷는다.','ordinary','말하지 않은 시간을 그대로 두었다. 돌아오는 길에 다음 산책을 약속했다.',{bond:2}],
 ['보호자가 쉬는 동안 일상의 돌봄을 맡는다.','ordinary','돌봄을 잠깐 나눠 맡았다. 보호자는 그날 처음으로 혼자 쉬었다.',{bond:1}],
 ['회복 과정을 더 묻지 않고 방문을 줄인다.','farewell','필요할 때 연락할 수 있다는 말만 남겼다.',{}]]]
],
press:[
 ['엽서의 오자','베아트리스가 보낸 엽서에 오자가 있다. 오언은 돌아온 뒤 작은 글자까지 확인하는 버릇이 생겼다며 이번에는 그대로 보내자고 했다고 한다.','베아트리스가 빈 면을 남긴 신문을 접어 두었다. 돌아오지 않은 기자의 가족에게 어떤 말을 전할지 망설인다.',[
 ['기사 대신 편지를 주고받으며 안부를 나눈다.','listen','맞춤법을 고치지 않고 답장을 보냈다. 신문 밖의 이야기가 오가기 시작했다.',{bond:2}],
 ['인쇄소의 평범한 일감을 함께 마친다.','work','청첩장과 가게 안내문을 찍었다. 작은 보수와 다음 일감이 남았다.',{skill:'손재주',wealth:10,failureWealth:0,failure:'활자를 잘못 맞춰 일부를 다시 찍어야 했다.'}],
 ['엽서에만 답하고 취재 일에서는 거리를 둔다.','distance','안부를 전하되 새 취재를 맡겠다는 약속은 하지 않았다.',{}]]],
 ['정정판 뒤의 이름','후원자가 손해를 물으러 왔다. 취재원은 새 기사에도 자기 이름이 나갈까 두려워하고 인쇄공은 다음 호의 마감을 기다린다.','인쇄소에는 미확인 실종자의 이름을 넣어 달라는 부탁과 빼 달라는 요구가 함께 온다. 가족과 취재원의 바람이 다르다.',[
 ['취재원의 동의를 확인하고 공개본과 보관본을 나눈다.','protect','기사에서 보호할 이름을 가리고 확인 자료는 따로 보관했다. 이후 문의를 받을 창구도 정했다.',{skill:'박학',careerRep:3,failure:'공개 범위를 합의하지 못해 인쇄를 미뤘다.',economy:{income:2,cost:0}}],
 ['광고주에게 기대지 않는 소규모 발행 비용을 보탠다.','rebuild','큰 후원 없이 다음 호를 찍었다. 인쇄소는 적은 부수로 다시 구독자를 모았다.',{wealth:-26,bond:1,economy:{income:2,cost:0}}],
 ['분쟁과 다음 취재는 편집부의 판단에 맡긴다.','leave','갖고 있던 자료를 돌려주고 편집 결정에서 빠졌다.',{economy:{income:0,cost:1}}]]],
 ['다음 호의 작은 소식','새 신문 한 귀퉁이에 가게 개업과 결혼 소식이 실렸다. 베아트리스는 이번에는 오언이 자기 이름으로 평범한 기사를 썼다며 표시해 두었다.','베아트리스가 다음 호를 보냈다. 빈 면을 억지로 채우지 않고 미확인 소식을 기다리겠다고 적었다. 다른 면에는 동네의 평범한 소식이 실렸다.',[
 ['인쇄소에 들러 다음 호를 접는 일을 돕는다.','ordinary','신문을 접으며 동네 소식을 들었다. 늘 사건 기사만 맡을 필요는 없었다.',{bond:2}],
 ['개인 이름을 가린 취재 경위를 후배 기자에게 전한다.','remember','당사자가 허락한 경위만 후배에게 전하고 사본을 보관했다.',{skill:'박학',bond:1,failure:'어디까지 전할지 합의하지 못해 설명을 미뤘다.'}],
 ['신문을 받아 읽고 다음 취재에는 참여하지 않는다.','farewell','독자로 남아 가끔 소식을 읽었다.',{}]]]
],
boarding:[
 ['상자에 적힌 새 방 번호','클라라와 조지가 새 거처로 상자를 나른다. 조지는 문이 잘 보이는 방을 골랐고 집세보다 창문이 열리는지를 먼저 확인한다.','클라라가 남은 세입자들의 이삿짐을 나른다. 주인이 돌아오지 않은 상자는 따로 묶었고 새 거처의 보증금이 모자란다.',[
 ['상자를 나르며 새 거처를 정리한다.','work','상자를 옮기고 문과 창문을 손봤다. 약속한 운반 일당을 받았다.',{skill:'운동',wealth:8,failureWealth:0,failure:'짐을 다 옮기지 못해 하루를 더 잡아야 했다.'}],
 ['보증금과 잠금장치 비용을 보탠다.','help','보증금 일부와 새 자물쇠를 마련했다. 세입자들은 각자 방을 골랐다.',{wealth:-20,bond:2}],
 ['새 주소를 받고 이사 실무에서는 빠진다.','distance','새 주소로 안부를 보내기로 했다.',{}]]],
 ['빈집의 지붕','옛 하숙집을 팔라는 제안이 왔다. 세입자들은 보증금을 돌려받아야 하지만 봉쇄한 방까지 보여 주겠다는 중개인의 말에 반대한다.','봉쇄된 하숙집의 지붕이 새기 시작했다. 감시와 관리 비용이 밀리면 주인이 출입 제한을 풀겠다고 한다.',[
 ['지붕을 고치고 위험한 방의 출입 통제를 유지한다.','rebuild','빗물을 막고 출입문을 고쳤다. 세입자들의 보증금은 별도로 정산하기로 했다.',{wealth:-30,bond:1,economy:{income:1,cost:1}}],
 ['새 거처의 관리 일을 맡아 이주를 돕는다.','contract','새 건물의 관리와 수선을 맡았다. 보수를 받는 대신 만남의 일부는 업무가 되었다.',{wealth:15,bond:-1,economy:{income:4,cost:1}}],
 ['매각과 관리의 결정은 세입자들과 소유주에게 맡긴다.','leave','직접 건물을 맡지 않았다. 출입 통제가 느슨해지지 않는지 다른 담당자가 살폈다.',{economy:{income:0,cost:5}}]]],
 ['문이 열린 식당','새 하숙집의 식당에 초대받았다. 조지는 출입문 가까운 의자에 앉아 있다. 클라라는 오늘 식사를 마치면 각자 방으로 가도 된다고 말한다.','새 거처의 세입자들이 공동 식사를 준비한다. 돌아오지 않은 사람의 짐은 식당 한쪽 보관함에 남아 있다.',[
 ['식사에 함께하고 다음 장보기 순번을 맡는다.','ordinary','식사를 나누고 다음 장보기를 약속했다. 방 번호보다 사람의 취향을 먼저 외우게 됐다.',{bond:2}],
 ['문과 창문을 점검하고 오래 머물지 않고 돌아간다.','ordinary','필요한 수선만 마쳤다. 불안해하는 사람에게 오래 대답을 요구하지 않았다.',{training:{손재주:1},bond:1}],
 ['초대에 감사하고 이웃 정도의 거리를 지킨다.','farewell','새 거처가 편안하길 바라고 돌아왔다.',{}]]]
],
beacon:[
 ['땅에서 찾는 일','헤스터가 육지 일자리 공고를 펼친다. 돌아온 선원 중 몇은 다시 배를 타겠다고 하고 몇은 부두만 봐도 멀미가 난다고 한다.','헤스터가 선원 가족의 생활비를 알아본다. 배가 돌아오지 않았는데 고용주는 실종 수당의 지급을 미루고 있다.',[
 ['선원들과 가족에게 가능한 육지 일자리를 소개한다.','work','새 일자리를 연결하고 소개 보수를 받았다. 배에 돌아갈지는 각자가 정했다.',{skill:'설득',wealth:8,failureWealth:0,failure:'소개한 일자리의 조건이 맞지 않아 채용은 성사되지 않았다.'}],
 ['수당이 나올 때까지 식비와 운임을 보탠다.','help','당장의 식비와 왕복 운임을 보탰다. 먼 창구에 다시 찾아갈 수 있었다.',{wealth:-18,bond:2}],
 ['항해 여부에는 관여하지 않고 연락처만 남긴다.','distance','어느 일을 택하든 안부를 전할 수 있게 했다.',{}]]],
 ['길어진 항로의 품삯','우회 항로 때문에 항해가 길어졌다. 선주들은 운임을 올렸지만 선원의 품삯은 그대로다. 헤스터가 새 계약서를 들고 왔다.','폐쇄된 항로를 몰래 쓰겠다는 선주가 나타났다. 가족들은 새 실종자가 생길까 두려워하고 당장의 품삯이 필요한 사람들은 서명을 망설인다.',[
 ['안전 항로와 추가 품삯을 함께 보장하도록 협상한다.','rebuild','긴 항로를 기준으로 품삯과 대피 절차를 다시 정했다. 무리한 운항은 줄었다.',{skill:'설득',wealth:-18,failure:'선주들이 조건을 거절해 협상이 미뤄졌다.',economy:{income:3,cost:0}}],
 ['안전한 부두의 운반과 장비 점검 일을 맡는다.','contract','확인된 부두에서 장비를 점검하고 보수를 받았다.',{skill:'손재주',wealth:16,failureWealth:0,failure:'장비 불량을 다 고치지 못해 운항을 미뤘다.',economy:{income:4,cost:1}}],
 ['항만의 분쟁에서 빠지고 확인한 위험만 전한다.','leave','새 계약에는 참여하지 않았다. 우회 항로의 운임 부담은 생활에 남았다.',{economy:{income:0,cost:3}}]]],
 ['배를 타지 않는 휴일','헤스터가 쉬는 날 강변을 걷자고 한다. 떠나는 배를 보면서도 오늘은 신호기를 꺼내지 않는다. 선원들은 각자의 새 일터에서 보내 온 소식을 나눈다.','가족들이 강변에 꽃을 놓고 돌아온다. 헤스터는 호출을 틀지 않고 함께 걷는다. 아직 기다리는 사람이 있다는 말만 짧게 건넨다.',[
 ['신호 이야기 없이 강변을 함께 걷는다.','ordinary','배가 지나갈 때 잠깐 멈췄다가 다시 걸었다. 다음에는 육지의 장터에서 만나기로 했다.',{bond:2}],
 ['아이들에게 위험한 항로를 피해 다니는 요령을 알려 준다.','ordinary','신호를 흉내 내지 않고 안전한 둑과 비상 연락처부터 알려 주었다.',{bond:1}],
 ['부두에서 인사를 마치고 각자의 길로 간다.','farewell','가끔 안부를 전하되 다시 배를 탈지는 묻지 않았다.',{}]]]
],
orchard:[
 ['식탁에 올리지 않은 열매','루스가 다른 밭에서 난 과일을 가져왔다. 일꾼들은 검진을 마쳤지만 상자를 곧바로 식탁에 올리는 사람은 없다. 루스도 먼저 먹어 보라고 권하지 않는다.','일꾼 가족들이 따뜻한 음식을 가져왔다. 루스는 아직 체온을 되찾지 못한 사람의 담요를 바꾸며 수확 상자를 뒤로 밀어 놓는다.',[
 ['안전을 재촉하지 않고 함께 음식을 준비한다.','listen','오늘 먹을 음식부터 함께 만들었다. 과일은 원할 때 먹도록 두었다.',{bond:2}],
 ['진료 메모와 먹을거리 상태를 살핀다.','help','의료진에게 확인할 항목을 정하고 보관 중인 식품을 나눴다.',{skill:'의학',bond:1,failure:'안전하다고 판단할 수 없어 상자를 열지 않았다.'}],
 ['음식만 보태고 농사에 관한 판단은 맡긴다.','distance','식료품을 두고 돌아왔다. 수확을 다시 시작하라고 권하지 않았다.',{wealth:-8}]]],
 ['이번에는 씨를 뿌리지 않을 밭','농가들이 봄 파종을 준비한다. 루스는 위험했던 구역을 쉬게 하자고 하고 이웃은 수확을 한 해 더 포기하기 어렵다고 한다.','격리한 밭을 다시 빌려 쓰겠다는 사람이 왔다. 일꾼 가족들은 우물부터 바꾸자고 하지만 땅 주인은 계약금을 기다린다.',[
 ['대체 우물과 작은 밭의 첫 파종 비용을 나눈다.','rebuild','위험한 구역을 건드리지 않고 다른 밭을 열었다. 수확은 적어도 새 우물을 함께 쓸 수 있었다.',{wealth:-25,bond:1,economy:{income:2,cost:0}}],
 ['안전한 밭의 배수와 수확 일을 맡는다.','contract','확인한 구역에서만 작업을 맡았다. 농가와 품삯을 정했다.',{skill:'운동',wealth:14,failureWealth:0,failure:'배수 작업이 늦어져 맡은 구역을 마치지 못했다.',economy:{income:3,cost:1}}],
 ['파종 결정에서 물러나되 경계 표시는 남겨 둔다.','leave','계약에는 끼지 않았다. 우회 운송과 우물 관리 부담은 계속됐다.',{economy:{income:0,cost:2}}]]],
 ['작은 밭의 첫 수확','루스가 작은 밭에서 거둔 첫 상자를 연다. 일꾼들은 양이 적다며 웃고, 손끝으로 열매가 따뜻하지 않은지 먼저 확인한다.','농가들이 다른 밭에서 거둔 수확을 나눈다. 돌아오지 않은 일꾼의 몫도 가족에게 보낸다. 루스는 옛 과수원 쪽을 오래 보지 않는다.',[
 ['수확을 나르고 저녁 식사까지 함께한다.','ordinary','상자를 나른 뒤 같은 식탁에 앉았다. 오늘의 수확량과 다음 비 이야기를 나눴다.',{bond:2}],
 ['새로 일할 사람에게 안전한 배수와 작업 경계를 보여 준다.','ordinary','새 일꾼과 경계를 걸었다. 금지된 구역에 들어가지 않는 요령을 몸으로 익혔다.',{training:{운동:1},bond:1}],
 ['수확 소식을 축하하고 농사에서는 손을 뗀다.','farewell','앞으로의 농사를 응원하되 맡은 밭은 만들지 않았다.',{}]]]
],
portrait:[
 ['고양이가 움직여 버린 사진','아이리스가 보통 렌즈로 찍은 고양이 사진을 가져왔다. 다니엘은 촬영 직전에 고양이가 움직여 흐려졌다며 웃는다. 다시 찍지는 않았다고 한다.','아이리스가 의뢰받은 가족사진을 정리한다. 다니엘이 돌아오지 않은 채 비어 있는 작업대에 보통 렌즈를 놓을지 망설인다.',[
 ['사진을 보고 촬영 당시의 사소한 이야기를 듣는다.','listen','흐린 사진을 두고 웃거나 잠깐 말을 멈췄다. 더 찍으라고 권하지 않았다.',{bond:2}],
 ['보통 렌즈와 조명을 수선해 일을 재개하도록 돕는다.','help','위험한 장비는 건드리지 않고 평범한 촬영 장비만 손봤다.',{skill:'손재주',bond:1,failure:'정상 장비도 수리가 필요해 전문 수리점에 맡기기로 했다.'}],
 ['사진을 돌려주고 일터에는 오래 머물지 않는다.','distance','필요할 때 연락할 주소만 남겼다.',{}]]],
 ['현상소의 손해 장부','현상소에 정상 장비가 들어왔지만 손님들은 여전히 촬영을 취소한다. 아이리스는 위험한 렌즈를 팔라는 제안을 거절하고 임대료를 걱정한다.','문을 닫은 현상소의 장비를 사겠다는 상인이 찾아왔다. 아이리스는 구별되지 않은 건판이 섞여 나갈까 두려워한다.',[
 ['평범한 촬영을 다시 받을 장비와 임대료를 보탠다.','rebuild','위험 장비는 남겨 두고 정상 촬영을 받을 자리를 마련했다.',{wealth:-24,bond:1,economy:{income:2,cost:0}}],
 ['보통 사진의 인화와 장비 정리 일을 맡는다.','contract','확인된 장비로만 인화를 도왔다. 정해진 실무 보수를 받았다.',{skill:'손재주',wealth:15,failureWealth:0,failure:'작업을 충분히 맡지 못해 약속한 보수를 받지 못했다.',economy:{income:4,cost:1}}],
 ['위험 장비의 보관 연락처를 전하고 운영에서 물러난다.','leave','보관 책임을 맡을 곳을 연결하고 현상소 운영은 맡지 않았다.',{economy:{income:0,cost:1}}]]],
 ['이번에는 찍지 않는 날','아이리스와 다니엘이 함께 산책을 나온다. 좋은 빛이 드는 골목에서 다니엘은 사진기를 꺼내지 않고 그냥 보자고 한다.','아이리스가 사진기 없이 찾아왔다. 오늘은 돌아오지 않은 조수의 건판을 꺼내지 않고 바깥을 걷고 싶다고 한다.',[
 ['사진기를 두고 골목을 함께 걷는다.','ordinary','장면을 남기려 멈추지 않고 걸었다. 돌아오는 길에 다음 산책을 정했다.',{bond:2}],
 ['찍고 싶을 때만 찍을 수 있도록 조용히 기다린다.','ordinary','사진을 남길지 대신 정하지 않았다. 같이 보낸 시간은 사진 없이도 남았다.',{bond:1}],
 ['짧게 인사하고 촬영 부탁은 더 하지 않는다.','farewell','다음 사진을 요구하지 않고 작별했다.',{}]]]
],
burial:[
 ['흙 묻지 않은 장화','벤이 지상에서 하는 일을 시작했다. 오스틴이 새 장화를 가져왔지만 벤은 흙 없는 바닥을 골라 걸으며 당분간 묘역에는 가지 않겠다고 한다.','오스틴이 돌아오지 않은 인부의 장화를 가족에게 돌려준다. 지하 일을 맡을 사람은 없고 지상 정리도 밀려 있다.',[
 ['지상 정리와 꽃을 옮기는 일을 함께한다.','work','지하로 내려가지 않고 정리를 마쳤다. 작은 일당과 다음 연락이 남았다.',{skill:'운동',wealth:8,failureWealth:0,failure:'힘을 너무 써 맡은 구간을 다 마치지 못했다.'}],
 ['꽃과 필요한 작업용품을 마련한다.','help','꽃과 지상 작업용품을 전달했다. 묘역에 들어가라고 재촉하지 않았다.',{wealth:-10,bond:2}],
 ['일을 권하지 않고 휴식할 시간을 준다.','distance','필요하면 먼저 연락해 달라고 했다.',{}]]],
 ['옮길 묘와 남길 길','유족들이 묘역의 보행로와 이장 장소를 두고 모였다. 오스틴은 깊은 굴착을 피한 길을 제안하지만 비용이 더 든다.','훼손된 묘역을 어디까지 복구할지 의견이 갈린다. 매몰된 유해를 찾으려 다시 파자는 사람과 새 사고가 두렵다는 사람이 맞선다.',[
 ['추가 굴착 없이 안전한 보행로와 이장 자리를 마련한다.','rebuild','깊은 통로를 다시 열지 않고 걸을 길과 꽃을 놓을 자리를 만들었다.',{wealth:-28,bond:1,economy:{income:1,cost:0}}],
 ['지상 배수와 경계 수선 일을 맡는다.','contract','지하를 건드리지 않고 배수와 경계를 수선했다. 실무 보수를 받았다.',{skill:'손재주',wealth:15,failureWealth:0,failure:'비가 이어져 맡은 구간을 끝내지 못했다.',economy:{income:3,cost:1}}],
 ['유족들의 결정을 듣고 공사에서는 빠진다.','leave','맡을 공사는 만들지 않았다. 남은 관리 비용은 지역에 이어졌다.',{economy:{income:0,cost:2}}]]],
 ['봄길을 걷는 속도','오스틴이 봄의 묘역을 함께 걷자고 한다. 벤은 입구까지만 오겠다고 했다. 누구도 더 안쪽으로 걸으라고 권하지 않는다.','유족들이 봄꽃을 들고 입구에 모였다. 오스틴은 확인하지 못한 사람의 이름을 성급히 묘비에 새기지 않기로 했다.',[
 ['상대가 원하는 거리만큼 함께 걷는다.','ordinary','먼저 돌아가겠다는 말을 붙잡지 않았다. 각자의 속도로 같은 길을 걸었다.',{bond:2}],
 ['입구에 머물며 꽃과 물을 나눈다.','ordinary','깊이 들어가지 않고 꽃을 놓았다. 오늘 오지 못한 사람의 몫도 챙겼다.',{bond:1}],
 ['인사를 전하고 묘역을 떠난다.','farewell','다음 방문을 강요하지 않고 각자의 길로 돌아갔다.',{}]]]
]};
function afterlifeRecovered(w){if(w.id==='nora'&&s.flags.friendSaved)return true;return Boolean(w.saved&&!['contained','withdrawn','catastrophe'].includes(w.kind))}
function afterlifeEvent(id,stage){const w=s.worldStories[id],row=AFTERLIFE_STORIES[id]?.[stage];if(!row)return null;const key='life_'+id+'_'+stage,old=w.events[stage];if(old?.afterlifeVersion===46||s.completedFollowups.includes(key)||s.result&&s.pending?.id===key)return old||null;const recovered=afterlifeRecovered(w),body=row[recovered?1:2],notes={contained:'폐쇄한 곳의 감시와 관리 비용은 아직 남아 있다.',destroyed:'현장과 기록 일부도 사라졌다. 남은 사람들은 그 빈자리에서 일을 시작한다.',catastrophe:'재앙 피해로 일자리와 거처를 잃은 사람들이 아직 주변을 떠나지 못했다.',complicit:'지난 거래의 대가를 떠안은 사람들도 이 소식을 듣는다.',withdrawn:'당신이 넘긴 일은 다른 사람들이 맡고 있다. 실종자의 귀환 소식은 아직 없다.'};let text=body+'\n\n'+(stage===1&&notes[w.kind]?notes[w.kind]+' ':'')+(stage===2&&w.relationship==='distance'?'오래 왕래하지는 않았지만 이번 소식은 당신에게도 전해졌다.':'잠깐 시간을 내어 함께하거나, 필요한 일만 돕고 돌아갈 수 있다.');const e={id:key,title:row[0],text:npcText(text),afterlifeVersion:46,choices:row[3].map(([text,action,success,extra],i)=>({text:npcText(text),worldAction:action,worldArc:id,worldStage:stage,success:npcText(success),failure:'뜻대로 진행하지 못했다. 다음에 무리하게 약속하지 않고 이번에 남은 일을 확인했다.',...extra,afterlifeVersion:46,afterlifeKey:id+'_'+stage+'_'+i,afterlifeTitle:row[0]}))};
 if(!recovered&&id==='patient'&&stage===0){e.choices[0]={...e.choices[0],text:'보호자에게 지금 필요한 도움과 연락할 곳을 묻는다.',success:'누군가의 회복을 단정하지 않고 남은 가족들의 필요를 들었다. 다시 연락할 창구를 정했다.'};e.choices[1]={...e.choices[1],text:'남아 있는 진료기관과 비용 지원을 함께 살핀다.',success:'가족들이 연락할 진료기관과 지원 창구를 찾았다. 담당자에게 확인할 질문을 함께 정했다.'}};w.events[stage]=e;return e}
function afterlifeArchive(id){if(!canLegacyService()||!completedArcResult(id)||s.legacyVault.records[id]||s.afterlifeArchiveYear===s.year||s.wealth<10)return false;const before=captureResources();applyEffects({wealth:-10});s.afterlifeArchiveYear=s.year;s.legacyVault.records[id]={year:s.year,source:'personal_archive'};s.lastRoll=null;s.actionRolls=[];s.result='자신이 확인한 경위와 공개에 동의한 자료를 골라 미스캐토닉 대학에 사본을 맡겼다. 확인하지 못한 행방은 미확인으로 남기고 다른 사람의 사생활은 덜어 냈다.';return finishLegacyAction({id:'afterlife_archive_'+id,title:CITY_SITES[id].name+' · 개인 조사 자료'},{legacyAction:'archive'},true,before,false)}
function renderAfterlifeArchive(){const ids=Object.keys(AFTERLIFE_STORIES).filter(id=>completedArcResult(id)&&!s.legacyVault.records[id]);return ids.length?'<details class="afterlife-archive"><summary>내 조사 자료를 별도로 보관하기</summary><p>후일담과 별개로, 직접 확인한 경위와 공개에 동의한 자료를 골라 보관할 수 있다. 한 해 한 사건, 사본과 보관 비용 $10.</p>'+ids.map(id=>'<button data-afterlife-archive="'+id+'" '+(!canLegacyService()||s.afterlifeArchiveYear===s.year||s.wealth<10?'disabled':'')+'>'+escapeHTML(CITY_SITES[id].name)+' · 자료 기탁 $10</button>').join('')+'</details>':''}
function installAfterlifeVariety(){const life=lifeFollowupEvent;lifeFollowupEvent=function(id,stage){return afterlifeEvent(id,stage)||life(id,stage)};const contact=worldContact;worldContact=function(w){return contact(w.events&&Object.values(w.events).some(e=>e?.afterlifeVersion===46)?{...w,saved:afterlifeRecovered(w)}:w)};
 const world=applyWorldChoice;applyWorldChoice=function(c,ok){if(c.afterlifeVersion!==46)return world(c,ok);const w=s.worldStories[c.worldArc];if(c.worldStage!==1)world(c,ok);else{w.regionChoice=ok?c.worldAction:'unsettled';const economy=ok?(c.economy||{income:0,cost:1}):{income:0,cost:3};w.modifier={...economy,until:s.year+3,name:LIFE_PROFILES[c.worldArc].place};if(ok&&c.worldAction==='protect'){s.legacyVault.records[c.worldArc]||={year:s.year,source:'protect'};s.result+=' 동의한 확인 자료는 별도로 보관했다.'}addLog('지역 소식 — '+c.afterlifeTitle+' · 수입 +$'+w.modifier.income+' · 추가 생활비 $'+w.modifier.cost+' (3년)',true)}w.afterlifeHistory||={};w.afterlifeHistory[c.worldStage]={year:s.year,title:c.afterlifeTitle,choice:c.text,outcome:ok?c.success:c.failure,ok,action:c.worldAction};if(c.worldStage===1){const key='region:'+w.id+':'+w.regionChoice;s.cityNews=s.cityNews.filter(n=>n.key!==key);delete s.cityNewsKeys[key];addCityNews(key,w.id,(ok?c.success:c.failure))}};
 const words=lifeAfterwords;lifeAfterwords=function(){const updated=Object.values(s.worldStories||{}).filter(w=>w.afterlifeHistory);return [...words().filter(t=>!updated.some(w=>t.startsWith(worldContact(w)+'와의 그 뒤 — '))),...updated.map(w=>npcText(LIFE_PROFILES[w.id].place)+'의 그 뒤 — '+Object.values(w.afterlifeHistory).map(h=>h.title+': '+h.outcome).join(' '))]};const legacy=renderLegacyServices;renderLegacyServices=()=>legacy()+renderAfterlifeArchive();const renderBase=render;render=function(){const out=renderBase();document.querySelectorAll('[data-afterlife-archive]').forEach(b=>b.onclick=()=>afterlifeArchive(b.dataset.afterlifeArchive));return out};const build=buildLifeRecord;buildLifeRecord=function(ending){const r=build(ending),rows=Object.values(s.worldStories||{}).filter(w=>w.afterlifeHistory);if(rows.length){r.sections.push({title:'사건 뒤 이어진 서로 다른 생활',text:rows.map(w=>LIFE_PROFILES[w.id].place+' — '+Object.values(w.afterlifeHistory).map(h=>h.outcome).join(' ')).join(' ')});r.afterlifeHistory=Object.fromEntries(rows.map(w=>[w.id,JSON.parse(JSON.stringify(w.afterlifeHistory))]))}return r};}
