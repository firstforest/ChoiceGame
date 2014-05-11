module Question where

import Util

type Question = { question : String, yesMessage : String, noMessage : String }

phaseAQuestions = [
    {question = "先輩、私のこと好きッスか？", yesMessage = "私は先輩のこと嫌いっス", noMessage = "私も先輩のこと嫌いっス"},
    {question = "海。海行きたくないスか？", yesMessage = "下心ありそうな顔っスね", noMessage = "せっかく新しい水着買ったのに……"},
    {question = "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？", yesMessage = "そうっスよね。先輩犬っぽいですもん", noMessage = "えー、猫派っスか。猫……にゃーん……"},
    {question = "プリン食べたいっスなぁ", yesMessage = "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？", noMessage = "先輩の分も作っておいたのに……"},
    {question = "山。山行きたくないっスか？", yesMessage = "意外とアウトドア派なんスね", noMessage = "二人でカレー作ったりしたかったっス……"}]

sampleQuestions = take 3 (Util.shuffle phaseAQuestions 1234313)

sampleQuestions2 = take 4 (Util.shuffle phaseBQuestions 15534324)

phaseBQuestions = [
    {question = "先輩、仮に私が先輩のこと好きって言ったら、嬉しいッスか？", yesMessage = "いや、まあ嫌いっスけど", noMessage = "先輩のくせに生意気っス"},
    {question = "今日の夕飯は私が作ってあげるっス。嫌いなものあるっスか？", yesMessage = "駄目っスよ。大きくなれないっス。長生きも出来ないかも知れないっス……", noMessage = "いい子っス。腕によりをかけて作るっスよ―！"},
    {question = "……質問ばかりでウザいっスか？", yesMessage = "ごめんなさい。申し訳ないっス。", noMessage = "良かったっス。先輩のこともっと知りたいっス。"},
    {question = "目玉焼きには醤油派っスか？", yesMessage = "私はケチャップ派っス", noMessage = "じゃあソース、塩コショウ、ケチャップ……まさかハチミツっスか？"},
    {question = "仮にこの世界に先輩と私しかいなかったらどうするッス？", yesMessage = "ふふふ", noMessage = "ふふふ"},
    {question = "先輩、たまには自分の意志を言って欲しいっス", yesMessage = "……", noMessage = "……"},
    {question = "親子丼が食べたいっス", yesMessage = "あ、私にはお母さんいないっス", noMessage = "私、親子丼の三つ葉が好きなんスよね"},
    {question = "私って可愛いっスか？", yesMessage = "ありがとうっス", noMessage = "調子に乗ってすんませんス"}]

sampleQuestions3 = take 3 (Util.shuffle phaseCQuestions 5425234) 

phaseCQuestions = [
    {question = "先輩、実はこの世界って私たち二人しかいないんス。寂しいッスか？", yesMessage = "私も実はちょっとそう思うっス", noMessage = "……先輩変わってるっス"},
    {question = "夢は見るほうっスか？", yesMessage = "夢で私に出会ったらよろしくっス", noMessage = "私はよく見るっス。夢の中の先輩はもう少しカッコいいっス"},
    {question = "胡蝶の夢って知ってるっスか？", yesMessage = "実はこれ、先輩の夢かも知れないっスね", noMessage = "先輩、もうちょっと勉強するっス"},
    {question = "せーんぱい？", yesMessage = "えへへ", noMessage = "むー"},
    {question = "二人は寂しいスなぁ。……子作りするッス？", yesMessage = "冗談っスよ。エッチ", noMessage = "すまないっス。魅力なくてすまないっス。"},
    {question = "……", yesMessage = "なにが「はい」っスか。イエスマンも大概にするっス", noMessage = "なにが「いいえ」っスか。天邪鬼も大概にするっス"}]