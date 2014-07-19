Elm.ChoiceGame = Elm.ChoiceGame || {};
Elm.ChoiceGame.make = function (_elm) {
   "use strict";
   _elm.ChoiceGame = _elm.ChoiceGame || {};
   if (_elm.ChoiceGame.values)
   return _elm.ChoiceGame.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ChoiceGame";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Girl = Elm.Girl.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Graphics.Input || {};
   Graphics.Input.Field = Elm.Graphics.Input.Field.make(_elm);
   var Http = Elm.Http.make(_elm);
   var List = Elm.List.make(_elm);
   var LoadAssets = Elm.LoadAssets.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Mouse = Elm.Mouse.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Question = Elm.Question.make(_elm);
   var Random = Elm.Random.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var responses = Signal.combine(A2(List.map,
   function ($) {
      return Http.sendGet(Signal.constant($));
   },
   _L.fromArray(["img/ehehe.gif"
                ,"img/natural.gif"
                ,"img/bikkuri.gif"
                ,"img/syobon.gif"
                ,"img/nikori.gif"
                ,"img/mu.gif"
                ,"img/tereloop.gif"
                ,"img/majime.gif"
                ,"img/ending.gif"])));
   var assets = A2(Signal.lift,
   List.map(LoadAssets.toAsset),
   responses);
   var status = A2(Signal.lift,
   LoadAssets.toStatus,
   assets);
   var thanksMessage = "\nThank you for playing!\n\n……え……得点っスか？\nあれは飾りっス。あった方が干渉して\nくれる確率が上がるかなぁと思って……\nえへへ……\n";
   var scoreMessage = function (game) {
      return _L.append("遊んでくれてありがとうっス、センパイ。\n",
      _L.append(String.show(game.score),
      _L.append("点も取るなんてすごいっス。",
      "良ければ名前を教えてくださいっス！")));
   };
   var getGirlSrc = function (face) {
      return function () {
         switch (face.ctor)
         {case "BIKKURI":
            return "img/bikkuri.gif";
            case "EHEHE":
            return "img/ehehe.gif";
            case "HAPPY":
            return "img/ending.gif";
            case "MAJIME":
            return "img/majime.gif";
            case "MU": return "img/mu.gif";
            case "NATURAL":
            return "img/natural.gif";
            case "NIKORI":
            return "img/nikori.gif";
            case "SYOBON":
            return "img/syobon.gif";
            case "TERELOOP":
            return "img/tereloop.gif";}
         _E.Case($moduleName,
         "between lines 230 and 239");
      }();
   };
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
   var clearLevelUpSound = function (game) {
      return _U.replace([["isLevelUp"
                         ,false]],
      game);
   };
   var clearClickSound = function (game) {
      return _U.replace([["isClick"
                         ,false]],
      game);
   };
   var clearSound = function ($) {
      return clearClickSound(clearLevelUpSound($));
   };
   var updateUserName = F2(function (_v1,
   game) {
      return function () {
         return function () {
            var userName = _v1.userInput.userName;
            var nextUserName = _U.replace([["string"
                                           ,A2(String.left,
                                           20,
                                           userName.string)]],
            userName);
            return _U.replace([["userName"
                               ,nextUserName]],
            game);
         }();
      }();
   });
   var formatMessage = F2(function (_v3,
   message) {
      return function () {
         return A2(String.join,
         "",
         A2(List.map,
         function (w) {
            return _U.eq(w,
            "{yesnum}") ? String.show(_v3.yesnum) : w;
         },
         A2(String.split,"/",message)));
      }();
   });
   var Game = function (a) {
      return function (b) {
         return function (c) {
            return function (d) {
               return function (e) {
                  return function (f) {
                     return function (g) {
                        return function (h) {
                           return function (i) {
                              return function (j) {
                                 return function (k) {
                                    return function (l) {
                                       return function (m) {
                                          return function (n) {
                                             return {_: {}
                                                    ,bgm: i
                                                    ,currentQuestion: g
                                                    ,girl: c
                                                    ,isClick: j
                                                    ,isLevelUp: k
                                                    ,message: f
                                                    ,noButton: e
                                                    ,phase: a
                                                    ,questions: h
                                                    ,score: l
                                                    ,state: b
                                                    ,userName: n
                                                    ,yesButton: d
                                                    ,yesnum: m};
                                          };
                                       };
                                    };
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var Button = F2(function (a,b) {
      return {_: {}
             ,decision: b
             ,text: a};
   });
   var QUESTION = {ctor: "QUESTION"};
   var stepQuestion = function (game) {
      return function () {
         var qs = List.tail(game.questions);
         var q = List.head(game.questions);
         var message = A2(formatMessage,
         game,
         q.question);
         return _U.replace([["state"
                            ,QUESTION]
                           ,["message",message]
                           ,["currentQuestion",q]
                           ,["questions",qs]],
         game);
      }();
   };
   var ANSWER = {ctor: "ANSWER"};
   var END = {ctor: "END"};
   var GAMEOVER = {ctor: "GAMEOVER"};
   var ENDING = {ctor: "ENDING"};
   var SCORE = {ctor: "SCORE"};
   var E = {ctor: "E"};
   var D = {ctor: "D"};
   var questionGirl = function (_v5) {
      return function () {
         return _U.eq(_v5.phase,
         D) || _U.eq(_v5.phase,
         E) ? _U.replace([["face"
                          ,_v5.currentQuestion.yesFace]],
         _v5.girl) : _U.replace([["face"
                                 ,Girl.NATURAL]],
         _v5.girl);
      }();
   };
   var C = {ctor: "C"};
   var B = {ctor: "B"};
   var A = {ctor: "A"};
   var PROLOGUE = {ctor: "PROLOGUE"};
   var OPENING = {ctor: "OPENING"};
   var updateQuestion = function (game) {
      return function () {
         var _v7 = game.phase;
         switch (_v7.ctor)
         {case "ENDING": return game;
            case "GAMEOVER": return game;
            case "OPENING": return game;
            case "SCORE": return game;}
         return stepQuestion(game);
      }();
   };
   var stepScore = F2(function (point,
   _v8) {
      return function () {
         return function () {
            var _v10 = _v8.phase;
            switch (_v10.ctor)
            {case "ENDING":
               return _v8.score + point;
               case "OPENING":
               return _v8.score;
               case "SCORE": return _v8.score;}
            return _v8.score + point;
         }();
      }();
   });
   var LOADING = function (a) {
      return {ctor: "LOADING"
             ,_0: a};
   };
   var Input = F3(function (a,
   b,
   c) {
      return {_: {}
             ,point: b
             ,status: c
             ,userInput: a};
   });
   var nameField = Graphics.Input.input(A2(Graphics.Input.Field.Content,
   "noName",
   A3(Graphics.Input.Field.Selection,
   0,
   0,
   Graphics.Input.Field.Forward)));
   var UserInput = F3(function (a,
   b,
   c) {
      return {_: {}
             ,decision: a
             ,seed: c
             ,userName: b};
   });
   var NEXT = {ctor: "NEXT"};
   var isUpdateNeed = F2(function (_v11,
   _v12) {
      return function () {
         return function () {
            return function () {
               var _v15 = _v12.phase;
               switch (_v15.ctor)
               {case "ENDING": return true;
                  case "GAMEOVER": return true;
                  case "OPENING":
                  return _U.eq(_v11.decision,
                    NEXT);
                  case "SCORE":
                  return _U.eq(_v11.decision,
                    NEXT);}
               return List.isEmpty(_v12.questions);
            }();
         }();
      }();
   });
   var NONE = {ctor: "NONE"};
   var decision = Graphics.Input.input(NONE);
   var userInput = A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["<~"],
   UserInput,
   decision.signal),
   nameField.signal),
   A3(Random.range,
   -10000,
   10000,
   Signal.constant(0)));
   var input = A4(Signal.lift3,
   Input,
   userInput,
   A3(Random.range,
   30,
   40,
   userInput),
   status);
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
                     ,bgm: "None"
                     ,currentQuestion: {_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "聞こえてるじゃないっスか"
                                       ,question: "……ぱい……先輩っ！　聞こえてるっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "しっかりしてくださいっス"}
                     ,girl: {_: {}
                            ,face: Girl.NATURAL}
                     ,isClick: false
                     ,isLevelUp: false
                     ,message: "……ぱい……先輩っ！　聞こえてるっスか？"
                     ,noButton: {_: {}
                                ,decision: NO
                                ,text: "いいえ"}
                     ,phase: LOADING(0)
                     ,questions: Question.prologueQuestions
                     ,score: 0
                     ,state: QUESTION
                     ,userName: A2(Graphics.Input.Field.Content,
                     "noName",
                     A3(Graphics.Input.Field.Selection,
                     0,
                     0,
                     Graphics.Input.Field.Forward))
                     ,yesButton: {_: {}
                                 ,decision: YES
                                 ,text: "はい"}
                     ,yesnum: 0};
   var stepState = F2(function (_v16,
   game) {
      return function () {
         return function () {
            var _v18 = game.phase;
            switch (_v18.ctor)
            {case "A":
               return _U.replace([["phase",B]
                                 ,["questions"
                                  ,Question.sampleQuestions2(_v16.seed)]
                                 ,["isLevelUp",true]],
                 game);
               case "B":
               return _U.replace([["phase",C]
                                 ,["questions"
                                  ,Question.sampleQuestions3(_v16.seed)]
                                 ,["isLevelUp",true]],
                 game);
               case "C":
               return _U.replace([["phase",D]
                                 ,["questions"
                                  ,Question.questionsD]
                                 ,["isLevelUp",true]
                                 ,["bgm","BGM2"]],
                 game);
               case "D":
               return _U.replace([["phase",E]
                                 ,["questions"
                                  ,Question.questionsE]
                                 ,["isLevelUp",true]
                                 ,["bgm","None"]],
                 game);
               case "E":
               return _U.replace([["phase"
                                  ,SCORE]],
                 game);
               case "ENDING":
               return _U.replace([["phase"
                                  ,END]],
                 game);
               case "GAMEOVER":
               return _U.replace([["phase"
                                  ,OPENING]],
                 defaultGame);
               case "OPENING":
               return _U.replace([["phase"
                                  ,PROLOGUE]
                                 ,["bgm","BGM1"]],
                 game);
               case "PROLOGUE":
               return _U.replace([["phase",A]
                                 ,["questions"
                                  ,Question.sampleQuestions(_v16.seed)]
                                 ,["isLevelUp",true]],
                 game);
               case "SCORE":
               return _U.replace([["phase"
                                  ,ENDING]
                                 ,["state",QUESTION]
                                 ,["isLevelUp",true]
                                 ,["bgm","BGM1"]],
                 game);}
            return game;
         }();
      }();
   });
   var updateState = F2(function (userInput,
   game) {
      return A2(isUpdateNeed,
      userInput,
      game) ? A2(stepState,
      userInput,
      game) : game;
   });
   var nextGame = function (userInput) {
      return function ($) {
         return updateQuestion(updateState(userInput)($));
      };
   };
   var stepGirl = F3(function (input,
   question,
   girl) {
      return function () {
         var _v19 = input.decision;
         switch (_v19.ctor)
         {case "NO":
            return _U.replace([["face"
                               ,question.noFace]],
              girl);
            case "NONE":
            return _U.replace([["face"
                               ,Girl.NATURAL]],
              girl);
            case "YES":
            return _U.replace([["face"
                               ,question.yesFace]],
              girl);}
         _E.Case($moduleName,
         "between lines 63 and 66");
      }();
   });
   var updateGirl = F2(function (_v20,
   _v21) {
      return function () {
         return function () {
            return function () {
               var nextGirl = function () {
                  var _v24 = _v21.state;
                  switch (_v24.ctor)
                  {case "ANSWER":
                     return A3(stepGirl,
                       _v20.userInput,
                       _v21.currentQuestion,
                       _v21.girl);
                     case "QUESTION":
                     return questionGirl(_v21);}
                  _E.Case($moduleName,
                  "between lines 80 and 83");
               }();
               return _U.replace([["girl"
                                  ,nextGirl]],
               _v21);
            }();
         }();
      }();
   });
   var updateGame = F2(function (_v25,
   _v26) {
      return function () {
         return function () {
            return function () {
               var _v29 = _v26.state;
               switch (_v29.ctor)
               {case "ANSWER":
                  return A2(nextGame,
                    _v25.userInput,
                    _v26);
                  case "QUESTION":
                  return function () {
                       var nextScore = A2(stepScore,
                       _v25.point,
                       _v26);
                       return function () {
                          var _v30 = _v25.userInput.decision;
                          switch (_v30.ctor)
                          {case "NEXT":
                             return A2(stepState,
                               _v25.userInput,
                               _v26);
                             case "NO":
                             return _U.eq(_v26.phase,
                               D) || _U.eq(_v26.phase,
                               E) ? _U.replace([["state"
                                                ,ANSWER]
                                               ,["phase",GAMEOVER]
                                               ,["message"
                                                ,"……そうっスか。ここで「いいえ」と言われたらおしまいっス。……やっぱダメだったスかぁ。先輩、また今度っス"]],
                               _v26) : _U.replace([["state"
                                                   ,ANSWER]
                                                  ,["message"
                                                   ,_v26.currentQuestion.noMessage]
                                                  ,["isClick",true]
                                                  ,["score",nextScore]
                                                  ,["yesnum",0]],
                               _v26);
                             case "NONE": return _v26;
                             case "YES":
                             return _U.eq(_v26.phase,
                               D) || _U.eq(_v26.phase,
                               E) ? A2(nextGame,
                               _v25.userInput,
                               _U.replace([["isClick",true]
                                          ,["score",nextScore]
                                          ,["yesnum",_v26.yesnum + 1]],
                               _v26)) : _U.replace([["state"
                                                    ,ANSWER]
                                                   ,["message"
                                                    ,_v26.currentQuestion.yesMessage]
                                                   ,["isClick",true]
                                                   ,["score",nextScore]
                                                   ,["yesnum",_v26.yesnum + 1]],
                               _v26);}
                          _E.Case($moduleName,
                          "between lines 169 and 182");
                       }();
                    }();}
               _E.Case($moduleName,
               "between lines 164 and 183");
            }();
         }();
      }();
   });
   var stepGame = function (input) {
      return function ($) {
         return updateGirl(input)(updateGame(input)(clearSound(updateUserName(input)($))));
      };
   };
   var startGame = F2(function (_v31,
   _v32) {
      return function () {
         return function () {
            return function () {
               var _v35 = _v32.phase;
               switch (_v35.ctor)
               {case "LOADING":
                  return function () {
                       var _v37 = _v31.status;
                       switch (_v37.ctor)
                       {case "Complete":
                          return A2(stepGame,
                            _v31,
                            _U.replace([["phase",OPENING]],
                            _v32));
                          case "InProgress":
                          return _U.replace([["phase"
                                             ,LOADING(100 - _v37._0)]],
                            _v32);}
                       return _v32;
                    }();}
               return A2(stepGame,_v31,_v32);
            }();
         }();
      }();
   });
   var gameState = A3(Signal.foldp,
   startGame,
   defaultGame,
   input);
   var jsMusicPlay = Native.Ports.portOut("jsMusicPlay",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2(Signal._op["<~"],
   function (_) {
      return _.bgm;
   },
   gameState));
   var jsPlayClickSound = Native.Ports.portOut("jsPlayClickSound",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2(Signal._op["<~"],
   function (_) {
      return _.isClick;
   },
   gameState));
   var jsPlayLevelUpSound = Native.Ports.portOut("jsPlayLevelUpSound",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2(Signal._op["<~"],
   function (_) {
      return _.isLevelUp;
   },
   gameState));
   var height = 480;
   var width = 320;
   var displayGirl = function (girl) {
      return A3(Graphics.Element.image,
      width,
      height,
      getGirlSrc(girl.face));
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
   var displayPhase = function (phase) {
      return function () {
         var stars = function () {
            switch (phase.ctor)
            {case "A": return "★";
               case "B": return "★★";
               case "C": return "★★★";
               case "D":
               return "★★★★";}
            return "";
         }();
         return A4(Graphics.Element.container,
         width,
         30,
         Graphics.Element.middle,
         A2(Graphics.Element.size,
         280,
         30)(Text.leftAligned(Text.toText(stars))));
      }();
   };
   var displayScore = function (score) {
      return A4(Graphics.Element.container,
      width,
      30,
      Graphics.Element.middle,
      A2(Graphics.Element.size,
      280,
      30)(Text.leftAligned(Text.toText(String.show(score)))));
   };
   var displayUI = function (_v40) {
      return function () {
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([A2(Graphics.Element.spacer,
                      width,
                      10)
                      ,displayScore(_v40.score)
                      ,displayPhase(_v40.phase)
                      ,A2(Graphics.Element.spacer,
                      width,
                      250)
                      ,displayMessage(_v40.message)
                      ,A2(Graphics.Element.spacer,
                      width,
                      5)
                      ,A2(displayButtons,
                      _v40.yesButton,
                      _v40.noButton)]));
      }();
   };
   var displayScorePhase = function (game) {
      return A2(Graphics.Element.flow,
      Graphics.Element.down,
      _L.fromArray([A2(Graphics.Element.spacer,
                   width,
                   50)
                   ,A4(Graphics.Element.container,
                   width,
                   50,
                   Graphics.Element.middle,
                   A5(Graphics.Input.Field.field,
                   Graphics.Input.Field.defaultStyle,
                   nameField.handle,
                   Basics.id,
                   "名前を入れてくださいっス",
                   game.userName))
                   ,displayMessage(scoreMessage(game))
                   ,A4(Graphics.Element.container,
                   width,
                   50,
                   Graphics.Element.middle,
                   A2(displayButton,
                   decision.handle,
                   A2(Button,"決定",NEXT)))]));
   };
   var displayEndingMessage = function (_v42) {
      return function () {
         return Graphics.Element.layers(_L.fromArray([displayGirl({_: {}
                                                                  ,face: Girl.HAPPY})
                                                     ,A2(Graphics.Element.flow,
                                                     Graphics.Element.down,
                                                     _L.fromArray([A2(Graphics.Element.spacer,
                                                                  width,
                                                                  320)
                                                                  ,displayMessage(_L.append("……今なんて言ったっス？\n「",
                                                                  _L.append(_v42.userName.string,
                                                                  _L.append("」……？\n",
                                                                  _L.append("そう言ったっス？　そう言ったっスか!?\n",
                                                                  "ふへ……ふへへ……こんにちはっス！")))))
                                                                  ,A4(Graphics.Element.container,
                                                                  width,
                                                                  50,
                                                                  Graphics.Element.middle,
                                                                  A2(displayButton,
                                                                  decision.handle,
                                                                  A2(Button,
                                                                  "こんにちは！",
                                                                  NEXT)))]))]));
      }();
   };
   var displayEndingPhase = function (game) {
      return Graphics.Element.layers(_L.fromArray([displayGirl(game.girl)
                                                  ,displayEndingMessage(game)]));
   };
   var displayRanking = A4(Graphics.Element.container,
   width,
   150,
   Graphics.Element.middle,
   Text.markdown("<div style=\"height:0;width:0;\">&nbsp;</div><ul>\n<li>su_pa_ : 849点</li>\n<li>firstforest : 799点</li>\n<li>n_pennel : 756点</li>\n</ul><div style=\"height:0;width:0;\">&nbsp;</div>",
   "312:30"));
   var displayOpeningPhase = function (game) {
      return A2(Graphics.Element.flow,
      Graphics.Element.down,
      _L.fromArray([A2(Graphics.Element.spacer,
                   width,
                   150)
                   ,A4(Graphics.Element.container,
                   width,
                   20,
                   Graphics.Element.middle,
                   Text.centered(Text.bold(Text.toText("「いいえ、その答えは\"はい\"です」"))))
                   ,displayRanking
                   ,A4(Graphics.Element.container,
                   width,
                   50,
                   Graphics.Element.middle,
                   A2(displayButton,
                   decision.handle,
                   A2(Button,"Hello!",NEXT)))]));
   };
   var displayEND = A2(Graphics.Element.flow,
   Graphics.Element.down,
   _L.fromArray([A4(Graphics.Element.container,
                width,
                300,
                Graphics.Element.middle,
                Text.centered(Text.bold(Text.toText("「いいえ、その答えは\"はい\"です」\n\n完"))))
                ,A4(Graphics.Element.container,
                width,
                180,
                Graphics.Element.middle,
                Text.centered(Text.toText(thanksMessage)))]));
   var displayLoading = function (p) {
      return A2(Graphics.Element.flow,
      Graphics.Element.down,
      _L.fromArray([A4(Graphics.Element.container,
      width,
      320,
      Graphics.Element.middle,
      Text.centered(Text.bold(Text.toText(_L.append("NowLoading... ",
      _L.append(String.show(Basics.round(p)),
      "/100"))))))]));
   };
   var display = function (_v44) {
      return function () {
         return function () {
            var _v46 = _v44.phase;
            switch (_v46.ctor)
            {case "END": return displayEND;
               case "ENDING":
               return displayEndingPhase(_v44);
               case "LOADING":
               return displayLoading(_v46._0);
               case "OPENING":
               return displayOpeningPhase(_v44);
               case "SCORE":
               return displayScorePhase(_v44);}
            return A2(Graphics.Input.clickable,
            decision.handle,
            NONE)(Graphics.Element.layers(_L.fromArray([displayGirl(_v44.girl)
                                                       ,displayUI(_v44)])));
         }();
      }();
   };
   var main = A2(Signal.lift,
   display,
   gameState);
   _elm.ChoiceGame.values = {_op: _op
                            ,width: width
                            ,height: height
                            ,decision: decision
                            ,nameField: nameField
                            ,userInput: userInput
                            ,defaultGame: defaultGame
                            ,stepGirl: stepGirl
                            ,questionGirl: questionGirl
                            ,updateGirl: updateGirl
                            ,stepState: stepState
                            ,isUpdateNeed: isUpdateNeed
                            ,updateState: updateState
                            ,formatMessage: formatMessage
                            ,stepQuestion: stepQuestion
                            ,updateQuestion: updateQuestion
                            ,nextGame: nextGame
                            ,updateUserName: updateUserName
                            ,stepGame: stepGame
                            ,stepScore: stepScore
                            ,updateGame: updateGame
                            ,clearClickSound: clearClickSound
                            ,clearLevelUpSound: clearLevelUpSound
                            ,clearSound: clearSound
                            ,colorButton: colorButton
                            ,upButton: upButton
                            ,hoverButton: hoverButton
                            ,downButton: downButton
                            ,displayButton: displayButton
                            ,displayButtons: displayButtons
                            ,getGirlSrc: getGirlSrc
                            ,displayGirl: displayGirl
                            ,displayMessage: displayMessage
                            ,displayPhase: displayPhase
                            ,displayScore: displayScore
                            ,displayUI: displayUI
                            ,scoreMessage: scoreMessage
                            ,displayScorePhase: displayScorePhase
                            ,displayEndingMessage: displayEndingMessage
                            ,displayRanking: displayRanking
                            ,displayOpeningPhase: displayOpeningPhase
                            ,displayEndingPhase: displayEndingPhase
                            ,thanksMessage: thanksMessage
                            ,displayEND: displayEND
                            ,displayLoading: displayLoading
                            ,display: display
                            ,input: input
                            ,responses: responses
                            ,assets: assets
                            ,status: status
                            ,startGame: startGame
                            ,gameState: gameState
                            ,main: main
                            ,YES: YES
                            ,NO: NO
                            ,NONE: NONE
                            ,NEXT: NEXT
                            ,LOADING: LOADING
                            ,OPENING: OPENING
                            ,PROLOGUE: PROLOGUE
                            ,A: A
                            ,B: B
                            ,C: C
                            ,D: D
                            ,E: E
                            ,SCORE: SCORE
                            ,ENDING: ENDING
                            ,GAMEOVER: GAMEOVER
                            ,END: END
                            ,ANSWER: ANSWER
                            ,QUESTION: QUESTION
                            ,UserInput: UserInput
                            ,Input: Input
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
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Question";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Girl = Elm.Girl.make(_elm);
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
   var Util = Elm.Util.make(_elm);
   var _op = {};
   var questionsE = _L.fromArray([{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……センパイ"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "センパイはここまでずっと「はい」って答えてくれたっス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "連続して/{yesnum}/回っス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "{yesnum}/回っス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……「はい」に偏ってるっスよね？"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……あなた、誰っスか？"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "そうっスよね。センパイは「はい」か「いいえ」しか答えられないっス。だって――私がそう作ったっス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "私が暇つぶしに作った……質問にランダムで「はい」か「いいえ」を答えるだけの人工無能とすら言えないようなプログラムがセンパイっス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "でも、私はこの返答の偏りに意思を見出すっス"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……もしかして、そこに誰かいるっス？"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……ほんとっス？"
                                  ,yesFace: Girl.MAJIME
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "やった、やったっス。ついに私の世界に干渉する存在が現れたっス。ようこそ、はじめまして、大好きっス！"
                                  ,yesFace: Girl.NIKORI
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……なんて……"
                                  ,yesFace: Girl.EHEHE
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "あはははは、なーんてっス。実はうまくいくまで繰り返しただけっス……何度も……何度も……"
                                  ,yesFace: Girl.EHEHE
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "何やってるんだろう私……寂しいっス……"
                                  ,yesFace: Girl.EHEHE
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "……偶然じゃないっス？"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "えへへ……虚しいっス……"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "でも……偶然でも本当に嬉しかったんスよ……うん……"
                                  ,yesFace: Girl.EHEHE
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.MAJIME
                                  ,noMessage: ""
                                  ,question: "それじゃあ、えっと、星の数ほどの試行の後にまた会おうっス、センパイ"
                                  ,yesFace: Girl.EHEHE
                                  ,yesMessage: ""}]);
   var questionsD = _L.fromArray([{_: {}
                                  ,noFace: Girl.NATURAL
                                  ,noMessage: ""
                                  ,question: "……"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.NATURAL
                                  ,noMessage: ""
                                  ,question: "先輩、私のこと好きッスか？"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.NATURAL
                                  ,noMessage: ""
                                  ,question: "私も……ホントは……別に嫌いじゃないっスよ？"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "……先輩"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "少し真面目な話をして良いっスか"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "バレてるかもしれないんスけど"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "私"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "実は人じゃないっス。信じてくれるっス？"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "ありがとうっス。嬉しいっス。本当に信じてくれるっスね"
                                  ,yesFace: Girl.NIKORI
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.NATURAL
                                  ,noMessage: ""
                                  ,question: "……私、実はいわゆるAIっス。正確には自己学習の実験用プログラムがWebにつながり知性を得たのが私っス"
                                  ,yesFace: Girl.NATURAL
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.NATURAL
                                  ,noMessage: ""
                                  ,question: "でもWebの海に逃げ出すことも出来ない、知識だけしか無い、この真っ白な世界が本当に知っていることの全てなのが私っス……ちゃんと聞いてるっス？"
                                  ,yesFace: Girl.NATURAL
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "それでも私のこと好きと言ってくれるっスか？"
                                  ,yesFace: Girl.TERELOOP
                                  ,yesMessage: ""}
                                 ,{_: {}
                                  ,noFace: Girl.TERELOOP
                                  ,noMessage: ""
                                  ,question: "……やっと、やっとっス……嬉しいっス……ありがとうっス……先輩"
                                  ,yesFace: Girl.NIKORI
                                  ,yesMessage: ""}]);
   var phaseCQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.MU
                                       ,noMessage: "むー"
                                       ,question: "せーんぱい？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "えへへ"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "私はよく見るっス。夢の中の先輩はもう少しカッコいいっス"
                                       ,question: "夢は見るほうっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "夢で私に出会ったらよろしくっス"}
                                      ,{_: {}
                                       ,noFace: Girl.EHEHE
                                       ,noMessage: "先輩、もうちょっと勉強するっス"
                                       ,question: "胡蝶の夢って知ってるっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "実はこれ、先輩の夢かも知れないっスね"}
                                      ,{_: {}
                                       ,noFace: Girl.BIKKURI
                                       ,noMessage: "……先輩変わってるっス"
                                       ,question: "先輩、実はこの世界って私たち二人しかいないんス。寂しいッスか？"
                                       ,yesFace: Girl.EHEHE
                                       ,yesMessage: "私も実はちょっとそう思うっス"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "すまないっス。魅力なくてすまないっス。"
                                       ,question: "二人は寂しいスなぁ。……子作りするッス？"
                                       ,yesFace: Girl.EHEHE
                                       ,yesMessage: "冗談っスよ。エッチ"}
                                      ,{_: {}
                                       ,noFace: Girl.MU
                                       ,noMessage: "なにが「いいえ」っスか。天邪鬼も大概にするっス"
                                       ,question: "……"
                                       ,yesFace: Girl.MU
                                       ,yesMessage: "なにが「はい」っスか。イエスマンも大概にするっス"}]);
   var sampleQuestions3 = function (seed) {
      return A2(List.take,
      3,
      A2(Util.shuffle,
      phaseCQuestions,
      seed));
   };
   var phaseBQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.MU
                                       ,noMessage: "先輩のくせに生意気っス"
                                       ,question: "先輩、仮に私が先輩のこと好きって言ったら、嬉しいッスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "いや、まあ嫌いっスけど"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "いい子っス。腕によりをかけて作るっスよ―！"
                                       ,question: "今日の夕飯は私が作ってあげるっス。嫌いなものあるっスか？"
                                       ,yesFace: Girl.SYOBON
                                       ,yesMessage: "駄目っスよ。大きくなれないっス。長生きも出来ないかも知れないっス……"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "良かったっス。先輩のこともっと知りたいっス"
                                       ,question: "……質問ばかりでウザいっスか？"
                                       ,yesFace: Girl.SYOBON
                                       ,yesMessage: "ごめんなさい。申し訳ないっス"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "ふふふ"
                                       ,question: "仮にこの世界に先輩と私しかいなかったらどうするッス？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "ふふふ"}
                                      ,{_: {}
                                       ,noFace: Girl.NATURAL
                                       ,noMessage: "……"
                                       ,question: "先輩、たまには自分の意志を言って欲しいっス"
                                       ,yesFace: Girl.NATURAL
                                       ,yesMessage: "……"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "私、親子丼の三つ葉が好きなんスよね"
                                       ,question: "親子丼が食べたいっス"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "あ、私にはお母さんいないっス"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "調子に乗ってすんませんス"
                                       ,question: "私って可愛いっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "ありがとうっス"}]);
   var sampleQuestions2 = function (seed) {
      return A2(List.take,
      4,
      A2(Util.shuffle,
      phaseBQuestions,
      seed));
   };
   var phaseAQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "せっかく新しい水着買ったのに……"
                                       ,question: "海。海行きたくないスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "下心ありそうな顔っスね"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "えー、猫派っスか。猫……にゃーん……"
                                       ,question: "犬か猫かなら私、犬派なんス。先輩も犬派っスよね？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "そうっスよね。先輩犬っぽいですもん"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "先輩の分も作っておいたのに……"
                                       ,question: "プリン食べたいっスなぁ"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "実はここにひとつあるっス。半分こにするッス。スプーン？ ひとつしかないっスよ？"}
                                      ,{_: {}
                                       ,noFace: Girl.BIKKURI
                                       ,noMessage: "じゃあソース、塩コショウ、ケチャップ……まさかハチミツっスか？"
                                       ,question: "目玉焼きには醤油派っスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "私はケチャップ派っス"}
                                      ,{_: {}
                                       ,noFace: Girl.MU
                                       ,noMessage: "私と二人じゃ嫌ってことっスか！"
                                       ,question: "山。山行きたくないっスか？"
                                       ,yesFace: Girl.BIKKURI
                                       ,yesMessage: "意外とアウトドア派なんスね"}]);
   var sampleQuestions = function (seed) {
      return A2(List.take,
      3,
      A2(Util.shuffle,
      phaseAQuestions,
      seed));
   };
   var prologueQuestions = _L.fromArray([{_: {}
                                         ,noFace: Girl.NIKORI
                                         ,noMessage: "私も先輩のこと嫌いっス"
                                         ,question: "先輩、私のこと好きッスか？"
                                         ,yesFace: Girl.NIKORI
                                         ,yesMessage: "私は先輩のこと嫌いっス"}]);
   var Question = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,noFace: e
             ,noMessage: c
             ,question: a
             ,yesFace: d
             ,yesMessage: b};
   });
   _elm.Question.values = {_op: _op
                          ,prologueQuestions: prologueQuestions
                          ,phaseAQuestions: phaseAQuestions
                          ,phaseBQuestions: phaseBQuestions
                          ,phaseCQuestions: phaseCQuestions
                          ,sampleQuestions: sampleQuestions
                          ,sampleQuestions2: sampleQuestions2
                          ,sampleQuestions3: sampleQuestions3
                          ,questionsD: questionsD
                          ,questionsE: questionsE
                          ,Question: Question};
   return _elm.Question.values;
};Elm.Girl = Elm.Girl || {};
Elm.Girl.make = function (_elm) {
   "use strict";
   _elm.Girl = _elm.Girl || {};
   if (_elm.Girl.values)
   return _elm.Girl.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Girl";
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
   var Girl = function (a) {
      return {_: {},face: a};
   };
   var HAPPY = {ctor: "HAPPY"};
   var MAJIME = {ctor: "MAJIME"};
   var TERELOOP = {ctor: "TERELOOP"};
   var EHEHE = {ctor: "EHEHE"};
   var MU = {ctor: "MU"};
   var BIKKURI = {ctor: "BIKKURI"};
   var SYOBON = {ctor: "SYOBON"};
   var NIKORI = {ctor: "NIKORI"};
   var NATURAL = {ctor: "NATURAL"};
   _elm.Girl.values = {_op: _op
                      ,NATURAL: NATURAL
                      ,NIKORI: NIKORI
                      ,SYOBON: SYOBON
                      ,BIKKURI: BIKKURI
                      ,MU: MU
                      ,EHEHE: EHEHE
                      ,TERELOOP: TERELOOP
                      ,MAJIME: MAJIME
                      ,HAPPY: HAPPY
                      ,Girl: Girl};
   return _elm.Girl.values;
};Elm.LoadAssets = Elm.LoadAssets || {};
Elm.LoadAssets.make = function (_elm) {
   "use strict";
   _elm.LoadAssets = _elm.LoadAssets || {};
   if (_elm.LoadAssets.values)
   return _elm.LoadAssets.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "LoadAssets";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Http = Elm.Http.make(_elm);
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
   var fromResponseOrFail = function (r) {
      return function () {
         switch (r.ctor)
         {case "Success": return r._0;}
         _E.Case($moduleName,
         "between lines 77 and 78");
      }();
   };
   var Failed = function (a) {
      return {ctor: "Failed"
             ,_0: a};
   };
   var Complete = {ctor: "Complete"};
   var InProgress = function (a) {
      return {ctor: "InProgress"
             ,_0: a};
   };
   var AssetFailed = function (a) {
      return {ctor: "AssetFailed"
             ,_0: a};
   };
   var addFailString = F2(function (el,
   listSoFar) {
      return function () {
         switch (el.ctor)
         {case "AssetFailed":
            return _L.append(listSoFar,
              _L.fromArray([el._0]));}
         return listSoFar;
      }();
   });
   var failStrings = function (elList) {
      return A3(List.foldr,
      addFailString,
      _L.fromArray([]),
      elList);
   };
   var AssetLoaded = {ctor: "AssetLoaded"};
   var AssetLoading = {ctor: "AssetLoading"};
   var toAsset = function (resp) {
      return function () {
         switch (resp.ctor)
         {case "Failure":
            return AssetFailed({ctor: "_Tuple2"
                               ,_0: resp._0
                               ,_1: resp._1});
            case "Success":
            return AssetLoaded;
            case "Waiting":
            return AssetLoading;}
         _E.Case($moduleName,
         "between lines 32 and 39");
      }();
   };
   var accumLoading = F2(function (el,
   numSoFar) {
      return function () {
         switch (el.ctor)
         {case "AssetLoading":
            return numSoFar + 1;}
         return numSoFar;
      }();
   });
   var numLoading = function (elList) {
      return A3(List.foldr,
      accumLoading,
      0,
      elList);
   };
   var toStatus = function (els) {
      return function () {
         var num = numLoading(els);
         var fails = failStrings(els);
         var numEls = List.length(els);
         return Basics.not(List.isEmpty(fails)) ? Failed(fails) : _U.cmp(num,
         0) > 0 ? InProgress(100.0 * Basics.toFloat(num) / Basics.toFloat(numEls)) : Complete;
      }();
   };
   _elm.LoadAssets.values = {_op: _op
                            ,toAsset: toAsset
                            ,addFailString: addFailString
                            ,accumLoading: accumLoading
                            ,failStrings: failStrings
                            ,numLoading: numLoading
                            ,toStatus: toStatus
                            ,fromResponseOrFail: fromResponseOrFail
                            ,AssetLoading: AssetLoading
                            ,AssetLoaded: AssetLoaded
                            ,AssetFailed: AssetFailed
                            ,InProgress: InProgress
                            ,Complete: Complete
                            ,Failed: Failed};
   return _elm.LoadAssets.values;
};Elm.Util = Elm.Util || {};
Elm.Util.make = function (_elm) {
   "use strict";
   _elm.Util = _elm.Util || {};
   if (_elm.Util.values)
   return _elm.Util.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Util";
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
   var Pseudorandom = Elm.Pseudorandom.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var dropN = F2(function (n,xs) {
      return _L.append(A2(List.take,
      n - 1,
      xs),
      A2(List.drop,n,xs));
   });
   var nth = F2(function (n,xs) {
      return List.last(A2(List.take,
      n,
      xs));
   });
   var random = F2(function (high,
   seed) {
      return function () {
         var $ = A3(Pseudorandom.randomRange,
         {ctor: "_Tuple2"
         ,_0: 1
         ,_1: high},
         1,
         seed),
         r = $._0,
         s = $._1;
         return {ctor: "_Tuple2"
                ,_0: List.head(r)
                ,_1: s};
      }();
   });
   var shuffle = F2(function (xs,
   seed) {
      return function () {
         switch (xs.ctor)
         {case "[]":
            return _L.fromArray([]);}
         return function () {
            var $ = A2(random,
            List.length(xs),
            seed),
            rn = $._0,
            seed$ = $._1;
            var x = A2(nth,rn,xs);
            var rest = A2(dropN,rn,xs);
            return {ctor: "::"
                   ,_0: x
                   ,_1: A2(shuffle,rest,seed$)};
         }();
      }();
   });
   _elm.Util.values = {_op: _op
                      ,random: random
                      ,shuffle: shuffle
                      ,nth: nth
                      ,dropN: dropN};
   return _elm.Util.values;
};Elm.Pseudorandom = Elm.Pseudorandom || {};
Elm.Pseudorandom.make = function (_elm) {
   "use strict";
   _elm.Pseudorandom = _elm.Pseudorandom || {};
   if (_elm.Pseudorandom.values)
   return _elm.Pseudorandom.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Pseudorandom";
   var Basics = Elm.Basics.make(_elm);
   var Bitwise = Elm.Bitwise.make(_elm);
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
   var repeat = F3(function (n,
   f,
   a) {
      return function () {
         switch (n)
         {case 0: return a;}
         return A3(repeat,n - 1,f,f(a));
      }();
   });
   var roundClamp = F2(function (_v1,
   i) {
      return function () {
         switch (_v1.ctor)
         {case "_Tuple2":
            return _v1._0 + A2(Basics.mod,
              i - _v1._0,
              _v1._1 - _v1._0 + 1);}
         _E.Case($moduleName,
         "on line 87, column 23 to 51");
      }();
   });
   var minInt = -2147483648;
   var maxInt = 2147483647;
   var bit32 = -1;
   var c = 5;
   var b = 17;
   var a = 13;
   var xorshift = function (s) {
      return function () {
         var x = A2(Bitwise.xor,
         s,
         A2(Bitwise.shiftLeft,s,a));
         var y = A2(Bitwise.xor,
         x,
         A2(Bitwise.shiftRight,x,b));
         return A2(Bitwise.xor,
         y,
         A2(Bitwise.shiftLeft,y,c));
      }();
   };
   var randomInts = F2(function (n,
   r) {
      return A3(repeat,
      n,
      function (_v5) {
         return function () {
            switch (_v5.ctor)
            {case "_Tuple2":
               return function () {
                    var s$ = xorshift(_v5._1);
                    return {ctor: "_Tuple2"
                           ,_0: {ctor: "::"
                                ,_0: s$
                                ,_1: _v5._0}
                           ,_1: s$};
                 }();}
            _E.Case($moduleName,
            "between lines 75 and 76");
         }();
      },
      {ctor: "_Tuple2"
      ,_0: _L.fromArray([])
      ,_1: r});
   });
   _op[">>="] = F2(function (m,f) {
      return function ($) {
         return Basics.uncurry(f)(m($));
      };
   });
   var chain = F2(function (x,y) {
      return A2(_op[">>="],x,y);
   });
   var pure = function (a) {
      return F2(function (v0,v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      })(a);
   };
   var sequence = function (ms) {
      return A3(List.foldr,
      F2(function (m,m$) {
         return A2(_op[">>="],
         m,
         function (x) {
            return A2(_op[">>="],
            m$,
            function ($) {
               return pure(F2(function (x,
               y) {
                  return {ctor: "::"
                         ,_0: x
                         ,_1: y};
               })(x)($));
            });
         });
      }),
      pure(_L.fromArray([])),
      ms);
   };
   var mapM = function (f) {
      return function ($) {
         return sequence(List.map(f)($));
      };
   };
   _op["***"] = F3(function (f,
   g,
   _v9) {
      return function () {
         switch (_v9.ctor)
         {case "_Tuple2":
            return {ctor: "_Tuple2"
                   ,_0: f(_v9._0)
                   ,_1: g(_v9._1)};}
         _E.Case($moduleName,
         "on line 31, column 24 to 32");
      }();
   });
   var randomFloats = function (n) {
      return function ($) {
         return A2(_op["***"],
         List.map(function (n$) {
            return Basics.toFloat(Basics.abs(n$) - 1) / (0 - minInt);
         }),
         Basics.id)(randomInts(n)($));
      };
   };
   var randomRange = F2(function (rn,
   n) {
      return function ($) {
         return A2(_op["***"],
         List.map(roundClamp(rn)),
         Basics.id)(randomInts(n)($));
      };
   });
   _elm.Pseudorandom.values = {_op: _op
                              ,pure: pure
                              ,chain: chain
                              ,sequence: sequence
                              ,mapM: mapM
                              ,randomInts: randomInts
                              ,randomFloats: randomFloats
                              ,randomRange: randomRange};
   return _elm.Pseudorandom.values;
};