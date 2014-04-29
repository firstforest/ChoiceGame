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
   _J = _N.JavaScript.make(_elm),
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
   Native.Ports = Elm.Native.Ports.make(_elm);
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
   var sampleQuestions2 = _J.toList([{_: {}
                                     ,noMessage: "no"
                                     ,question: "4"
                                     ,yesMessage: "hi"}
                                    ,{_: {}
                                     ,noMessage: "no"
                                     ,question: "5"
                                     ,yesMessage: "hi"}]);
   var sampleQuestions = _J.toList([{_: {}
                                    ,noMessage: "no"
                                    ,question: "2"
                                    ,yesMessage: "hi"}
                                   ,{_: {}
                                    ,noMessage: "no"
                                    ,question: "3"
                                    ,yesMessage: "hi"}]);
   var Game = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,currentQuestion: g
             ,girl: c
             ,message: f
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
   var Question = F3(function (a,
   b,
   c) {
      return {_: {}
             ,noMessage: c
             ,question: a
             ,yesMessage: b};
   });
   var Girl = F2(function (a,b) {
      return {_: {}
             ,hyoujou: a
             ,src: b};
   });
   var QUESTION = {ctor: "QUESTION"};
   var ANSWER = {ctor: "ANSWER"};
   var C = {ctor: "C"};
   var B = {ctor: "B"};
   var nextGame = function (game) {
      return function () {
         var ng = List.isEmpty(game.questions) ? _U.replace([["phase"
                                                             ,B]
                                                            ,["questions"
                                                             ,sampleQuestions2]],
         game) : game;
         var q = List.head(ng.questions);
         var message = q.question;
         var qs = List.tail(ng.questions);
         return _U.replace([["state"
                            ,QUESTION]
                           ,["message",message]
                           ,["currentQuestion",q]
                           ,["questions",qs]],
         ng);
      }();
   };
   var A = {ctor: "A"};
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
      _J.toList([A2(displayButton,
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
                                       ,noMessage: "no"
                                       ,question: "先輩、私のこと好きっスか？"
                                       ,yesMessage: "hi"}
                     ,girl: {_: {}
                            ,hyoujou: 1
                            ,src: "img/choice1.jpg"}
                     ,message: "先輩、私のこと好きっスか？"
                     ,noButton: {_: {}
                                ,decision: NO
                                ,text: "いいえ"}
                     ,phase: A
                     ,questions: sampleQuestions
                     ,state: QUESTION
                     ,yesButton: {_: {}
                                 ,decision: YES
                                 ,text: "はい"}};
   var stepGirl = F2(function (input,
   girl) {
      return function () {
         var _v0 = input.decision;
         switch (_v0.ctor)
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
         "between lines 50 and 53");
      }();
   });
   var stepGame = F2(function (_v1,
   _v2) {
      return function () {
         return function () {
            return function () {
               var g = A2(stepGirl,
               _v1.userInput,
               _v2.girl);
               return function () {
                  var _v5 = _v2.state;
                  switch (_v5.ctor)
                  {case "ANSWER":
                     return _U.eq(_v1.userInput.decision,
                       NONE) ? nextGame(_U.replace([["girl"
                                                    ,g]],
                       _v2)) : _v2;
                     case "QUESTION":
                     return function () {
                          var _v6 = _v1.userInput.decision;
                          switch (_v6.ctor)
                          {case "NO":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v2.currentQuestion.noMessage]
                                               ,["girl",g]],
                               _v2);
                             case "NONE": return _v2;
                             case "YES":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v2.currentQuestion.yesMessage]
                                               ,["girl",g]],
                               _v2);}
                          _E.Case($moduleName,
                          "between lines 74 and 81");
                       }();}
                  _E.Case($moduleName,
                  "between lines 72 and 84");
               }();
            }();
         }();
      }();
   });
   var gameState = A3(Signal.foldp,
   stepGame,
   defaultGame,
   input);
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
   var displayUI = function (_v7) {
      return function () {
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _J.toList([A2(Graphics.Element.spacer,
                   width,
                   320)
                   ,displayMessage(_v7.message)
                   ,A2(Graphics.Element.spacer,
                   width,
                   5)
                   ,A2(displayButtons,
                   _v7.yesButton,
                   _v7.noButton)]));
      }();
   };
   var display = function (_v9) {
      return function () {
         return A2(Graphics.Input.clickable,
         decision.handle,
         NONE)(Graphics.Element.layers(_J.toList([displayGirl(_v9.girl)
                                                 ,displayUI(_v9)])));
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
                            ,sampleQuestions: sampleQuestions
                            ,sampleQuestions2: sampleQuestions2
                            ,defaultGame: defaultGame
                            ,stepGirl: stepGirl
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
                            ,Question: Question
                            ,Button: Button
                            ,Game: Game};
   return _elm.ChoiceGame.values;
};