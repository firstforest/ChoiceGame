module Question where

import Util
import Girl (..)

type Question = { question : String, yesMessage : String, noMessage : String, yesFace : Face, noFace : Face }

phaseAQuestions = [
    {question = "先輩、私のこと好きッスか？", yesMessage = "私は先輩のこと嫌いっス", noMessage = "私も先輩のこと嫌いっス", yesFace = NIKORI, noFace = NIKORI },
    {question = "海。海行きたくないスか？", yesMessage = "下心ありそうな顔っスね", noMessage = "せっかく新しい水着買ったのに……", yesFace = NIKORI, noFace = SYOBON },
    {question = "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？", yesMessage = "そうっスよね。先輩犬っぽいですもん", noMessage = "えー、猫派っスか。猫……にゃーん……", yesFace = NIKORI, noFace = SYOBON },
    {question = "プリン食べたいっスなぁ", yesMessage = "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？", noMessage = "先輩の分も作っておいたのに……", yesFace = NIKORI, noFace = SYOBON },
    {question = "山。山行きたくないっスか？", yesMessage = "意外とアウトドア派なんスね", noMessage = "二人でカレー作ったりしたかったっス……", yesFace = NIKORI, noFace = SYOBON }]

phaseBQuestions = [
    {question = "先輩、仮に私が先輩のこと好きって言ったら、嬉しいッスか？", yesMessage = "いや、まあ嫌いっスけど", noMessage = "先輩のくせに生意気っス", yesFace = NIKORI, noFace = SYOBON },
    {question = "今日の夕飯は私が作ってあげるっス。嫌いなものあるっスか？", yesMessage = "駄目っスよ。大きくなれないっス。長生きも出来ないかも知れないっス……", noMessage = "いい子っス。腕によりをかけて作るっスよ―！", yesFace = NIKORI, noFace = SYOBON},
    {question = "……質問ばかりでウザいっスか？", yesMessage = "ごめんなさい。申し訳ないっス。", noMessage = "良かったっス。先輩のこともっと知りたいっス。", yesFace = NIKORI, noFace = SYOBON},
    {question = "目玉焼きには醤油派っスか？", yesMessage = "私はケチャップ派っス", noMessage = "じゃあソース、塩コショウ、ケチャップ……まさかハチミツっスか？", yesFace = NIKORI, noFace = SYOBON},
    {question = "仮にこの世界に先輩と私しかいなかったらどうするッス？", yesMessage = "ふふふ", noMessage = "ふふふ", yesFace = NIKORI, noFace = SYOBON},
    {question = "先輩、たまには自分の意志を言って欲しいっス", yesMessage = "……", noMessage = "……", yesFace = NIKORI, noFace = SYOBON},
    {question = "親子丼が食べたいっス", yesMessage = "あ、私にはお母さんいないっス", noMessage = "私、親子丼の三つ葉が好きなんスよね", yesFace = NIKORI, noFace = SYOBON},
    {question = "私って可愛いっスか？", yesMessage = "ありがとうっス", noMessage = "調子に乗ってすんませんス", yesFace = NIKORI, noFace = SYOBON }]

phaseCQuestions = [
    {question = "先輩、実はこの世界って私たち二人しかいないんス。寂しいッスか？", yesMessage = "私も実はちょっとそう思うっス", noMessage = "……先輩変わってるっス", yesFace = NIKORI, noFace = SYOBON},
    {question = "夢は見るほうっスか？", yesMessage = "夢で私に出会ったらよろしくっス", noMessage = "私はよく見るっス。夢の中の先輩はもう少しカッコいいっス", yesFace = NIKORI, noFace = NIKORI},
    {question = "胡蝶の夢って知ってるっスか？", yesMessage = "実はこれ、先輩の夢かも知れないっスね", noMessage = "先輩、もうちょっと勉強するっス", yesFace = NIKORI, noFace = SYOBON},
    {question = "せーんぱい？", yesMessage = "えへへ", noMessage = "むー", yesFace = NIKORI, noFace = SYOBON},
    {question = "二人は寂しいスなぁ。……子作りするッス？", yesMessage = "冗談っスよ。エッチ", noMessage = "すまないっス。魅力なくてすまないっス。", yesFace = NIKORI, noFace = SYOBON},
    {question = "……", yesMessage = "なにが「はい」っスか。イエスマンも大概にするっス", noMessage = "なにが「いいえ」っスか。天邪鬼も大概にするっス", yesFace = NIKORI, noFace = SYOBON}]

sampleQuestions seed = take 3 (Util.shuffle phaseAQuestions seed)

sampleQuestions2 seed = take 4 (Util.shuffle phaseBQuestions seed)

sampleQuestions3 seed = take 3 (Util.shuffle phaseCQuestions seed)