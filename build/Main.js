Elm.ChoiceGame = Elm.ChoiceGame || {};
Elm.ChoiceGame.make = function (_elm) {
   "use strict";
   _elm.ChoiceGame = _elm.ChoiceGame || {};
   if (_elm.ChoiceGame.values)
   return _elm.ChoiceGame.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ChoiceGame";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Mouse = Elm.Mouse.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Question = Elm.Question.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var delta = Time.fps(30);
   var colorButton = F2(function (c,
   b) {
      return A4(Graphics.Element.container,
      160,
      50,
      Graphics.Element.middle,
      Graphics.Element.color(c)(A4(Graphics.Element.container,
      140,
      50,
      Graphics.Element.middle,
      Text.centered(Text.toText(b.text)))));
   });
   var upButton = function (b) {
      return A2(colorButton,
      A4(Color.rgba,200,200,200,0.8),
      b);
   };
   var hoverButton = function (b) {
      return A2(colorButton,
      A4(Color.rgba,200,200,200,0.4),
      b);
   };
   var downButton = function (b) {
      return A2(colorButton,
      A4(Color.rgba,180,180,180,0.8),
      b);
   };
   var displayButton = F2(function (handle,
   b) {
      return A5(Graphics.Input.customButton,
      handle,
      b.decision,
      upButton(b),
      hoverButton(b),
      downButton(b));
   });
   var Game = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,currentQuestion: g
             ,girl: c
             ,message: f
             ,musicPlay: i
             ,noButton: e
             ,phase: a
             ,questions: h
             ,state: b
             ,yesButton: d};
   });
   var Button = F2(function (a,b) {
      return {_: {}
             ,decision: b
             ,text: a};
   });
   var Girl = function (a) {
      return {_: {},src: a};
   };
   var QUESTION = {ctor: "QUESTION"};
   var stepQuestion = function (game) {
      return function () {
         var qs = List.tail(game.questions);
         var q = List.head(game.questions);
         var message = q.question;
         return _U.replace([["state"
                            ,QUESTION]
                           ,["message",message]
                           ,["currentQuestion",q]
                           ,["questions",qs]],
         game);
      }();
   };
   var ANSWER = {ctor: "ANSWER"};
   var C = {ctor: "C"};
   var B = {ctor: "B"};
   var A = {ctor: "A"};
   var stepState = function (game) {
      return List.isEmpty(game.questions) ? function () {
         var _v0 = game.phase;
         switch (_v0.ctor)
         {case "A":
            return _U.replace([["phase",B]
                              ,["questions"
                               ,Question.sampleQuestions2]],
              game);
            case "B":
            return _U.replace([["phase",C]
                              ,["questions"
                               ,Question.sampleQuestions3]],
              game);}
         return _U.replace([["phase",C]
                           ,["questions"
                            ,Question.sampleQuestions3]],
         game);
      }() : game;
   };
   var nextGame = function ($) {
      return stepQuestion(stepState($));
   };
   var Input = F2(function (a,b) {
      return {_: {}
             ,timeDelta: a
             ,userInput: b};
   });
   var UserInput = function (a) {
      return {_: {},decision: a};
   };
   var NONE = {ctor: "NONE"};
   var decision = Graphics.Input.input(NONE);
   var userInput = A2(Signal._op["<~"],
   UserInput,
   decision.signal);
   var input = A2(Signal.sampleOn,
   delta,
   A3(Signal.lift2,
   Input,
   delta,
   userInput));
   var displayButtons = F2(function (yesButton,
   noButton) {
      return A2(Graphics.Element.flow,
      Graphics.Element.right,
      _L.fromArray([A2(displayButton,
                   decision.handle,
                   yesButton)
                   ,A2(displayButton,
                   decision.handle,
                   noButton)]));
   });
   var NO = {ctor: "NO"};
   var YES = {ctor: "YES"};
   var defaultGame = {_: {}
                     ,currentQuestion: {_: {}
                                       ,noMessage: "聞こえてるじゃないっスか"
                                       ,question: "……ぱい……先輩っ！　聞こえてるっスか？"
                                       ,yesMessage: "しっかりしてくださいっス"}
                     ,girl: {_: {}
                            ,src: "img/choice1.jpg"}
                     ,message: "……ぱい……先輩っ！　聞こえてるっスか？"
                     ,musicPlay: true
                     ,noButton: {_: {}
                                ,decision: NO
                                ,text: "いいえ"}
                     ,phase: A
                     ,questions: Question.sampleQuestions
                     ,state: QUESTION
                     ,yesButton: {_: {}
                                 ,decision: YES
                                 ,text: "はい"}};
   var stepGirl = F2(function (input,
   girl) {
      return function () {
         var _v1 = input.decision;
         switch (_v1.ctor)
         {case "NO":
            return _U.replace([["src"
                               ,"img/choice4.jpg"]],
              girl);
            case "NONE":
            return _U.replace([["src"
                               ,"img/choice1.jpg"]],
              girl);
            case "YES":
            return _U.replace([["src"
                               ,"img/choice2.jpg"]],
              girl);}
         _E.Case($moduleName,
         "between lines 49 and 52");
      }();
   });
   var stepGame = F2(function (_v2,
   _v3) {
      return function () {
         return function () {
            return function () {
               var g = A2(stepGirl,
               _v2.userInput,
               _v3.girl);
               return function () {
                  var _v6 = _v3.state;
                  switch (_v6.ctor)
                  {case "ANSWER":
                     return _U.eq(_v2.userInput.decision,
                       NONE) ? nextGame(_U.replace([["girl"
                                                    ,g]],
                       _v3)) : _v3;
                     case "QUESTION":
                     return function () {
                          var _v7 = _v2.userInput.decision;
                          switch (_v7.ctor)
                          {case "NO":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v3.currentQuestion.noMessage]
                                               ,["girl",g]],
                               _v3);
                             case "NONE": return _v3;
                             case "YES":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v3.currentQuestion.yesMessage]
                                               ,["girl",g]],
                               _v3);}
                          _E.Case($moduleName,
                          "between lines 83 and 90");
                       }();}
                  _E.Case($moduleName,
                  "between lines 81 and 93");
               }();
            }();
         }();
      }();
   });
   var gameState = A3(Signal.foldp,
   stepGame,
   defaultGame,
   input);
   var jsMusicPlay = Native.Ports.portOut("jsMusicPlay",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2(Signal._op["<~"],
   function (_) {
      return _.musicPlay;
   },
   gameState));
   var height = 480;
   var width = 320;
   var displayGirl = function (girl) {
      return A3(Graphics.Element.image,
      width,
      height,
      girl.src);
   };
   var displayMessage = function (message) {
      return A2(Graphics.Element.color,
      A4(Color.rgba,255,255,255,0.8),
      A4(Graphics.Element.container,
      width,
      100,
      Graphics.Element.middle,
      A2(Graphics.Element.size,
      280,
      80)(Text.leftAligned(Text.toText(message)))));
   };
   var displayUI = function (_v8) {
      return function () {
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([A2(Graphics.Element.spacer,
                      width,
                      320)
                      ,displayMessage(_v8.message)
                      ,A2(Graphics.Element.spacer,
                      width,
                      5)
                      ,A2(displayButtons,
                      _v8.yesButton,
                      _v8.noButton)]));
      }();
   };
   var display = function (_v10) {
      return function () {
         return A2(Graphics.Input.clickable,
         decision.handle,
         NONE)(Graphics.Element.layers(_L.fromArray([displayGirl(_v10.girl)
                                                    ,displayUI(_v10)])));
      }();
   };
   var main = A2(Signal.lift,
   display,
   gameState);
   _elm.ChoiceGame.values = {_op: _op
                            ,width: width
                            ,height: height
                            ,decision: decision
                            ,userInput: userInput
                            ,defaultGame: defaultGame
                            ,stepGirl: stepGirl
                            ,stepState: stepState
                            ,stepQuestion: stepQuestion
                            ,nextGame: nextGame
                            ,stepGame: stepGame
                            ,colorButton: colorButton
                            ,upButton: upButton
                            ,hoverButton: hoverButton
                            ,downButton: downButton
                            ,displayButton: displayButton
                            ,displayButtons: displayButtons
                            ,displayGirl: displayGirl
                            ,displayMessage: displayMessage
                            ,displayUI: displayUI
                            ,display: display
                            ,delta: delta
                            ,input: input
                            ,gameState: gameState
                            ,main: main
                            ,YES: YES
                            ,NO: NO
                            ,NONE: NONE
                            ,A: A
                            ,B: B
                            ,C: C
                            ,ANSWER: ANSWER
                            ,QUESTION: QUESTION
                            ,UserInput: UserInput
                            ,Input: Input
                            ,Girl: Girl
                            ,Button: Button
                            ,Game: Game};
   return _elm.ChoiceGame.values;
};Elm.Question = Elm.Question || {};
Elm.Question.make = function (_elm) {
   "use strict";
   _elm.Question = _elm.Question || {};
   if (_elm.Question.values)
   return _elm.Question.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Question";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var sampleQuestions3 = _L.fromArray([{_: {}
                                        ,noMessage: "no"
                                        ,question: "6"
                                        ,yesMessage: "hi"}
                                       ,{_: {}
                                        ,noMessage: "no"
                                        ,question: "7"
                                        ,yesMessage: "hi"}]);
   var sampleQuestions2 = _L.fromArray([{_: {}
                                        ,noMessage: "no"
                                        ,question: "4"
                                        ,yesMessage: "hi"}
                                       ,{_: {}
                                        ,noMessage: "no"
                                        ,question: "5"
                                        ,yesMessage: "hi"}]);
   var sampleQuestions = _L.fromArray([{_: {}
                                       ,noMessage: "せっかく新しい水着買ったのに……"
                                       ,question: "海。海行きたくないスか？"
                                       ,yesMessage: "下心ありそうな顔っスね"}
                                      ,{_: {}
                                       ,noMessage: "えー、猫派っスか。猫……にゃーん……"
                                       ,question: "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？"
                                       ,yesMessage: "そうっスよね。先輩犬っぽいですもん"}
                                      ,{_: {}
                                       ,noMessage: "先輩の分も作っておいたのに……"
                                       ,question: "プリン食べたいっスなぁ"
                                       ,yesMessage: "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？"}
                                      ,{_: {}
                                       ,noMessage: "恥ずかしながらボロボロ泣いてしまったっス。おすすめっスよ"
                                       ,question: "クレヨンしんちゃんの映画観たっスか？"
                                       ,yesMessage: "最後ヤバかったスよねっ。なんだか他人ごとと思えなかったっス"}]);
   var Question = F3(function (a,
   b,
   c) {
      return {_: {}
             ,noMessage: c
             ,question: a
             ,yesMessage: b};
   });
   _elm.Question.values = {_op: _op
                          ,sampleQuestions: sampleQuestions
                          ,sampleQuestions2: sampleQuestions2
                          ,sampleQuestions3: sampleQuestions3
                          ,Question: Question};
   return _elm.Question.values;
};