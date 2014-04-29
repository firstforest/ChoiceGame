module Question where

type Question = { question : String, yesMessage : String, noMessage : String }

sampleQuestions = [
  {question = "海。海行きたくないスか？", yesMessage = "下心ありそうな顔っスね", noMessage = "せっかく新しい水着買ったのに……" },
  {question = "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？", yesMessage = "そうっスよね。先輩犬っぽいですもん", noMessage = "えー、猫派っスか。猫……にゃーん……" },
  {question = "プリン食べたいっスなぁ", yesMessage = "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？", noMessage = "先輩の分も作っておいたのに……" },
  {question = "クレヨンしんちゃんの映画観たっスか？", yesMessage = "最後ヤバかったスよねっ。なんだか他人ごとと思えなかったっス", noMessage = "恥ずかしながらボロボロ泣いてしまったっス。おすすめっスよ" }
  ]
  
sampleQuestions2 = [
  {question = "4", yesMessage = "hi", noMessage = "no" },
  {question = "5", yesMessage = "hi", noMessage = "no" }]

sampleQuestions3 = [
  {question = "6", yesMessage = "hi", noMessage = "no" },
  {question = "7", yesMessage = "hi", noMessage = "no" }]