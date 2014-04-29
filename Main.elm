import Mouse
import Graphics.Input

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

type Girl = { hyoujou : Int, src : String }

type Question = { question : String, yesMessage : String, noMessage : String }

type Button = { text : String, decision : Decision }

type Game = { phase : Phase, state:State, girl:Girl, yesButton : Button, noButton : Button,
  message : String, currentQuestion : Question, questions : [Question]}

sampleQuestions = [
  {question = "2", yesMessage = "hi", noMessage = "no" },
  {question = "3", yesMessage = "hi", noMessage = "no" }]

sampleQuestions2 = [
  {question = "4", yesMessage = "hi", noMessage = "no" },
  {question = "5", yesMessage = "hi", noMessage = "no" }]

defaultGame : Game
defaultGame = {phase = A, state = QUESTION, girl = {hyoujou = 1, src = "img/choice1.jpg"},
  yesButton = {text = "はい", decision = YES }, noButton = {text = "いいえ", decision = NO },
  message = "先輩、私のこと好きっスか？", questions = sampleQuestions,
  currentQuestion =
    {question = "先輩、私のこと好きっスか？", yesMessage = "hi", noMessage = "no" } }

-- update --
stepGirl : UserInput -> Girl -> Girl
stepGirl input girl =
  case input.decision of
    YES -> { girl | src <- "img/choice2.jpg" }
    NO -> { girl | src <- "img/choice4.jpg" }
    NONE -> { girl | src <- "img/choice1.jpg" }

nextGame : Game -> Game
nextGame game =
  let
    ng = if (isEmpty game.questions)
           then { game | phase <- B, questions <- sampleQuestions2 }
           else game
    q = head ng.questions
    qs = tail ng.questions
    message = q.question
  in
    { ng | state <- QUESTION, message <- message, currentQuestion <- q, questions <- qs }

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
