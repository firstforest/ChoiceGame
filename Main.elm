module ChoiceGame where

import Mouse
import Graphics.Input
import Question (..)
import Girl (..)
import Random

width = 320
height = 480

data Decision = YES | NO | NONE
type UserInput = {decision : Decision, seed : Int}

decision : Graphics.Input.Input Decision
decision = Graphics.Input.input NONE

userInput : Signal UserInput
userInput = UserInput <~ decision.signal ~ Random.range -10000 10000 (constant 0)

type Input = { userInput : UserInput , point : Int}

data Phase = PROLOGUE | A | B | C
data State = ANSWER | QUESTION

type Button = { text : String, decision : Decision }

type Game = { phase : Phase, state:State, girl:Girl, yesButton : Button, noButton : Button,
  message : String, currentQuestion : Question, questions : [Question], musicPlay : Bool, isClick : Bool, isLevelUp : Bool, score : Int }

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
  musicPlay = True,
  isClick = False,
  isLevelUp = False,
  score = 0 }

-- update --
stepGirl : UserInput -> Question -> Girl -> Girl
stepGirl input question girl =
  case input.decision of
    YES -> { girl | face <- question.yesFace }
    NO -> { girl | face <- question.noFace }
    NONE -> { girl | face <- NATURAL }

stepState : UserInput -> Game -> Game
stepState { seed } game = 
  if (isEmpty game.questions)
    then
      case game.phase of
        PROLOGUE -> { game | phase <- A, questions <- sampleQuestions seed, isLevelUp <- True }
        A -> { game | phase <- B, questions <- sampleQuestions2 seed, isLevelUp <- True }
        B -> { game | phase <- C, questions <- sampleQuestions3 seed, isLevelUp <- True }
        _ -> { game | phase <- C, questions <- sampleQuestions3 seed, isLevelUp <- True }
    else game

stepQuestion : Game -> Game
stepQuestion game =
  let
    q = head game.questions
    qs = tail game.questions
    message = q.question
  in
    { game | state <- QUESTION, message <- message, currentQuestion <- q, questions <- qs }

clearClickSound : Game -> Game
clearClickSound game = { game | isClick <- False }

clearLevelUpSound : Game -> Game
clearLevelUpSound game = { game | isLevelUp <- False }

clearSound : Game -> Game
clearSound = clearClickSound . clearLevelUpSound

nextGame : UserInput -> Game -> Game
nextGame userInput = stepQuestion . ( stepState userInput )

stepGame : Input -> Game -> Game
stepGame ({ userInput , point } as input) ({ currentQuestion } as game') =
  let
    g = stepGirl userInput currentQuestion game.girl
    game = clearSound game'
  in
    case game.state of
      QUESTION ->
        case userInput.decision of
          YES ->
            { game | state <- ANSWER, message <- currentQuestion.yesMessage, girl <- g, isClick <- True, score <- game.score + point }
          NO ->
            { game | state <- ANSWER, message <- currentQuestion.noMessage, girl <- g , isClick <- True, score <- game.score + point }
          NONE ->
            game
      ANSWER ->
        nextGame userInput { game | girl <- { g | face <- NATURAL } }

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

display : Game -> Element
display ({girl} as game) =
  layers [
    displayGirl girl,
    displayUI game] |> Graphics.Input.clickable decision.handle NONE

input = lift2 Input userInput (Random.range 30 40 userInput)

gameState = foldp stepGame defaultGame input

main = lift display gameState

port jsMusicPlay : Signal Bool
port jsMusicPlay = .musicPlay <~ gameState

port jsPlayClickSound : Signal Bool
port jsPlayClickSound = .isClick <~ gameState

port jsPlayLevelUpSound : Signal Bool
port jsPlayLevelUpSound = .isLevelUp <~ gameState