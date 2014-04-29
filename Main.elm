module ChoiceGame where

import Mouse
import Graphics.Input
import Question

width = 320
height = 480

data Decision = YES | NO | NONE
type UserInput = {decision : Decision}

decision : Graphics.Input.Input Decision
decision = Graphics.Input.input NONE

userInput : Signal UserInput
userInput = UserInput <~ decision.signal

type Input = { timeDelta:Float, userInput:UserInput }

data Phase = A | B | C
data State = ANSWER | QUESTION

type Girl = { src : String }

type Question = Question.Question

type Button = { text : String, decision : Decision }

type Game = { phase : Phase, state:State, girl:Girl, yesButton : Button, noButton : Button,
  message : String, currentQuestion : Question, questions : [Question], musicPlay : Bool }

defaultGame : Game
defaultGame = {
  phase = A,
  state = QUESTION,
  girl = {src = "img/choice1.jpg"},
  yesButton = {text = "はい", decision = YES },
  noButton = {text = "いいえ", decision = NO },
  message = "……ぱい……先輩っ！　聞こえてるっスか？",
  questions = Question.sampleQuestions,
  currentQuestion = {
    question = "……ぱい……先輩っ！　聞こえてるっスか？",
    yesMessage = "しっかりしてくださいっス",
    noMessage = "聞こえてるじゃないっスか" },
  musicPlay = True }

-- update --
stepGirl : UserInput -> Girl -> Girl
stepGirl input girl =
  case input.decision of
    YES -> { girl | src <- "img/choice2.jpg" }
    NO -> { girl | src <- "img/choice4.jpg" }
    NONE -> { girl | src <- "img/choice1.jpg" }

stepState : Game -> Game
stepState game = 
  if (isEmpty game.questions)
    then
      case game.phase of
        A -> { game | phase <- B, questions <- Question.sampleQuestions2 }
        B -> { game | phase <- C, questions <- Question.sampleQuestions3 }
        _ -> { game | phase <- C, questions <- Question.sampleQuestions3 }
    else game

stepQuestion : Game -> Game
stepQuestion game =
  let
    q = head game.questions
    qs = tail game.questions
    message = q.question
  in
    { game | state <- QUESTION, message <- message, currentQuestion <- q, questions <- qs }

nextGame : Game -> Game
nextGame = stepQuestion . stepState

stepGame : Input -> Game -> Game
stepGame ({ userInput } as input) ({ currentQuestion } as game) =
  let
    g = stepGirl userInput game.girl
  in
  case game.state of
    QUESTION ->
      case userInput.decision of
        YES ->
          { game | state <- ANSWER, message <- currentQuestion.yesMessage, girl <- g }
        NO ->
          { game | state <- ANSWER, message <- currentQuestion.noMessage, girl <- g }
        NONE ->
          game
    ANSWER ->
      if userInput.decision == NONE
        then nextGame { game | girl <- g }
        else game

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
  
displayGirl : Girl -> Element
displayGirl girl = image width height girl.src

displayMessage : String -> Element
displayMessage message =
  color (rgba 255 255 255 0.8)
  (container width 100 middle
  (toText message |> leftAligned |> size 280 80))

displayUI : Game -> Element
displayUI ({yesButton, noButton, message} as game) =
  flow down [
    (spacer width 320), 
    displayMessage message ,
    (spacer width 5),
    displayButtons yesButton noButton]

display : Game -> Element
display ({girl} as game) =
  layers [
    displayGirl girl,
    displayUI game] |> Graphics.Input.clickable decision.handle NONE

delta = fps 30
input = sampleOn delta (lift2 Input delta userInput)

gameState = foldp stepGame defaultGame input

main = lift display gameState

port jsMusicPlay : Signal Bool
port jsMusicPlay = .musicPlay <~ gameState
