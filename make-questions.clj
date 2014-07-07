(require 'clojure.java.io)
(require 'clojure.string)

(defn make-question [[q y y-face n n-face]]
  (let [yf (if (empty? y-face) "NATURAL" y-face)
        nf (if (empty? n-face) "NATURAL" n-face)]
  (str "  {question = \"" q "\", yesMessage = \"" y "\", yesFace = " yf ", noMessage = \"" n "\", noFace = " nf "}")))

(defn separate-question [line]
  (let
      [question (partition 6 line)]
    (clojure.string/join ",\n" (map #(make-question (map clojure.string/trim %)) question))))

(defn make-questions [choice]
  (let
    [[lineA restA] (split-with #(not= "----END_A" %) choice)
     [lineB restB] (split-with #(not= "----END_B" %) (rest restA))
     [lineC restC] (split-with #(not= "----END_C" %) (rest restB))
     [lineD restD] (split-with #(not= "---END" %) (rest restC))]
    (str (separate-question lineA) "\n\n" (separate-question lineB) "\n\n" (separate-question lineC) "\n\n" (separate-question lineD))))

(with-open
  [rdr  (clojure.java.io/reader "choice.txt")
     wtr (clojure.java.io/writer "Questions.txt")]
  (.write wtr (make-questions (line-seq rdr))))
