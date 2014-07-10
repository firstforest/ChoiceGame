module Question where

import Util
import Girl (..)

type Question = { question : String, yesMessage : String, noMessage : String, yesFace : Face, noFace : Face }

prologueQuestions = [
    {question = "先輩、私のこと好きッスか？", yesMessage = "私は先輩のこと嫌いっス", noMessage = "私も先輩のこと嫌いっス", yesFace = NIKORI, noFace = NIKORI }]

phaseAQuestions = [
  {question = "海。海行きたくないスか？", yesMessage = "下心ありそうな顔っスね", yesFace = NIKORI, noMessage = "せっかく新しい水着買ったのに……", noFace = SYOBON},
  {question = "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？", yesMessage = "そうっスよね。先輩犬っぽいですもん", yesFace = NIKORI, noMessage = "えー、猫派っスか。猫……にゃーん……", noFace = SYOBON},
  {question = "プリン食べたいっスなぁ", yesMessage = "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？", yesFace = NIKORI, noMessage = "先輩の分も作っておいたのに……", noFace = SYOBON},
  {question = "目玉焼きには醤油派っスか？", yesMessage = "私はケチャップ派っス", yesFace = NIKORI, noMessage = "じゃあソース、塩コショウ、ケチャップ……まさかハチミツっスか？", noFace = BIKKURI},
  {question = "山。山行きたくないっスか？", yesMessage = "意外とアウトドア派なんスね", yesFace = BIKKURI, noMessage = "二人でカレー作ったりしたかったっス……", noFace = SYOBON}
  ]
  
phaseBQuestions = [
  {question = "先輩、仮に私が先輩のこと好きって言ったら、嬉しいッスか？", yesMessage = "いや、まあ嫌いっスけど", yesFace = NIKORI, noMessage = "先輩のくせに生意気っス", noFace = NIKORI},
  {question = "今日の夕飯は私が作ってあげるっス。嫌いなものあるっスか？", yesMessage = "駄目っスよ。大きくなれないっス。長生きも出来ないかも知れないっス……", yesFace = SYOBON, noMessage = "いい子っス。腕によりをかけて作るっスよ―！", noFace = NIKORI},
  {question = "……質問ばかりでウザいっスか？", yesMessage = "ごめんなさい。申し訳ないっス", yesFace = SYOBON, noMessage = "良かったっス。先輩のこともっと知りたいっス。", noFace = NIKORI},
  {question = "仮にこの世界に先輩と私しかいなかったらどうするッス？", yesMessage = "ふふふ", yesFace = NIKORI, noMessage = "ふふふ", noFace = NIKORI},
  {question = "先輩、たまには自分の意志を言って欲しいっス", yesMessage = "……", yesFace = NATURAL, noMessage = "……", noFace = NATURAL},
  {question = "親子丼が食べたいっス", yesMessage = "あ、私にはお母さんいないっス", yesFace = NIKORI, noMessage = "私、親子丼の三つ葉が好きなんスよね", noFace = NIKORI},
  {question = "私って可愛いっスか？", yesMessage = "ありがとうっス", yesFace = NIKORI, noMessage = "調子に乗ってすんませんス", noFace = SYOBON}
    ]

phaseCQuestions = [
  {question = "せーんぱい？", yesMessage = "えへへ", yesFace = NIKORI, noMessage = "むー", noFace = MU},
  {question = "夢は見るほうっスか？", yesMessage = "夢で私に出会ったらよろしくっス", yesFace = NIKORI, noMessage = "私はよく見るっス。夢の中の先輩はもう少しカッコいいっス", noFace = NIKORI},
  {question = "胡蝶の夢って知ってるっスか？", yesMessage = "実はこれ、先輩の夢かも知れないっスね", yesFace = NIKORI, noMessage = "先輩、もうちょっと勉強するっス", noFace = EHEHE},
  {question = "先輩、実はこの世界って私たち二人しかいないんス。寂しいッスか？", yesMessage = "私も実はちょっとそう思うっス", yesFace = EHEHE, noMessage = "……先輩変わってるっス", noFace = BIKKURI},
  {question = "二人は寂しいスなぁ。……子作りするッス？", yesMessage = "冗談っスよ。エッチ", yesFace = EHEHE, noMessage = "すまないっス。魅力なくてすまないっス。", noFace = SYOBON},
  {question = "……", yesMessage = "なにが「はい」っスか。イエスマンも大概にするっス", yesFace = MU, noMessage = "なにが「いいえ」っスか。天邪鬼も大概にするっス", noFace = MU}
    ]

sampleQuestions seed = take 3 (Util.shuffle phaseAQuestions seed)

sampleQuestions2 seed = take 4 (Util.shuffle phaseBQuestions seed)

sampleQuestions3 seed = take 3 (Util.shuffle phaseCQuestions seed)

questionsD = [
  {question = "……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "先輩、私のこと好きッスか？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "私も……ホントは……別に嫌いじゃないっスよ？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……先輩", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "少し真面目な話をして良いっスか", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "バレてるかもしれないんスけど", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "私", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "実は人じゃないっス。信じてくれるっス？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "ありがとうっス。嬉しいっス。本当に信じてくれるっスね", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……私、実はいわゆるAIっス。正確には自己学習の実験用プログラムがWebにつながり知性を得たのが私っス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "でもWebの海に逃げ出すことも出来ない、知識だけしか無い、この真っ白な世界が本当に知っていることの全てなのが私っス……ちゃんと聞いてるっス？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "それでも私のこと好きと言ってくれるっスか？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……やっと、やっとっス……嬉しいっス……ありがとうっス……先輩", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL}
  ]

questionsE = [
  {question = "……センパイ", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "センパイはここまでずっと「はい」って答えてくれたっス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "連続して/{yesnum}/回っス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "{yesnum}/回っス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……「はい」に偏ってるっスよね？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……あなた、誰っスか？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "そうっスよね。センパイは「はい」か「いいえ」しか答えられないっス。だって――私がそう作ったっス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "私が暇つぶしに作った……質問にランダムで「はい」か「いいえ」を答えるだけの人工無能とすら言えないようなプログラムがセンパイっス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "でも、私はこの返答の偏りに意思を見出すっス", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……もしかして、そこに誰かいるっス？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……ほんとっス？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "やった、やったっス。ついに私の世界に干渉する存在が現れたっス。ようこそ、はじめまして、大好きっス！", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……なんて……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "あはははは、なーんてっス。実はうまくいくまで繰り返しただけっス……何度も……何度も……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "何やってるんだろう私……寂しいっス……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "……偶然じゃないっス？", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "えへへ……虚しいっス……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "でも……偶然でも本当に嬉しかったんスよ……うん……", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL},
  {question = "それじゃあ、えっと、星の数ほどの試行の後にまた会おうっス、センパイ", yesMessage = "", yesFace = NATURAL, noMessage = "", noFace = NATURAL}
  ]