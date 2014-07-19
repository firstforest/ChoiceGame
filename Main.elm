module ChoiceGame where

import Mouse
import Graphics.Input
import Graphics.Input.Field as Field
import Question (..)
import Girl (..)
import Random
import String as S
import Http (..)
import LoadAssets (..)

width = 320
height = 480

data Decision = YES | NO | NONE | NEXT
type UserInput = {decision : Decision, userName : Field.Content, seed : Int}

decision : Graphics.Input.Input Decision
decision = Graphics.Input.input NONE

nameField : Graphics.Input.Input Field.Content
nameField = Graphics.Input.input (Field.Content "noName" (Field.Selection 0 0 Field.Forward))

userInput : Signal UserInput
userInput = UserInput <~ decision.signal ~ nameField.signal ~ Random.range -10000 10000 (constant 0)

type Input = { userInput : UserInput , point : Int, status : Status }

data Phase = LOADING Float | OPENING | PROLOGUE | A | B | C | D | E | SCORE | ENDING | GAMEOVER | END
data State = ANSWER | QUESTION

type Button = { text : String, decision : Decision }

type Game = { phase : Phase, state:State, girl:Girl, yesButton : Button, noButton : Button,
  message : String, currentQuestion : Question, questions : [Question], bgm : String, isClick : Bool, isLevelUp : Bool, score : Int , yesnum : Float , userName: Field.Content }

defaultGame : Game
defaultGame = {
  phase = LOADING 0,
  state = QUESTION,
  girl = { face = NATURAL },
  yesButton = {text = "はい", decision = YES },
  noButton = {text = "いいえ", decision = NO },
  message = "……ぱい……先輩っ！　聞こえてるっスか？",
  questions = prologueQuestions,
  currentQuestion = {
    question = "……ぱい……先輩っ！　聞こえてるっスか？",
    yesMessage = "しっかりしてくださいっス",
    yesFace = NIKORI,
    noMessage = "聞こえてるじゃないっスか",
    noFace = NIKORI },
  bgm = "BGM1",
  isClick = False,
  isLevelUp = False,
  score = 0,
  yesnum = 0,
  userName = (Field.Content "noName" (Field.Selection 0 0 Field.Forward)) }

-- update --
stepGirl : UserInput -> Question -> Girl -> Girl
stepGirl input question girl =
  case input.decision of
    YES -> { girl | face <- question.yesFace }
    NO -> { girl | face <- question.noFace }
    NONE -> { girl | face <- NATURAL }

questionGirl : Game -> Girl
questionGirl {currentQuestion, girl, phase} =
  if phase == D || phase == E
  then
      { girl | face <- currentQuestion.yesFace }
  else
      { girl | face <- NATURAL }

updateGirl : Input -> Game -> Game
updateGirl { userInput } ({ currentQuestion, girl, state } as game) =
  let
      nextGirl =
          case state of
            ANSWER -> stepGirl userInput currentQuestion girl
            QUESTION -> questionGirl game
  in
    { game | girl <- nextGirl }

stepState : UserInput -> Game -> Game
stepState { seed } game =
    case game.phase of
      -- PROLOGUEの問題設定などはdefaultGameで行っているためここではphaseの変更のみ
      OPENING -> { game | phase <- PROLOGUE }
      PROLOGUE -> { game | phase <- A, questions <- sampleQuestions seed, isLevelUp <- True }
      A -> { game | phase <- B, questions <- sampleQuestions2 seed, isLevelUp <- True }
      B -> { game | phase <- C, questions <- sampleQuestions3 seed, isLevelUp <- True }
      C -> { game | phase <- D, questions <- questionsD, isLevelUp <- True , bgm <- "BGM2"}
      D -> { game | phase <- E, questions <- questionsE, isLevelUp <- True , bgm <- "None" }
      E -> { game | phase <- SCORE }
      SCORE -> { game | phase <- ENDING, state <- QUESTION }
      ENDING -> { game | phase <- END }
      GAMEOVER -> { defaultGame | phase <- OPENING }
      _ -> game

isUpdateNeed : UserInput -> Game -> Bool
isUpdateNeed { decision } { phase, questions } =
  case phase of
    OPENING -> (decision == NEXT)
    SCORE -> (decision == NEXT)
    ENDING -> True
    GAMEOVER -> True
    _ -> (isEmpty questions)

updateState : UserInput -> Game -> Game
updateState userInput game =
    if isUpdateNeed userInput game
    then stepState userInput game
    else game

formatMessage : Game -> String -> String
formatMessage { yesnum } message =
  S.join "" 
  (map (\w -> if w == "{yesnum}" then show yesnum else w)
    (S.split "/" message))

stepQuestion : Game -> Game
stepQuestion game =
  let
    q = head game.questions
    qs = tail game.questions
    message = formatMessage game q.question
  in
    { game | state <- QUESTION, message <- message, currentQuestion <- q, questions <- qs }

updateQuestion : Game -> Game
updateQuestion game =
  case game.phase of
    OPENING -> game
    SCORE -> game
    ENDING -> game
    GAMEOVER -> game
    _ -> stepQuestion game

nextGame : UserInput -> Game -> Game
nextGame userInput = updateQuestion . ( updateState userInput )

updateUserName : Input -> Game -> Game
updateUserName { userInput } game =
  let
    userName = userInput.userName
    nextUserName = { userName | string <- (String.left 20 userName.string) }
  in
    { game | userName <- nextUserName }

stepGame : Input -> Game -> Game
stepGame input = (updateGirl input) . (updateGame input) . clearSound . (updateUserName input)

stepScore : Int -> Game -> Int
stepScore point { score, phase } =
  case phase of
    OPENING -> score
    SCORE -> score
    ENDING -> score + point
    _ -> score + point

updateGame ({ userInput , point } as input) ({ currentQuestion } as game) =
  case game.state of
    QUESTION ->
      let
        nextScore = stepScore point game
      in
        case userInput.decision of
          YES ->
              if game.phase == D || game.phase == E
              then nextGame userInput { game | isClick <- True, score <- nextScore , yesnum <- (game.yesnum + 1) }
              else { game | state <- ANSWER, message <- currentQuestion.yesMessage, isClick <- True, score <- nextScore, yesnum <- (game.yesnum + 1)  }
          NO ->
              if game.phase == D || game.phase == E
              then { game | state <- ANSWER, phase <- GAMEOVER, message <- "……そうっスか。ここで「いいえ」と言われたらおしまいっス。……やっぱダメだったスかぁ。先輩、また今度っス" }
              else 
                  { game | state <- ANSWER, message <- currentQuestion.noMessage, isClick <- True, score <- nextScore, yesnum <- 0 }
          NONE ->
            game
          NEXT -> stepState userInput game
    ANSWER ->
        nextGame userInput game

-- sound --
clearClickSound : Game -> Game
clearClickSound game = { game | isClick <- False }

clearLevelUpSound : Game -> Game
clearLevelUpSound game = { game | isLevelUp <- False }

clearSound : Game -> Game
clearSound = clearClickSound . clearLevelUpSound

-- display --
colorButton : Color -> Button -> Element
colorButton c b =
  container 160 50 middle
    (container 140 50 middle
      (toText b.text |> centered) |> color c)

upButton : Button -> Element
upButton b =
  colorButton (rgba 200 200 200 0.8) b

hoverButton : Button -> Element
hoverButton b =
  colorButton (rgba 200 200 200 0.4) b

downButton : Button -> Element
downButton b =
  colorButton (rgba 180 180 180 0.8) b

displayButton : Graphics.Input.Handle Decision -> Button -> Element
displayButton handle b =
  Graphics.Input.customButton handle b.decision
      (upButton b)
      (hoverButton b)
      (downButton b)

displayButtons : Button -> Button -> Element
displayButtons yesButton noButton =
  (flow right [
    displayButton decision.handle yesButton,
    displayButton decision.handle noButton
  ])

getGirlSrc : Face -> String
getGirlSrc face =
  case face of
    NATURAL -> "img/natural.gif"
    NIKORI -> "img/nikori.gif"
    SYOBON -> "img/syobon.gif"
    BIKKURI -> "img/bikkuri.gif"
    MU -> "img/mu.gif"
    EHEHE -> "img/ehehe.gif"
    TERELOOP -> "img/tereloop.gif"
    MAJIME -> "img/majime.gif"
    HAPPY -> "img/ending.gif"

displayGirl : Girl -> Element
displayGirl girl = image width height (getGirlSrc girl.face)

displayMessage : String -> Element
displayMessage message =
  color (rgba 255 255 255 0.8)
  (container width 100 middle
  (toText message |> leftAligned |> size 280 80))

displayPhase : Phase -> Element
displayPhase phase =
  let
    stars =
      case phase of
        A -> "★"
        B -> "★★"
        C -> "★★★"
        D -> "★★★★"
        _ -> ""
  in
    (container width 30 middle
    (toText stars |> leftAligned |> size 280 30))

displayScore : Int -> Element
displayScore score =
    (container width 30 middle
    (toText (show score) |> leftAligned |> size 280 30))

displayUI : Game -> Element
displayUI ({yesButton, noButton, message, phase, score} as game) =
  flow down [
    (spacer width 10), 
    (displayScore score),
    (displayPhase phase),
    (spacer width 250), 
    displayMessage message ,
    (spacer width 5),
    displayButtons yesButton noButton]

scoreMessage game =
    "遊んでくれてありがとうっス、センパイ。\n"
    ++ (show game.score)
    ++ "点も取るなんてすごいっス。"
    ++ "良ければ名前を教えてくださいっス！"

displayScorePhase : Game -> Element
displayScorePhase game =
  flow down
    [
     spacer width 50
     , container width 50 middle
     (Field.field Field.defaultStyle nameField.handle id "名前を入れてくださいっス" game.userName)
     , displayMessage (scoreMessage game)
     , container width 50 middle (displayButton decision.handle (Button "決定" NEXT))
    ]

displayEndingMessage : Game -> Element
displayEndingMessage { userName } =
  layers [ displayGirl {face = HAPPY}
         , flow down [ spacer width 320
                     , displayMessage ("……今なんて言ったっス？\n「"
                               ++ userName.string
                               ++ "」……？\n"
                               ++ "そう言ったっス？　そう言ったっスか!?\n"
                               ++ "ふへ……ふへへ……こんにちはっス！")
                     , container width 50 middle (displayButton decision.handle (Button "こんにちは！" NEXT))
                     ]
         ]

displayRanking : Element
displayRanking =
  container width 150 middle [markdown|
* su_pa_ : 849点
* firstforest : 799点
* AAA : 756点
|]

displayOpeningPhase : Game -> Element
displayOpeningPhase game =
  flow down [ spacer width 150
            , container width 20 middle (toText "「いいえ、その答えは\"はい\"です」" |> bold |> centered)
            , displayRanking
            , container width 50 middle (displayButton decision.handle (Button "Hello!" NEXT))
            ]

displayEndingPhase : Game -> Element
displayEndingPhase game =
  layers [ displayGirl game.girl
         , displayEndingMessage game
         ]

displayEND : Element
displayEND =
  flow down [ container width 320 middle (toText "「いいえ、その答えは\"はい\"です」\n\n完" |> bold |> centered)
            , container width 20 middle (plainText "Thank you for playing!")
            ]

displayLoading : Float -> Element
displayLoading p =
  flow down [ container width 320 middle
                            ((toText ("NowLoading... " ++ (show (round p)) ++ "/100")) |> bold |> centered)
            ]
  
display : Game -> Element
display ({ girl } as game) =
  case game.phase of
    LOADING p -> displayLoading p
    OPENING -> displayOpeningPhase game
    SCORE -> displayScorePhase game
    ENDING -> displayEndingPhase game
    END -> displayEND
    _ -> layers [
          displayGirl girl,
          displayUI game] |> Graphics.Input.clickable decision.handle NONE

input = lift3 Input userInput (Random.range 30 40 userInput) status

responses : Signal [Response String] 
responses = combine (map (sendGet . constant) 
                             [ "img/ehehe.gif"
                             , "img/natural.gif"
                             , "img/bikkuri.gif"
                             , "img/syobon.gif"
                             , "img/nikori.gif"
                             , "img/mu.gif"
                             , "img/tereloop.gif"
                             , "img/majime.gif"
                             , "img/ending.gif"
                             ])

assets : Signal [Asset]
assets = lift (map toAsset) responses

status : Signal Status
status = lift toStatus assets

startGame : Input -> Game -> Game
startGame ({status} as input) ({phase} as game) =
  case phase of
    LOADING _ ->
        case status of
          Complete -> stepGame input { game | phase <- OPENING }
          InProgress p -> { game | phase <- LOADING (100 - p)}
          _ -> game
    _ ->
      stepGame input game

gameState = foldp startGame defaultGame input

main = lift display gameState

port jsMusicPlay : Signal String
port jsMusicPlay = .bgm <~ gameState

port jsPlayClickSound : Signal Bool
port jsPlayClickSound = .isClick <~ gameState

port jsPlayLevelUpSound : Signal Bool
port jsPlayLevelUpSound = .isLevelUp <~ gameState