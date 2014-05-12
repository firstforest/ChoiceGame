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
   var Girl = Elm.Girl.make(_elm);
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
   var getGirlSrc = function (face) {
      return function () {
         switch (face.ctor)
         {case "ELTSU":
            return "img/eltsu.jpg";
            case "NATURAL":
            return "img/natural.jpg";
            case "NIKORI":
            return "img/nikori.jpg";
            case "SYOBON":
            return "img/syobon.jpg";}
         _E.Case($moduleName,
         "between lines 131 and 135");
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
         var _v1 = game.phase;
         switch (_v1.ctor)
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
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "聞こえてるじゃないっスか"
                                       ,question: "……ぱい……先輩っ！　聞こえてるっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "しっかりしてくださいっス"}
                     ,girl: {_: {}
                            ,face: Girl.NATURAL}
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
   var stepGirl = F3(function (input,
   question,
   girl) {
      return function () {
         var _v2 = input.decision;
         switch (_v2.ctor)
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
         "between lines 50 and 53");
      }();
   });
   var stepGame = F2(function (_v3,
   _v4) {
      return function () {
         return function () {
            return function () {
               var g = A3(stepGirl,
               _v3.userInput,
               _v4.currentQuestion,
               _v4.girl);
               return function () {
                  var _v7 = _v4.state;
                  switch (_v7.ctor)
                  {case "ANSWER":
                     return _U.eq(_v3.userInput.decision,
                       NONE) ? nextGame(_U.replace([["girl"
                                                    ,g]],
                       _v4)) : _v4;
                     case "QUESTION":
                     return function () {
                          var _v8 = _v3.userInput.decision;
                          switch (_v8.ctor)
                          {case "NO":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v4.currentQuestion.noMessage]
                                               ,["girl",g]],
                               _v4);
                             case "NONE": return _v4;
                             case "YES":
                             return _U.replace([["state"
                                                ,ANSWER]
                                               ,["message"
                                                ,_v4.currentQuestion.yesMessage]
                                               ,["girl",g]],
                               _v4);}
                          _E.Case($moduleName,
                          "between lines 84 and 91");
                       }();}
                  _E.Case($moduleName,
                  "between lines 82 and 94");
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
   var displayUI = function (_v9) {
      return function () {
         return A2(Graphics.Element.flow,
         Graphics.Element.down,
         _L.fromArray([A2(Graphics.Element.spacer,
                      width,
                      320)
                      ,displayMessage(_v9.message)
                      ,A2(Graphics.Element.spacer,
                      width,
                      5)
                      ,A2(displayButtons,
                      _v9.yesButton,
                      _v9.noButton)]));
      }();
   };
   var display = function (_v11) {
      return function () {
         return A2(Graphics.Input.clickable,
         decision.handle,
         NONE)(Graphics.Element.layers(_L.fromArray([displayGirl(_v11.girl)
                                                    ,displayUI(_v11)])));
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
                            ,getGirlSrc: getGirlSrc
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
   var phaseCQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "……先輩変わってるっス"
                                       ,question: "先輩、実はこの世界って私たち二人しかいないんス。寂しいッスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "私も実はちょっとそう思うっス"}
                                      ,{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "私はよく見るっス。夢の中の先輩はもう少しカッコいいっス"
                                       ,question: "夢は見るほうっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "夢で私に出会ったらよろしくっス"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "先輩、もうちょっと勉強するっス"
                                       ,question: "胡蝶の夢って知ってるっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "実はこれ、先輩の夢かも知れないっスね"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "むー"
                                       ,question: "せーんぱい？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "えへへ"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "すまないっス。魅力なくてすまないっス。"
                                       ,question: "二人は寂しいスなぁ。……子作りするッス？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "冗談っスよ。エッチ"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "なにが「いいえ」っスか。天邪鬼も大概にするっス"
                                       ,question: "……"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "なにが「はい」っスか。イエスマンも大概にするっス"}]);
   var sampleQuestions3 = A2(List.take,
   3,
   A2(Util.shuffle,
   phaseCQuestions,
   5425234));
   var phaseBQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "先輩のくせに生意気っス"
                                       ,question: "先輩、仮に私が先輩のこと好きって言ったら、嬉しいッスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "いや、まあ嫌いっスけど"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "いい子っス。腕によりをかけて作るっスよ―！"
                                       ,question: "今日の夕飯は私が作ってあげるっス。嫌いなものあるっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "駄目っスよ。大きくなれないっス。長生きも出来ないかも知れないっス……"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "良かったっス。先輩のこともっと知りたいっス。"
                                       ,question: "……質問ばかりでウザいっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "ごめんなさい。申し訳ないっス。"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "じゃあソース、塩コショウ、ケチャップ……まさかハチミツっスか？"
                                       ,question: "目玉焼きには醤油派っスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "私はケチャップ派っス"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "ふふふ"
                                       ,question: "仮にこの世界に先輩と私しかいなかったらどうするッス？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "ふふふ"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "……"
                                       ,question: "先輩、たまには自分の意志を言って欲しいっス"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "……"}
                                      ,{_: {}
                                       ,noFace: Girl.SYOBON
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
   var sampleQuestions2 = A2(List.take,
   4,
   A2(Util.shuffle,
   phaseBQuestions,
   15534324));
   var phaseAQuestions = _L.fromArray([{_: {}
                                       ,noFace: Girl.NIKORI
                                       ,noMessage: "私も先輩のこと嫌いっス"
                                       ,question: "先輩、私のこと好きッスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "私は先輩のこと嫌いっス"}
                                      ,{_: {}
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
                                       ,noFace: Girl.SYOBON
                                       ,noMessage: "二人でカレー作ったりしたかったっス……"
                                       ,question: "山。山行きたくないっスか？"
                                       ,yesFace: Girl.NIKORI
                                       ,yesMessage: "意外とアウトドア派なんスね"}]);
   var sampleQuestions = A2(List.take,
   3,
   A2(Util.shuffle,
   phaseAQuestions,
   1234313));
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
                          ,phaseAQuestions: phaseAQuestions
                          ,phaseBQuestions: phaseBQuestions
                          ,phaseCQuestions: phaseCQuestions
                          ,sampleQuestions: sampleQuestions
                          ,sampleQuestions2: sampleQuestions2
                          ,sampleQuestions3: sampleQuestions3
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
   var ELTSU = {ctor: "ELTSU"};
   var SYOBON = {ctor: "SYOBON"};
   var NIKORI = {ctor: "NIKORI"};
   var NATURAL = {ctor: "NATURAL"};
   _elm.Girl.values = {_op: _op
                      ,NATURAL: NATURAL
                      ,NIKORI: NIKORI
                      ,SYOBON: SYOBON
                      ,ELTSU: ELTSU
                      ,Girl: Girl};
   return _elm.Girl.values;
};Elm.Util = Elm.Util || {};
Elm.Util.make = function (_elm) {
   "use strict";
   _elm.Util = _elm.Util || {};
   if (_elm.Util.values)
   return _elm.Util.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
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