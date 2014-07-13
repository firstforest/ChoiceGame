module ChoiceGame where

import Mouse
import Graphics.Input
import Graphics.Input.Field as Field
import Question (..)
import Girl (..)
import Random
import Json (..)
import String as S

width = 320
height = 480

data Decision = YES | NO | NONE | NEXT
type UserInput = {decision : Decision, userName : Field.Content, seed : Int}

decision : Graphics.Input.Input Decision
decision = Graphics.Input.input NONE

nameField : Graphics.Input.Input Field.Content
nameField = Graphics.Input.input Field.noContent

userInput : Signal UserInput
userInput = UserInput <~ decision.signal ~ nameField.signal ~ Random.range -10000 10000 (constant 0)

type Input = { userInput : UserInput , point : Int}

data Phase = PROLOGUE | A | B | C | D | E | SCORE | GAMEOVER
data State = ANSWER | QUESTION

type Button = { text : String, decision : Decision }

type Game = { phase : Phase, state:State, girl:Girl, yesButton : Button, noButton : Button,
  message : String, currentQuestion : Question, questions : [Question], bgm : String, isClick : Bool, isLevelUp : Bool, score : Int , yesnum : Float , userName: Field.Content }

defaultGame : Game
defaultGame = {
  phase = PROLOGUE,
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
  userName = Field.noContent }

-- update --
stepGirl : UserInput -> Question -> Girl -> Girl
stepGirl input question girl =
  case input.decision of
    YES -> { girl | face <- question.yesFace }
    NO -> { girl | face <- question.noFace }
    NONE -> { girl | face <- NATURAL }

updateGirl : Input -> Game -> Game
updateGirl { userInput } ({ currentQuestion, girl, state } as game) =
  let
      nextGirl =
          case state of
            ANSWER -> stepGirl userInput currentQuestion girl
            QUESTION -> { girl | face <- NATURAL }
  in
    { game | girl <- nextGirl }

stepState : UserInput -> Game -> Game
stepState { seed } game = 
  if (isEmpty game.questions)
  then
      case game.phase of
        PROLOGUE -> { game | phase <- A, questions <- sampleQuestions seed, isLevelUp <- True }
        A -> { game | phase <- B, questions <- sampleQuestions2 seed, isLevelUp <- True }
        B -> { game | phase <- C, questions <- sampleQuestions3 seed, isLevelUp <- True }
        C -> { game | phase <- D, questions <- questionsD, isLevelUp <- True , bgm <- "BGM2"}
        D -> { game | phase <- E, questions <- questionsE, isLevelUp <- True , bgm <- "None" }
        E -> { game | phase <- SCORE, questions <- questionsE }
        GAMEOVER -> game
        _ -> { game | phase <- C, questions <- sampleQuestions3 seed, isLevelUp <- True }
  else game

formatMessage : Game -> String -> String
formatMessage { yesnum } message =
  S.join "" 
  (map (\w -> if w == "{yesnum}" then toString "" (Number yesnum) else w)
    (S.split "/" message))

stepQuestion : Game -> Game
stepQuestion game =
  let
    q = head game.questions
    qs = tail game.questions
    message = formatMessage game q.question
  in
    { game | state <- QUESTION, message <- message, currentQuestion <- q, questions <- qs }

nextGame : UserInput -> Game -> Game
nextGame userInput = stepQuestion . ( stepState userInput )

updateUserName : Input -> Game -> Game
updateUserName { userInput } game =
  { game | userName <- userInput.userName }

stepGame : Input -> Game -> Game
stepGame input = (updateGirl input) . (updateGame input) . clearSound . (updateUserName input)

updateGame ({ userInput , point } as input) ({ currentQuestion } as game) =
  case game.state of
    QUESTION ->
        case userInput.decision of
          YES ->
              if game.phase == D || game.phase == E
              then nextGame userInput { game | isClick <- True, score <- game.score + point , yesnum <- (game.yesnum + 1) }
              else { game | state <- ANSWER, message <- currentQuestion.yesMessage, isClick <- True, score <- game.score + point, yesnum <- (game.yesnum + 1)  }
          NO ->
              if game.phase == D || game.phase == E
              then { game | phase <- GAMEOVER, message <- "……そうっスか。ここで「いいえ」と言われたらおしまいっス。……やっぱダメだったスかぁ。先輩、また今度っス" }
              else 
                  { game | state <- ANSWER, message <- currentQuestion.noMessage, isClick <- True, score <- game.score + point, yesnum <- 0 }
          NONE ->
            game
          NEXT -> defaultGame
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
    NATURAL -> "img/natural.jpg"
    NIKORI -> "img/nikori.jpg"
    SYOBON -> "img/syobon.jpg"
    ELTSU -> "img/eltsu.jpg"
    BIKKURI -> "img/bikkuri.jpg"
    MU -> "img/mu.jpg"
    EHEHE -> "img/ehehe.jpg"

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

display : Game -> Element
display ({ girl } as game) =
  if game.phase == SCORE
  then
    displayScorePhase game
  else
    layers [
      displayGirl girl,
      displayUI game] |> Graphics.Input.clickable decision.handle NONE

input = lift2 Input userInput (Random.range 30 40 userInput)

gameState = foldp stepGame defaultGame input

main = lift display gameState

port jsMusicPlay : Signal String
port jsMusicPlay = .bgm <~ gameState

port jsPlayClickSound : Signal Bool
port jsPlayClickSound = .isClick <~ gameState

port jsPlayLevelUpSound : Signal Bool
port jsPlayLevelUpSound = .isLevelUp <~ gameState